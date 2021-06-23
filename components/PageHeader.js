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
          titleDown === undefined && "h-[calc(100vh-8rem)] lg:h-auto"
        }`}
      >
        <div className="relative aspect-h-1 aspect-w-4">
          {src && (
            <Image
              alt={`${title} Cover`}
              className={`hidden lg:block object-cover w-full ${
                titleDown ? "h-[50vh]" : "h-full"
              }`}
              layout="fill"
              src={src}
            />
          )}
        </div>
        {srcMobile && (
          <div className="lg:hidden">
            <Image
              alt={`${title} Cover`}
              className={`object-cover w-full ${
                titleDown ? "h-[50vh]" : "h-full"
              }`}
              layout="fill"
              src={srcMobile}
            />
          </div>
        )}
        <div
          className={`container mx-auto px-8 text-center flex flex-col justify-center bottom-0 top-0 left-0 right-0 ${
            titleDown === undefined &&
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
