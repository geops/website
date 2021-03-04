const sizes = {
  small: "w-32 h-32",
  medium: "w-48 h-48",
  large: "w-64 h-64",
};

export default function Circle({ children, size = "large" }) {
  return (
    <div
      className={`bg-orange-dark rounded-full flex flex-col flex-wrap justify-center content-center mx-auto text-white font-bold text-center ${sizes[size]}`}
    >
      {children}
    </div>
  );
}
