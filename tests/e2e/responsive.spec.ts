import { expect, test } from "@playwright/test";

const viewports = [
  { width: 2560, height: 720 },
  { width: 1920, height: 540 },
  { width: 1366, height: 768 },
  { width: 1280, height: 600 },
  { width: 844, height: 390 },
  { width: 667, height: 375 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
];

for (const viewport of viewports) {
  test(`all section content is reachable at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    for (const locale of ["es", "en"]) {
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      for (const id of ["inicio", "servicios", "proyectos", "filosofia", "contacto"]) {
        const panel = page.locator(`#${id}`);
        await panel.evaluate((element) => {
          const main = element.closest<HTMLElement>(".snap-page")!;
          main.scrollTo({ top: (element as HTMLElement).offsetTop, behavior: "instant" });
        });
        const bounds = await panel.evaluate((element) => {
          const section = element.getBoundingClientRect();
          const content = element.querySelector(".section-panel-content")!.getBoundingClientRect();
          const nav = document.querySelector("nav")!.getBoundingClientRect();
          return {
            topClearance: content.top - nav.bottom,
            bottomClearance: section.bottom - content.bottom,
            left: content.left,
            right: content.right,
          };
        });
        expect(bounds.topClearance, `${locale}/${id}: below navbar`).toBeGreaterThanOrEqual(12);
        expect(bounds.bottomClearance, `${locale}/${id}: no clipped content`).toBeGreaterThanOrEqual(0);
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(viewport.width);
        if (id === "servicios" && viewport.width < 768) {
          const numbersFit = await panel.locator(".group\\/cards p").evaluateAll((numbers) => numbers.every((el) => {
            const number = el.getBoundingClientRect();
            const card = el.parentElement!.getBoundingClientRect();
            return number.top >= card.top && number.bottom <= card.bottom;
          }));
          expect(numbersFit).toBe(true);
        }

        if (locale === "es" && [1920, 844, 390].includes(viewport.width)) {
          await page.screenshot({ path: testInfo.outputPath(`${id}.png`) });
        }
        const lastControl = panel.locator(".section-panel-content a, .section-panel-content button").last();
        await lastControl.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
        await expect(lastControl).toBeInViewport({ ratio: 1 });
      }
      expect(await page.locator(".snap-page").evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
  });
}

test("short screens scroll through content and restore section navigation after resizing", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop wheel and keyboard input");
  await page.setViewportSize({ width: 1920, height: 400 });
  await page.goto("/es#contacto");
  const main = page.locator(".snap-page");
  await expect(main).toHaveAttribute("data-scroll-mode", "native");
  const before = await main.evaluate((el) => el.scrollTop);
  await page.mouse.move(1000, 250);
  await page.mouse.wheel(0, 140);
  await expect.poll(() => main.evaluate((el) => el.scrollTop)).toBeGreaterThan(before + 50);
  await page.keyboard.press("End");
  await expect(page.locator("#contacto .section-panel-content a").last()).toBeInViewport({ ratio: 1 });

  await page.setViewportSize({ width: 1920, height: 1200 });
  await expect(main).toHaveAttribute("data-scroll-mode", "sections");
  await page.locator("nav").getByRole("link", { name: "Inicio", exact: true }).click();
  await page.mouse.move(1000, 600);
  // Wait for the existing gesture cooldown after using the navbar.
  await page.waitForTimeout(1400);
  await page.mouse.wheel(0, 140);
  await expect.poll(() => page.locator("#servicios").evaluate((el) => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(3);
});

test("mobile menu can reach its last link in landscape", async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 280 });
  await page.goto("/es");
  await page.locator("button[aria-controls='mobile-navigation']").click();
  const contact = page.locator("#mobile-navigation").getByRole("link", { name: "Contacto", exact: true });
  await contact.scrollIntoViewIfNeeded();
  await expect(contact).toBeInViewport({ ratio: 1 });
  await contact.click();
  await expect(page).toHaveURL(/#contacto$/);
});

test("landscape touch gestures scroll the final section", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Touch input only");
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/es#contacto");
  const main = page.locator(".snap-page");
  await expect(main).toHaveAttribute("data-scroll-mode", "native");
  const before = await main.evaluate((el) => el.scrollTop);
  const session = await page.context().newCDPSession(page);
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 420, y: 340 }] });
  for (const y of [310, 270, 230, 190, 150]) {
    await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 420, y }] });
  }
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => main.evaluate((el) => el.scrollTop)).toBeGreaterThan(before + 50);
  await session.detach();
});

test("standalone contact card scrolls without clipping at short and narrow sizes", async ({ page }) => {
  for (const viewport of [{ width: 1920, height: 400 }, { width: 844, height: 390 }, { width: 320, height: 568 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/es/tarjeta");
    const lastLink = page.locator("main a").last();
    await lastLink.scrollIntoViewIfNeeded();
    await expect(lastLink).toBeInViewport({ ratio: 1 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
