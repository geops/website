export default function PageCover({ alt, src }) {
  return src ? (
    <img
      alt={alt}
      className="object-cover h-128 max-h-screen w-full"
      src={src}
    />
  ) : null;
}
