import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAnalytics() {
  const router = useRouter();

  return useEffect(() => {
    // We only want to track analytics in production.
    if (process.env.NODE_ENV !== "production") {
      return;
    }

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
    router.events.on("routeChangeComplete", trackPageView);
    return () => router.events.off("routeChangeComplete", trackPageView);
  }, [router.events]);
}
