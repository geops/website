"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useAnalytics() {
  // see doc https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
  const pathname = usePathname();

  return useEffect(() => {
    // We only want to track analytics in production.
    if (process.env.NODE_ENV !== "production") {
      return () => {};
    }

    // Matomo
    const url = "https://analytics.geops.de/";
    window._paq = window._paq || [];

    window._paq.push(["setTrackerUrl", url + "piwik.php"]);
    window._paq.push(["setSiteId", "1"]);
    window._paq.push(["disableCookies"]);

    const trackPageView = () => window._paq.push(["trackPageView"]);

    if (!document.querySelector(`script[src="${url}piwik.js"]`)) {
      const piwikScript = document.createElement("script");
      const firstScript = document.getElementsByTagName("script")[0];
      piwikScript.type = "text/javascript";
      piwikScript.async = true;
      piwikScript.src = url + "piwik.js";
      firstScript.parentNode.insertBefore(piwikScript, firstScript);
    }

    trackPageView();

    // Plausible
    const plausibleSrc = "https://plausible.geops.io/js/script.js";
    if (!document.querySelector(`script[src="${plausibleSrc}"]`)) {
      // <script defer data-domain="geops.com" src="https://plausible.geops.io/js/script.js"></script>
      const plausibleScript = document.createElement("script");
      plausibleScript.type = "text/javascript";
      plausibleScript.defer = true;
      plausibleScript.dataset.domain = "geops.com";
      plausibleScript.src = plausibleSrc;
      document.head.appendChild(plausibleScript);
    }

    return () => {};
  }, [pathname]);
}
