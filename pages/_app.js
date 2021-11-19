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
  const { asPath } = useRouter();
  const baseUrl = `https://geops.ch${pageProps.language === "en" ? "/en" : ""}`;
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
          href={`${baseUrl}/feed/rss.xml`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="geOps Blog Atom Feed"
          href={`${baseUrl}/feed/atom.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="geOps Blog JSON Feed"
          href={`${baseUrl}/feed/feed.json`}
        />
        <link rel="canonical" href={`https://geops.ch${asPath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@geOps" />
        <meta name="twitter:creator" content="@geOps" />
        <meta property="og:url" content={`https://geops.ch${asPath}`} />
        <meta
          property="og:image"
          content="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        />
      </Head>
      <HtmlLang />
      <Component {...pageProps} />
    </I18n>
  );
}
