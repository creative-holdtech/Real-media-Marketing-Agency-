import { expect, test } from "@playwright/test";

/** Read scroll-driven CSS vars set by TrustParticleEcosystem RAF loop. */
async function trustSceneMetrics(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const studio = document.getElementById("studio");
    const field = studio?.querySelector(".rm-trust-ecosystem");
    const stats = field
      ? Array.from(field.querySelectorAll(".rm-trust-ecosystem__fg-stat")).map((slot) => ({
          opacity: Number(getComputedStyle(slot).opacity),
          value: slot.querySelector(".rm-trust-ecosystem__fg-stat-value")?.textContent?.trim() ?? "",
        }))
      : [];
    return {
      trustScroll: Number(studio?.style.getPropertyValue("--trust-scroll") || 0),
      trustEnter: Number(studio?.style.getPropertyValue("--trust-enter") || 0),
      trustExit: Number(studio?.style.getPropertyValue("--trust-exit") || 0),
      visibleParticles: field
        ? Array.from(field.querySelectorAll("[data-particle-id]")).filter(
            (el) => Number(getComputedStyle(el).opacity) > 0.15,
          ).length
        : 0,
      stats,
    };
  });
}

test.describe("Trust scene — scroll story", () => {
  test.setTimeout(60_000);

  test("orbit → stats → field → exit", async ({ page }) => {
    // Step 1: navigate
    await page.goto("/#studio");
    await expect(page).toHaveURL(/#studio$/);

    const studio = page.locator("#studio");
    await expect(studio).toBeVisible();
    await expect(page.getByRole("region", { name: "Studio overview" })).toBeVisible();

    // Nudge scroll so the pinned field intersects (IO → RAF loop in headless).
    await page.evaluate(() => {
      const studioEl = document.getElementById("studio");
      if (studioEl) window.scrollTo({ top: studioEl.offsetTop, behavior: "instant" });
    });
    await page.mouse.move(640, 400);

    await page.waitForFunction(
      () => {
        const particles = document.querySelectorAll("[data-particle-id]");
        return (
          particles.length >= 8 &&
          Array.from(particles).some((el) => Number(getComputedStyle(el).opacity) > 0.15)
        );
      },
      { timeout: 20_000 },
    );

    await page.mouse.move(640, 400);

    let maxScroll = 0;

    for (let i = 0; i < 22; i += 1) {
      await page.mouse.wheel(0, 420);
      await page.waitForTimeout(100);
      const m = await trustSceneMetrics(page);
      maxScroll = Math.max(maxScroll, m.trustScroll);
    }

    expect(maxScroll).toBeGreaterThan(0.45);

    const finale = await trustSceneMetrics(page);
    expect(finale.trustScroll).toBeGreaterThan(0.75);

    // Step 6: studio body becomes readable after exit handoff
    await expect(studio.getByRole("heading", { name: /We don't bring ideas/i })).toBeVisible();
  });
});
