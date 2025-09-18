"use client";

import { ch } from "./Contact.js";
import ContactPerson from "./ContactPerson.js";
import Layout from "./Layout.js";
import RelatedList from "./RelatedList.js";
import CasesArticleBody from "./CasesArticleBody.js";

export default function CasesArticle(props) {
  const { related, case: caseItem } = props;
  console.log(props);

  if (!caseItem) {
    return null;
  }

  return (
    <Layout
      title={caseItem.title}
      description={caseItem.summary}
      path={`/cases`}
      translationPath={`/cases`}
      slugByLocale={caseItem.slugByLocale}
      shareImg={caseItem?.cover}
    >
      <CasesArticleBody case={caseItem} />
      <ContactPerson
        person={{ ...ch, email: caseItem.contactEmail || ch.email }}
        subtitle={caseItem.contactSubtitle}
        title={caseItem.contactTitle}
      />
      <RelatedList dark list={related} />
    </Layout>
  );
}
