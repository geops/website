import { CarouselContext } from "pure-react-carousel";
import { useContext, useEffect, useRef } from "react";

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}

export default function CarouselKeyboardNavigation() {
  const carouselContext = useContext(CarouselContext);

  useEventListener("keydown", ({ key }) => {
    const { currentSlide, totalSlides } = carouselContext.state;
    let nextSlide;
    if (key === "ArrowLeft") {
      nextSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    } else if (key === "ArrowRight") {
      nextSlide = currentSlide + 1 === totalSlides ? 0 : currentSlide + 1;
    }
    if (Number.isInteger(nextSlide)) {
      carouselContext.setStoreState({ currentSlide: nextSlide });
    }
  });

  return null;
}
