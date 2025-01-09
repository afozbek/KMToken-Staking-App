"use client";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import { getBalance } from "@/blockchain";
import { formatBalance } from "@/blockchain/utils";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import ConnectPart from "./ConnectPart";
import HeaderSkeleton from "./HeaderSkeleton";

export default function Header() {
  const { address, isConnected } = useAccount();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState({ raw: "0", formatted: "0" });

  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const signer = useEthersSigner();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!signer || !address) return;
      try {
        const rawBalance = await getBalance(address, signer);
        setBalance({
          raw: rawBalance,
          formatted: formatBalance(rawBalance),
        });
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [signer, address]);

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
            balance={balance.formatted}
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
          balance={balance.formatted}
        />
      )}
    </header>
  );
}
