import Image from "next/image";
import React from "react";

function Testimonial({ quote, author, portrait, position, className = "" }) {
  return (
    <div className="flex flex-col md:last:odd:col-span-2 lg:last:odd:col-span-1 items-center">
      <div
        className={`bg-gray-lighter rounded-xl relative flex flex-col gap-4 max-w-[400px] md:min-h-[400px] min-h-[350px] ${portrait ? "mt-20" : ""} md:last:odd:col-span-2 lg:last:odd:col-span-1 items-center ${className}`}
      >
        {portrait ? (
          <Image
            src={portrait}
            alt={author}
            width={150}
            height={150}
            className="rounded-full absolute -top-[calc(150px/2)] left-1/2 translate-x-[-50%] !mt-0 !mb-0 object-cover"
          />
        ) : null}
        <div className="p-8 ">
          <p className="mt-20 text-lg italic text-center">
            &#171;{quote}&#187;
          </p>
          <p className="mt-auto text-sm text-center">
            <span className="text-green">{author}</span>, {position}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
