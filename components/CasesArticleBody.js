import React from "react";
import PageHeader from "./PageHeader.js";
import Markdown from "markdown-to-jsx";
import { ArticleImage, PreBlock, ResponsiveImage } from "./Article.js";
import namedCodesToUnicode from "../lib/namedCodesToUnicode.js";
import { CaseDetails } from "./CaseDetails.js";
import Image from "next/image.js";
import Testimonial from "./Testimonial.js";

function CasesArticleBody({ case: caseItem }) {
  const {
    cover,
    content: { lead, title, sections },
    testimonials,
    imageSizes,
  } = caseItem;

  return (
    <>
      <PageHeader src={cover} srcMobile={cover} titleDown />
      <article className="container prose prose-xl mx-auto mb-16 max-w-screen-lg break-words px-8 pt-8 lg:pt-0">
        <div className="mb-8">
          <p>{caseItem.customer}</p>
          <h1 className="!leading-snug text-balance text-green">{title}</h1>
          <Markdown
            options={{
              forceBlock: true,
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
        </div>
        {sections?.length && (
          <div className="flex flex-col gap-8">
            {sections.map(
              ({ title, text, image, imagePosition, highlight }) => {
                const imageClass = /top|left/.test(imagePosition)
                  ? "lg:order-[-1]"
                  : "";
                const containerClass = /right|left/.test(imagePosition)
                  ? "lg:grid-cols-2"
                  : "";
                return (
                  <div key={title}>
                    <h2 className={highlight ? "text-green" : ""}>{title}</h2>
                    <div
                      className={`grid grid-cols-1 gap-8 lg:gap-16 ${containerClass}`}
                    >
                      <Markdown options={{ forceBlock: true }}>{text}</Markdown>
                      {image && (
                        <Image
                          src={image}
                          alt={title || ""}
                          width={imageSizes[image].width}
                          height={imageSizes[image].height}
                          className={imageClass}
                        />
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
        {testimonials?.length > 0 && (
          <div className="mt-16 flex flex-col gap-16">
            {testimonials.map(
              ({ text: quote, name: author, position, portrait }, index) => (
                <Testimonial
                  key={index}
                  quote={quote}
                  author={author}
                  position={position}
                  portrait={portrait}
                  className="bg-white max-w-[500px] lg:max-w-[700px]"
                />
              ),
            )}
          </div>
        )}
        <CaseDetails timeline={caseItem.timeline} service={caseItem.service} />
      </article>
    </>
  );
}

export default CasesArticleBody;
