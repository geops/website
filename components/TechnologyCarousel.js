import Image from "next/image";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import React, { useLayoutEffect, useState } from "react";

import "pure-react-carousel/dist/react-carousel.es.css";

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
        visibleSlides={width < 768 ? 3 : 5}
        interval={3000}
        infinite
        isPlaying
        lockOnWindowScroll
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={slides.length}
      >
        <Slider
          aria-label="Slider"
          className="overflow-hidden"
          classNameAnimation="transition ease-in-out duration-1000"
        >
          {slides.map((technology) => (
            <Slide key={technology.image} className="text-center">
              <Image
                alt={technology.title}
                width="80"
                height="80"
                src={technology.image}
              />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </div>
  );
}
