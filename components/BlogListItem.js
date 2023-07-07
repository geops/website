import Image from "next/image";

import { useI18n } from "../lib/i18n";
import CaretIcon from "./icons/CaretIcon";
import Link from "./Link";
export default function BlogListItem({ item }) {
  const { language, t } = useI18n();
  const created = new Date(item.created);
  return (
    <Link href={`/blog/${item.slug}`}>
      <article className="group container mx-auto flex cursor-pointer items-center border-b-2 border-white px-8 py-16 lg:w-4/6">
        {item.cover && (
          <div className="relative mr-8 hidden h-64 w-64 flex-none overflow-hidden rounded bg-gray-darker lg:block xl:mr-16 xl:h-96 xl:w-96">
            <Image
              alt={`${item.title} Teaser`}
              className="object-cover"
              fill
              src={item.cover}
            />
          </div>
        )}
        <div className="min-w-0 break-words">
          <div className="text-gray">
            {created.toLocaleDateString(language)}
            <span> | </span>
            {item.readingTime} min {t("website.readingTime")}
          </div>
          <h2 className="my-4 text-4xl font-bold text-blue">
            <Link href={`/blog/${item.slug}`}>{item.title}</Link>
          </h2>
          <p>{item.summary}</p>
          <div className="mt-8 flex items-center text-blue">
            {t("website.readMore")}
            <div className="ml-2 mt-1 w-6 transition duration-300 group-hover:translate-x-2">
              <CaretIcon direction="right" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
