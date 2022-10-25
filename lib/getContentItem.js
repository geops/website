import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import imageSize from "image-size";
import readingTime from "reading-time";

const markdownImagePathRegExp = /!\[[^\]]*\]\((.*?)(?=\"|\))(\".*\")?\)/g;
const desktopImagePathRegExp = /desktop="(.*?)"/g;
const mobileImagePathRegExp = /mobile="(.*?)"/g;

function getImageSizes(content, imageFields = []) {
  return Object.fromEntries(
    [
      ...Array.from(content.matchAll(markdownImagePathRegExp), (m) => m[1]),
      ...Array.from(content.matchAll(desktopImagePathRegExp), (m) => m[1]),
      ...Array.from(content.matchAll(mobileImagePathRegExp), (m) => m[1]),
      ...imageFields,
    ]
      .filter((i) => i)
      .map((path) => {
        const clean = path
          .replace(/%20/g, " ")
          .replace(/%28/g, "(")
          .replace(/%29/g, ")")
          .trim();
        try {
          return [path.trim(), imageSize(join(process.cwd(), "public", clean))];
        } catch (error) {
          console.error(`Could not get image size for ${path}`);
        }
      })
      .filter((i) => i)
  );
}

export default function getContentItem(language, collection, path, fields) {
  const itemPath = join(process.cwd(), "content", collection, path);

  if (fs.existsSync(itemPath) === false) {
    throw Error(`Item for content/${collection}/${path} is missing.`);
  }

  let data;
  if (fs.existsSync(join(itemPath, "index.de.md"))) {
    const content = {
      de: matter(fs.readFileSync(join(itemPath, "index.de.md"), "utf8")),
      en: matter(fs.readFileSync(join(itemPath, "index.en.md"), "utf8")),
    };
    data = { ...content["en"].data, ...content[language].data };
    data.body = content[language].content;
    const imageFields = (fields || [])
      .map((field) => data[field])
      .filter((f) => typeof f === "string" && f.startsWith("/images/"));
    data.imageSizes = getImageSizes(data.body, imageFields);

    if (data.slug) {
      data.slugByLocale = {};
      Object.entries(content).forEach(([locale, contentByLocale]) => {
        data.slugByLocale[locale] = "/" + contentByLocale.data.slug;
      });
    }
  } else if (path.endsWith(".json")) {
    const content = JSON.parse(fs.readFileSync(itemPath, "utf8"));
    data = content[language]
      ? { ...content.en, ...content[language] }
      : content;
  }

  let item;
  if (fields) {
    item = { collection, imageSizes: data.imageSizes || {} };
    fields.forEach((field) => {
      if (field === "readingTime") {
        item[field] = Math.ceil(readingTime(data.body).minutes);
      } else if (data[field]) {
        item[field] = data[field];
      }
    });
  } else {
    item = { ...data, collection };
  }

  if (item.created instanceof Date) {
    item.created = item.created.toJSON();
  }

  return item;
}
