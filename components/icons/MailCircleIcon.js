import Circle from "../Circle";

export default function MailCircleIcon({ size = "small" }) {
  return (
    <Circle size={size}>
      <svg
        viewBox="0 0 24 24"
        className="m-4 fill-current text-white"
        fillRule="evenodd"
      >
        <path d="M20.25 5.96H3.7V18h16.55V5.96zM5.77 9.2v6.73h12.4V9.2L12 14.38 5.77 9.2zm10.6-1.17H7.6l4.4 3.66 4.36-3.66z" />
      </svg>
    </Circle>
  );
}
