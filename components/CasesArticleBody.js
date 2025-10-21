import PageHeader from "./PageHeader.js";
import Markdown from "markdown-to-jsx";
import { ArticleImage, PreBlock, ResponsiveImage } from "./Article.js";
import namedCodesToUnicode from "../lib/namedCodesToUnicode.js";
import { CaseDetails } from "./CaseDetails.js";
import Image from "next/image.js";
import CaseTestimonial from "./CaseTestimonial.js";

function Testimonials({ testimonials = [] }) {
  return testimonials.length > 0 ? (
    <div className="mt-8 flex flex-col gap-8">
      {testimonials.map(
        ({ text: quote, name: author, position, portrait }, index) => (
          <CaseTestimonial
            key={index}
            quote={quote}
            author={author}
            position={position}
            portrait={portrait}
          />
        ),
      )}
    </div>
  ) : null;
}

function CasesArticleBody({ case: caseItem }) {
  const {
    cover,
    content: { lead, title, sections },
    testimonials,
    testimonialsOnTop,
    imageSizes,
  } = caseItem;

  return (
    <>
      <PageHeader src={cover} srcMobile={cover} titleDown />
      <article className="container prose prose-xl mx-auto mb-16 max-w-screen-lg break-words px-8 pt-8 lg:pt-0">
        <div>
          <p>{caseItem.customer.fullName}</p>
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
        {testimonialsOnTop ? (
          <Testimonials testimonials={testimonials} />
        ) : null}
        {sections?.length &&
          sections.map(({ title, text, image, imagePosition, highlight }) => {
            const imageClass = /top|left/.test(imagePosition)
              ? "lg:order-[-1]"
              : "";
            const containerClass = /right|left/.test(imagePosition)
              ? "lg:grid-cols-2"
              : "";
            return (
              <div key={title}>
                <div
                  className={`grid grid-cols-1 gap-8 lg:gap-16 ${containerClass}`}
                >
                  <div>
                    <h2 className={highlight ? "text-green" : ""}>{title}</h2>
                    <Markdown options={{ forceBlock: true }}>{text}</Markdown>
                  </div>
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
          })}

        {testimonialsOnTop ? null : (
          <Testimonials testimonials={testimonials} />
        )}
        <CaseDetails timeline={caseItem.timeline} service={caseItem.service} />
      </article>
    </>
  );
}

export default CasesArticleBody;
