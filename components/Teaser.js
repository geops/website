import Button from "./Button";

import useIntersectionOberserver from "../lib/useIntersectionOberserver";

export default function Teaser(props) {
  const contentRef = useIntersectionOberserver("opacity-0", 0.2);

  return (
    <section className={props.containerClassName || "bg-white"}>
      <div
        className="container mx-auto px-8 py-16 md:py-24 text-center flex flex-col items-center transform transition-opacity duration-1000"
        ref={contentRef}
      >
        <h2 className="break-words mb-7 w-full">{props.title}</h2>
        {props.subtitle && (
          <h3
            className={`mb-16 max-w-md text-2xl ${
              props.subtitleClassName || ""
            }`}
          >
            {props.subtitle}
          </h3>
        )}
        {props.text && (
          <p className="mb-16 md:px-16 lg:px-32 text-left">{props.text}</p>
        )}
        <Button href={props.href}>{props.action}</Button>
      </div>
    </section>
  );
}
