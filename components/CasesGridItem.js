import Image from "next/image";
import Link from "next/link";
import React from "react";

function CasesGridItem({ slug, title, gridImage, gridWidthFull, imageSizes }) {
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
    </Link>
  );
}

export default CasesGridItem;
