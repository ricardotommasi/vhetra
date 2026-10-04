import { expect, test } from "@playwright/test";

test("localized routes render after the dependency upgrade", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/es", "/en", "/es/tarjeta", "/en/tarjeta"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", route.split("/")[1]);
  }
  expect(errors).toEqual([]);
});

test("Space activates service cards; dialogs keep focus and restore it", async ({ page }) => {
  await page.goto("/es");
  const card = page.locator("#servicios button").first();
  await card.focus();
  await page.keyboard.press("Space");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("AUTOMATIZACIONES");
  const close = dialog.getByRole("button", { name: "Cerrar", exact: true });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "CONTACTAR", exact: true })).toBeFocused();
  const before = await page.locator(".snap-page").evaluate((el) => el.scrollTop);
  await page.keyboard.press("PageDown");
  expect(await page.locator(".snap-page").evaluate((el) => el.scrollTop)).toBe(before);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(card).toBeFocused();
  await card.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("dialog").getByRole("button", { name: "Cerrar", exact: true }).click();
  await expect(card).toBeFocused();
  await expect(page.locator(".snap-page")).not.toHaveCSS("overflow", "hidden");
});

test("project dialog closes from the backdrop and restores focus", async ({ page }) => {
  await page.goto("/es");
  const card = page.locator("#proyectos [data-project-card] button").first();
  await card.focus();
  await card.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
});

test("section keyboard navigation respects modifiers and editable controls", async ({ page }) => {
  await page.goto("/es");
  // Move focus away from navigation before exercising page-level keyboard handling.
  await page.locator("nav a").filter({ visible: true }).first().focus();
  await page.evaluate(() => {
    const main = document.querySelector<HTMLElement>(".snap-page")!;
    const panel = document.querySelector<HTMLElement>("#servicios")!;
    main.style.scrollBehavior = "auto";
    panel.style.scrollBehavior = "auto";
    main.scrollTop = panel.offsetTop;
    panel.scrollTop = 0;
    (document.activeElement as HTMLElement).blur();
  });
  await page.keyboard.press("Shift+Space");
  await expect.poll(() => page.locator(".snap-page").evaluate((el) => el.scrollTop)).toBe(0);
  const results = await page.evaluate(() => {
    const main = document.querySelector<HTMLElement>(".snap-page")!;
    const input = document.createElement("input");
    main.append(input);
    const key = new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true });
    input.dispatchEvent(key);
    const zoom = new WheelEvent("wheel", { ctrlKey: true, deltaY: 100, bubbles: true, cancelable: true });
    main.dispatchEvent(zoom);
    input.remove();
    return { inputPrevented: key.defaultPrevented, zoomPrevented: zoom.defaultPrevented };
  });
  expect(results).toEqual({ inputPrevented: false, zoomPrevented: false });
});

test("closed mobile menu is inert, Escape restores the toggle", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation only");
  await page.goto("/es");
  const toggle = page.locator("button[aria-controls='mobile-navigation']");
  const menu = page.locator("#mobile-navigation");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await menu.locator("a").first().evaluate((el: HTMLElement) => el.focus());
  await expect(menu.locator("a").first()).not.toBeFocused();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await menu.locator("a").first().focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await menu.getByRole("link", { name: "Servicios", exact: true }).click();
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
