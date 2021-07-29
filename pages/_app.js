import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import I18n from "../lib/i18n";
import useAnalytics from "../lib/useAnalytics";

import "../styles/index.css";

const HtmlLang = dynamic(() => import("../components/HtmlLang"), {
  ssr: false,
});

export default function Website({ Component, pageProps }) {
  const router = useRouter();
  const feedBaseUrl =
    pageProps.language === "en" ? "https://geops.ch/en" : "https://geops.ch";
  useAnalytics();
  return (
    <I18n language={pageProps.language}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="geOps Blog RSS Feed"
          href={`${feedBaseUrl}/feed/rss.xml`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="geOps Blog Atom Feed"
          href={`${feedBaseUrl}/feed/atom.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="geOps Blog JSON Feed"
          href={`${feedBaseUrl}/feed/feed.json`}
        />
        <link rel="canonical" href={`https://geops.ch${router.pathname}`} />
      </Head>
      <HtmlLang />
      <Component {...pageProps} />
    </I18n>
  );
}
