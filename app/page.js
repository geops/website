import getContentList from "../lib/getContentList.js";
import Home from "./home.js";
import Website from "./website.js";

export async function getProps(language) {
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
  return { items, language, slides };
}

export default async function Page(context) {
  const {
    params: { lang = "de" },
  } = context;
  const props = await getProps(lang);
  return <Home {...props} />;
}
