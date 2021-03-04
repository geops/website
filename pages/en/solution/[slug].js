import * as Solution from "../../solution/[slug]";

export default Solution.default;

export async function getStaticPaths(context) {
  return Solution.getStaticPaths({ ...context, language: "en" });
}

export async function getStaticProps(context) {
  return Solution.getStaticProps({ ...context, language: "en" });
}
