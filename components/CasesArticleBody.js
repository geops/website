import React from "react";
import PageHeader from "./PageHeader.js";
import Markdown from "markdown-to-jsx";
import { ArticleImage, PreBlock, ResponsiveImage } from "./Article.js";
import namedCodesToUnicode from "../lib/namedCodesToUnicode.js";
import { CaseDetails } from "./CaseDetails.js";

function CasesArticleBody({ case: caseItem }) {
  const {
    cover,
    content: { lead, title, sections },
    imageSizes,
  } = caseItem;

  return (
    <>
      <PageHeader src={cover} srcMobile={cover} titleDown />
      <article className="container prose prose-xl mx-auto mb-16 max-w-screen-lg break-words px-8 pt-8 lg:pt-0">
        <CaseDetails
          timeline={caseItem.timeline}
          customer={caseItem.customer}
          service={caseItem.service}
        />
        <h1 className="!leading-snug text-balance">{title}</h1>
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
          {lead}
        </Markdown>
        {sections?.map((section) => {
          return (
            <>
              <h2>{section.title}</h2>
              <Markdown>{section.text}</Markdown>
            </>
          );
        })}
      </article>
    </>
  );
}

export default CasesArticleBody;
