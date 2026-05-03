import { test, expect } from "@playwright/test";

test("homepage renders unified credentials section with logo marquee + paragraphs", async ({ page }) => {
  await page.goto("/");

  // Headline copy
  await expect(
    page.getByRole("heading", {
      name: /Two Premier League clubs.*The world's most discerning rooms/i,
    }),
  ).toBeVisible();

  // Marquee renders both crests AND corporate logos in the slider
  const crestImgs = page.locator("img[src*='/brand/crests/']");
  const logoImgs = page.locator("img[src*='/brand/logos/']");
  await expect.poll(async () => crestImgs.count()).toBeGreaterThanOrEqual(5);
  await expect.poll(async () => logoImgs.count()).toBeGreaterThanOrEqual(9);

  // Paragraph proof points (a sampling of names that must appear in copy)
  await expect(page.getByText(/Liverpool FC since 2006/i)).toBeVisible();
  await expect(page.getByText(/LFC Foundation/i)).toBeVisible();
  await expect(page.getByText(/players.{0,5}families/i)).toBeVisible();
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
