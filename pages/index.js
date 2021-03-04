import AboutTeaser from "../components/AboutTeaser.js";
import CareerTeaser from "../components/CareerTeaser.js";
import Carousel from "../components/Carousel.js";
import Layout from "../components/Layout.js";
import NewsletterTeaser from "../components/NewsletterTeaser.js";
import OpenSourceTeaser from "../components/OpenSourceTeaser.js";
import FrontpageList from "../components/FrontpageList.js";

import getContentList from "../lib/getContentList";
import { useI18n } from "../lib/i18n";

export default function Frontpage({ list, slides }) {
  const { t } = useI18n();
  return (
    <Layout description={t("aboutTeaser.text")}>
      <Carousel slides={slides} />
      <div className="relative">
        <AboutTeaser />
        <FrontpageList list={list} />
        <OpenSourceTeaser />
        <CareerTeaser />
        <NewsletterTeaser />
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const list = getContentList(language, {
    collections: ["blog", "solution"],
    fields: [
      "cover",
      "frontpageTitle",
      "frontpageImage",
      "frontpageWeight",
      "summary",
      "slug",
      "title",
    ],
    where: { frontpage: true, published: true },
    order: [{ frontpageWeight: "asc" }],
  });
  const slides = getContentList(language, {
    collections: ["slide"],
    fields: ["title", "summary", "image", "link", "video"],
  });
  return { props: { language, list, slides } };
}
