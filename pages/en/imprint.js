import * as Imprint from "../impressum";

export default Imprint.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"],
};

export async function getStaticProps(context) {
  return Imprint.getStaticProps({ ...context, language: "en" });
}
