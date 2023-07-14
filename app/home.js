"use client";

import Button from "../components/Button";
import CareerTeaser from "../components/CareerTeaser.js";
import Carousel from "../components/Carousel.js";
import Hero from "../components/Hero.js";
import Layout from "../components/Layout.js";
import NewsletterTeaser from "../components/NewsletterTeaser.js";
import OpenSourceTeaser from "../components/OpenSourceTeaser.js";
import FrontpageList from "../components/FrontpageList.js";
import { useI18n } from "../lib/i18n";
import Head from "next/head";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Frontpage({ items, slides, ...props }) {
  const { t } = useI18n();
  return (
    <Layout
      description={t("aboutTeaser.text")}
      shareImg={(slides && slides[0]?.image) || null}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "geOps",
              url: "https://geops.com",
              logo: "https://geops.com/logo191.png",
            }),
          }}
        ></script>
      </Head>
      <Carousel slides={slides} />
      <div className="relative">
        <Hero title={t("aboutTeaser.title")}>
          <p className="my-4 lg:my-8">{t("aboutTeaser.text")}</p>
          <Button href="/about">{t("website.more")}</Button>
        </Hero>
        <FrontpageList items={items} />
        <OpenSourceTeaser />
        <CareerTeaser />
        <NewsletterTeaser />
      </div>
    </Layout>
  );
}
