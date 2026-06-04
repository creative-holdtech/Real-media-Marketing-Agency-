export type PremiumCursorMode = "default" | "logo" | "explore" | "attract" | "morph";

/** Shared cursor state for rAF loops — no React subscriptions. */
export const premiumCursorStore = {
  active: false,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 0,
  mode: "default" as PremiumCursorMode,
  modeVisual: 0,
  trustX: 0.5,
  trustY: 0.5,
  inTrustScene: false,
  energy: 0,
  pulse: 0,
  trustScroll: 0,
};

export function resetPremiumCursorStore() {
  premiumCursorStore.active = false;
  premiumCursorStore.x = 0;
  premiumCursorStore.y = 0;
  premiumCursorStore.vx = 0;
  premiumCursorStore.vy = 0;
  premiumCursorStore.speed = 0;
  premiumCursorStore.mode = "default";
  premiumCursorStore.modeVisual = 0;
  premiumCursorStore.trustX = 0.5;
  premiumCursorStore.trustY = 0.5;
  premiumCursorStore.inTrustScene = false;
  premiumCursorStore.energy = 0;
  premiumCursorStore.pulse = 0;
  premiumCursorStore.trustScroll = 0;
}
