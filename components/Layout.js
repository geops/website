import Head from "next/head";
import { useRouter } from "next/router";
import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import { useI18n } from "../lib/i18n";

export default function Layout({
  children,
  description,
  title,
  shareImg,
  path,
  translationPath,
  slugByLocale,
  ...props
}) {
  const { asPath } = useRouter();
  const { language } = useI18n();
  const baseUrl = `https://geops.com${language === "en" ? "/en" : ""}`;
  const titl = title ? `${title} | geOps` : "geOps";
  const descr = description && description.replace("/&shy;/g", "");
  const image = "https://geops.com" + (shareImg || "/logo191.png");

  // if current language is DE
  let enPath =
    "/en" + (translationPath || path || "") + (slugByLocale?.en || "");
  let dePath = (path || "") + (slugByLocale?.de || "");

  // if current language is EN
  if (language === "en") {
    enPath = "/en" + (path || "") + (slugByLocale?.en || "");
    dePath = (translationPath || path || "/") + (slugByLocale?.de || "");
  }

  console.log(dePath, enPath, slugByLocale);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="canonical" href={`https://geops.com${asPath}`} />
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
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://geops.com${enPath}`}
        />
        <link
          rel="alternate"
          hrefLang="de"
          href={`https://geops.com${dePath}`}
        />
        {/* HTML meta tags */}
        <title>{titl}</title>
        {description && <meta name="description" content={descr} />}
        {/* OpenGraph meta tags */}
        <meta property="og:title" content={titl} />
        <meta property="og:url" content={`https://geops.com${asPath}`} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="geOps" />
        {description && <meta property="og:description" content={descr} />}
        {/* Twitter meta tags */}
        <meta name="twitter:title" content={titl} />
        <meta name="twitter:description" content={descr} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@geOps" />
        <meta name="twitter:creator" content="@geOps" />
        <meta name="twitter:image:src" content={image} />
      </Head>
      <Header pathByLocale={{ de: dePath, en: enPath }} />
      {children}
      <Contact />
      <Footer />
    </>
  );
}
