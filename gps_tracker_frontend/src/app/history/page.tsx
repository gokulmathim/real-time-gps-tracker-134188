"use client";
import DashboardLayout from "../../components/DashboardLayout";
import AuthGuard from "../../components/AuthGuard";
import MapView from "../../components/MapView";
import { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Page for playback of recorded device paths
 */

type Location = { lat: number; lng: number; timestamp?: number };
type Device = { id: string; name: string };

const demoHistory: { [deviceId: string]: Location[] } = {
  "001": [
    { lat: 37.7749, lng: -122.4194, timestamp: 0 },
    { lat: 37.7759, lng: -122.4184, timestamp: 1 },
    { lat: 37.7792, lng: -122.4188, timestamp: 2 },
    { lat: 37.7821, lng: -122.4178, timestamp: 3 },
  ],
  "002": [
    { lat: 37.7849, lng: -122.4094, timestamp: 0 },
    { lat: 37.7852, lng: -122.4105, timestamp: 1 },
    { lat: 37.7832, lng: -122.4111, timestamp: 2 },
    { lat: 37.7821, lng: -122.4122, timestamp: 3 },
  ],
};

export default function HistoryPage() {
  const [selectedId, setSelectedId] = useState("001");
  const [idx, setIdx] = useState(demoHistory[selectedId].length);
  const devices: Device[] = [
    { id: "001", name: "Vehicle 001" },
    { id: "002", name: "Bike 002" },
  ];

  // Avoid SSR window error: Only run on client after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate playback
  useEffect(() => {
    setIdx(demoHistory[selectedId].length);
    if (!mounted) return;
    let i = 1;
    const duration = 2_000; // 2 seconds for demo
    const step = Math.max(Math.floor(duration / demoHistory[selectedId].length), 400);
    const interval = setInterval(() => {
      setIdx(i);
      i++;
      if (i > demoHistory[selectedId].length) clearInterval(interval);
    }, step);
    return () => clearInterval(interval);
  }, [selectedId, mounted]);
  const path = demoHistory[selectedId].slice(0, idx);

  if (!mounted) return null;

  return (
    <AuthGuard>
      <DashboardLayout>
        <section className="mx-auto max-w-3xl flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl text-primary">History Playback</h1>
            <div className="flex gap-3 flex-wrap items-center">
              <label className="font-mono text-sm">Device:</label>
              <select
                className="border px-2 py-1 rounded outline-accent"
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
              >
                {devices.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>
          <MapView mode="history" devices={[]} playbackPath={path} />
        </section>
      </DashboardLayout>
    </AuthGuard>
  );
}
