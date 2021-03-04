import getContentList from "../lib/getContentList";

const yearInMilliseconds = 31557600000;
function getAgeRank(input) {
  var ageInYears = (Date.now() - new Date(input)) / yearInMilliseconds;
  if (ageInYears < 1) {
    return 2;
  } else if (ageInYears < 2) {
    return 1;
  }
  return 0;
}

function getColRank(collection) {
  return collection === "solution" ? 3 : 0;
}

function getTagRank(a, b) {
  return a.tags && b.tags ? a.tags.filter((x) => b.tags.includes(x)).length : 0;
}

const listMin = 2;
const listMax = 6;

export default function getRelatedContentList(language, item) {
  const list = getContentList(language, {
    collections: ["solution", "blog"],
    fields: [
      "cover",
      "created",
      "readingTime",
      "slug",
      "summary",
      "tags",
      "title",
    ],
  })
    .filter((relatedItem) => relatedItem.slug !== item.slug)
    .map((relatedItem) => {
      const age = getAgeRank(relatedItem.created);
      const col = getColRank(relatedItem.collection);
      const tag = getTagRank(relatedItem, item);
      relatedItem.rank = { age, col, tag, sum: age + col + tag };
      return relatedItem;
    })
    .sort((a, b) => a.rank.sum - b.rank.sum)
    .reverse();

  // Limit list length to 2, 4 or 6 items.
  const listLengthEven = 2 * Math.floor(list.length / 2);
  const listLimit = Math.min(Math.max(listLengthEven, listMin), listMax);

  return list.slice(0, listLimit);
}
