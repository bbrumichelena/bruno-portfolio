# Galerías privadas de fotos

Página privada con contraseña en `tusitio/galeria/<slug>`. Las fotos viven en Cloudflare R2 y se suben con `subir.py`. Para sumar fotos no hace falta publicar el sitio.

## Configuración (una sola vez)

### 1. Cloudflare R2
1. En el panel de Cloudflare, entrá a **R2** y activalo. Te va a pedir un medio de pago, pero los primeros 10 GB son gratis y la descarga no se cobra.
2. Creá un bucket llamado **`bruno-galerias`**.
3. En el bucket, andá a **Settings → Public Development URL → Enable**. Copiá la URL (`https://pub-….r2.dev`).
4. En **R2 → Manage API tokens → Create API token**:
   - Permiso: **Object Read & Write**
   - Bucket: solo `bruno-galerias`
   - Copiá el **Access Key ID**, el **Secret Access Key** y tu **Account ID** (está en la URL del endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`).

### 2. En la MacBook (la que llevás al viaje)
1. Copiá esta carpeta (`scripts/galeria`) a la MacBook, por ejemplo con AirDrop, al Escritorio.
2. Creá el archivo de configuración:
   ```bash
   mkdir -p ~/.galerias && cp ~/Desktop/galeria/config.ejemplo.json ~/.galerias/config.json && open -e ~/.galerias/config.json
   ```
3. Completá `account_id`, `access_key_id`, `secret_access_key` y `public_url`. En `prefix` poné la carpeta secreta de la galería (la misma que va en Vercel).
4. Probá la conexión:
   ```bash
   python3 ~/Desktop/galeria/subir.py verificar
   ```
   Si macOS te pide instalar las "herramientas de línea de comandos", aceptá. Se instalan una sola vez.

### 3. En Vercel (Settings → Environment Variables)
| Variable | Valor |
|---|---|
| `GALERIAS_BASE_URL` | la URL pública de R2 (`https://pub-….r2.dev`) |
| `GALERIA_POLO_URUGUAY_PREFIX` | la carpeta secreta (la misma de `config.json`) |
| `GALERIA_POLO_URUGUAY_PASSWORD` | la contraseña que le pasás al cliente |

Después de cargarlas, volvé a publicar el sitio (Deployments → Redeploy).

## Cada noche

1. Exportá de Lightroom las fotos del día en JPG (calidad 85, lado largo de 4000 a 6000 px) a una carpeta, por ejemplo `~/Desktop/Exportadas/Dia1`.
2. Subilas:
   ```bash
   python3 ~/Desktop/galeria/subir.py polo-uruguay dia-1 ~/Desktop/Exportadas/Dia1
   ```
   - Los días son `dia-1`, `dia-2`, `dia-3` y `dia-4`.
   - Si al otro día sumás el resto de las fotos a la misma carpeta, corré el mismo comando: solo sube las nuevas.
   - Si se corta internet, volvé a correrlo: retoma desde donde quedó.
3. Opcional:
   - `--portada NOMBRE.jpg`: elige la foto de portada de la galería.
   - `--zip`: arma el botón "Descargar el día". Sube el día entero otra vez, así que conviene hacerlo al final, con buena conexión.

## Probar sin que lo vea el cliente
Usá un día que no existe en la página, por ejemplo `prueba`:
```bash
python3 ~/Desktop/galeria/subir.py polo-uruguay prueba ~/Desktop/fotos-de-prueba
```
Se sube a R2, pero la galería no lo muestra.

## Nueva galería para otro cliente
1. Agregala en `lib/galerias.ts`, con su slug, títulos y días.
2. Sumala a `~/.galerias/config.json` con un `prefix` secreto nuevo.
3. Cargá en Vercel `GALERIA_<SLUG>_PREFIX` y `GALERIA_<SLUG>_PASSWORD`.
