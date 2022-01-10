import Head from "next/head";
import Image from "next/image";

export default function PageHeader({ src, srcMobile, title, titleDown, text }) {
  return (
    <>
      <Head>
        <title>{`${title} | geOps`}</title>
      </Head>
      <div
        className={`relative ${
          src &&
          srcMobile &&
          titleDown === undefined &&
          "h-[calc(100vh-8rem)] lg:h-[50vh]"
        }`}
      >
        <div className={`relative ${titleDown ? "h-[50vh]" : "h-full"}`}>
          {src && (
            <Image
              alt={`${title} Cover`}
              className="object-cover w-full"
              data-cy="pageHeaderImage"
              layout="fill"
              src={src}
            />
          )}
          {srcMobile && (
            <div className="lg:hidden">
              <Image
                alt={`${title} Cover`}
                className="object-cover w-full"
                layout="fill"
                src={srcMobile}
              />
            </div>
          )}
        </div>
        <div
          className={`container mx-auto px-8 text-center flex flex-col justify-center bottom-0 top-0 left-0 right-0 ${
            titleDown === undefined &&
            src &&
            srcMobile &&
            "absolute text-white text-shadow"
          }`}
        >
          <h1
            data-cy="pageMainTitle"
            className={`${
              titleDown || (!src && !srcMobile)
                ? "lg:text-gray-darker lg:text-shadow-none mt-8"
                : ""
            } mx-auto max-w-screen-lg`}
          >
            {title}
          </h1>
          {text && <strong className="mt-8">{text}</strong>}
        </div>
      </div>
    </>
  );
}
