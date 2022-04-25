import * as Newsletter from "../newsletter.js";

export default Newsletter.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export function getStaticProps(context) {
  return Newsletter.getStaticProps({ ...context, language: "en" });
}
