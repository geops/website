"use client";

import Article from "../../components/Article.js";
import Layout from "../../components/Layout.js";
import { useI18n } from "../../lib/i18n.js";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Imprint({ content }) {
  const { t } = useI18n();
  const title = t("terms.title");
  return (
    <Layout
      title={title}
      path={t("terms.path")}
      translationPath={t("terms.translationPath")}
    >
      <Article title={title} body={content.body} />
    </Layout>
  );
}
