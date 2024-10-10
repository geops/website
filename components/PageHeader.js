import Image from "next/image";

export default function PageHeader({ src, srcMobile, title, titleDown, text }) {
  return (
    <>
      <div
        className={`relative ${
          src &&
          srcMobile &&
          titleDown === undefined &&
          "h-[calc(100vh-8rem)] lg:h-[50vh]"
        }`}
      >
        <div
          className={`relative ${titleDown ? "h-[max(75vw,300px)] sm:h-[min(50vw,600px)]" : "h-full"}`}
        >
          {src && (
            <Image
              alt={`${title} Cover`}
              className="w-full object-cover"
              data-cy="pageHeaderImage"
              fill
              src={src}
            />
          )}
          {srcMobile && (
            <div className="lg:hidden">
              <Image
                alt={`${title} Cover`}
                className="w-full object-cover"
                fill
                src={srcMobile}
              />
            </div>
          )}
        </div>
        <div
          className={`container bottom-0 left-0 right-0 top-0 mx-auto flex flex-col justify-center px-8 text-center ${
            titleDown === undefined &&
            src &&
            srcMobile &&
            "text-shadow absolute text-white"
          }`}
        >
          <h1
            data-cy="pageMainTitle"
            className={`${
              titleDown || (!src && !srcMobile)
                ? "lg:text-shadow-none mt-8 lg:text-gray-darker"
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
