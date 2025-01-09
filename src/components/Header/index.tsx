"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import ConnectPart from "./ConnectPart";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const balance = { raw: "0", formatted: "0" };
  const address = "0x0";
  const isConnected = false;

  return (
    <header className="bg-white text-gray-800 flex justify-between items-center px-4 sm:px-6 py-4 shadow-sm font-fontTomorrow">
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
