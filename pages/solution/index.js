import Layout from "../../components/Layout.js";
import SolutionGridItem from "../../components/SolutionGridItem.js";

import getContentList from "../../lib/getContentList";
import { useI18n } from "../../lib/i18n";

export default function SolutionIndex({ solutions }) {
  const { t } = useI18n();
  return (
    <Layout
      description={t("solution.text")}
      title={t("solution.title")}
      translationPath="/solution"
    >
      <div className="bg-gray-darker p-8">
        <div className="max-w-screen-md mx-auto text-white">
          <h1 data-cy="pageMainTitle" className="text-center mt-8 mb-16">
            {t("solution.header")}
          </h1>
          <p>{t("solution.text")}</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-16">
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

export async function getStaticProps(context) {
  const language = context.language || "de";
  const solutions = getContentList(language, {
    collections: ["solution"],
    fields: [
      "color",
      "gridImage",
      "logo",
      "summary",
      "slug",
      "title",
      "weight",
    ],
    order: [{ weight: "asc" }],
  });
  return { props: { language, solutions } };
}
