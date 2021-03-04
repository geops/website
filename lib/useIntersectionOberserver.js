import { useEffect, useRef } from "react";

export default function useIntersectionOberserver(className, threshold = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(className);
          } else {
            entry.target.classList.add(className);
          }
        });
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current]);

  return ref;
}
