// spencer-lynch/tests/e2e/homepage-smoke.spec.ts
import { test, expect } from "@playwright/test";

test("homepage renders hero copy + cinema frame + footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /how did he do that/i,
  );
  // Cinema frame iframe is present (or poster fallback if reduced motion)
  const hasIframe = await page.locator("iframe[src*='player.vimeo.com']").count();
  const hasPoster = await page.getByRole("link", { name: /watch on vimeo/i }).count();
  expect(hasIframe + hasPoster).toBeGreaterThan(0);
  // Footer is mounted (its "It all starts with a chat" headline is the marker)
  await expect(page.getByRole("heading", { name: /it all starts with a chat/i })).toBeVisible();
});

test("/book page renders enquiry form with all fields", async ({ page }) => {
  await page.goto("/book");
  await expect(page.getByLabel(/name/i)).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/event date/i)).toBeVisible();
  await expect(page.getByLabel(/event type/i)).toBeVisible();
  await expect(page.getByLabel(/location/i)).toBeVisible();
  await expect(page.locator("form").getByLabel(/message/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /send enquiry/i })).toBeVisible();
});

test("client validation blocks an empty enquiry submission", async ({ page }) => {
  await page.goto("/book");
  // Attach the request listener BEFORE clicking — otherwise a synchronous
  // request would fire before the listener attaches and we'd miss it.
  let requestedEnquiry = false;
  page.on("request", (r) => {
    if (r.url().includes("/api/enquiry")) requestedEnquiry = true;
  });
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await page.waitForTimeout(500);
  expect(requestedEnquiry).toBe(false);
});
