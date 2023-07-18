import React from "react";
import Website from "../../components/Website";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return <Website lang={"de"}>{children}</Website>;
}
