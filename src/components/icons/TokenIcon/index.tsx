import React from "react";

interface TokenIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const TokenIcon: React.FC<TokenIconProps> = ({
  size = 6,
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="200"
      height="200"
      className={`w-${size} h-${size} ${className}`}
      {...props}
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>

      {/* Main circle with gradient fill */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#tokenGradient)"
        stroke="#2C3E50"
        strokeWidth="4"
      />

      {/* Decorative elements */}
      <path d="M100 30 L120 70 L100 60 L80 70 Z" fill="#2C3E50" opacity="0.7" />

      {/* Inner ring */}
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="#2C3E50"
        strokeWidth="3"
        strokeDasharray="10,5"
      />

      {/* Center symbol */}
      <path
        d="M70 100 L130 100 M100 70 L100 130"
        stroke="#2C3E50"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Small decorative circles */}
      <circle cx="100" cy="45" r="5" fill="#2C3E50" />
      <circle cx="100" cy="155" r="5" fill="#2C3E50" />
      <circle cx="45" cy="100" r="5" fill="#2C3E50" />
      <circle cx="155" cy="100" r="5" fill="#2C3E50" />
    </svg>
  );
};

export default TokenIcon;
