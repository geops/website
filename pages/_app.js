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

        {/* OpenGraph meta tags */}
        <meta property="og:url" content={`${baseUrl}/${asPath}`} />
        <meta
          property="og:image"
          content="https://website-git-olivier-share-geops.vercel.app/logo.png"
        />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@geOps" />
        <meta name="twitter:creator" content="@geOps" />
        <meta property="twitter:url" content={`${baseUrl}/${asPath}`} />
        <meta
          property="twitter:image"
          content="https://website-git-olivier-share-geops.vercel.app/logo.png"
        />
      </Head>
      <HtmlLang />
      <Component {...pageProps} />
    </I18n>
  );
}
