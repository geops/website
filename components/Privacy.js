"use client";

import Article from "./Article.js";
import Layout from "./Layout.js";
import { useI18n } from "../lib/i18n.js";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function Privacy({ content }) {
  const { t } = useI18n();
  const title = t("privacy.title");
  return (
    <Layout
      title={title}
      path={t("privacy.path")}
      translationPath={t("privacy.translationPath")}
    >
      <Article title={title} body={content.body} />
    </Layout>
  );
}
