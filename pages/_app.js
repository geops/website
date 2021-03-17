import dynamic from "next/dynamic";
import Head from "next/head";

import I18n from "../lib/i18n";
import useAnalytics from "../lib/useAnalytics";

import "../styles/index.css";

const HtmlLang = dynamic(() => import("../components/HtmlLang"), {
  ssr: false,
});

export default function Website({ Component, pageProps }) {
  useAnalytics();
  return (
    <I18n language={pageProps.language}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <HtmlLang />
      <Component {...pageProps} />
    </I18n>
  );
}
