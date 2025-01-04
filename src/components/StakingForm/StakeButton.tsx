import LoadingIcon from "../LoadingIcon";

interface StakeButtonProps {
  disabled: boolean;
  onClick: () => void;
  loading: boolean;
  btnText: string;
}

const StakeButton = ({
  disabled,
  onClick,
  loading,
  btnText,
}: StakeButtonProps) => {
  return (
    <button
      className="w-full bg-blue-500 text-white uppercase py-3 rounded-lg      
      hover:bg-blue-600 transition-colors disabled:opacity-50 
      disabled:cursor-not-allowed flex items-center justify-center font-semibold"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <LoadingIcon className="w-5 h-5" /> : btnText}
    </button>
  );
};

export default StakeButton;
