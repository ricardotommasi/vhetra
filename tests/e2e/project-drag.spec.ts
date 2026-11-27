import { expect, test } from "@playwright/test";

test.use({ hasTouch: true });

for (const input of ["touch", "mouse"] as const) {
  for (const origin of ["card", "background"] as const) {
    test(`${input} drag from ${origin} keeps rotating and does not open a project`, async ({ page, context }) => {
      await page.goto("/es#proyectos");
      const stage = page.locator(".orbit-stage");
      const ring = page.locator(".orbit-ring");
      const card = page.locator('.orbit-tile button:not([aria-hidden])').first();
      await card.focus();
      await stage.scrollIntoViewIfNeeded();
      const bounds = await (origin === "card" ? card : stage).boundingBox();
      expect(bounds).not.toBeNull();
      const x = bounds!.x + bounds!.width / 2;
      const y = bounds!.y + bounds!.height * (origin === "card" ? 0.5 : 0.9);
      expect(await page.evaluate(({ x, y, origin }) => {
        const target = document.elementFromPoint(x, y);
        return origin === "card" ? !!target?.closest(".orbit-tile button") : target?.matches(".orbit-stage");
      }, { x, y, origin })).toBe(true);

      const session = input === "touch" ? await context.newCDPSession(page) : null;
      if (session) {
        await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
      } else {
        await page.mouse.move(x, y);
        await page.mouse.down();
      }

      for (const distance of [30, 70, 110]) {
        const before = await ring.evaluate((element) => element.style.transform);
        if (session) {
          await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - distance, y }] });
        } else {
          await page.mouse.move(x - distance, y);
        }
        await expect.poll(() => ring.evaluate((element) => element.style.transform)).not.toBe(before);
      }

      if (session) {
        await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        await session.detach();
      } else {
        await page.mouse.up();
      }
      await expect(page.getByRole("dialog")).toHaveCount(0);

      // Tap a card at its new position, accounting for overlapping 3D tiles.
      const target = await stage.evaluate((element) => {
        const stageBounds = element.getBoundingClientRect();
        for (const button of element.querySelectorAll(".orbit-tile button")) {
          const bounds = button.getBoundingClientRect();
          const x = bounds.x + bounds.width / 2;
          const y = bounds.y + bounds.height / 2;
          if (x < stageBounds.left || x > stageBounds.right || y < stageBounds.top || y > stageBounds.bottom) continue;
          const hit = document.elementFromPoint(x, y)?.closest(".orbit-tile button");
          if (hit) return { x, y, title: hit.getAttribute("aria-label")!.split(":")[0] };
        }
        return null;
      });
      expect(target).not.toBeNull();
      if (input === "touch") await page.touchscreen.tap(target!.x, target!.y);
      else await page.mouse.click(target!.x, target!.y);
      await expect(page.getByRole("dialog")).toHaveAccessibleName(target!.title);
    });
  }
}
