import { expect, test } from "@playwright/test";

test("service collage opens three matching dialogs with working contact actions", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.open = (url) => {
      document.documentElement.dataset.contactUrl = String(url);
      return null;
    };
  });
  await page.goto("/es#servicios");
  const section = page.locator("#servicios");
  await expect(section.getByRole("button")).toHaveCount(3);
  await expect(section.locator(".services-texture img")).toHaveCount(5);
  await page.screenshot({ path: testInfo.outputPath("services-collage.png") });
  for (const label of ["AUTOMATIZACIONES", "WEBS", "SISTEMAS"]) {
    const opener = section.getByRole("button", { name: label, exact: true });
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveAccessibleName(label);
    await expect(dialog.locator("li")).toHaveCount(3);
    await expect(dialog.locator(".service-grid-modal")).toHaveCSS("background-color", "rgb(16, 16, 16)");
    await dialog.getByRole("button", { name: "CONTACTAR", exact: true }).click();
    await expect.poll(() => page.locator("html").getAttribute("data-contact-url")).toContain(encodeURIComponent(label));
    if (label === "AUTOMATIZACIONES") await page.screenshot({ path: testInfo.outputPath("service-dialog.png") });
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
  }
  expect(errors).toEqual([]);
});

test("collage labels and dialogs fit narrow and short screens in both languages", async ({ page }) => {
  for (const size of [{ width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(size);
    for (const locale of ["es", "en"]) {
      await page.goto(`/${locale}#servicios`);
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator("#servicios");
      const labelsFit = await section.locator(".services-word").evaluateAll((buttons) => buttons.every((button) => {
        const bounds = button.getBoundingClientRect();
        const title = button.firstElementChild!.getBoundingClientRect();
        return title.left >= bounds.left && title.right <= bounds.right && button.scrollWidth <= button.clientWidth;
      }));
      expect(labelsFit).toBe(true);
      await section.getByRole("button").last().click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      const contact = dialog.locator(".service-grid-modal-footer button");
      await expect(contact).toBeInViewport({ ratio: 1 });
      expect(await dialog.evaluate((element) => element.scrollWidth <= innerWidth)).toBe(true);
      await page.keyboard.press("Escape");
    }
  }
});
