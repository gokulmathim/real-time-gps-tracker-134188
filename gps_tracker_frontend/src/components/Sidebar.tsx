import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
const navItems = [
  {
    name: "Live Map",
    path: "/",
    icon: (
      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 6.5L9 4v15l-6 2.5v-17zM15 20l6-2.5v-15l-6-2.5v20z" />
        <path d="M9 19l6 2.5V2.5L9 0v19z" />
      </svg>
    ),
  },
  {
    name: "History",
    path: "/history",
    icon: (
      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 8v5l4 2"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
  },
  {
    name: "Devices",
    path: "/devices",
    icon: (
      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 3v4M8 3v4"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar bg-white border-r border-accent flex flex-col w-52 min-h-screen px-3 py-4 space-y-5 relative z-20">
      <h1 className="text-lg font-bold pl-2 text-primary">GPS Tracker</h1>
      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map(item => (
          <Link key={item.name} href={item.path} passHref legacyBehavior>
            <a
              className={clsx(
                "rounded group flex items-center gap-4 py-2 px-3 hover:bg-accent/10 transition font-medium",
                pathname === item.path ? "bg-accent/10 text-accent font-semibold" : "text-gray-800"
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          </Link>
        ))}
      </nav>
      <div className="flex-grow" />
      <footer className="text-xs text-gray-500 px-2 pb-2">© {new Date().getFullYear()} GPS Tracker</footer>
    </aside>
  );
}
