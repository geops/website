import * as Newsletter from "../newsletter.js";

export default Newsletter.default;

export function getStaticProps(context) {
  return Newsletter.getStaticProps({ ...context, language: "en" });
}
