import Image from "next/image";

import { useI18n } from "../lib/i18n";
import useIntersectionOberserver from "../lib/useIntersectionOberserver";
import Button from "./Button";

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
      className={`my-32 flex flex-col-reverse items-center md:my-64 md:flex-row md:space-x-16 ${
        side === "left" && "md:flex-row-reverse md:space-x-reverse"
      }`}
      style={scrollSnapStyle}
    >
      <div className="mt-8 w-full md:mt-0 md:w-1/2">
        <h3 className="text-3xl font-extrabold">
          {item.frontpageTitle || item.title}
        </h3>
        <p className="my-8">{item.summary}</p>
        <Button href={`/${item.collection}/${item.slug}`}>
          {t("website.more")}
        </Button>
      </div>
      <div
        className={`transition-transform duration-1000 ${rotate} relative h-96 w-full md:w-1/2`}
        ref={imgRef}
      >
        <Image
          alt={`${item.frontpageTitle || item.title} Teaser`}
          className="object-contain"
          fill
          src={item.frontpageImage || item.cover}
        />
      </div>
    </div>
  );
}
