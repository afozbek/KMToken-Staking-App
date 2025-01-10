"use client";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { useAccount } from "wagmi";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import ConnectPart from "./ConnectPart";
import HeaderSkeleton from "./HeaderSkeleton";
import useTokenBalance from "@/app/hooks/useTokenBalance";

export default function Header() {
  const { address, isConnected } = useAccount();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { balanceFormatted } = useTokenBalance(address);

  useEffect(() => {
    setMounted(true);
  }, []);

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  useClickOutside(mobileMenuRef, () => {
    setShowMobileMenu(false);
  });

  if (!mounted) {
    return <HeaderSkeleton />;
  }

  return (
    <header className=" bg-white text-gray-800 px-4 sm:px-6 py-4 shadow-sm font-fontTomorrow flex justify-center">
      <div className="max-w-[1200px] container  flex justify-between items-center">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl text-blue-600 font-bold">KMToken</h1>
          <Navigation className="hidden lg:block" />
        </div>

        <div className="flex items-center gap-4">
          <ConnectPart
            ref={menuRef}
            address={address}
            connected={isConnected}
            balance={balanceFormatted}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            onMenuToggle={() => setShowMenu((open) => !open)}
          />
          <button
            onClick={() => setShowMobileMenu(true)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <MobileMenu
          ref={mobileMenuRef}
          onClose={() => setShowMobileMenu(false)}
          address={address}
          balance={balanceFormatted}
        />
      )}
    </header>
  );
}
