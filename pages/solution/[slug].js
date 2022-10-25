import Article from "../../components/Article.js";
import { ch } from "../../components/Contact.js";
import ContactPerson from "../../components/ContactPerson.js";
import Layout from "../../components/Layout.js";
import PageHeader from "../../components/PageHeader.js";
import RelatedList from "../../components/RelatedList.js";

import getContentList from "../../lib/getContentList";
import getContentBySlug from "../../lib/getContentBySlug";
import getRelatedContentList from "../../lib/getRelatedContentList";

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

export async function getStaticPaths(context) {
  const list = getContentList(context.language || "de", {
    collections: ["solution"],
    fields: ["slug"],
  });
  return {
    paths: list.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const solution = getContentBySlug(language, "solution", context.params.slug);
  const related = getRelatedContentList(language, solution);

  return { props: { language, related, solution } };
}
