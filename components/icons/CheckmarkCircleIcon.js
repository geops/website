import Circle from "../Circle";

export default function CheckmarkCircleIcon({ delay }) {
  return (
    <Circle size="small" delay={delay}>
      <svg viewBox="0 0 24 24" className="m-4 fill-current text-white">
        <path d="M9.344,15.159l9.418,-9.116l1.44,1.487l-10.826,10.478l-5.618,-5.193l1.405,-1.52l4.181,3.864Z" />
      </svg>
    </Circle>
  );
}
