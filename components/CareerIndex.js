"use client";

import ApplicationTeaser from "./ApplicationTeaser.js";
import CareerContent from "./CareerContent.js";
import Layout from "./Layout.js";
import PageHeader from "./PageHeader.js";
import { useI18n } from "../lib/i18n.js";

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
      />
      <CareerContent content={content} />
      <ApplicationTeaser jobs={jobs} />
    </Layout>
  );
}
