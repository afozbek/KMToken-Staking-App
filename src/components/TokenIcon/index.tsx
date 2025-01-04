import Image from "next/image";

interface TokenIconProps {
  size?: number;
  className?: string;
}

const TokenIcon = ({ size = 24, className = "" }: TokenIconProps) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/token-icon.svg" // token ikonunuzu public klasörüne eklemelisiniz
        alt="Token"
        width={size}
        height={size}
        className="rounded-full"
      />
    </div>
  );
};

export default TokenIcon;
