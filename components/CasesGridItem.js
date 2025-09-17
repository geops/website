import Image from "next/image";
import Link from "next/link";
import React from "react";

function CasesGridItem({ slug, title, gridImage, tags, imageSizes }) {
  console.log(tags);

  return (
    <Link href={`/cases/${slug}`}>
      <div className="group flex justify-between flex-col transition-all duration-500 hover:scale-105 rounded-xl overflow-hidden">
        {gridImage && (
          <div className="flex-4">
            <Image
              src={gridImage}
              alt={title}
              className="w-full rounded-xl"
              height={imageSizes[gridImage]?.height}
              width={imageSizes[gridImage]?.width}
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block text-green-dark rounded px-2 py-1 text-xs font-semibold mr-2 border-green-dark border text-green-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default CasesGridItem;
