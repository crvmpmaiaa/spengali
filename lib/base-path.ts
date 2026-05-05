/** Prepend the Next.js basePath so raw <video>, <source>, etc. resolve correctly on GitHub Pages. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
