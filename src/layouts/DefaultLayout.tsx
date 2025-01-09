import Header from "@/components/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />

      <main className="mb-6">{children}</main>

      {/* Copyright to Dribble */}
      <footer className="text-center text-gray-500 text-sm mb-10">
        Design fetched from{" "}
        <a
          className="text-blue-500"
          target="_blank"
          href="https://dribbble.com/shots/18898703-Liquid-ETH-2-0-staking-dApp"
        >
          Dribble
        </a>{" "}
        ❤️
      </footer>
    </div>
  );
}
