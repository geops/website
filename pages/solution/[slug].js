import Article from "../../components/Article.js";
import { ch } from "../../components/Contact.js";
import ContactPerson from "../../components/ContactPerson.js";
import Layout from "../../components/Layout.js";
import PageCover from "../../components/PageCover.js";
import RelatedList from "../../components/RelatedList.js";

import getContentList from "../../lib/getContentList";
import getContentBySlug from "../../lib/getContentBySlug";
import getRelatedContentList from "../../lib/getRelatedContentList";
import markdownToHtml from "../../lib/markdownToHtml";

const person = ch;

export default function Solution({ related, solution }) {
  if (!solution) {
    return null;
  }
  person.email = solution.contactEmail || ch.email;

  return (
    <Layout
      description={solution.summary}
      translationPath={`/solution/${solution.translationSlug}`}
    >
      <PageCover alt={`${solution.title} Cover`} src={solution.pageCover} />
      <Article body={solution.body} title={solution.title} />
      <ContactPerson person={person} />
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
  solution.body = await markdownToHtml(solution.body);

  const related = getRelatedContentList(language, solution);

  return { props: { language, related, solution } };
}
