"use client";

import ApplicationTeaser from "../../components/ApplicationTeaser.js";
import CareerContent from "../../components/CareerContent.js";
import Layout from "../../components/Layout.js";
import PageHeader from "../../components/PageHeader.js";
import { useI18n } from "../../lib/i18n.js";

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
      />
      <CareerContent content={content} />
      <ApplicationTeaser jobs={jobs} />
    </Layout>
  );
}
