import { X } from "lucide-react";
import TokenIcon from "../TokenIcon";
import { navLinks } from "./Navigation";
import React from "react";

interface MobileMenuProps {
  onClose: () => void;
  address?: string;
  balance?: string;
}

const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ onClose, address, balance }, ref) => {
    return (
      <div ref={ref} className="fixed inset-0 z-50 bg-white lg:hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl text-blue-600 font-bold">Liquo</h1>
            <button
              onClick={onClose}
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
                <span className="font-medium">{balance} ETH</span>
              </div>
              <div className="text-sm text-gray-500 break-all">{address}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
