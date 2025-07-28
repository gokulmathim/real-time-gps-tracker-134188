import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
const navItems = [
  {
    name: "Live",
    path: "/",
    icon: (
      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /><path d="M12 8v4l3 2"/>
      </svg>
    ),
  },
  {
    name: "History",
    path: "/history",
    icon: (
      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 8v5l4 2"/>
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    name: "Devices",
    path: "/devices",
    icon: (
      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3v4M8 3v4" />
      </svg>
    ),
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="mobile-nav fixed bottom-0 left-0 w-full bg-white border-t border-accent flex sm:hidden flex-row justify-around py-1 z-40">
      {navItems.map(item => (
        <Link key={item.name} href={item.path} passHref legacyBehavior>
          <a
            className={clsx(
              "flex flex-col items-center text-xs px-3 pt-2 pb-1",
              pathname === item.path ? "text-accent" : "text-gray-800"
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
}
