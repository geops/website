import * as Karriere from "../../karriere";

export default Karriere.default;

export async function getStaticProps(context) {
  return Karriere.getStaticProps({ ...context, language: "en" });
}
