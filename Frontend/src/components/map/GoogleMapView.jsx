import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function SafetyRouting({
  source,
  destination,
  safetyZones,
}) {
  const map = useMap();

  useEffect(() => {
    if (!source || !destination) return;

    let routeLine;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(source[0], source[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true,
      createMarker: () => null,
    });

    routingControl.on("routesfound", (e) => {
      const route = e.routes[0];

      let unsafeHits = 0;
      let moderateHits = 0;

      route.coordinates.forEach((point) => {
        safetyZones.forEach((zone) => {
          const distance = map.distance(
            [point.lat, point.lng],
            zone.position
          );

          if (distance <= zone.radius) {
            if (zone.type === "unsafe") unsafeHits++;
            if (zone.type === "moderate") moderateHits++;
          }
        });
      });

      let routeColor = "#10b981";

      if (unsafeHits > 10) {
        routeColor = "#ef4444";
      } else if (moderateHits > 10) {
        routeColor = "#f59e0b";
      }

      if (routeLine) {
        map.removeLayer(routeLine);
      }

      routeLine = L.polyline(route.coordinates, {
        color: routeColor,
        weight: 7,
      }).addTo(map);
    });

    routingControl.addTo(map);

    return () => {
      if (routeLine) map.removeLayer(routeLine);
      map.removeControl(routingControl);
    };
  }, [map, source, destination, safetyZones]);

  return null;
}

export default function GoogleMapView() {
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  const centerPosition = [12.9716, 77.5946];

  const currentLocation = [12.9716, 77.5946];

  const destination = [12.9352, 77.6245];

  const safetyZones = [
    {
      position: [12.9716, 77.5946],
      name: "MG Road",
      type: "moderate",
      color: "#f59e0b",
      radius: 500,
    },
    {
      position: [12.9352, 77.6245],
      name: "Koramangala",
      type: "safe",
      color: "#10b981",
      radius: 600,
    },
    {
      position: [12.9698, 77.75],
      name: "Whitefield",
      type: "unsafe",
      color: "#ef4444",
      radius: 400,
    },
    {
      position: [12.9784, 77.6408],
      name: "Indiranagar",
      type: "safe",
      color: "#10b981",
      radius: 500,
    },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden border border-purple-500/40 shadow-lg shadow-purple-900/30"
      style={{ height: "600px", width: "100%" }}
    >
      <MapContainer
        center={centerPosition}
        zoom={12}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${apiKey}`}
        />

        <SafetyRouting
          source={currentLocation}
          destination={destination}
          safetyZones={safetyZones}
        />

        <Marker position={currentLocation}>
          <Popup>Current Location</Popup>
        </Marker>

        <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>

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
                Status:
                <span
                  style={{
                    color: zone.color,
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {zone.type.toUpperCase()}
                </span>
              </div>
            </Popup>
          </Circle>
        ))}

        {safetyZones.map((zone, index) => (
          <Marker
            key={`marker-${index}`}
            position={zone.position}
          >
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