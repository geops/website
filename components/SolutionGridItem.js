import Image from "next/image";

import MoreIcon from "./icons/MoreIcon";
import Link from "./Link";

export default function SolutionGridItem({ position, remaining, solution }) {
  let imageContainerClassName = "";
  let imageInnerContainerClassName = "";
  let sectionClassName = "";
  if (position === 1 && remaining === 0) {
    sectionClassName = "flex";
  } else if ((position === 0 || position === 4) && remaining === 1) {
    imageContainerClassName = "xl:block md:max-w-md";
    sectionClassName = "xl:col-span-2 flex";
  } else if (position === 0 || position === 7) {
    // wide item
    imageContainerClassName =
      "flex flex-col md:max-w-sm lg:max-w-lg xl:max-w-lg 2xl:max-w-xl md:w-full justify-center ";
    imageInnerContainerClassName = "md:block w-full";
    sectionClassName = "md:col-span-2 flex-col sm:flex-row";
  } else if (position === 1 || position === 4) {
    // heigh item
    imageContainerClassName = "md:block h-full";
    sectionClassName = "md:row-span-2 flex-col";
  }

  const color = solution.color === "white" ? "currentColor" : "white";
  return (
    <Link href={`/solution/${solution.slug}`}>
      <a
        className={`${sectionClassName} flex group justify-between overflow-hidden rounded transition-all duration-500 hover:p-2 hover:-m-2 relative`}
        style={{ backgroundColor: solution.color, color }}
      >
        <div className="flex flex-col justify-between m-4 sm:m-8">
          <div className="mb-4">
            {solution.logo && (
              <div className="h-16 mb-4 relative">
                <Image
                  alt={`${solution.title} Logo`}
                  className="h-full object-contain object-left"
                  layout="fill"
                  src={solution.logo}
                />
              </div>
            )}
            <h2 className="break-words mb-4">{solution.title}</h2>
            <div>{solution.summary}</div>
          </div>
          <div
            className="group-hover:translate-x-4 transition-all duration-500 w-8"
            data-testid="more"
          >
            <MoreIcon />
          </div>
        </div>
        {imageContainerClassName && solution.gridImage && (
          <div className={`-m-2 ${imageContainerClassName}`}>
            {/* Inner container is used to center vertically the images in wide items  */}
            <div className={`${imageInnerContainerClassName}`}>
              <Image
                alt={`${solution.title} Teaser`}
                className="object-contain object-right w-full h-full"
                layout="responsive"
                src={solution.gridImage}
                height={solution.imageSizes[solution.gridImage].height}
                width={solution.imageSizes[solution.gridImage].width}
              />
            </div>
          </div>
        )}
      </a>
    </Link>
  );
}
