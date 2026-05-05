import { test, expect } from "@playwright/test";

test("/about renders Spencer Lynch heading", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /spencer lynch/i,
  );
  await expect(page.getByRole("link", { name: /book spencer/i })).toBeVisible();
});

test("/gallery has Vimeo iframe and photo grid", async ({ page }) => {
  await page.goto("/gallery");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /the work/i,
  );
  const iframe = page.locator("iframe[src*='vimeo.com']");
  await expect(iframe).toBeVisible();
  const photos = page.locator("img[alt*='Spencer Lynch']");
  expect(await photos.count()).toBeGreaterThan(0);
});

test("/the-vault shows decoy ? without localStorage key", async ({ page }) => {
  await page.goto("/the-vault");
  await page.evaluate(() => localStorage.removeItem("sl-vault-unlocked"));
  await page.reload();
  await expect(page.getByText("?")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /the vault/i }),
  ).toHaveCount(0);
});
