import Link from "./Link";

const className =
  "bg-green py-4 px-14 text-white font-bold rounded inline-block hover:bg-green-light transition duration-300 ease-in-out";

export default function Button({ children, href, onClick, type }) {
  return href ? (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  ) : (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
