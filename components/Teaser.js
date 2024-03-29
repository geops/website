import Button from "./Button";

import useIntersectionOberserver from "../lib/useIntersectionOberserver";

export default function Teaser(props) {
  const contentRef = useIntersectionOberserver("opacity-0", 0.2);
  let teaserTitle = "";

  if (props.toHeading) {
    teaserTitle = `<h1 class="break-words w-full">${props.title}</h1>`;
  } else {
    teaserTitle = `<h2 class="break-words w-full text-5xl">${props.title}</h2>`;
  }

  return (
    <section className={props.containerClassName || "bg-white"}>
      <div
        className="container mx-auto flex flex-col items-center px-8 py-16 text-center transition-opacity duration-1000 md:py-24"
        ref={contentRef}
      >
        <div
          className="mb-7"
          dangerouslySetInnerHTML={{ __html: teaserTitle }}
        ></div>
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
          <p className="mb-16 text-left md:px-16 lg:px-32">{props.text}</p>
        )}
        <Button href={props.href}>{props.action}</Button>
      </div>
    </section>
  );
}
