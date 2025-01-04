import { FC } from "react";

export const navLinks = [
  { name: "Exchange", icon: "🔄" },
  { name: "Stake", icon: "🔒" },
  { name: "Wrap", icon: "🎁" },
  { name: "Rewards", icon: "🎯" },
];

const Navigation: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <nav className={className}>
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
  );
};

export default Navigation;
