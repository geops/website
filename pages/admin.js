import dynamic from "next/dynamic";

const CMS = dynamic(() => import("../components/CMS"), { ssr: false });

export default function Admin() {
  return <CMS />;
}
