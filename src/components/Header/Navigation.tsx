import Link from "next/link";
import { FC } from "react";

export const NavLinkType = {
  EXCHANGE: "Exchange",
  STAKE: "Stake",
  WRAP: "Wrap",
  REWARDS: "Rewards",
  LOGOUT: "Logout",
};

export const navLinks = [
  { name: "Exchange", icon: "🔄", id: NavLinkType.EXCHANGE, href: "/exchange" },
  { name: "Stake", icon: "🔒", id: NavLinkType.STAKE, href: "/stake" },
  { name: "Wrap", icon: "🎁", id: NavLinkType.WRAP, href: "/wrap" },
  { name: "Rewards", icon: "🎯", id: NavLinkType.REWARDS, href: "/rewards" },
  { name: "Logout", icon: "🚪", id: NavLinkType.LOGOUT },
];

const Navigation: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <nav className={className}>
      <ul className="flex items-center gap-8">
        {navLinks
          .filter((link) => link.id !== NavLinkType.LOGOUT)
          .map((link) => (
            <li key={link.id}>
              <Link
                href={link.href ?? "#"}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navigation;
