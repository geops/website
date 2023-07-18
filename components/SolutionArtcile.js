"use client";

import Article from "./Article.js";
import { ch } from "./Contact.js";
import ContactPerson from "./ContactPerson.js";
import Layout from "./Layout.js";
import PageHeader from "./PageHeader.js";
import RelatedList from "./RelatedList.js";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Solution(props) {
  const { related, solution } = props;

  if (!solution) {
    return null;
  }

  return (
    <Layout
      title={solution.title}
      description={solution.summary}
      path={`/solution`}
      translationPath={`/solution`}
      slugByLocale={solution.slugByLocale}
      shareImg={solution?.cover}
    >
      <PageHeader
        src={solution.pageCover}
        srcMobile={solution.pageCoverMobile}
        title={solution.title}
        titleDown
      />
      <Article body={solution.body} imageSizes={solution.imageSizes} />
      <ContactPerson
        person={{ ...ch, email: solution.contactEmail || ch.email }}
        subtitle={solution.contactSubtitle}
        title={solution.contactTitle}
      />
      <RelatedList dark list={related} />
    </Layout>
  );
}
