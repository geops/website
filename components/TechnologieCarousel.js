import dynamic from "next/dynamic";
import { CarouselProvider, DotGroup, Slider, Slide } from "pure-react-carousel";

import "pure-react-carousel/dist/react-carousel.es.css";
import styles from "./Carousel.module.css";

const CarouselKeyboardNavigation = dynamic(
  () => import("./CarouselKeyboardNavigation"),
  { ssr: false }
);

export default function TechnologieCarousel({ slides }) {
  return (
    <div className="mx-auto px-8 prose prose-xl max-w-screen-lg">
        <CarouselProvider
          className={`${styles.carousel}`}
          visibleSlides={5}
          infinite
          isPlaying
          lockOnWindowScroll
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={slides.length}
        >
          <Slider
            aria-label="Slider"
            className="overflow-hidden"
            classNameAnimation="transition ease-in-out duration-1000"
          >
            {slides.map((technology) => (
              <Slide index={technology.weight} key={technology.weight}>
                <div className="overflow-hidden">
                    <picture className="flex align-center justify-center">
                      <img
                        className="w-20 h-20"
                        alt={technology.title}
                        src={technology.image}
                      />
                    </picture>
                  </div>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
  );
}
