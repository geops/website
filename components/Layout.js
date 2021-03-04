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
  return (
    <>
      <Head>
        <title>{title ? `${title} | geOps` : "geOps"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Header translationPath={translationPath} />
      {children}
      <Contact />
      <Footer />
    </>
  );
}
