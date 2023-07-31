import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { useI18n } from "../lib/i18n";
import namedCodesToUnicode from "../lib/namedCodesToUnicode";

function CodeBlock({ className, children }) {
  let lang = "text"; // default monospaced text
  if (className && className.startsWith("lang-")) {
    lang = className.replace("lang-", "");
  }
  return <SyntaxHighlighter language={lang}>{children}</SyntaxHighlighter>;
}

function PreBlock({ children, ...rest }) {
  if ("type" in children && children["type"] === "code") {
    return CodeBlock(children["props"]);
  }
  return <pre {...rest}>{children}</pre>;
}

function ArticleImage({ alt, imageSizes, src }) {
  const { height, width } = imageSizes[src] || {};
  if (!height || !width) {
    return `Fehler: Bildgröße für ${src} konnte nicht ermittelt werden.`;
  }

  return <Image alt={alt} src={src} height={height} width={width} />;
}

function ResponsiveImage({ alt, desktop, mobile, imageSizes }) {
  return (
    <>
      {desktop && (
        <div className="block-desktop">
          <ArticleImage alt={alt} imageSizes={imageSizes} src={desktop} />
        </div>
      )}
      {mobile && (
        <div className="block-mobile">
          <ArticleImage alt={alt} imageSizes={imageSizes} src={mobile} />
        </div>
      )}
    </>
  );
}

export default function Article({ author, body, created, imageSizes }) {
  const { language, t } = useI18n();

  return (
    <article className="container prose prose-xl mx-auto mb-16 max-w-screen-lg break-words px-8 pt-8 lg:pt-0">
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
