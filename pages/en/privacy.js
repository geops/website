import * as Privacy from "../datenschutz";

export default Privacy.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export async function getStaticProps(context) {
  return Privacy.getStaticProps({ ...context, language: "en" });
}
