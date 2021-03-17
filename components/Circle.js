import useIntersectionOberserver from "../lib/useIntersectionOberserver";

const delays = {
  0: "",
  100: "lg:delay-100",
  300: "lg:delay-300",
  500: "lg:delay-500",
  700: "lg:delay-700",
};

const sizes = {
  small: "w-32 h-32",
  medium: "w-48 h-48",
  large: "w-64 h-64",
};

export default function Circle({ children, delay = "0", size = "large" }) {
  const contentRef = useIntersectionOberserver("opacity-0", 0.5);

  return (
    <div
      className={`bg-orange-dark rounded-full flex flex-col flex-wrap justify-center content-center mx-auto text-white font-bold text-center transform transition-opacity duration-1000 ${delays[delay]} ${sizes[size]}`}
      ref={contentRef}
    >
      {children}
    </div>
  );
}
