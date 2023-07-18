"use client";

import AboutContent from "./AboutContent.js";
import { ch } from "./Contact.js";
import ContactPerson from "./ContactPerson.js";
import Layout from "./Layout.js";
import PageHeader from "./PageHeader.js";
import TeamGrid from "./TeamGrid.js";

export default function About({ content, team, technologies }) {
  return (
    <Layout
      title={content.title}
      description={content.we1}
      path="/about"
      translationPath="/about"
    >
      <PageHeader
        title={content.title}
        src="/images/page/about/header.jpg"
        srcMobile="/images/page/about/header-mobile.jpg"
      />
      <AboutContent content={content} technologies={technologies} />
      <ContactPerson person={ch} />
      <TeamGrid team={team} />
    </Layout>
  );
}
