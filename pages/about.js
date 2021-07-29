import AboutContent from "../components/AboutContent.js";
import { ch } from "../components/Contact.js";
import ContactPerson from "../components/ContactPerson.js";
import TechnologieCarousel from "../components/TechnologieCarousel.js";
import Layout from "../components/Layout.js";
import PageHeader from "../components/PageHeader.js";
import TeamGrid from "../components/TeamGrid.js";

import getContentItem from "../lib/getContentItem";
import getContentList from "../lib/getContentList";

export default function About({ content, team, slides }) {
  return (
    <Layout description={content.we1} translationPath="/about">
      <PageHeader
        src="/images/page/about/header.jpg"
        srcMobile="/images/page/about/header-mobile.jpg"
        title={content.title}
      />
      <AboutContent content={content} />
      <TechnologieCarousel slides={slides} />
      <ContactPerson person={ch} />
      <TeamGrid team={team} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const team = getContentList(language, {
    collections: ["person"],
    fields: ["name", "photo", "position", "email", "telephone", "github"],
  });
  const content = getContentItem(language, "page", "about.json");
  
  const slides  = getContentList(language, {
    collections: ["technology"],
    fields: ["title", "weight", "image"],
    order: [{ weight: "asc" }],
  });
  return { props: { content, slides , language, team }};
}
