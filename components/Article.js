import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { useI18n } from "../lib/i18n";
import namedCodesToUnicode from "../lib/namedCodesToUnicode";

export function CodeBlock({ className, children }) {
  let lang = "text"; // default monospaced text
  if (className && className.startsWith("lang-")) {
    lang = className.replace("lang-", "");
  }
  return <SyntaxHighlighter language={lang}>{children}</SyntaxHighlighter>;
}

export function PreBlock({ children, ...rest }) {
  if ("type" in children && children["type"] === "code") {
    return CodeBlock(children["props"]);
  }
  return <pre {...rest}>{children}</pre>;
}

export function ArticleImage({ alt, imageSizes, src, title }) {
  const { height, width } = imageSizes[src] || {};
  if (!height || !width) {
    return `Fehler: Bildgröße für ${src} konnte nicht ermittelt werden.`;
  }

  return (
    <Image alt={alt} src={src} height={height} width={width} title={title} />
  );
}

export function ResponsiveImage({ alt, desktop, mobile, imageSizes, title }) {
  return (
    <>
      {desktop && (
        <div className="block-desktop">
          <ArticleImage
            alt={alt}
            imageSizes={imageSizes}
            src={desktop}
            title={title}
          />
        </div>
      )}
      {mobile && (
        <div className="block-mobile">
          <ArticleImage
            alt={alt}
            imageSizes={imageSizes}
            src={mobile}
            title={title}
          />
        </div>
      )}
    </>
  );
}

export default function Article({ author, body, created, imageSizes, title }) {
  const { language, t } = useI18n();

  return (
    <article className="container prose prose-xl mx-auto mb-16 max-w-screen-lg break-words px-8 pt-8 lg:pt-0">
      {title && <h1 className="pt-16 text-center">{title}</h1>}
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
        {body}
      </Markdown>
      <div className="text-gray-light">
        {author && t("website.writtenBy", { author })}
        {author && created && <span> | </span>}
        {created && new Date(created).toLocaleDateString(language)}
      </div>
    </article>
  );
}
