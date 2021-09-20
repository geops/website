import Image from "next/image";

import MoreIcon from "./icons/MoreIcon";
import Link from "./Link";

export default function SolutionGridItem({ position, remaining, solution }) {
  let imageContainerClassName = "";
  let sectionClassName = "";
  if (position === 1 && remaining === 0) {
    sectionClassName = "flex";
  } else if ((position === 0 || position === 4) && remaining === 1) {
    imageContainerClassName = "xl:block md:max-w-md -m-2 ml-8";
    sectionClassName = "xl:col-span-2 flex";
  } else if (position === 0 || position === 7) {
    // wide item
    imageContainerClassName =
      "md:block md:max-w-sm lg:max-w-lg xl:max-w-lg 2xl:max-w-xl -m-2 ml-8 w-full";
    sectionClassName = "md:col-span-2 flex";
  } else if (position === 1 || position === 4) {
    // heigh item
    imageContainerClassName = "md:block -m-2 h-full";
    sectionClassName = "md:row-span-2 flex-col";
  }

  const color = solution.color === "white" ? "currentColor" : "white";
  return (
    <Link href={`/solution/${solution.slug}`}>
      <a
        className={`${sectionClassName} flex group justify-between overflow-hidden rounded transition-all duration-500 hover:p-2 hover:-m-2 relative`}
        style={{ backgroundColor: solution.color, color }}
      >
        <div className="flex flex-col justify-between m-8 overflow-hidden">
          <div className="mb-4">
            <div className="h-16 mb-4 relative">
              {solution.logo && (
                <Image
                  alt={`${solution.title} Logo`}
                  className="h-full object-contain object-left"
                  layout="fill"
                  src={solution.logo}
                />
              )}
            </div>
            <h2 className="break-words mb-4">{solution.title}</h2>
            <div>{solution.summary}</div>
          </div>
          <div className="group-hover:translate-x-4 transform transition-all duration-500 w-8">
            <MoreIcon />
          </div>
        </div>
        {imageContainerClassName && solution.gridImage && (
          <div className={`relative ${imageContainerClassName}`}>
            <Image
              alt={`${solution.title} Teaser`}
              className="object-contain object-right"
              layout="fill"
              src={solution.gridImage}
            />
          </div>
        )}
      </a>
    </Link>
  );
}
