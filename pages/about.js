import dynamic from "next/dynamic";

import AboutContent from "../components/AboutContent.js";
import { ch } from "../components/Contact.js";
import ContactPerson from "../components/ContactPerson.js";
import Layout from "../components/Layout.js";
import PageHeader from "../components/PageHeader.js";
import TeamGrid from "../components/TeamGrid.js";

import getContentItem from "../lib/getContentItem";
import getContentList from "../lib/getContentList";

const TechnologyCarousel = dynamic(
  () => import("../components/TechnologyCarousel"),
  { ssr: false }
);

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function About({ content, team, technologies }) {
  return (
    <Layout
      title={content.title}
      description={content.we1}
      translationPath="/about"
    >
      <PageHeader
        src="/images/page/about/header.jpg"
        srcMobile="/images/page/about/header-mobile.jpg"
      />
      <AboutContent content={content} />
      <TechnologyCarousel slides={technologies} />
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

  const technologies = getContentList(language, {
    collections: ["technology"],
    fields: ["title", "weight", "image"],
    order: [{ weight: "asc" }],
  });
  return { props: { content, language, team, technologies } };
}
