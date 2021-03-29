import Head from "next/head";

export default function PageHeader({ src, srcMobile, title, text }) {
  return (
    <>
      <Head>
        <title>{`${title} | geOps`}</title>
      </Head>
      <div className="relative h-[calc(100vh-8rem)] lg:h-auto">
        {src && (
          <picture>
            {srcMobile && (
              <source media="(max-width: 1023px)" srcSet={srcMobile} />
            )}
            <source media="(min-width: 1024px)" srcSet={src} />
            <img
              alt={`${title} Cover`}
              className="object-cover h-full w-full"
              src={src}
            />
          </picture>
        )}
        <div className="absolute lg:static container mx-auto px-8 text-center flex flex-col justify-center text-white lg:text-gray-darker text-shadow lg:text-shadow-none bottom-0 top-0 left-0 right-0">
          <h1 className="mt-16 mb-8 mx-auto max-w-screen-lg">{title}</h1>
          {text && <strong className="block mb-16">{text}</strong>}
        </div>
      </div>
    </>
  );
}
