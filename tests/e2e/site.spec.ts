import { expect, test } from "@playwright/test";

test("orbit exposes ten projects and wraps with the keyboard", async ({ page }) => {
  await page.goto("/es#proyectos");
  const orbit = page.locator(".orbit-stage");
  await expect(orbit.getByRole("button")).toHaveCount(10);
  const caption = page.locator(".orbit-caption");
  await expect(caption).toContainText("Acrodata");
  await orbit.getByRole("button").first().focus();
  await page.keyboard.press("ArrowLeft");
  await expect(caption).toContainText("Las Tortas de Pancho");
  await page.keyboard.press("ArrowRight");
  await expect(caption).toContainText("Acrodata");
  expect(await page.locator("[id]").evaluateAll((elements) => {
    const ids = elements.map((element) => element.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  })).toEqual([]);
});

test("section links update URL and browser history", async ({ page, isMobile }) => {
  await page.goto("/es");
  for (const [label, id] of [["Servicios", "servicios"], ["Proyectos", "proyectos"]]) {
    if (isMobile) await page.locator("button[aria-controls='mobile-navigation']").click();
    await page.locator("nav").getByRole("link", { name: label, exact: true }).filter({ visible: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
  }
  await page.goBack();
  await expect(page).toHaveURL(/#servicios$/);
  await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector<HTMLElement>(".snap-page")!.scrollTop - document.querySelector<HTMLElement>("#servicios")!.offsetTop))).toBeLessThan(3);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector<HTMLElement>(".snap-page")!.scrollTop - document.querySelector<HTMLElement>("#servicios")!.offsetTop))).toBeLessThan(3);
});

test("contact pages include complete social metadata", async ({ page }) => {
  for (const locale of ["es", "en"]) {
    await page.goto(`/${locale}/tarjeta`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://vhetra.com.ar/og-image.jpg");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `https://vhetra.com.ar/${locale}/tarjeta`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://vhetra.com.ar/${locale}/tarjeta`);
  }
});

test("reduced motion uses the poster without downloading video", async ({ page }) => {
  const videos: string[] = [];
  page.on("request", (request) => { if (request.url().includes("hero-bg.mp4")) videos.push(request.url()); });
  await page.goto("/es");
  await expect(page.locator('#inicio img')).toBeVisible();
  await page.locator('#servicios button').first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("video")).toHaveCount(0);
  expect(videos).toEqual([]);
});

test("short viewports retain navbar clearance and assets revalidate", async ({ page, request }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/es");
  await expect.poll(() => page.evaluate(() => {
    const panel = document.querySelector<HTMLElement>("#inicio")!;
    const nav = document.querySelector("nav")!;
    return parseFloat(getComputedStyle(panel).paddingTop) - nav.getBoundingClientRect().bottom;
  })).toBeGreaterThanOrEqual(15);
  const image = await request.get("/services/texture-pebbled-640.webp");
  expect(image.status()).toBe(200);
  expect(image.headers()["cache-control"]).not.toContain("immutable");
  expect(image.headers()["cache-control"]).toContain("must-revalidate");
});

test("video readiness events cannot restart playback outside the hero", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/es");
  const video = page.locator("video");
  await expect(video).toHaveCount(1);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);
  // Use a direct link to a distant section so that the hero leaves the viewport.
  await page.evaluate(() => { window.location.hash = "contacto"; });
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await video.evaluate((element) => element.dispatchEvent(new Event("canplay")));
  expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
});

test("responsive layouts retain their content", async ({ page }, testInfo) => {
  await page.goto("/es#servicios");
  await expect(page.locator('#servicios button')).toHaveCount(3);
  await page.screenshot({ path: testInfo.outputPath("services.png") });
  await page.goto("/es/tarjeta");
  await expect(page.getByText("Hacemos webs que dan ganas de explorar.", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("contact-card.png"), fullPage: true });
});
