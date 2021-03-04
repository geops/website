import Head from "next/head";

import NetlifyCMS from "netlify-cms-app";
import { useEffect } from "react";

export default function CMS() {
  useEffect(() => NetlifyCMS.init());
  return (
    <Head>
      <title>CMS | geOps</title>
    </Head>
  );
}
