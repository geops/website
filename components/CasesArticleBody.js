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
        <CaseDetails
          timeline={caseItem.timeline}
          customer={caseItem.customer}
          service={caseItem.service}
        />
        <div className="mb-24">
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
        </div>
        {sections?.length && (
          <div className="flex flex-col gap-24">
            {sections.map(
              ({ title, text, image, imagePosition, highlight }) => {
                const imageClass = /top|left/.test(imagePosition)
                  ? "lg:order-[-1]"
                  : "";
                const containerClass = /right|left/.test(imagePosition)
                  ? "lg:grid-cols-2"
                  : "";
                const highlightClass = highlight
                  ? "bg-green-light mx-24 pb-8 px-8"
                  : "";
                return (
                  <div key={title} className={highlightClass}>
                    <h2>{title}</h2>
                    <div
                      className={`grid grid-cols-1 gap-8 lg:gap-16 ${containerClass}`}
                    >
                      <Markdown>{text}</Markdown>
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
          <div className="mt-32 flex flex-col gap-16">
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
      </article>
    </>
  );
}

export default CasesArticleBody;
