#!/usr/bin/env python3
"""
Sube las fotos de un día a una galería privada (Cloudflare R2) y actualiza su manifest.json.

Uso:
  python3 subir.py verificar
  python3 subir.py <galeria> <dia> <carpeta-con-jpg> [--zip] [--portada NOMBRE.jpg]

Ejemplo:
  python3 subir.py polo-uruguay dia-1 ~/Desktop/Exportadas/Dia1

- Sube cada JPG en tres tamaños: miniatura (640 px), web (2048 px) y original (para descargar).
- Si volvés a correrlo con la misma carpeta, solo sube las fotos nuevas.
- --zip arma un .zip con todos los originales del día para el botón "Descargar el día" (tarda más en subir).
- No hace falta publicar el sitio: la galería lee el manifest.json en cada visita.

Configuración: ~/.galerias/config.json (ver config.ejemplo.json). Solo usa Python y sips, que vienen con macOS.
"""
import datetime
import hashlib
import hmac
import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from concurrent.futures import ThreadPoolExecutor, as_completed

CONFIG = os.path.expanduser("~/.galerias/config.json")
EXTS = (".jpg", ".jpeg")
WEB_PX, THUMB_PX = 2048, 640


# ───────────────────────── R2 (API S3 con firma SigV4) ─────────────────────────
class R2:
    def __init__(self, cfg):
        self.account = cfg["account_id"]
        self.key_id = cfg["access_key_id"]
        self.secret = cfg["secret_access_key"]
        self.bucket = cfg["bucket"]
        self.host = f"{self.account}.r2.cloudflarestorage.com"

    def _sign(self, key, msg):
        return hmac.new(key, msg.encode(), hashlib.sha256).digest()

    def request(self, method, key="", body=b"", headers=None, query=None):
        headers = dict(headers or {})
        now = datetime.datetime.now(datetime.timezone.utc)
        amz_date = now.strftime("%Y%m%dT%H%M%SZ")
        day = now.strftime("%Y%m%d")
        payload_hash = hashlib.sha256(body).hexdigest()
        path = "/" + self.bucket + ("/" + urllib.parse.quote(key, safe="/-_.~") if key else "")
        q = sorted((query or {}).items())
        canonical_query = "&".join(
            f"{urllib.parse.quote(k, safe='-_.~')}={urllib.parse.quote(str(v), safe='-_.~')}" for k, v in q
        )
        signed = {"host": self.host, "x-amz-content-sha256": payload_hash, "x-amz-date": amz_date}
        signed_names = ";".join(sorted(signed))
        canonical_headers = "".join(f"{k}:{signed[k]}\n" for k in sorted(signed))
        canonical = "\n".join([method, path, canonical_query, canonical_headers, signed_names, payload_hash])
        scope = f"{day}/auto/s3/aws4_request"
        to_sign = "\n".join(["AWS4-HMAC-SHA256", amz_date, scope, hashlib.sha256(canonical.encode()).hexdigest()])
        k = self._sign(("AWS4" + self.secret).encode(), day)
        for part in ("auto", "s3", "aws4_request"):
            k = self._sign(k, part)
        signature = hmac.new(k, to_sign.encode(), hashlib.sha256).hexdigest()
        headers.update(
            {
                "x-amz-date": amz_date,
                "x-amz-content-sha256": payload_hash,
                "Authorization": f"AWS4-HMAC-SHA256 Credential={self.key_id}/{scope}, "
                f"SignedHeaders={signed_names}, Signature={signature}",
            }
        )
        url = f"https://{self.host}{path}" + (f"?{canonical_query}" if canonical_query else "")
        req = urllib.request.Request(url, data=body if method == "PUT" else None, method=method, headers=headers)
        with urllib.request.urlopen(req, timeout=300) as res:
            return res.status, res.read()

    def put(self, key, body, content_type, cache="public, max-age=31536000, immutable", disposition=None):
        h = {"Content-Type": content_type, "Cache-Control": cache}
        if disposition:
            h["Content-Disposition"] = disposition
        for intento in range(4):
            try:
                return self.request("PUT", key, body, h)
            except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
                if intento == 3:
                    raise
                print(f"   reintentando {key} ({e})")


