import ApplicationTeaser from "../../components/ApplicationTeaser.js";
import CareerContent from "../../components/CareerContent.js";
import Layout from "../../components/Layout.js";
import PageHeader from "../../components/PageHeader.js";

import getContentItem from "../../lib/getContentItem";
import getContentList from "../../lib/getContentList";
import { useI18n } from "../../lib/i18n";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Career({ content, jobs }) {
  const { t } = useI18n();
  const title = t("career.title");
  return (
    <Layout
      title={title}
      path={t("career.path")}
      translationPath={`${t("career.translationPath")}`}
    >
      <PageHeader
        src="/images/page/career/header.jpg"
        srcMobile="/images/page/career/header-mobile.jpg"
        title={title}
        text={content.header}
      />
      <CareerContent content={content} />
      <ApplicationTeaser jobs={jobs} />
    </Layout>
  );
}

export async function getStaticProps(context) {
  const language = context.language || "de";
  const jobs = getContentList(language, {
    collections: ["job"],
    fields: ["title", "summary", "slug"],
  });
  const content = getContentItem(language, "page", "career.json");

  return { props: { language, content, jobs } };
}
