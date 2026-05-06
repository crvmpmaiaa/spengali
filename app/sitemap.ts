import type { MetadataRoute } from "next";
import { WORK } from "@/lib/work-data";

const BASE = "https://spencerlynch.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const workEntries = WORK.map((w) => ({
    url: `${BASE}/work/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/book`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    ...workEntries,
  ];
}
