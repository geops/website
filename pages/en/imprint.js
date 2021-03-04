import * as Imprint from "../impressum";

export default Imprint.default;

export async function getStaticProps(context) {
  return Imprint.getStaticProps({ ...context, language: "en" });
}
