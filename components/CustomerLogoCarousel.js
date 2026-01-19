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

export default function CustomerLogoCarousel({ customers = [] }) {
  const [width] = useWindowSize();
  return (
    <div className="">
      <CarouselProvider
        visibleSlides={Math.max(Math.floor(width / 300), 1)}
        interval={3000}
        infinite
        isPlaying
        lockOnWindowScroll
        naturalSlideWidth={300}
        naturalSlideHeight={300}
        totalSlides={customers.length}
      >
        <Slider
          aria-label="Slider"
          className="overflow-hidden"
          classNameAnimation="transition ease-in-out duration-1000 h-32"
        >
          {customers
            .filter((c) => c.logo)
            .map((customer) => (
              <Slide
                key={customer.name}
                innerClassName="items-center justify-center flex p-6"
              >
                <Image
                  alt={customer.name}
                  width="300"
                  height="300"
                  src={customer.logo}
                />
              </Slide>
            ))}
        </Slider>
      </CarouselProvider>
    </div>
  );
}
