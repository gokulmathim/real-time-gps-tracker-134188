"use client";
import { useState } from "react";

type Device = { id: string; name: string, color?: string };

const demoDevices: Device[] = [
  { id: "001", name: "Vehicle 001", color: "#FFC107" },
  { id: "002", name: "Car 002", color: "#1E90FF" },
];

export default function DeviceManager() {
  const [devices, setDevices] = useState<Device[]>(demoDevices);
  const [addName, setAddName] = useState("");

  function handleAdd() {
    if (!addName) return;
    setDevices([...devices, { id: `${Date.now()}`, name: addName }]);
    setAddName("");
  }

  function handleRemove(id: string) {
    setDevices(devices.filter(d => d.id !== id));
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow md:max-w-xl mx-auto">
      <h2 className="font-bold text-lg mb-3 text-primary">Device Management</h2>
      <ul className="mb-4">
        {devices.map(d => (
          <li key={d.id} className="flex items-center justify-between py-1 border-b border-gray-50">
            <span>
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: d.color || "gray" }}></span>{" "}
              {d.name}
            </span>
            <button className="text-xs px-2 py-0.5 text-red-600 hover:underline" onClick={() => handleRemove(d.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          type="text"
          placeholder="Add device name"
          className="border p-2 rounded flex-1 outline-accent"
          value={addName}
          onChange={e => setAddName(e.target.value)}
        />
        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">Add</button>
      </form>
    </div>
  );
}
