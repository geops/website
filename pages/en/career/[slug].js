import * as Job from "../../karriere/[slug]";

export default Job.default;

export async function getStaticPaths(context) {
  return Job.getStaticPaths({ ...context, language: "en" });
}

export async function getStaticProps(context) {
  return Job.getStaticProps({ ...context, language: "en" });
}
