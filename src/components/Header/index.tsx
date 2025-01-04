"use client";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/app/hooks/wagmi/utils";
import { getBalance } from "@/blockchain";
import { formatBalance } from "@/blockchain/utils";
import ConnectBtn from "./ConnectBtn";
import DropdownMenu from "./DropdownMenu";
import Image from "next/image";
import TokenIcon from "../TokenIcon";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Exchange", icon: "🔄" },
  { name: "Stake", icon: "🔒" },
  { name: "Wrap", icon: "🎁" },
  { name: "Rewards", icon: "🎯" },
];

export default function Header() {
  const { address } = useAccount();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState({ raw: "0", formatted: "0" });
  const menuRef = useRef<HTMLElement | any>(null);
  const mobileMenuRef = useRef<HTMLElement | any>(null);
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
    return (
      <header className="bg-white text-gray-800 flex justify-between items-center p-4 shadow-sm">
        <h1 className="text-2xl text-blue-600 font-bold">Liquo</h1>
        <div className="relative">
          <div className="bg-gray-100 p-2 rounded-md">Loading...</div>
        </div>
      </header>
    );
  }

  const renderConnectPart = () => {
    if (address) {
      return (
        <div className="flex items-center gap-4 relative">
          <div className="hidden sm:flex items-center gap-2">
            <TokenIcon />
            <span className="font-medium">{balance.formatted} ETH</span>
          </div>
          <button
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setShowMenu((open) => !open)}
          >
            <Image
              src="/avatar-placeholder.svg"
              alt="Avatar"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span className="max-w-[120px] truncate hidden sm:block">
              {address}
            </span>
          </button>

          {showMenu && (
            <DropdownMenu
              address={address}
              setShowMenu={setShowMenu}
              ref={menuRef}
            />
          )}
        </div>
      );
    }

    return <ConnectBtn />;
  };

  const renderMobileMenu = () => {
    if (!showMobileMenu) return null;

    return (
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 bg-white lg:hidden"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl text-blue-600 font-bold">Liquo</h1>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mb-8">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-lg text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span>{link.icon}</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {address && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <TokenIcon />
                <span className="font-medium">{balance.formatted} ETH</span>
              </div>
              <div className="text-sm text-gray-500 break-all">{address}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <header className="bg-white text-gray-800 flex justify-between items-center px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex items-center gap-12">
        <h1 className="text-2xl text-blue-600 font-bold">Liquo</h1>
        {/* Hidden on mobile */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span>{link.icon}</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {renderConnectPart()}
        {/* Hidden on desktop */}
        <button
          onClick={() => setShowMobileMenu(true)}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {renderMobileMenu()}
    </header>
  );
}
