import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
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

/* ===========================
   MAP CLICK LOCATION PICKER
=========================== */

function LocationPicker({
  setSource,
  setDestination,
  pickingMode,
}) {
  useMapEvents({
    click(e) {
      const coords = [
        e.latlng.lat,
        e.latlng.lng,
      ];

      if (pickingMode === "source") {
        setSource(coords);
      }

      if (pickingMode === "destination") {
        setDestination(coords);
      }
    },
  });

  return null;
}

/* ===========================
   SAFE ROUTING
=========================== */

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
        L.latLng(
          destination[0],
          destination[1]
        ),
      ],

      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true,
      createMarker: () => null,
    });

    routingControl.on(
      "routesfound",
      (e) => {
        const route = e.routes[0];

        let unsafeHits = 0;
        let moderateHits = 0;

        route.coordinates.forEach(
          (point) => {
            safetyZones.forEach(
              (zone) => {
                const distance =
                  map.distance(
                    [
                      point.lat,
                      point.lng,
                    ],
                    zone.position
                  );

                if (
                  distance <= zone.radius
                ) {
                  if (
                    zone.type ===
                    "unsafe"
                  )
                    unsafeHits++;

                  if (
                    zone.type ===
                    "moderate"
                  )
                    moderateHits++;
                }
              }
            );
          }
        );

        let routeColor = "#10b981";

        if (unsafeHits > 10) {
          routeColor = "#ef4444";
        } else if (
          moderateHits > 10
        ) {
          routeColor = "#f59e0b";
        }

        if (routeLine) {
          map.removeLayer(routeLine);
        }

        routeLine = L.polyline(
          route.coordinates,
          {
            color: routeColor,
            weight: 7,
          }
        ).addTo(map);
      }
    );

    routingControl.addTo(map);

    return () => {
      if (routeLine) {
        map.removeLayer(routeLine);
      }

      map.removeControl(
        routingControl
      );
    };
  }, [
    map,
    source,
    destination,
    safetyZones,
  ]);

  return null;
}
function FlyToSource({ source }) {
  const map = useMap();

  useEffect(() => {
    if (source) {
      map.flyTo(source, 16, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [source, map]);

  return null;
}
function FitRoute({
  source,
  destination,
}) {
  const map = useMap();

  useEffect(() => {
    if (source && destination) {
      const bounds = L.latLngBounds([
        source,
        destination,
      ]);

      map.fitBounds(bounds, {
        padding: [50, 50],
      });
    }
  }, [source, destination, map]);

  return null;
}

/* ===========================
   MAIN COMPONENT
=========================== */

export default function GoogleMapView({
  source,
  destination,
  setSource,
  setDestination,
  pickingMode,
}) {
  const apiKey =
    import.meta.env.VITE_MAPTILER_KEY;

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
      className="relative z-0 rounded-2xl overflow-hidden border border-purple-500/40 shadow-lg shadow-purple-900/30"
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <MapContainer
        center={
          source
            ? source
            : [12.9716, 77.5946]
        }
        zoom={12}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
          url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${apiKey}`}
        />
        <FlyToSource source={source} />
      <FitRoute
  source={source}
  destination={destination}
/>
        <LocationPicker
          setSource={setSource}
          setDestination={
            setDestination
          }
          pickingMode={
            pickingMode
          }
        />

        {source &&
          destination && (
            <SafetyRouting
              source={source}
              destination={
                destination
              }
              safetyZones={
                safetyZones
              }
            />
          )}

        {source && (
          <Marker
            position={source}
          >
            <Popup>
              Source Location
            </Popup>
          </Marker>
        )}

        {destination && (
          <Marker
            position={destination}
          >
            <Popup>
              Destination
            </Popup>
          </Marker>
        )}
{safetyZones.map((zone, index) => (
  <Marker
    key={`marker-${index}`}
    position={zone.position}
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
  </Marker>
))}
        {safetyZones.map(
          (zone, index) => (
            <Circle
              key={index}
              center={
                zone.position
              }
              radius={
                zone.radius
              }
              pathOptions={{
                fillColor:
                  zone.color,
                color:
                  zone.color,
                fillOpacity:
                  0.3,
                weight: 2,
              }}
            >
              <Popup>
                <div>
                  <strong>
                    {zone.name}
                  </strong>

                  <br />

                  Status:

                  <span
                    style={{
                      color:
                        zone.color,
                      fontWeight:
                        "bold",
                    }}
                  >
                    {" "}
                    {zone.type.toUpperCase()}
                  </span>
                </div>
              </Popup>
            </Circle>
          )
        )}
      </MapContainer>
    </div>
  );
}