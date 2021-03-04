import Head from "next/head";

import PageCover from "./PageCover";

export default function PageHeader({ src, title, text }) {
  return (
    <>
      <Head>
        <title>{`${title} | geOps`}</title>
      </Head>
      <PageCover alt={`${title} Cover`} src={src} />
      <div className="container mx-auto text-center">
        <h1 className="mt-16 mb-8 mx-auto max-w-screen-lg">{title}</h1>
        <strong className="block mb-16">{text}</strong>
      </div>
    </>
  );
}
