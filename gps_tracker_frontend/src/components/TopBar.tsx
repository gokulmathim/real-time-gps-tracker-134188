"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

// PUBLIC_INTERFACE
export default function TopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between h-14 px-5 border-b border-accent bg-white shadow-sm">
      <div className="font-bold text-primary text-lg">Dashboard</div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-gray-600">{user?.email}</span>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
