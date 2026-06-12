import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function GoogleMapView() {
  const centerPosition = [12.9716, 77.5946];

  const safetyZones = [
    { position: [12.9716, 77.5946], name: "MG Road", type: "moderate", color: "#f59e0b", radius: 500 },
    { position: [12.9352, 77.6245], name: "Koramangala", type: "safe", color: "#10b981", radius: 600 },
    { position: [12.9698, 77.7500], name: "Whitefield", type: "unsafe", color: "#ef4444", radius: 400 },
    { position: [12.9784, 77.6408], name: "Indiranagar", type: "safe", color: "#10b981", radius: 500 },
  ];

  return (
    <div 
      className="rounded-2xl overflow-hidden border border-purple-500/40 shadow-lg shadow-purple-900/30" 
      style={{ height: '600px', width: '100%' }}
    >
      <MapContainer 
        center={centerPosition} 
        zoom={12} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {safetyZones.map((zone, index) => (
          <Circle
            key={index}
            center={zone.position}
            radius={zone.radius}
            pathOptions={{
              fillColor: zone.color,
              color: zone.color,
              fillOpacity: 0.3,
              weight: 2,
            }}
          >
            <Popup>
              <div>
                <strong>{zone.name}</strong>
                <br />
                Status: <span style={{ color: zone.color, fontWeight: 'bold' }}>
                  {zone.type.toUpperCase()}
                </span>
              </div>
            </Popup>
          </Circle>
        ))}

        {safetyZones.map((zone, index) => (
          <Marker key={`marker-${index}`} position={zone.position}>
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              {zone.type.toUpperCase()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
