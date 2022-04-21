import * as Karriere from "../../karriere";

export default Karriere.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export async function getStaticProps(context) {
  return Karriere.getStaticProps({ ...context, language: "en" });
}
