import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";
/**
 * PUBLIC_INTERFACE
 * DashboardLayout wraps the entire application with sidebar, topbar, and main content area. Call with children.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="bg-gray-50 flex-1 px-2 py-4 sm:px-6">{children}</main>
      </div>
      {/* On mobile, show bottom nav */}
      <MobileNav />
    </div>
  );
}
