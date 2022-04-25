import * as About from "../about";

export default About.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export async function getStaticProps(context) {
  return About.getStaticProps({ ...context, language: "en" });
}
