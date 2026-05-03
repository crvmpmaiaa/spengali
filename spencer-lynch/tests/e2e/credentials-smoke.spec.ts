import { test, expect } from "@playwright/test";

test("homepage renders unified credentials section with logo cloud + paragraphs", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Two Premier League clubs.*The world's most discerning rooms/i,
    }),
  ).toBeVisible();

  // The 21st.dev LogoCloud renders <img> elements directly (not next/image),
  // so each logo's src appears as a literal /brand/... path.
  const crestImgs = page.locator("img[src*='/brand/crests/']");
  const corporateImgs = page.locator("img[src*='/brand/logos/']");
  const charityImgs = page.locator("img[src*='/brand/charities/']");
  await expect.poll(async () => crestImgs.count()).toBeGreaterThanOrEqual(5);
  await expect.poll(async () => corporateImgs.count()).toBeGreaterThanOrEqual(9);
  await expect.poll(async () => charityImgs.count()).toBeGreaterThanOrEqual(3);

  await expect(page.getByText(/Liverpool FC since 2006/i)).toBeVisible();
  await expect(page.getByText(/LFC Foundation/i)).toBeVisible();
  await expect(page.getByText(/players.{0,5}families/i)).toBeVisible();
});
