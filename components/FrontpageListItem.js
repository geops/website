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
      className={`flex flex-col-reverse md:flex-row items-center my-32 md:my-64 md:space-x-16 ${
        side === "left" && "md:flex-row-reverse md:space-x-reverse"
      }`}
      style={scrollSnapStyle}
    >
      <div className="mt-8 md:mt-0 w-full md:w-1/2">
        <h3 className="font-extrabold text-3xl">
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
          layout="fill"
          src={item.frontpageImage || item.cover}
        />
      </div>
    </div>
  );
}
