import Image from "next/image";
import { useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import { useI18n } from "../lib/i18n";
import tailwindConfig from "../tailwind.config.js";

import ArrowCircleIcon from "./icons/ArrowCircleIcon.js";
import CaretIcon from "./icons/CaretIcon.js";
import Button from "./Button";
import Hero from "./Hero.js";

const { screens } = resolveConfig(tailwindConfig).theme;

function CareerAccordion({ items, reverse }) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="grid-cols-5 gap-8 sm:grid">
      <div
        className={`sticky top-16 z-10 col-span-3 -mx-4 mt-8 sm:relative sm:top-0 sm:mx-0 ${
          reverse ? "order-last" : ""
        }`}
      >
        <div className="sticky top-16 aspect-[650/419] bg-white sm:top-24">
          {items.map((item, index) => {
            if (index === 0) {
              return (
                <Image
                  alt={item.title}
                  className={`transition-opacity duration-500 ${
                    activeItem === index ? "opacity-100" : "opacity-0"
                  }`}
                  key={index}
                  layout="fill"
                  src={`/images/career/${item.image}`}
                />
              );
            }

            return (
              <div
                key={index}
                className={`absolute top-0 aspect-[650/419] w-full transition-opacity duration-500 ${
                  activeItem === index ? "opacity-100" : "h-0 opacity-0"
                }`}
              >
                <Image
                  alt={item.title}
                  layout="fill"
                  src={`/images/career/${item.image}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-2 space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 text-base transition-colors duration-500 hover:cursor-pointer ${
              activeItem === index ? "bg-gray-lightest" : ""
            }`}
            onClick={(event) => {
              setActiveItem(index);
              const { currentTarget } = event;
              setTimeout(() => {
                const { bottom, top } = currentTarget.getBoundingClientRect();

                let headerHeight = 80;
                if (window.matchMedia(`(max-width: ${screens.sm})`).matches) {
                  // on small screen add offset for accordion image
                  const aspectRatio = 650 / 419;
                  headerHeight = headerHeight + window.innerWidth / aspectRatio;
                }

                if (top < headerHeight || bottom > window.innerHeight) {
                  const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
                  window.scroll({
                    behavior: "smooth",
                    top: top + scrollTop - headerHeight,
                  });
                }
              });
            }}
          >
            <div className="flex items-center justify-between space-x-2 font-extrabold uppercase text-gray-darker">
              <span>{item.title}</span>
              <div
                className={`w-8 rounded-full bg-green p-1 text-white transition-transform duration-500 ${
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
  const { t } = useI18n();

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
