import { useI18n } from "../lib/i18n";

import Button from "./Button";

import useIntersectionOberserver from "../lib/useIntersectionOberserver";

const scrollSnapStyle = {
  scrollSnapAlign: "start",
  scrollMarginTop: "200px",
};

export default function FrontpageListItem({ item, side }) {
  const rotate = side === "left" ? "md:-translate-x-8" : "md:translate-x-8";
  const imgRef = useIntersectionOberserver(rotate);
  const { t } = useI18n();
  return (
    <div
      className={`flex flex-col-reverse md:flex-row items-center my-32 md:my-64 md:space-x-16 ${
        side === "left" && "md:flex-row-reverse md:space-x-reverse"
      }`}
      style={scrollSnapStyle}
    >
      <div className="mt-8 md:mt-0 w-full md:w-1/2">
        <h3>{item.frontpageTitle || item.title}</h3>
        <p className="my-8">{item.summary}</p>
        <Button href={`/${item.collection}/${item.slug}`}>
          {t("website.more")}
        </Button>
      </div>
      <img
        alt={`${item.frontpageTitle || item.title} Teaser`}
        className={`rounded transform transition-transform duration-1000 md:w-1/2 ${rotate}`}
        ref={imgRef}
        src={item.frontpageImage || item.cover}
      />
    </div>
  );
}
