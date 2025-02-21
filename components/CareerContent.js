import Image from "next/image";
import { useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

import ArrowCircleIcon from "./icons/ArrowCircleIcon.js";
import CaretIcon from "./icons/CaretIcon.js";
import Button from "./Button";
import Hero from "./Hero.js";

const { screens } = resolveConfig(tailwindConfig).theme;

function CareerAccordion({ items, reverse }) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="grid-cols-6 gap-8 sm:grid">
      <div
        className={`relative z-10 col-span-3 mx-0 mb-8 block sm:top-0 ${
          reverse ? "order-last" : ""
        }`}
      >
        <div className="bg-white sm:top-24">
          {items.map((item, index) => {
            // if (index === 0) {
            //   return (
            //     <Image
            //       alt={item.title}
            //       className={`transition-opacity duration-500 ${
            //         activeItem === index ? "opacity-100" : "opacity-0"
            //       }`}
            //       key={index}
            //       fill
            //       src={`/images/career/${item.image}`}
            //       objectFit="cover"
            //     />
            //   );
            // }

            return (
              <div
                key={index}
                className={`relative top-0 aspect-[650/419] w-full sm:absolute ${
                  activeItem === index ? "opacity-100" : "h-0 opacity-0"
                }`}
                // className={`absolute top-0 aspect-[650/419] w-full transition-opacity duration-500 ${
                //   activeItem === index ? "opacity-100" : "h-0 opacity-0"
                // }`}
              >
                <Image
                  alt={item.title}
                  fill
                  src={`/images/career/${item.image}`}
                  objectFit="cover"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-3 space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 text-base transition-colors duration-500 hover:cursor-pointer ${
              activeItem === index ? "bg-gray-lightest" : ""
            }`}
            onClick={(event) => {
              if (activeItem === index) {
              }
              setActiveItem(index);
              const { currentTarget } = event;
              setTimeout(() => {
                const { bottom, top, height } =
                  currentTarget.getBoundingClientRect();

                let headerHeight = 80;
                const isSmallWidth = window.matchMedia(
                  `(max-width: ${screens.sm})`,
                ).matches;
                if (isSmallWidth) {
                  // on small screen add offset for accordion image
                  const aspectRatio = 650 / 419;
                  headerHeight = headerHeight + window.innerWidth / aspectRatio;
                }
                if (
                  !isSmallWidth &&
                  (top < headerHeight || bottom > window.innerHeight)
                ) {
                  const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
                  window.scroll({
                    behavior: "smooth",
                    top: top + scrollTop - headerHeight - height,
                  });
                } else {
                  // on small screen scroll only when the bottom is out the window
                  if (bottom > window.innerHeight) {
                    currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
                  }
                }
              });
            }}
          >
            <div className="flex items-center justify-between space-x-2 font-extrabold uppercase text-gray-darker">
              <span>{item.title}</span>
              <div
                className={`w-8 shrink-0 rounded-full bg-green p-1 text-white transition-transform duration-500 ${
                  activeItem === index ? "" : "rotate-180"
                }`}
              >
                <CaretIcon />
              </div>
            </div>
            <p
              className={`text-gray-dark transition-opacity duration-500 ${
                activeItem === index ? "mt-4 opacity-100" : "opacity-0"
              }`}
            >
              {activeItem === index ? item.content : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CareerContent({ content }) {
  return (
    <>
      <Hero title={content.heroTitle}>
        <p className="mt-6 font-bold">{content.heroSummary}</p>
      </Hero>
      <div className="container mx-auto -mt-24 mb-32 space-y-8 px-4 lg:-mt-36 lg:px-20">
        <p className="max-w-5xl">{content.matchText}</p>
        <Button href="#open-positions">
          <div className="flex items-center space-x-4">
            <div className="whitespace-nowrap">{content.jumpButton}</div>
            <div className="h-8 w-8">
              <ArrowCircleIcon />
            </div>
          </div>
        </Button>
        <h2 className="pt-16">{content.offerTitle}</h2>
        <CareerAccordion items={content.first} />
        <CareerAccordion items={content.second} reverse />
      </div>
    </>
  );
}
