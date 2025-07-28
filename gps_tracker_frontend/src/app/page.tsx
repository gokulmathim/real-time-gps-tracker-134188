"use client";
import DashboardLayout from "../components/DashboardLayout";
import AuthGuard from "../components/AuthGuard";
import MapView from "../components/MapView";
import { useEffect, useState } from "react";

/*
 * Dashboard main page: live tracking map
 */
type Location = { lat: number; lng: number; timestamp?: number };
type Device = { id: string; name: string; color?: string; lastLocation?: Location };

export default function Home() {
  // Example live data (simulate; usually fetched via websocket or polling)
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "001",
      name: "Vehicle 001",
      color: "#FFC107",
      lastLocation: { lat: 37.7749, lng: -122.4194 },
    },
    {
      id: "002",
      name: "Bike 002",
      color: "#1E90FF",
      lastLocation: { lat: 37.7849, lng: -122.4094 },
    },
  ]);
  useEffect(() => {
    // Simulate positions update
    const interval = setInterval(() => {
      setDevices((curr) =>
        curr.map((d) => ({
          ...d,
          lastLocation: {
            lat: d.lastLocation!.lat + (Math.random() - 0.5) * 0.001,
            lng: d.lastLocation!.lng + (Math.random() - 0.5) * 0.001,
          },
        }))
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthGuard>
      <DashboardLayout>
        <section className="mx-auto max-w-3xl flex flex-col gap-6">
          <h1 className="font-bold text-2xl text-primary mb-0">Live Map Tracking</h1>
          <MapView mode="live" devices={devices} />
        </section>
      </DashboardLayout>
    </AuthGuard>
  );
}
