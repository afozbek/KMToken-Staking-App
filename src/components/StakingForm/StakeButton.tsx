interface StakeButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const StakeButton = ({ disabled, onClick }: StakeButtonProps) => {
  return (
    <button
      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
    >
      Stake
    </button>
  );
};

export default StakeButton;
