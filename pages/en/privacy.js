import * as Privacy from "../datenschutz";

export default Privacy.default;

export async function getStaticProps(context) {
  return Privacy.getStaticProps({ ...context, language: "en" });
}
