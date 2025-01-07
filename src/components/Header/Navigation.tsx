import { FC } from "react";

export const NavLinkType = {
  EXCHANGE: "Exchange",
  STAKE: "Stake",
  WRAP: "Wrap",
  REWARDS: "Rewards",
  LOGOUT: "Logout",
};

export const navLinks = [
  { name: "Exchange", icon: "🔄", id: NavLinkType.EXCHANGE },
  { name: "Stake", icon: "🔒", id: NavLinkType.STAKE },
  { name: "Wrap", icon: "🎁", id: NavLinkType.WRAP },
  { name: "Rewards", icon: "🎯", id: NavLinkType.REWARDS },
  { name: "Logout", icon: "🚪", id: NavLinkType.LOGOUT },
];

const Navigation: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <nav className={className}>
      <ul className="flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.id}>
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
  );
};

export default Navigation;
