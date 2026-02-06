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
  const customersWithLogos = customers.filter((c) => c.logo);
  return (
    <div className="">
      <CarouselProvider
        visibleSlides={Math.max(Math.floor(width / 250), 1)}
        interval={3000}
        isPlaying
        lockOnWindowScroll
        naturalSlideWidth={250}
        naturalSlideHeight={250}
        totalSlides={customersWithLogos.length}
      >
        <Slider
          aria-label="Slider"
          className="overflow-hidden"
          classNameAnimation="transition ease-in-out duration-1000 h-32 w-auto"
        >
          {customersWithLogos
            // Shuffle logos
            .map((customer) => {
              customer.sortWeight = Math.random();
              return customer;
            })
            .sort((a, b) => a.sortWeight - b.sortWeight)
            .map((customer) => {
              return (
                <Slide
                  key={customer.name}
                  innerClassName="items-center justify-center flex p-6"
                >
                  {/* we do not use th next/image because sizing is peinlich */}
                  <img
                    alt={customer.name}
                    src={customer.logo}
                    className="max-w-[192px] max-h-[125px]"
                  />
                </Slide>
              );
            })}
        </Slider>
      </CarouselProvider>
    </div>
  );
}
