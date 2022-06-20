import * as Terms from "../bedingungen";

export default Terms.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export async function getStaticProps(context) {
  return Terms.getStaticProps({ ...context, language: "en" });
}
