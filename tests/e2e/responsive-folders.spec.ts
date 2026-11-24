import { expect, test } from "@playwright/test";

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 540 },
  { width: 844, height: 390 },
  { width: 540, height: 1200 },
]) {
  test(`folders stay reachable without horizontal scrolling at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/es#inicio");
    for (let index = 0; index < 5; index++) {
      await page.locator(".deck-tab-label").nth(index).click();
      const sheet = page.locator(".deck-sheet").nth(index);
      await expect(sheet).toHaveClass(/is-active/);
      await expect.poll(() => sheet.locator(".deck-sheet-content").evaluate((element) =>
        element.scrollWidth <= element.clientWidth + 1 && document.documentElement.scrollWidth <= innerWidth,
      )).toBe(true);
    }
    if (viewport.width <= 767) {
      await page.locator(".deck-tab-label").first().click();
      await expect(page.locator("#inicio .brand-mobile")).toBeVisible();
      await expect(page.locator("#inicio .brand-desktop")).toBeHidden();
    }
  });
}
