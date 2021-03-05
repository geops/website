import ApplicationTeaser from "../../components/ApplicationTeaser.js";
import CareerContent from "../../components/CareerContent.js";
import JobList from "../../components/JobList.js";
import Layout from "../../components/Layout.js";

import getContentItem from "../../lib/getContentItem";
import getContentList from "../../lib/getContentList";
import markdownToHtml from "../../lib/markdownToHtml";
import { useI18n } from "../../lib/i18n";

export default function Career({ content, jobs }) {
  const { t } = useI18n();
  return (
    <Layout translationPath={t("career.translationPath")}>
      <CareerContent content={content} />
      <JobList jobs={jobs} />
      <ApplicationTeaser />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const jobs = getContentList(language, {
    collections: ["job"],
    fields: ["title", "slug"],
  });
  const content = getContentItem(language, "page", "career.json");
  content.matchText = await markdownToHtml(content.matchText);
  return { props: { language, content, jobs } };
}
