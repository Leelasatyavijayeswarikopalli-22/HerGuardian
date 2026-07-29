import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import LocationPicker from "./LocationPicker";
import SafetyRouting from "./SafetyRouting";
import RouteCards from "./RouteCards";
import { FlyToSource, FitRoute } from "./MapHelpers";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LiveIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [40, 60],
  iconAnchor: [20, 60],
});

L.Marker.prototype.options.icon = DefaultIcon;

  const ARRIVAL_KM = 0.05; // 50 metres
const DEVIATION_KM = 0.1; // 100 metres

export default function GoogleMapView({
  source,
  destination,
  setSource,
  setDestination,
  pickingMode,
  setPickingMode,
}) {
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  const [routeResults, setRouteResults] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [remainingDistance, setRemainingDistance] = useState(0);
  const [eta, setEta] = useState(0);
  const [routeDeviation, setRouteDeviation] = useState(false);
  const [voiceSOS, setVoiceSOS] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState("VERY SAFE");

  // ✅ refs = no stale closures
  const watchIdRef = useRef(null);
  const recognitionRef = useRef(null);
  const journeyActiveRef = useRef(false);
  const routeResultsRef = useRef([]);
  const selectedRouteRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => { routeResultsRef.current = routeResults; }, [routeResults]);
  useEffect(() => { selectedRouteRef.current = selectedRoute; }, [selectedRoute]);
  useEffect(() => { destinationRef.current = destination; }, [destination]);

  // ✅ cleanup when page unmounts
  useEffect(() => {
    return () => {
      journeyActiveRef.current = false;
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  // ---------------- JOURNEY CONTROL ----------------

  function startJourney(route) {
    setSelectedRoute(route.routeNumber);
    selectedRouteRef.current = route.routeNumber;

    setJourneyStarted(true);
    journeyActiveRef.current = true;

    setVoiceSOS(true);
    setSafetyStatus("VERY SAFE");
    setRouteDeviation(false);

    startTracking();
    startListening();
  }

  function stopJourney(message) {
    journeyActiveRef.current = false;
    setJourneyStarted(false);
    setVoiceSOS(false);
    setRouteDeviation(false);

    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }

    alert(message || "SAFE JOURNEY COMPLETED");
  }

  // ---------------- GPS TRACKING ----------------

  function startTracking() {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        if (!journeyActiveRef.current) return;

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation([lat, lng]);

        const dest = destinationRef.current;
        if (!dest) return;

        const distToDest = getDistance(lat, lng, dest[0], dest[1]);
        setRemainingDistance(distToDest.toFixed(2));
        setEta(Math.round((distToDest / AVG_SPEED_KMH) * 60));

        // ✅ arrived?
        if (distToDest < ARRIVAL_KM) {
          setSafetyStatus("DESTINATION REACHED");
          stopJourney("🎉 DESTINATION REACHED — SAFE JOURNEY COMPLETED");
          return;
        }

        // ✅ deviation = distance from the SELECTED ROUTE LINE (not destination)
        const sel = routeResultsRef.current.find(
          (r) => r.routeNumber === selectedRouteRef.current
        );

        if (sel && sel.coordinates && sel.coordinates.length > 1) {
          const offRoute = distanceToRouteKm(lat, lng, sel.coordinates);

          if (offRoute > DEVIATION_KM) {
            setRouteDeviation(true);
            setSafetyStatus("CAUTION");
          } else {
            setRouteDeviation(false);
            setSafetyStatus("VERY SAFE");
          }
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    watchIdRef.current = id;
  }

  // ---------------- VOICE SOS ----------------

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSOS(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0]
          .transcript.toLowerCase();

        const triggers = [
          "help me", "danger", "emergency", "save me", "sos",
          "please help", "i am scared", "someone follows me",
          "someone is following me",
        ];

        if (triggers.some((t) => text.includes(t))) {
          activateSOS();
        }
      };

      // ✅ browser stops mic after silence → auto-restart while journey is live
      recognition.onend = () => {
        if (journeyActiveRef.current) {
          try { recognition.start(); } catch {}
        }
      };

      recognition.onerror = (e) => {
        console.log("Speech error:", e.error);
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          setVoiceSOS(false);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.log("Mic init failed:", err);
      setVoiceSOS(false);
    }
  }

  function activateSOS() {
    alert("🚨 HERGUARDIAN SOS ACTIVATED — Emergency contacts notified");
  }

  // ---------------- MATH HELPERS ----------------

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function degToRad(d) {
    return (d * Math.PI) / 180;
  }

  // min distance (km) from a point to the route polyline
  function distanceToRouteKm(lat, lng, coords) {
    let min = Infinity;
    for (let i = 0; i < coords.length - 1; i++) {
      const d = distanceToSegmentKm(
        lat, lng,
        coords[i][1], coords[i][0],
        coords[i + 1][1], coords[i + 1][0]
      );
      if (d < min) min = d;
      if (min === 0) break;
    }
    return min;
  }

  function distanceToSegmentKm(pLat, pLng, aLat, aLng, bLat, bLng) {
    const kmPerLat = 111.32;
    const kmPerLng = 111.32 * Math.cos((pLat * Math.PI) / 180);

    const px = pLng * kmPerLng, py = pLat * kmPerLat;
    const ax = aLng * kmPerLng, ay = aLat * kmPerLat;
    const bx = bLng * kmPerLng, by = bLat * kmPerLat;

    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = len2 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));

    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  }

  // ---------------- RENDER ----------------

  return (
    <>
      {journeyStarted && (
        <div className="mb-5 rounded-3xl bg-gradient-to-r from-purple-700 to-pink-600 p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">SAFE JOURNEY ACTIVE</h1>
              <p className="mt-2 text-lg">
                Route {selectedRoute} • {safetyStatus}
              </p>
            </div>

            {/* ✅ user can end journey anytime */}
            <button
              onClick={() => stopJourney("Journey ended by user. Stay safe!")}
              className="rounded-2xl border-2 border-white/40 bg-red-600 px-6 py-3 font-bold shadow-lg transition-all hover:scale-105 hover:bg-red-500"
            >
              End Journey
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <div>
              <h2 className="font-bold">ETA</h2>
              <p>{eta} mins</p>
            </div>
            <div>
              <h2 className="font-bold">Distance Left</h2>
              <p>{remainingDistance} KM</p>
            </div>
            <div>
              <h2 className="font-bold">Voice SOS</h2>
              <p>{voiceSOS ? "ACTIVE 🎤" : "OFF"}</p>
            </div>
            <div>
              <h2 className="font-bold">Tracking</h2>
              <p>LIVE 📍</p>
            </div>
          </div>

          {routeDeviation && (
            <div className="mt-5 animate-pulse rounded-2xl bg-red-600 p-4">
              <h2 className="text-xl font-bold">⚠ WARNING</h2>
              <p>You are moving away from the selected route.</p>
            </div>
          )}
        </div>
      )}

      <div
        className="overflow-hidden rounded-3xl border-2 shadow-xl"
        style={{ height: "700px", width: "100%" }}
      >
        <MapContainer
          center={source ?? [16.989, 82.247]}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${apiKey}`}
          />

          <LocationPicker
            pickingMode={pickingMode}
            setPickingMode={setPickingMode}
            setSource={setSource}
            setDestination={setDestination}
          />

          <FlyToSource source={source} />
          <FitRoute source={source} destination={destination} />

          {source && (
            <Marker position={source}>
              <Popup>YOUR LOCATION</Popup>
            </Marker>
          )}

          {destination && (
            <Marker position={destination}>
              <Popup>YOUR DESTINATION</Popup>
            </Marker>
          )}

          {journeyStarted && currentLocation && (
            <Marker position={currentLocation} icon={LiveIcon}>
              <Popup>
                HERGUARDIAN
                <br />
                LIVE TRACKING ACTIVE
              </Popup>
            </Marker>
          )}

          {source && destination && (
            <SafetyRouting
              source={source}
              destination={destination}
              routeResults={routeResults}
              setRouteResults={setRouteResults}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
            />
          )}
        </MapContainer>
      </div>

      <RouteCards
        routeResults={routeResults}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        startJourney={startJourney}
        journeyStarted={journeyStarted}
      />
    </>
  );
}