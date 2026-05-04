/**
 * Captures a snapshot of the homepage with the intro disabled, used as the
 * static backdrop behind the site-intro video. Run via:
 *   npx playwright test tests/scripts/capture-hero-snapshot.ts
 *
 * Saves to /public/intro/hero-snapshot.jpg.
 */
import { test } from "@playwright/test";

test("capture hero snapshot for site-intro backdrop", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.sessionStorage.setItem("sl-intro-seen", "1"));
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  await page.screenshot({
    path: "public/intro/hero-snapshot.jpg",
    fullPage: false,
    type: "jpeg",
    quality: 88,
  });
});
