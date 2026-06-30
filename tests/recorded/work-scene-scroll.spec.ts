import { expect, test } from "@playwright/test";

type WorkSceneSample = {
  progress: number;
  cards: Array<{ i: number; opacity: number }>;
  active: string | null;
  visibleCount: number;
};

async function sampleWorkScene(page: import("@playwright/test").Page): Promise<WorkSceneSample> {
  return page.evaluate(() => {
    const track = document.querySelector(".rm-work-scene__track") as HTMLElement | null;
    const cards = Array.from(document.querySelectorAll(".rm-work-preview-card")).map((el, i) => ({
      i,
      opacity: Number.parseFloat(getComputedStyle(el).opacity),
    }));
    const active =
      document.querySelector('.rm-index__row[data-on="true"] .rm-index__name')?.textContent?.trim() ??
      null;
    const progress = track?.dataset.workProgress
      ? Number.parseFloat(track.dataset.workProgress)
      : 0;
    return {
      progress,
      cards,
      active,
      visibleCount: cards.filter((c) => c.opacity > 0.15).length,
    };
  });
}

async function scrollWorkSceneTo(page: import("@playwright/test").Page, fraction: number) {
  await page.evaluate((pct) => {
    const track = document.querySelector(".rm-work-scene__track") as HTMLElement | null;
    const sticky = document.querySelector(".rm-work-scene__sticky") as HTMLElement | null;
    if (!track || !sticky) return;
    const root = document.documentElement;
    const raw = getComputedStyle(root).getPropertyValue("--rm-header-offset").trim();
    const rootPx = Number.parseFloat(getComputedStyle(root).fontSize) || 16;
    const headerPx = raw.endsWith("rem")
      ? Number.parseFloat(raw) * rootPx
      : raw.endsWith("px")
        ? Number.parseFloat(raw)
        : 76;
    const scrollable = Math.max(1, track.offsetHeight - sticky.offsetHeight);
    const startY = window.scrollY + track.getBoundingClientRect().top - headerPx;
    window.scrollTo(0, startY + scrollable * pct);
    window.dispatchEvent(new Event("scroll"));
  }, fraction);
  await page.waitForTimeout(120);
}

test.describe("Work scene — sticky preview crossfade", () => {
  test.setTimeout(60_000);

  test("Tequila → Empresex → Progresivo sync with scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 870 });
    await page.goto("/#work");
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Three engagements/i })).toBeVisible();

    await page.evaluate(() => {
      const track = document.querySelector(".rm-work-scene__track");
      track?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(300);

    const start = await sampleWorkScene(page);
    expect(start.visibleCount).toBeGreaterThanOrEqual(1);
    expect(start.active).toMatch(/Tequila/i);
    expect(start.cards[0]?.opacity ?? 0).toBeGreaterThan(0.5);

    await scrollWorkSceneTo(page, 0.5);
    const mid = await sampleWorkScene(page);
    expect(mid.progress).toBeGreaterThan(0.35);
    expect(mid.progress).toBeLessThan(0.7);
    expect(mid.visibleCount).toBeGreaterThanOrEqual(1);
    expect(mid.active).toMatch(/Empresex/i);
    expect(mid.cards[1]?.opacity ?? 0).toBeGreaterThan(0.5);

    await scrollWorkSceneTo(page, 1);
    const end = await sampleWorkScene(page);
    expect(end.progress).toBeGreaterThan(0.85);
    expect(end.visibleCount).toBeGreaterThanOrEqual(1);
    expect(end.active).toMatch(/Progresivo/i);
    expect(end.cards[2]?.opacity ?? 0).toBeGreaterThan(0.5);
  });

  test("click row scrubs preview before navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 870 });
    await page.goto("/#work");
    await page.evaluate(() => {
      document.querySelector(".rm-work-scene__track")?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(300);

    const empresex = page.locator(".rm-index__row").filter({ hasText: "Empresex" });
    await empresex.click();
    await page.waitForTimeout(700);

    const afterClick = await sampleWorkScene(page);
    expect(afterClick.active).toMatch(/Empresex/i);
    expect(afterClick.cards[1]?.opacity ?? 0).toBeGreaterThan(0.5);
    expect(page.url()).not.toMatch(/\/cases\/empresex/);
  });

  test("ArrowDown advances active case in view", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 870 });
    await page.goto("/#work");
    await page.evaluate(() => {
      document.querySelector(".rm-work-scene__track")?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(300);
    await page.locator("#work").focus();
    await page.keyboard.press("Home");
    await page.waitForTimeout(500);

    const start = await sampleWorkScene(page);
    expect(start.active).toMatch(/Tequila/i);

    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(700);

    const afterKey = await sampleWorkScene(page);
    expect(afterKey.active).toMatch(/Empresex/i);
    expect(afterKey.cards[1]?.opacity ?? 0).toBeGreaterThan(0.5);
  });

  test("progress tick scrubs to case", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 870 });
    await page.goto("/#work");
    await page.evaluate(() => {
      document.querySelector(".rm-work-scene__track")?.scrollIntoView({ block: "start" });
    });
    await page.waitForTimeout(300);

    await page.getByRole("button", { name: "Show Progresivo" }).click();
    await page.waitForTimeout(700);

    const afterTick = await sampleWorkScene(page);
    expect(afterTick.active).toMatch(/Progresivo/i);
    expect(afterTick.cards[2]?.opacity ?? 0).toBeGreaterThan(0.5);
  });
});
