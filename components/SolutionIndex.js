"use client";

import Layout from "./Layout.js";
import SolutionGridItem from "./SolutionGridItem.js";
import { useI18n } from "../lib/i18n.js";

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export default function SolutionIndex({ solutions }) {
  const { t } = useI18n();
  return (
    <Layout
      title={t("solution.title")}
      description={t("solution.text")}
      path="/solution"
      translationPath="/solution"
      shareImg={(solutions && solutions[0]?.gridImage) || null}
    >
      <div className="bg-gray-darker px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-screen-md text-white">
          <h1 data-cy="pageMainTitle" className="mb-16 mt-8 text-center">
            {t("solution.header")}
          </h1>
          <p>{t("solution.text")}</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 py-16 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionGridItem
              key={solution.slug}
              position={index % 8}
              remaining={solutions.length - index - 1}
              solution={solution}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