# ───────────────────────── utilidades ─────────────────────────
def cargar_config():
    if not os.path.exists(CONFIG):
        sys.exit(f"Falta {CONFIG}. Copiá config.ejemplo.json ahí y completalo con tus datos de Cloudflare.")
    with open(CONFIG) as fh:
        return json.load(fh)


def nombre_seguro(nombre):
    base, ext = os.path.splitext(nombre)
    base = unicodedata.normalize("NFKD", base).encode("ascii", "ignore").decode()
    base = re.sub(r"[^A-Za-z0-9._-]+", "-", base).strip("-").lower() or "foto"
    return base + ".jpg"


def sips_resize(origen, destino, px, calidad):
    # sips -Z también agranda: solo achicamos si la foto es más grande que px
    resize = ["-Z", str(px)] if max(sips_size(origen)) > px else []
    subprocess.run(
        ["sips", *resize, "-s", "format", "jpeg", "-s", "formatOptions", str(calidad), origen, "--out", destino],
        check=True,
        capture_output=True,
    )


def sips_size(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path], check=True, capture_output=True, text=True).stdout
    w = int(re.search(r"pixelWidth: (\d+)", out).group(1))
    h = int(re.search(r"pixelHeight: (\d+)", out).group(1))
    return w, h


def leer_manifest(public_url, prefix):
    url = f"{public_url.rstrip('/')}/{prefix}/manifest.json"
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"Cache-Control": "no-cache"}), timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return {"actualizado": "", "dias": {}}
        raise


def guardar_manifest(r2, prefix, manifest):
    manifest["actualizado"] = datetime.datetime.now().isoformat(timespec="seconds")
    r2.put(
        f"{prefix}/manifest.json",
        json.dumps(manifest, ensure_ascii=False, indent=1).encode(),
        "application/json; charset=utf-8",
        cache="no-cache, max-age=0",
    )


# ───────────────────────── comandos ─────────────────────────
def verificar(cfg):
    r2 = R2(cfg)
    try:
        status, _ = r2.request("GET", query={"list-type": "2", "max-keys": "1"})
        print(f"✓ Conexión con el bucket '{cfg['bucket']}' OK (HTTP {status}).")
    except urllib.error.HTTPError as e:
        sys.exit(f"✗ Cloudflare respondió {e.code}: {e.read().decode()[:300]}\nRevisá account_id, las claves y el nombre del bucket.")
    for slug, g in cfg.get("galerias", {}).items():
        m = leer_manifest(cfg["public_url"], g["prefix"])
        n = sum(len(d.get("fotos", [])) for d in m.get("dias", {}).values())
        print(f"  · {slug}: {n} fotos publicadas")


