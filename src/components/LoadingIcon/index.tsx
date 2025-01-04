import React from "react";

interface LoadingIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({
  color = "currentColor",
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${className || ""}`}
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      <circle
        className="opacity-75"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeDasharray="30 150"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoadingIcon;
