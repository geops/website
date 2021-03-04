import * as BlogArticle from "../../blog/[slug]";

export default BlogArticle.default;

export async function getStaticPaths(context) {
  return BlogArticle.getStaticPaths({ ...context, language: "en" });
}

export async function getStaticProps(context) {
  return BlogArticle.getStaticProps({ ...context, language: "en" });
}
