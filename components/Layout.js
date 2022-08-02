import Head from "next/head";

import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Header from "./Header.js";

import { useI18n } from "../lib/i18n";

export default function Layout({
  children,
  description,
  title,
  translationPath,
}) {
  const { language } = useI18n();
  const isDE = language === "de";
  const titl = title ? `${title} | geOps` : "geOps";

  const descr = description && description.replace("/&shy;/g", "");
  return (
    <>
      <Head>
        {/* HTML meta tags */}
        <title>{titl}</title>
        {description && <meta name="description" content={descr} />}

        <link
          rel="alternate"
          hrefLang="en"
          href={`https://geops.com/en${translationPath || ""}`}
        />
        <link
          rel="alternate"
          hrefLang="de"
          href={`https://geops.com${translationPath || ""}`}
        />

        {/* OpenGraph meta tags */}
        <meta property="og:title" content={titl} />
        {description && <meta property="og:description" content={descr} />}

        {/* Twitter meta tags */}
        <meta name="twitter:title" content={titl} />
        <meta name="twitter:description" content={descr} />
      </Head>
      <Header translationPath={translationPath} />
      {children}
      <Contact />
      <Footer />
    </>
  );
}
