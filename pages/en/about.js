import * as About from "../about";

export default About.default;

export async function getStaticProps(context) {
  return About.getStaticProps({ ...context, language: "en" });
}
