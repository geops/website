import getContentList from "../lib/getContentList";

const yearInMilliseconds = 31557600000;
function getAgeRank(input) {
  var ageInYears = (Date.now() - new Date(input)) / yearInMilliseconds;

  if (isNaN(ageInYears) || ageInYears < 1) {
    return 2;
  } else if (ageInYears < 2) {
    return 1;
  }
  return 0;
}

function getTagRank(a, b) {
  const aCount = a.tags?.length || 0;
  const bCount = b.tags?.length || 0;
  const matchCount = a.tags?.filter((tag) => b.tags?.includes(tag)).length || 0;
  const fraction = Math.max(aCount - matchCount + (bCount - matchCount), 1);
  return Math.round((matchCount * 3) / fraction);
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
      const tag = getTagRank(relatedItem, item);
      relatedItem.rank = { age, tag, sum: age + tag };
      return relatedItem;
    })
    .sort((a, b) => a.rank.sum - b.rank.sum)
    .reverse();

  // Limit list length to 2, 4 or 6 items.
  const listLengthEven = 2 * Math.floor(list.length / 2);
  const listLimit = Math.min(Math.max(listLengthEven, listMin), listMax);

  return list.slice(0, listLimit);
}
