interface TermsCheckboxProps {
  isAccepted: boolean;
  onAcceptChange: (accepted: boolean) => void;
}

const TermsCheckbox = ({ isAccepted, onAcceptChange }: TermsCheckboxProps) => {
  return (
    <div className="mb-6">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isAccepted}
          onChange={(e) => onAcceptChange(e.target.checked)}
          className="w-5 h-5 cursor-pointer 
          bg-white checked:bg-blue-500
          border-blue-500 checked:text-blue-500 rounded-md !ring-0"
        />
        <span className="text-gray-600 cursor-pointer select-none">
          I have read and accept the{" "}
          <a href="#" className="text-blue-500 hover:underline">
            terms and conditions
          </a>
        </span>
      </label>
    </div>
  );
};

export default TermsCheckbox;
