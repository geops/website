import generateGenericMetadata from "./generateGenericMetadata";
import {
  getHomeProps,
  getSolutionProps,
  getSolutionSlugProps,
  getNewsletterProps,
  getCarreerSlugProps,
  getBlogSlugProps,
  getBlogProps,
  getAboutProps,
} from "./getProps";

export async function generateHomeMetadata(lang) {
  const { slides } = await getHomeProps(lang);
  const md = await generateGenericMetadata({
    language: lang,
    path: "/",
    translationPath: "/",
    description: "aboutTeaser.text",
    shareImg: (slides && slides[0]?.image) || null,
  });
  return {
    title: {
      template: "%s | geOps",
      default: "geOps",
    },
    ...md,
  };
}

export async function generateSolutionMetadata(lang) {
  const { solutions } = await getSolutionProps(lang);
  const md = await generateGenericMetadata({
    language: lang,
    path: "/solution",
    translationPath: "/solution",
    title: "solution.title",
    description: "solution.text",
    shareImg: (solutions && solutions[0]?.gridImage) || null,
  });
  return md;
}

export async function generateSolutionSlugMetadata(lang, slug) {
  const { solution } = await getSolutionSlugProps(lang, slug);
  const md = await generateGenericMetadata({
    language: lang,
    path: "/solution",
    translationPath: "/solution",
    slugByLocale: solution.slugByLocale,
    title: solution.title,
    description: solution.summary,
    shareImg: solution?.cover || null,
  });
  return md;
}

export async function generateNewsletterMetadata(lang) {
  const { content } = await getNewsletterProps(lang);
  const md = await generateGenericMetadata({
    language: lang,
    path: "/newsletter",
    translationPath: "/newsletter",
    title: "Newsletter",
    description: content.subtitle,
  });
  return md;
}

export async function generateCareerMetadata(lang) {
  const md = await generateGenericMetadata({
    language: lang,
    path: "career.path",
    translationPath: "career.translationPath",
    title: "career.title",
  });
  return md;
}

export async function generateCareerSlugMetadata(lang, slug) {
  const { job } = await getCarreerSlugProps(lang, slug);
  const md = await generateGenericMetadata({
    language: lang,
    path: "career.path",
    translationPath: "career.translationPath",
    slugByLocale: job.slugByLocale,
    title: job.title,
    description: job.summary,
  });
  return md;
}
export async function generateBlogMetadata(lang) {
  const { list } = await getBlogProps(lang);
  const md = await generateGenericMetadata({
    language: lang,
    path: "/blog",
    translationPath: "/blog",
    title: "Blog",
    description: "blog.header",
    shareImg: (list && list[0]?.cover) || null,
  });
  return md;
}

export async function generateBlogSlugMetadata(lang, slug) {
  const { item } = await getBlogSlugProps(lang, slug);
  const md = await generateGenericMetadata({
    language: lang,
    path: "/blog",
    translationPath: "/blog",
    slugByLocale: item.slugByLocale,
    title: item.title,
    description: item.summary,
    shareImg: item?.cover || null,
  });
  return md;
}

export async function generateImpressumMetadata(lang) {
  const md = await generateGenericMetadata({
    language: lang,
    path: "imprint.path",
    translationPath: "imprint.translationPath",
    title: "imprint.title",
  });
  return md;
}

export async function generatePrivacyMetadata(lang) {
  const md = await generateGenericMetadata({
    language: lang,
    path: "privacy.path",
    translationPath: "privacy.translationPath",
    title: "privacy.title",
  });
  return md;
}

export async function generateTermsMetadata(lang) {
  const md = await generateGenericMetadata({
    language: lang,
    path: "terms.path",
    translationPath: "terms.translationPath",
    title: "terms.title",
  });
  return md;
}

export async function generateAboutMetadata(lang) {
  const { content } = await getAboutProps(lang);
  const md = await generateGenericMetadata({
    language: lang,
    path: "/about",
    translationPath: "/about",
    title: content.title,
    description: content.we1,
  });
  return md;
}

const fcts = {
  generateHomeMetadata,
  generateSolutionMetadata,
  generateSolutionSlugMetadata,
  generateCareerMetadata,
  generateCareerSlugMetadata,
  generateBlogMetadata,
  generateBlogSlugMetadata,
  generateImpressumMetadata,
  generatePrivacyMetadata,
  generateTermsMetadata,
};

export default fcts;
