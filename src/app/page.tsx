import StakingContainer from "@/components/Staking";
import TransactionWrapper from "@/components/Transactions/TransactionWrapper";

export default function Home() {
  return (
    <>
      <StakingContainer />

      <div className="my-8">
        <TransactionWrapper />
      </div>
    </>
  );
}
