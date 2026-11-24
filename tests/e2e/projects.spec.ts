import { expect, test } from "@playwright/test";

test("cursor changes the view smoothly and rear project images remain double-sided", async ({ page, isMobile }, testInfo) => {
  test.skip(isMobile, "Mouse parallax applies to desktop pointers");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/es#proyectos");
  const stage = page.locator(".orbit-stage");
  await stage.scrollIntoViewIfNeeded();
  const bounds = await stage.boundingBox();
  const axis = page.locator(".orbit-axis");
  await page.mouse.move(bounds!.x + bounds!.width * 0.12, bounds!.y + bounds!.height * 0.2);
  await expect.poll(() => axis.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m41)).toBeGreaterThan(12);
  await page.mouse.move(bounds!.x + bounds!.width * 0.88, bounds!.y + bounds!.height * 0.7);
  await expect.poll(() => axis.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m41)).toBeLessThan(-12);
  const rear = page.locator(".orbit-tile").nth(10).locator("img");
  await expect(rear).toHaveCSS("backface-visibility", "visible");
  await expect.poll(() => rear.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect.poll(() => rear.evaluate((image) => Number(getComputedStyle(image.parentElement!).opacity))).toBeLessThan(0.08);
  await expect.poll(() => rear.evaluate((image) => parseFloat(getComputedStyle(image).filter.match(/blur\(([\d.]+)px\)/)?.[1] ?? "0"))).toBeGreaterThan(8);
  await page.screenshot({ path: testInfo.outputPath("orbit-cursor-right.png") });
  await page.locator("nav").hover();
  await expect.poll(() => axis.evaluate((element) => Math.abs(new DOMMatrix(getComputedStyle(element).transform).m41))).toBeLessThan(1);
  await page.mouse.move(bounds!.x + bounds!.width * 0.5, bounds!.y + bounds!.height * 0.5);
  const ring = page.locator(".orbit-ring");
  const before = await ring.evaluate((element) => getComputedStyle(element).transform);
  await expect.poll(() => ring.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before);
});

test("reduced motion keeps the camera still when moving the cursor", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mouse parallax applies to desktop pointers");
  await page.goto("/es#proyectos");
  const stage = page.locator(".orbit-stage");
  await stage.scrollIntoViewIfNeeded();
  const bounds = await stage.boundingBox();
  const axis = page.locator(".orbit-axis");
  await page.mouse.move(bounds!.x + bounds!.width * 0.9, bounds!.y + bounds!.height * 0.3);
  await expect.poll(() => axis.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m41)).toBe(0);
});

test("project grows into detail, reveals story on scroll and keeps the background still", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/es#proyectos");
  const opener = page.locator('.orbit-tile button:not([aria-hidden])').first();
  await opener.focus();
  await opener.press("Enter");
  const detail = page.getByRole("dialog");
  await expect(detail).toHaveAccessibleName("Acrodata");
  await expect(detail.locator(".project-detail.is-ready")).toBeVisible();
  await expect(detail.locator(".project-flying-image")).toBeHidden();
  const image = await detail.locator(".project-detail-image").boundingBox();
  const heading = await detail.locator("h2").boundingBox();
  expect(image && heading).toBeTruthy();
  if (isMobile) expect(image!.y).toBeGreaterThan(heading!.y);
  else expect(image!.x).toBeGreaterThan(heading!.x + heading!.width);
  const before = await page.locator(".snap-page").evaluate((el) => el.scrollTop);
  const paragraph = detail.locator(".project-detail-story p").first();
  await paragraph.scrollIntoViewIfNeeded();
  await expect(paragraph).toHaveCSS("opacity", "1");
  expect(await page.locator(".snap-page").evaluate((el) => el.scrollTop)).toBe(before);
  await expect(detail.getByRole("link", { name: "Visitar la web" })).toHaveAttribute("href", "https://www.acroyogadata.com.ar/");
  await page.keyboard.press("Escape");
  await expect(detail).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.locator(".snap-page")).not.toHaveCSS("overflow", "hidden");
  expect(errors).toEqual([]);
});

test("new projects show the supplied image without invented details", async ({ page }) => {
  await page.goto("/en#proyectos");
  const opener = page.getByRole("button", { name: "KIM: Digital project", exact: true });
  await opener.focus();
  await opener.press("Enter");
  const detail = page.getByRole("dialog");
  await expect(detail).toHaveAccessibleName("KIM");
  await expect(detail.locator(".project-content-pending")).toHaveText("More about this project coming soon.");
  await expect(detail.getByRole("link")).toHaveCount(0);
  await detail.getByRole("button", { name: "Close", exact: true }).click();
  await expect(opener).toBeFocused();
});
