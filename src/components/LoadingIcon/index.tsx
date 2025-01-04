import React from "react";

const LoadingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 50 50"
      className="w-4 h-4 mx-auto"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#0078d7"
        stroke-width="4"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoadingIcon;
