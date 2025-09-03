"use client";

import Layout from "./Layout.js";
import { useI18n } from "../lib/i18n.js";

export default function CasesIndex({ cases }) {
  const { t } = useI18n();
  return (
    <Layout
      title={t("cases.title")}
      description={t("cases.text")}
      path="/cases"
      translationPath="/cases"
      shareImg={(cases && cases[0]?.gridImage) || null}
    >
      <div className="bg-gray-darker px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-screen-md text-white">
          <h1
            data-cy="pageMainTitle"
            className="text-green mb-16 mt-8 text-center"
          >
            {t("cases.header")}
          </h1>
          <p className="text-center">{t("cases.text")}</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 py-16 md:grid-cols-2 xl:grid-cols-3">
          {cases?.map((c) => {
            return (
              <p key={c.slug} className="text-center">
                {c.title}
              </p>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
