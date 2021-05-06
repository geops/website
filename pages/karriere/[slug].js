import Article from "../../components/Article.js";
import ContactPerson from "../../components/ContactPerson";
import Layout from "../../components/Layout.js";

import getContentBySlug from "../../lib/getContentBySlug";
import getContentItem from "../../lib/getContentItem";
import getContentList from "../../lib/getContentList";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Job({ content, job }) {
  if (!job) {
    return null;
  }

  return (
    <Layout translationPath={`/career/${job.translationSlug}`}>
      <Article body={job.body} title={job.title} />
      <ContactPerson
        person={content.contact}
        title={content.title}
        subtitle=" "
      />
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const list = getContentList(context.language || "de", {
    collections: ["job"],
    fields: ["slug"],
  });
  return {
    paths: list.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const language = context.language || "de";

  const job = getContentBySlug(language, "job", context.params.slug);
  job.body = await markdownToHtml(job.body);

  const content = getContentItem(language, "page", "job.json");

  return { props: { language, content, job } };
}