def subir(cfg, slug, dia, carpeta, con_zip=False, portada=None):
    if slug not in cfg.get("galerias", {}):
        sys.exit(f"La galería '{slug}' no está en {CONFIG}.")
    if not re.fullmatch(r"[a-z0-9-]+", dia):
        sys.exit("El día tiene que ser algo como dia-1, dia-2…")
    carpeta = os.path.expanduser(carpeta)
    archivos = sorted(f for f in os.listdir(carpeta) if f.lower().endswith(EXTS) and not f.startswith("."))
    if not archivos:
        sys.exit(f"No encontré JPG en {carpeta}.")

    r2 = R2(cfg)
    prefix = cfg["galerias"][slug]["prefix"]
    manifest = leer_manifest(cfg["public_url"], prefix)
    dia_m = manifest.setdefault("dias", {}).setdefault(dia, {"fotos": []})
    ya = {f["f"] for f in dia_m["fotos"]}
    nuevas = [a for a in archivos if f"{dia}/{nombre_seguro(a)}" not in ya]
    print(f"{len(archivos)} fotos en la carpeta · {len(nuevas)} nuevas para subir a {slug}/{dia}")

    tmp = tempfile.mkdtemp(prefix="galeria-")

    def procesar(nombre):
        origen = os.path.join(carpeta, nombre)
        seguro = nombre_seguro(nombre)
        clave = f"{dia}/{seguro}"
        web = os.path.join(tmp, "w-" + seguro)
        thumb = os.path.join(tmp, "t-" + seguro)
        sips_resize(origen, web, WEB_PX, 82)
        sips_resize(origen, thumb, THUMB_PX, 72)
        w, h = sips_size(web)
        with open(thumb, "rb") as fh:
            r2.put(f"{prefix}/thumb/{clave}", fh.read(), "image/jpeg")
        with open(web, "rb") as fh:
            r2.put(f"{prefix}/web/{clave}", fh.read(), "image/jpeg")
        with open(origen, "rb") as fh:
            r2.put(f"{prefix}/full/{clave}", fh.read(), "image/jpeg", disposition=f'attachment; filename="{seguro}"')
        os.remove(web)
        os.remove(thumb)
        return {"f": clave, "w": w, "h": h}

    hechas, errores = [], []
    with ThreadPoolExecutor(max_workers=6) as pool:
        futuros = {pool.submit(procesar, n): n for n in nuevas}
        for i, fut in enumerate(as_completed(futuros), 1):
            nombre = futuros[fut]
            try:
                hechas.append(fut.result())
                print(f"  [{i}/{len(nuevas)}] {nombre}")
            except Exception as e:  # noqa: BLE001
                errores.append(nombre)
                print(f"  ✗ {nombre}: {e}")

    dia_m["fotos"] = sorted(dia_m["fotos"] + hechas, key=lambda f: f["f"])
    if portada:
        manifest["portada"] = f"{dia}/{nombre_seguro(portada)}"

    if con_zip and archivos:
        print("Armando el .zip del día…")
        zpath = os.path.join(tmp, f"{dia}.zip")
        with zipfile.ZipFile(zpath, "w", zipfile.ZIP_STORED) as z:
            for a in archivos:
                z.write(os.path.join(carpeta, a), nombre_seguro(a))
        nombre_zip = f"{slug}-{dia}.zip"
        with open(zpath, "rb") as fh:
            r2.put(f"{prefix}/zips/{nombre_zip}", fh.read(), "application/zip",
                   cache="no-cache, max-age=0", disposition=f'attachment; filename="{nombre_zip}"')
        dia_m["zip"] = f"zips/{nombre_zip}"
        os.remove(zpath)
        print(f"  ✓ zip subido ({len(archivos)} fotos)")

    guardar_manifest(r2, prefix, manifest)
    total = sum(len(d.get("fotos", [])) for d in manifest["dias"].values())
    print(f"\n✓ Listo: {len(hechas)} fotos nuevas en {dia}. La galería tiene {total} fotos.")
    if errores:
        print(f"⚠ {len(errores)} fotos fallaron. Volvé a correr el mismo comando para reintentarlas: {', '.join(errores[:5])}")
    if cfg.get("sitio"):
        print(f"Galería: {cfg['sitio'].rstrip('/')}/galeria/{slug}")


def main():
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help"):
        print(__doc__)
        return
    cfg = cargar_config()
    if args[0] == "verificar":
        verificar(cfg)
        return
    if len(args) < 3:
        sys.exit("Uso: python3 subir.py <galeria> <dia> <carpeta> [--zip] [--portada NOMBRE.jpg]")
    portada = None
    if "--portada" in args:
        i = args.index("--portada")
        portada = args[i + 1]
    subir(cfg, args[0], args[1], args[2], con_zip="--zip" in args, portada=portada)


if __name__ == "__main__":
    main()
