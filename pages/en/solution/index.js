import * as Solution from "../../solution";

export default Solution.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"]
}

export async function getStaticProps(context) {
  return Solution.getStaticProps({ ...context, language: "en" });
}
