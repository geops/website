import { useI18n } from "../lib/i18n";
import useIntersectionOberserver from "../lib/useIntersectionOberserver";

const buttonClassName =
  "bg-green py-4 px-14 text-white font-bold rounded inline-block hover:bg-green-light transition duration-300 ease-in-out";

// Workaround to link to external newsletter page
// TODO: fix signup on our own /newsletter page
function CustomTeaser(props) {
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
        className="container mx-auto px-8 py-16 md:py-24 text-center flex flex-col items-center transform transition-opacity duration-1000"
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
          <p className="mb-16 md:px-16 lg:px-32 text-left">{props.text}</p>
        )}
        <a className={buttonClassName} href={props.href} target="newsletter">
          {props.action}
        </a>
      </div>
    </section>
  );
}

export default function NewsletterTeaser() {
  const { t } = useI18n();
  return (
    <CustomTeaser
      title={t("newsletterTeaser.title")}
      subtitle={t("newsletterTeaser.subtitle")}
      action={t("newsletterTeaser.action")}
      href="http://geops.sh/geopsnews"
    />
  );
}
