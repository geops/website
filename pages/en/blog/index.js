import * as Blog from "../../blog";

export default Blog.default;

export async function getStaticProps(context) {
  return Blog.getStaticProps({ ...context, language: "en" });
}
