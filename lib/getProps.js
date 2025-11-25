import getContentList from "./getContentList";
import getContentBySlug from "./getContentBySlug";
import getRelatedContentList from "./getRelatedContentList";
import getContentItem from "./getContentItem";
import generateFeeds from "./generateFeeds";

export async function getHomeProps(language) {
  const customers = getContentList(language, {
    collections: ["customer"],
    fields: ["name", "logo"],
  });

  const items = getContentList(language, {
    collections: ["blog", "solution"],
    fields: [
      "cover",
      "frontpageTitle",
      "frontpageImage",
      "frontpageWeight",
      "summary",
      "slug",
      "title",
    ],
    where: { frontpage: true, published: true },
    order: [{ frontpageWeight: "asc" }],
  });
  const slides = getContentList(language, {
    collections: ["slide"],
    fields: [
      "title",
      "summary",
      "weight",
      "image",
      "imageMobile",
      "link",
      "video",
    ],
  });
  slides.sort((a, b) => a.weight - b.weight);
  return { customers, items, language, slides };
}

export async function getSolutionProps(language) {
  const solutions = getContentList(language, {
    collections: ["solution"],
    fields: [
      "color",
      "gridImage",
      "logo",
      "summary",
      "slug",
      "title",
      "weight",
    ],
    order: [{ weight: "asc" }],
  });
  return { language, solutions };
}

export async function getSolutionSlugProps(language, slug) {
  const solution = getContentBySlug(language, "solution", slug);
  const related = getRelatedContentList(language, solution);
  return { language, related, solution };
}

export async function getNewsletterProps(language) {
  const content = getContentItem(language, "page", "newsletter.json");
  return { content, language };
}

export async function getCarreerProps(language) {
  const jobs = getContentList(language, {
    collections: ["job"],
    fields: ["title", "summary", "slug"],
  });
  const content = getContentItem(language, "page", "career.json");

  return { language, content, jobs };
}
export async function getCarreerSlugProps(language, slug) {
  const job = getContentBySlug(language, "job", slug);
  const content = getContentItem(language, "page", "job.json");
  return { language, content, job };
}

export async function getBlogProps(language) {
  const list = getContentList(language, {
    collections: ["blog"],
    fields: ["cover", "created", "title", "summary", "slug", "readingTime"],
    order: [{ created: "desc" }],
  });
  generateFeeds(list, language);
  return { language, list };
  fcts;
}
export async function getBlogSlugProps(language, slug) {
  const item = getContentBySlug(language, "blog", slug);
  const related = getRelatedContentList(language, item);

  return { language, item, related };
}

export async function getImpressumProps(language) {
  const content = getContentItem(language, "page", "imprint.json");
  return { content, language };
}

export async function getPrivacyProps(language) {
  const content = getContentItem(language, "page", "privacy.json");
  return { content, language };
}

export async function getTermsProps(language) {
  const content = getContentItem(language, "page", "terms.json");
  return { content, language };
}

export async function getAboutProps(language) {
  const team = getContentList(language, {
    collections: ["person"],
    fields: ["name", "photo", "position", "email", "telephone", "github"],
    order: [
      {
        photo: "asc",
        compareFunction: (a, b) => {
          const aIsAvatar = a["photo"].includes("avatar");
          const bIsAvatar = b["photo"].includes("avatar");
          if (aIsAvatar && !bIsAvatar) {
            return 1;
          }
          if (!aIsAvatar && bIsAvatar) {
            return -1;
          }
          return 0;
        },
      },
    ],
  });
  const content = getContentItem(language, "page", "about.json");

  const technologies = getContentList(language, {
    collections: ["technology"],
    fields: ["title", "weight", "image"],
    order: [{ weight: "asc" }],
  });
  return { content, language, team, technologies };
}
const fcts = {
  getHomeProps,
  getSolutionProps,
  getSolutionSlugProps,
  getNewsletterProps,
  getCarreerProps,
  getCarreerSlugProps,
  getBlogProps,
  getBlogSlugProps,
  getImpressumProps,
  getPrivacyProps,
  getAboutProps,
};

export default fcts;
