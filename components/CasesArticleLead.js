import React from "react";
import PageHeader from "./PageHeader";
import Markdown from "markdown-to-jsx";
import { ArticleImage, PreBlock, ResponsiveImage } from "./Article.js";
import namedCodesToUnicode from "../lib/namedCodesToUnicode";
import { useI18n } from "../lib/i18n";

function CaseDetails({ timeline, customer, service }) {
  const { t } = useI18n();
  return (
    <div className="text-gray-700 dark:text-gray-300 max-w-screen-sm mx-auto mt-32 mb-56">
      {customer && (
        <div>
          <h3>
            <strong>{t("cases.customer")}</strong>
          </h3>
          <span>{customer}</span>
        </div>
      )}
      {service && (
        <div>
          <h3>
            <strong>{t("cases.service")}</strong>
          </h3>
          <span>{service}</span>
        </div>
      )}
      {timeline && (
        <div>
          <h3>
            <strong>{t("cases.timeline")}</strong>
          </h3>
          <span>{timeline}</span>
        </div>
      )}
    </div>
  );
}

function CasesArticleLead({ case: caseItem }) {
  const { cover, content, imageSizes } = caseItem;

  return (
    <>
      <PageHeader src={cover} srcMobile={cover} titleDown />
      <article className="container prose prose-xl mx-auto mb-16 max-w-screen-lg break-words px-8 pt-8 lg:pt-0">
        <CaseDetails
          timeline={caseItem.timeline}
          customer={caseItem.customer}
          service={caseItem.service}
        />
        <h1 className="!leading-snug text-balance">{caseItem.content.title}</h1>
        <Markdown
          options={{
            overrides: {
              img: {
                component: ArticleImage,
                props: { imageSizes },
              },
              ResponsiveImage: {
                component: ResponsiveImage,
                props: { imageSizes },
              },
              pre: PreBlock,
            },
            namedCodesToUnicode,
          }}
        >
          {content.lead}
        </Markdown>
      </article>
    </>
  );
}

export default CasesArticleLead;
