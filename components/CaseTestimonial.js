import Image from "next/image";

function CaseTestimonial({ quote, author, portrait, position }) {
  return (
    <div className="bg-white relative flex flex-col md:flex-row gap-8 md:gap-16 items-center">
      {portrait ? (
        <Image
          src={portrait}
          alt={author}
          width={150}
          height={150}
          className="rounded-full object-cover not-prose"
        />
      ) : null}
      <div>
        <p className="text-lg italic text-center">&#171;{quote}&#187;</p>
        <p className="mt-auto text-sm text-center">
          <span className="text-green">{author}</span>, {position}
        </p>
      </div>
    </div>
  );
}

export default CaseTestimonial;
