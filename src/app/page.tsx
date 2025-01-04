import StakingForm from "@/components/StakingForm";

export default function Home() {
  return (
    <div>
      <StakingForm />

      {/* Copyright to Dribble */}
      <footer className="text-center text-gray-500 text-sm mt-10">
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
