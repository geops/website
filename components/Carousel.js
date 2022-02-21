import dynamic from "next/dynamic";
import Image from "next/image";
import { CarouselProvider, DotGroup, Slider, Slide } from "pure-react-carousel";
import { useRef } from "react";
import { useI18n } from "../lib/i18n";
import useIntersectionOberserver from "../lib/useIntersectionOberserver";
import Button from "./Button.js";
import CaretIcon from "./icons/CaretIcon.js";
import "pure-react-carousel/dist/react-carousel.es.css";
import styles from "./Carousel.module.css";
const CarouselKeyboardNavigation = dynamic(
  () => import("./CarouselKeyboardNavigation"),
  { ssr: false }
);
export default function Carousel({ slides }) {
  const { t } = useI18n();
  const containerRef = useRef(null);
  const intersectionRef = useIntersectionOberserver("noo", 0);
  return (
    <div className="relative">
      <div ref={intersectionRef} className={styles.intersectionContainer} />
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
          <CarouselKeyboardNavigation />
          <Slider
            aria-label="Slider"
            className="relative h-screen overflow-hidden bg-gray-darker"
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
                    {slide.imageMobile && (
                      <div className="lg:hidden">
                        <Image
                          alt={slide.title}
                          className="h-full w-full object-cover"
                          layout="fill"
                          priority
                          src={slide.imageMobile}
                        />
                      </div>
                    )}
                    <div className={slide.imageMobile ? "hidden lg:block" : ""}>
                      <Image
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        layout="fill"
                        priority
                        src={slide.image}
                      />
                    </div>
                    <div className="absolute inset-0 mx-4 flex flex-col items-center justify-center space-y-8">
                      <div
                        data-cy="pageMainTitle"
                        className="text-shadow -mt-32 max-w-screen-sm break-words text-center text-4xl font-black leading-normal text-white md:text-5xl md:leading-normal lg:-mt-16"
                      >
                        {slide.title}
                      </div>
                      {slide.summary && (
                        <h2 className="text-shadow max-w-screen-sm text-center text-xl text-white">
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
          <DotGroup className="absolute right-8 bottom-32 hidden font-bold text-white lg:block" />
          <button
            aria-label={t("website.down")}
            className="absolute bottom-32 left-1/2 -ml-8 w-16 animate-pulse text-white focus:ring-0"
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
