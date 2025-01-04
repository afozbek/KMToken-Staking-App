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
          className="w-4 h-4 rounded border-blue-500 text-blue-500 focus:ring-blue-500"
        />
        <span className="text-gray-600 cursor-pointer select-none">
          I have read and I accept the{" "}
          <a href="#" className="text-blue-500 hover:underline">
            terms and conditions
          </a>
        </span>
      </label>
    </div>
  );
};

export default TermsCheckbox;
