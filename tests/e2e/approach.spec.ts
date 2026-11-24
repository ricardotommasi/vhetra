import { expect, test } from "@playwright/test";

test("right-hand approach dial selects each principle and supports the keyboard", async ({ page }, testInfo) => {
  await page.goto("/es#filosofia");
  const section = page.locator("#filosofia");
  const panel = section.getByRole("tabpanel");
  await expect(panel.getByRole("heading")).toHaveText("Claridad");
  for (const [number, title] of [["02", "Funcionalidad"], ["03", "Diseño con intención"], ["01", "Claridad"]]) {
    const tab = section.getByRole("tab", { name: `${number} ${title}` });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(panel.getByRole("heading")).toHaveText(title);
  }
  const first = section.getByRole("tab").first();
  await first.focus();
  await page.keyboard.press("ArrowDown");
  await expect(section.getByRole("tab").nth(1)).toBeFocused();
  await expect(panel.getByRole("heading")).toHaveText("Funcionalidad");
  const point = await section.locator(".approach-marker.is-active").evaluate((element) => element.getBoundingClientRect().x);
  expect(point).toBeGreaterThan((page.viewportSize()?.width ?? 0) / 2);
  await page.screenshot({ path: testInfo.outputPath("approach-dial.png") });
});

test("principles remain readable and selectable on narrow and short screens", async ({ page }) => {
  for (const viewport of [{ width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/en#filosofia");
    const section = page.locator("#filosofia");
    for (const tab of await section.getByRole("tab").all()) {
      await tab.click();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      const copy = await section.getByRole("tabpanel").boundingBox();
      expect(copy!.x).toBeGreaterThanOrEqual(0);
      expect(copy!.x + copy!.width).toBeLessThan(viewport.width);
    }
    const contact = section.locator(".approach-footer a");
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeInViewport({ ratio: 1 });
  }
});
