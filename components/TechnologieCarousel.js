import dynamic from "next/dynamic";
import Image from "next/image";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";

import React, { useLayoutEffect, useState } from "react";

import "pure-react-carousel/dist/react-carousel.es.css";
import styles from "./Carousel.module.css";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function TechnologyCarousel({ slides }) {
  const [width] = useWindowSize();
  return (
    <div className="mx-auto px-8 prose prose-xl max-w-screen-lg">
      <CarouselProvider
        className={`${styles.carousel}`}
        visibleSlides={width < 768 ? 3 : 5}
        interval={3000}
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
                  <Image
                    alt={technology.title}
                    className="w-20 h-20"
                    layout="fill"
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
