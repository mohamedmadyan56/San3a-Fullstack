'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix أيقونات Leaflet مع Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const craftsmen = [
  { id: 1, name: 'أحمد - كهربائي', position: [30.0444, 31.2357] as [number, number] },
  { id: 2, name: 'محمد - سباك',    position: [30.0500, 31.2400] as [number, number] },
  { id: 3, name: 'علي - نجار',     position: [30.0380, 31.2300] as [number, number] },
];

export default function Map() {
  return (
    <MapContainer
      center={[30.0444, 31.2357]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {craftsmen.map((c) => (
        <Marker key={c.id} position={c.position}>
          <Popup>{c.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}