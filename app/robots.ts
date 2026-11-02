import type { MetadataRoute } from "next";
import { site } from "@/lib/content.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/galeria/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
