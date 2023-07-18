"use client";

import Button from "./Button";
import CareerTeaser from "./CareerTeaser.js";
import Carousel from "./Carousel.js";
import Hero from "./Hero.js";
import Layout from "./Layout.js";
import NewsletterTeaser from "./NewsletterTeaser.js";
import OpenSourceTeaser from "./OpenSourceTeaser.js";
import FrontpageList from "./FrontpageList.js";
import { useI18n } from "../lib/i18n";
import Head from "next/head";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Frontpage({ items, slides, ...props }) {
  const { t, language } = useI18n();
  return (
    <Layout
      description={t("aboutTeaser.text")}
      shareImg={(slides && slides[0]?.image) || null}
    >
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
