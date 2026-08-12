import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/the-vault"] },
    sitemap: "https://howdidhedothat.co.uk/sitemap.xml",
  };
}
