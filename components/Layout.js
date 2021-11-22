import Head from "next/head";

import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Header from "./Header.js";

export default function Layout({
  children,
  description,
  title,
  translationPath,
}) {
  const titl = title ? `${title} | geOps` : "geOps";

  const descr = description && description.replace("/&shy;/g", "");
  return (
    <>
      <Head>
        {/* HTML meta tags */}
        <title>{titl}</title>
        {description && <meta name="description" content={descr} />}

        {/* OpenGraph meta tags */}
        {<meta name="og:title" content={titl} />}
        {description && <meta name="og:description" content={descr} />}
      </Head>
      <Header translationPath={translationPath} />
      {children}
      <Contact />
      <Footer />
    </>
  );
}
