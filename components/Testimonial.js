import Image from "next/image";
import React from "react";

function Testimonial({ quote, author, portrait, position, itemsLength = 1 }) {
  return (
    <div
      className={`pt-20 flex flex-col md:last:odd:col-span-2 lg:last:odd:col-span-1 items-center `}
      key={author}
    >
      <div
        className={`bg-gray-lighter p-8 rounded-xl relative flex flex-col gap-4 max-w-[400px] ${itemsLength % 2 === 0 ? "xl:min-h-[450px] 2xl:min-h-[380px] xl:max-w-[320px]" : ""} md:min-h-[400px] min-h-[350px]`}
      >
        <Image
          src={portrait}
          alt={author}
          width={150}
          height={150}
          className="rounded-full absolute -top-20 left-1/2 translate-x-[-50%]"
        />
        <p className="mt-20 text-lg italic text-center">&#171;{quote}&#187;</p>
        <p className="mt-auto text-sm text-center">
          <span className="text-green">{author}</span>, {position}
        </p>
      </div>
    </div>
  );
}

export default Testimonial;
