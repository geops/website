import { CarouselContext } from "pure-react-carousel";
import { useContext, useEffect } from "react";

export default function CarouselAutoResumePlaying() {
  const carouselContext = useContext(CarouselContext);

  useEffect(() => {
    function autoResumePlaying() {
      if (carouselContext.state.isPlaying === false) {
        carouselContext.setStoreState({ isPlaying: true });
      }
    }
    carouselContext.subscribe(autoResumePlaying);
    return () => carouselContext.unsubscribe(autoResumePlaying);
  }, [carouselContext]);

  return null;
}
