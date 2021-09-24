import { useI18n } from "../lib/i18n";
import CaretIcon from "./icons/CaretIcon";
import Link from "./Link";
import { useEffect, useState } from "react";
import FastAverageColor from 'fast-average-color';

export default function BlogListItem({ item }) {
  const { language, t } = useI18n();
  const created = new Date(item.created);
  useEffect(() => {
    const fac = new FastAverageColor();
    let img
    if(item.cover != undefined) {
      img = document.createElement('img')
      img.src = item.cover
      
    fac.getColorAsync(img)
        .then(color => {
          item["color"] = color.hex
        })
        .catch(() => {
          item["color"] = '#000000'
        })
    } else {
      item["color"] = '#000000'
    }
  });
  
  return (
    <Link href={`/blog/${item.slug}`}>
      <article className="container mx-auto lg:w-4/6 px-8 py-16 border-white border-b-2 flex items-center cursor-pointer group">
        {item.cover && (
          <div 
          style={{ backgroundColor: item.color }}
          className="img-container hidden lg:block flex-none mr-8 xl:mr-16 rounded">
            <img
              alt={`${item.title} Teaser`}
              className="object-cover rounded h-64 w-64 xl:h-96 xl:w-96"
              src={item.cover}
              loading="lazy"
            />
          </div>
        )}
        <div className="break-words min-w-0">
          <div className="text-gray">
            {created.toLocaleDateString(language)}
            <span> | </span>
            {item.readingTime} min {t("website.readingTime")}
          </div>
          <h2 className="text-blue text-4xl font-bold my-4">
            <Link href={`/blog/${item.slug}`}>{item.title}</Link>
          </h2>
          <p>{item.summary}</p>
          <div className="flex items-center text-blue mt-8">
            {t("website.readMore")}
            <div className="w-6 ml-2 mt-1 transition duration-300 transform group-hover:translate-x-2">
              <CaretIcon direction="right" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}