import { useEffect, useRef } from "react";

function mutate(classList, addClassNames, removeClassNames) {
  const addClasses = addClassNames.split(" ").filter((c) => c);
  const removeClasses = removeClassNames.split(" ").filter((c) => c);
  addClasses.length > 0 && classList.add(...addClasses);
  removeClasses.length > 0 && classList.remove(...removeClasses);
}

export default function useIntersectionOberserver(
  hiddenClassNames,
  threshold = 0,
  visibleClassNames = "",
) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mutate(entry.target.classList, visibleClassNames, hiddenClassNames);
          } else {
            mutate(entry.target.classList, hiddenClassNames, visibleClassNames);
          }
        });
      },
      { threshold },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  });

  return ref;
}
