import * as Solution from "../../solution";

export default Solution.default;

export async function getStaticProps(context) {
  return Solution.getStaticProps({ ...context, language: "en" });
}
