import { useEffect } from "react";

const HUBSPOT_PORTAL_ID = "51288751";
const SCRIPT_ID = "hs-script-loader";
const SCRIPT_SRC = `https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;

/** Loads HubSpot tracking for Non-HubSpot form capture on /contact and /audit. */
export function HubSpotTracking() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}

/**
 * Lets HubSpot's non-HubSpot form listener read field values before we block navigation.
 * @see https://knowledge.hubspot.com/forms/set-up-non-hubspot-forms
 */
export function afterHubSpotFormCapture(callback: () => void) {
  window.setTimeout(callback, 300);
}
