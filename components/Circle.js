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

const hiddenClasses = "opacity-0 transition-none";

const visibleClasses = "transition-opacity";

export default function Circle({ children, delay = "0", size = "large" }) {
  const circleRef = useIntersectionOberserver(hiddenClasses, 0, visibleClasses);

  return (
    <div
      className={`mx-auto flex flex-col flex-wrap content-center justify-center rounded-full bg-orange-dark text-center font-bold text-white duration-1000 ${delays[delay]} ${sizes[size]}`}
      ref={circleRef}
    >
      {children}
    </div>
  );
}
