import * as Blog from "../../blog";

export default Blog.default;

export const config = {
  unstable_excludeFiles: ["./content/**", "./public/images/**"]
}

export async function getStaticProps(context) {
  return Blog.getStaticProps({ ...context, language: "en" });
}
