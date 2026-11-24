import { expect, test } from "@playwright/test";

test("contact keeps its three destinations in the new editorial layout", async ({ page }, testInfo) => {
  await page.goto("/es#contacto");
  const section = page.locator("#contacto");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText("hablemos.");
  const links = section.locator(".contact-editorial-link");
  await expect(links).toHaveCount(3);
  await expect(links.nth(0)).toHaveAttribute("href", "https://www.instagram.com/holavhetra/");
  await expect(links.nth(1)).toHaveAttribute("href", "mailto:hola.vhetra@gmail.com");
  await expect(links.nth(2)).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=/);
  const whatsapp = new URL((await links.nth(2).getAttribute("href"))!);
  expect(whatsapp.searchParams.get("text")).toBe("Hola !\nTe contacto desde la web de VHETRA.");
  await expect(links.nth(2)).toHaveAttribute("rel", "noopener noreferrer");
  await links.first().focus();
  await page.keyboard.press("Tab");
  await expect(links.nth(1)).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(links.last()).toBeFocused();
  await page.screenshot({ path: testInfo.outputPath("contact-editorial.png") });
});

test("all contact channels remain reachable at narrow and short sizes", async ({ page }) => {
  for (const viewport of [{ width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    for (const locale of ["es", "en"]) {
      await page.goto(`/${locale}#contacto`);
      const section = page.locator("#contacto");
      await page.evaluate(() => document.fonts.ready);
      for (const link of await section.locator(".contact-editorial-link").all()) {
        await link.scrollIntoViewIfNeeded();
        await expect(link).toBeInViewport({ ratio: 1 });
        expect(await link.evaluate((element) => {
          const bounds = element.getBoundingClientRect();
          return Array.from(element.children).every((child) => {
            const content = child.getBoundingClientRect();
            return content.left >= bounds.left && content.right <= bounds.right;
          });
        })).toBe(true);
      }
      expect(await section.evaluate((element) => element.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});
