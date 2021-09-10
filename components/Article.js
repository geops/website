import Head from "next/head";
import { useI18n } from "../lib/i18n";
import styles from "./Article.module.css";

export default function Article({ author, body, created, title }) {
  const { language, t } = useI18n();

  return (
    <article className="break-words container mx-auto mb-16 px-8 pt-8 lg:pt-0 prose prose-xl max-w-screen-lg">
      {title && (
        <>
          <Head>
            <title>{`${title} | geOps`}</title>
            {author && <meta name="author" content={author} />}
          </Head>
          <h1 className="pt-16 text-center">{title}</h1>
        </>
      )}
      <div className={`${styles.h2}`} dangerouslySetInnerHTML={{ __html: body }} />
      <div className="text-gray-light">
        {author && t("website.writtenBy", { author })}
        {author && created && <span> | </span>}
        {created && new Date(created).toLocaleDateString(language)}
      </div>
    </article>
  );
}
