{
  /* <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 24 24">
  <path fill-rule="nonzero" d="M12 10.44L6.34 16.1a1 1 0 11-1.41-1.42L12 7.61l7.07 7.07a1 1 0 11-1.41 1.42L12 10.44z"/>
</svg> */
}

export default function CaretIcon({ direction }) {
  let className = "fill-current";
  if (direction === "right") {
    className += " transform rotate-90";
  } else if (direction === "bottom") {
    className += " transform rotate-180";
  } else if (direction === "left") {
    className += " transform rotate-270";
  }
  return (
    <svg className={className} viewBox="0 0 24 24">
      <rect width="24" height="24" fill="none" />
      <path
        d="M1481.8,655.52l-7.293-7.293-7.293,7.293-1.414-1.414,8.707-8.707,8.707,8.707Z"
        transform="translate(-1462.507 -638.813)"
      />
    </svg>
  );
}
