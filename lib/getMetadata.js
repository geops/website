import generateGenericMetadata from "./generateGenericMetadata";
import {
  getHomeProps,
  getSolutionProps,
  getSolutionSlugProps,
  getNewsletterProps,
  getCarreerProps,
  getCarreerSlugProps,
  getBlogSlugProps,
  getBlogProps,
  getTermsProps,
  getPrivacyProps,
  getImpressumProps,
  getAboutProps,
} from "./getProps";

export async function generateHomeMetadata(lang, path, otherLocalPath) {
  const { slides } = await getHomeProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
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

export async function generateSolutionMetadata(lang, path, otherLocalPath) {
  const { solutions } = await getSolutionProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: "solution.title",
    description: "solution.text",
    shareImg: (solutions && solutions[0]?.gridImage) || null,
  });
  return md;
}

export async function generateSolutionSlugMetadata(
  lang,
  slug,
  path,
  otherLocalPath,
) {
  const { solution } = await getSolutionSlugProps(lang, slug);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: solution.title,
    description: solution.summary,
    shareImg: solution?.cover || null,
  });
  return md;
}

export async function generateNewsletterMetadata(lang, path, otherLocalPath) {
  const { content } = await getNewsletterProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: "Newsletter",
    description: content.subtitle,
  });
  return md;
}

export async function generateCareerMetadata(lang, path, otherLocalPath) {
  const { content } = await getCarreerProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: "career.title",
  });
  return md;
}

export async function generateCareerSlugMetadata(
  lang,
  slug,
  path,
  otherLocalPath,
) {
  const { job } = await getCarreerSlugProps(lang, slug);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: job.title,
    description: job.summary,
  });
  return md;
}
export async function generateBlogMetadata(lang, path, otherLocalPath) {
  const { list } = await getBlogProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: "blog.header",
    shareImg: (list && list[0]?.cover) || null,
  });
  return md;
}

export async function generateBlogSlugMetadata(
  lang,
  slug,
  path,
  otherLocalPath,
) {
  const { item } = await getBlogSlugProps(lang, slug);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: item.title,
    description: item.summary,
    shareImg: item?.cover || null,
  });
  return md;
}

export async function generateImpressumMetadata(lang, path, otherLocalPath) {
  const { list } = await getImpressumProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: "imprint.title",
  });
  return md;
}

export async function generatePrivacyMetadata(lang, path, otherLocalPath) {
  const { list } = await getPrivacyProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: "privacy.title",
  });
  return md;
}

export async function generateTermsMetadata(lang, path, otherLocalPath) {
  const { list } = await getTermsProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
    title: "terms.title",
  });
  return md;
}

export async function generateAboutMetadata(lang, path, otherLocalPath) {
  const { content } = await getAboutProps(lang);
  const md = await generateGenericMetadata({
    path: path,
    language: lang,
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
