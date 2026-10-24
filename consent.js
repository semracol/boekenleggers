(() => {
  const CONSENT_KEY = "boekenleggers-consent-v1";
  const CONSENT_VERSION = 1;
  const banner = document.getElementById("cookieBanner");
  const dialog = document.getElementById("cookiePreferences");
  const statisticsToggle = document.getElementById("statisticsConsent");
  const marketingToggle = document.getElementById("marketingConsent");
  const optionalScripts = new Set();
  let currentConsent = null;

  function readConsent() {
    try {
      const consent = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
      if (!consent || consent.version !== CONSENT_VERSION || !consent.savedAt) return null;
      const expiresAt = new Date(consent.savedAt);
      if (Number.isNaN(expiresAt.getTime())) return null;
      expiresAt.setMonth(expiresAt.getMonth() + 6);
      if (Date.now() >= expiresAt.getTime()) return null;
      return {
        necessary: true,
        statistics: consent.statistics === true,
        marketing: consent.marketing === true,
        version: CONSENT_VERSION,
        savedAt: consent.savedAt,
      };
    } catch (error) {
      console.warn("Cookievoorkeuren konden niet worden gelezen.", error);
      return null;
    }
  }

  function saveConsent({ statistics = false, marketing = false }) {
    currentConsent = {
      necessary: true,
      statistics,
      marketing,
      version: CONSENT_VERSION,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(currentConsent));
    } catch (error) {
      console.warn("Cookievoorkeuren konden niet lokaal worden opgeslagen.", error);
    }
    banner.hidden = true;
    if (dialog.open) dialog.close();
    window.dispatchEvent(new CustomEvent("boekenleggers:consentchange", { detail: currentConsent }));
  }

  function showPreferences() {
    statisticsToggle.checked = currentConsent?.statistics === true;
    marketingToggle.checked = currentConsent?.marketing === true;
    if (!dialog.open) dialog.showModal();
  }

  // Optional third-party scripts must only be requested through this function after explicit consent.
  // No analytics or marketing script is configured on this site yet.
  window.loadOptionalScript = function loadOptionalScript(category, src) {
    if (!["statistics", "marketing"].includes(category)) {
      throw new TypeError("Unknown optional consent category.");
    }
    if (!currentConsent?.[category]) {
      return Promise.reject(new Error(`Consent for ${category} is required before loading this script.`));
    }
    if (optionalScripts.has(src)) return Promise.resolve();
    optionalScripts.add(src);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        optionalScripts.delete(src);
        reject(new Error(`Optional ${category} script could not be loaded.`));
      };
      document.head.append(script);
    });
  };

  document.querySelectorAll("[data-cookie-accept]").forEach((button) => {
    button.addEventListener("click", () => saveConsent({ statistics: true, marketing: true }));
  });
  document.querySelectorAll("[data-cookie-reject]").forEach((button) => {
    button.addEventListener("click", () => saveConsent({ statistics: false, marketing: false }));
  });
  document.querySelector("[data-cookie-preferences]").addEventListener("click", showPreferences);
  document.querySelector("[data-cookie-save]").addEventListener("click", () => {
    saveConsent({
      statistics: statisticsToggle.checked,
      marketing: marketingToggle.checked,
    });
  });
  document.querySelector("[data-open-cookie-settings]").addEventListener("click", showPreferences);
  document.querySelectorAll("[data-close-cookie]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  currentConsent = readConsent();
  if (!currentConsent) banner.hidden = false;
})();
