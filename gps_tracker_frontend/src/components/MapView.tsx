"use client";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = { lat: number; lng: number; timestamp?: number };
type Device = { id: string, name: string, color?: string, lastLocation?: Location, history?: Location[] };

// PUBLIC_INTERFACE
type MapViewProps = {
  mode: "live" | "history";
  devices: Device[];
  playbackPath?: Location[];
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function MapView({ mode, devices, playbackPath }: MapViewProps) {
  const defaultCenter = playbackPath?.[0] || devices[0]?.lastLocation || { lat: 37.7749, lng: -122.4194 }; // fallback to San Francisco

  return (
    <MapContainer
      center={[defaultCenter.lat, defaultCenter.lng]}
      zoom={13}
      className="h-[60vh] w-full sm:h-[70vh] rounded-xl border border-gray-200 shadow"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mode === "live"
        ? devices.map(dev =>
            dev.lastLocation && (
              <Marker key={dev.id} position={[dev.lastLocation.lat, dev.lastLocation.lng]} icon={markerIcon}>
                <Popup>{dev.name}</Popup>
              </Marker>
            )
          )
        : playbackPath && (
            <>
              <Polyline
                positions={playbackPath.map(loc => [loc.lat, loc.lng])}
                color="#1E90FF"
                weight={5}
                opacity={0.8}
              />
              {playbackPath.length > 0 && (
                <Marker position={[playbackPath[0].lat, playbackPath[0].lng]} icon={markerIcon}><Popup>Start</Popup></Marker>
              )}
              {playbackPath.length > 1 && (
                <Marker position={[playbackPath[playbackPath.length - 1].lat, playbackPath[playbackPath.length - 1].lng]} icon={markerIcon}><Popup>End</Popup></Marker>
              )}
            </>
          )
      }
    </MapContainer>
  );
}
