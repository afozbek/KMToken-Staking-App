"use client";
import Header from "@/app/components/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout">
      <Header />
      <div className="bg-white h-screen">{children}</div>
    </div>
  );
}
