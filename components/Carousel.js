import dynamic from "next/dynamic";
import { CarouselProvider, DotGroup, Slider, Slide } from "pure-react-carousel";
import { useRef } from "react";

import { useI18n } from "../lib/i18n";

import Button from "./Button.js";
import CaretIcon from "./icons/CaretIcon.js";
import CarouselAutoResumePlaying from "./CarouselAutoResumePlaying.js";

import "pure-react-carousel/dist/react-carousel.es.css";
import styles from "./Carousel.module.css";

const CarouselKeyboardNavigation = dynamic(
  () => import("./CarouselKeyboardNavigation"),
  { ssr: false }
);

export default function Carousel({ slides }) {
  const containerRef = useRef(null);
  const { t } = useI18n();
  return (
    <div className="relative">
      <div className="h-screen" />
      <div ref={containerRef} className="fixed top-16 h-screen w-full">
        <CarouselProvider
          className={`${styles.carousel}`}
          infinite
          isPlaying
          lockOnWindowScroll
          naturalSlideWidth={1600}
          naturalSlideHeight={1200}
          totalSlides={slides.length}
        >
          <CarouselAutoResumePlaying />
          <CarouselKeyboardNavigation />
          <Slider
            aria-label="Slider"
            className="bg-gray-darker h-screen overflow-hidden relative"
            classNameAnimation="transition ease-in-out duration-1000"
          >
            {slides.map((slide) => (
              <Slide index={slide.weight} key={slide.weight}>
                {slide.video ? (
                  <video
                    className="h-full object-cover"
                    autoPlay
                    playsInline
                    preload="auto"
                    poster={slide.image}
                    src={slide.video}
                  />
                ) : (
                  <div className="relative h-screen overflow-hidden">
                    <picture>
                      {slide.imageMobile && (
                        <source
                          media="(max-width: 1023px)"
                          srcSet={slide.imageMobile}
                        />
                      )}
                      <source
                        media="(min-width: 1024px)"
                        srcSet={slide.image}
                      />
                      <img
                        alt={slide.title}
                        className="object-cover h-full w-full"
                        src={slide.image}
                      />
                    </picture>
                    <div className="absolute inset-0 flex flex-col space-y-8 items-center justify-center">
                      <h1 className="break-words text-white text-center max-w-screen-sm leading-normal text-shadow -mt-16">
                        {slide.title}
                      </h1>
                      {slide.summary && (
                        <h2 className="max-w-screen-sm text-center text-xl text-white text-shadow">
                          {slide.summary}
                        </h2>
                      )}
                      {slide.link && (
                        <Button href={slide.link}>{t("website.more")}</Button>
                      )}
                    </div>
                  </div>
                )}
              </Slide>
            ))}
          </Slider>
          <DotGroup className="absolute right-8 bottom-32 text-white font-bold hidden lg:block" />
          <button
            aria-label={t("website.down")}
            className="absolute w-16 bottom-32 left-1/2 focus:ring-0 text-white -ml-8 animate-pulse"
            onClick={() =>
              window.scroll({
                top: containerRef.current.clientHeight,
                behavior: "smooth",
              })
            }
          >
            <CaretIcon direction="bottom" />
          </button>
        </CarouselProvider>
      </div>
    </div>
  );
}
