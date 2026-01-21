import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | A-chan Market",
  description: "Dashboard A-Chan Market",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={""}>
      <Navbar />
      {children}
    </section>
  );
}
