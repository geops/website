import Image from "next/image";
import Link from "next/link";
import React from "react";

function CasesGridItem({
  slug,
  title,
  gridImage,
  gridWidthFull,
  tags,
  imageSizes,
}) {
  return (
    <Link
      href={`cases/${slug}`}
      className={`group flex flex-col overflow-hidden gap-4 justify-center ${
        gridWidthFull ? "md:col-span-2" : ""
      }`}
    >
      {gridImage && (
        <div className="rounded-xl overflow-hidden">
          <Image
            src={gridImage}
            alt={title}
            className="w-full rounded-xl group-hover:scale-105 transition-all duration-500 object-cover h-[clamp(300px,50vw,500px)]"
            height={imageSizes[gridImage]?.height}
            width={imageSizes[gridImage]?.width}
          />
        </div>
      )}
      <div className="text-xl font-bold text-white">{title}</div>
      <div className="flex items-center">
        {tags?.map((tag) => (
          <span
            key={tag}
            className="inline-block text-green-dark rounded px-2 py-1 text-xs font-semibold mr-2 border-green-dark border text-green-dark group-hover:text-green transition-colors duration-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default CasesGridItem;
