import Head from "next/head";

export default function PageHeader({ src, srcMobile, title, titleDown, text }) {
  return (
    <>
      <Head>
        <title>{`${title} | geOps`}</title>
      </Head>
      <div
        className={`relative ${
          src && srcMobile && titleDown === undefined && "h-[calc(100vh-8rem)] lg:h-auto"
        }`}
      >
        {src && (
          <picture>
            {srcMobile && (
              <source media="(max-width: 1023px)" srcSet={srcMobile} />
            )}
            <source media="(min-width: 1024px)" srcSet={src} />
            <img
              alt={`${title} Cover`}
              className={`object-cover w-full ${
                titleDown ? "h-[50vh]" : "h-full"
              }`}
              src={src}
            />
          </picture>
        )}
        <div
          className={`container mx-auto px-8 text-center flex flex-col justify-center bottom-0 top-0 left-0 right-0 ${
            titleDown === undefined && src && srcMobile &&
            "absolute lg:static text-white lg:text-gray-darker text-shadow lg:text-shadow-none"
          }`}
        >
          <h1
            className={`${
              titleDown ? "lg:mb-8" : "mb-8"
            } mt-16 mx-auto max-w-screen-lg`}
          >
            {title}
          </h1>
          {text && <strong className="block mb-16">{text}</strong>}
        </div>
      </div>
    </>
  );
}
