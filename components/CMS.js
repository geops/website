import NetlifyCMS from "netlify-cms-app";
import { useEffect } from "react";

export default function CMS() {
  useEffect(() => NetlifyCMS.init());
  return null;
}
