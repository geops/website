import * as Start from "../";

export default Start.default;

export async function getStaticProps(context) {
  return Start.getStaticProps({ ...context, language: "en" });
}
