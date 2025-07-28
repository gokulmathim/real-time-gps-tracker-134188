"use client";
import DashboardLayout from "../../components/DashboardLayout";
import AuthGuard from "../../components/AuthGuard";
import DeviceManager from "../../components/DeviceManager";

/**
 * PUBLIC_INTERFACE
 * Route to view, add, and remove devices from the user's account.
 */
export default function DevicesPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <DeviceManager />
      </DashboardLayout>
    </AuthGuard>
  );
}
