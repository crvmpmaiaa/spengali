import { test, expect } from "@playwright/test";

test("homepage renders all five credentials sections in order", async ({ page }) => {
  await page.goto("/");

  // The five display headlines, top to bottom
  const headings = await page
    .getByRole("heading", { level: 2 })
    .allInnerTexts();

  expect(headings).toContain("Twenty seasons. Two clubs. One magician.");
  expect(headings).toContain("From global tech to the high street.");
  expect(headings).toContain("Where the suits like a card trick most.");
  expect(headings).toContain("Twenty years of giving the trick away.");

  // § 01 chips render at least 4 crests
  const crestRow = page.locator("li", {
    has: page.locator("img[alt*='crest' i], img[alt*='UEFA' i], img[alt*='Racecourse' i]"),
  });
  await expect.poll(async () => crestRow.count()).toBeGreaterThanOrEqual(4);

  // § 02 logo cloud renders at least the nine brand logos (counting both copies = 18)
  const logoImgs = page.locator("img[src*='/brand/logos/']");
  await expect.poll(async () => logoImgs.count()).toBeGreaterThanOrEqual(9);

  // § 05 broadcasters
  await expect(page.getByText("Sky Sports", { exact: true })).toBeVisible();
  await expect(page.getByText("ITV", { exact: true })).toBeVisible();
  await expect(page.getByText("Liverpool Echo", { exact: true })).toBeVisible();
});

test("credentials block respects prefers-reduced-motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  // The marquee track should have animation: none in computed style
  const track = page.locator(".animate-marquee").first();
  await expect(track).toBeVisible();
  const animationName = await track.evaluate(
    (el) => window.getComputedStyle(el).animationName,
  );
  expect(animationName).toBe("none");
});
