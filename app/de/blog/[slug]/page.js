import getContentList from "../../../../lib/getContentList.js";
import Slug from "../../../../components/BlogArticle.js";
import { generateBlogSlugMetadata } from "../../../../lib/getMetadata.js";
import { getBlogSlugProps } from "../../../../lib/getProps.js";

export async function generateMetadata({ params: { slug } }) {
  const md = await generateBlogSlugMetadata("de", slug);
  return md;
}

export async function generateStaticParams() {
  const list = getContentList("de", {
    collections: ["blog"],
    fields: ["slug"],
  });

  return list.map(({ slug }) => ({
    slug,
  }));
}

export default async function Page(context) {
  const {
    params: { lang = "de", slug },
  } = context;
  const props = await getBlogSlugProps(lang, slug);
  const { item } = props;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: item.title,
            image: [item.cover],
            datePublished: item.created,
            author: [
              {
                "@type": "Organisation",
                name: "geOps",
                url: "https://geops.com",
              },
              {
                "@type": "Person",
                name: item.author,
              },
            ],
          }),
        }}
      />
      <Slug {...props} />
    </>
  );
}
