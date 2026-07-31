import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import LocationPicker from "./LocationPicker";
import SafetyRouting from "./SafetyRouting";
import RouteCards from "./RouteCards";
import { FlyToSource, FitRoute } from "./MapHelpers";
import { useMap } from "../../context/MapContext";

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

const ARRIVAL_KM = 0.05;
const DEVIATION_KM = 0.1;
const AVG_SPEED_KMH = 30;

export default function GoogleMapView() {
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  // ✅ Everything from context now
  const {
    source, setSource,
    destination, setDestination,
    pickingMode, setPickingMode,
    routeResults, setRouteResults,
    selectedRoute, setSelectedRoute,
    journeyStarted, setJourneyStarted,
    currentLocation, setCurrentLocation,
    remainingDistance, setRemainingDistance,
    eta, setEta,
    routeDeviation, setRouteDeviation,
    voiceSOS, setVoiceSOS,
    safetyStatus, setSafetyStatus,
    watchIdRef, recognitionRef, journeyActiveRef,
  } = useMap();

  // cleanup only when app truly unloads
  useEffect(() => {
    return () => {
      // don't stop anything here anymore - context persists!
    };
  }, []);

    function startJourney(route) {
    setSelectedRoute(route.routeNumber);
    setJourneyStarted(true);
    journeyActiveRef.current = true;
    setVoiceSOS(true);
    setSafetyStatus("VERY SAFE");
    setRouteDeviation(false);
    
    // 🚀 TELL ANDROID TO START THE MICROPHONE SERVICE NOW
    if (window.AndroidBridge && window.AndroidBridge.onJourneyStarted) {
      window.AndroidBridge.onJourneyStarted();
    }

    startTracking(route);
    startListening(); // Web browser speech recognition (if on browser)
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

    // 🛑 TELL ANDROID TO TURN OFF THE MICROPHONE SERVICE TO SAVE BATTERY
    if (window.AndroidBridge && window.AndroidBridge.onJourneyEnded) {
      window.AndroidBridge.onJourneyEnded();
    }

    alert(message || "SAFE JOURNEY COMPLETED");
  }
  
  function startTracking(selRoute) {
  if (watchIdRef.current != null) {
    navigator.geolocation.clearWatch(watchIdRef.current);
  }

  // ✅ total route distance in KM (fallback)
  const totalRouteKm = selRoute ? selRoute.distance / 1000 : 0;
  const totalRouteMin = selRoute ? Math.round(selRoute.duration / 60) : 0;

  // ✅ set initial values immediately (before GPS ticks)
  setRemainingDistance(totalRouteKm.toFixed(2));
  setEta(totalRouteMin);

  const id = navigator.geolocation.watchPosition(
    (position) => {
      if (!journeyActiveRef.current) return;

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setCurrentLocation([lat, lng]);
      localStorage.setItem("liveLocation", JSON.stringify({ lat, lng }));
      if (!destination || !selRoute || !selRoute.coordinates) return;

      // ✅ how far user is from the route line
      const offRouteKm = distanceToRouteKm(lat, lng, selRoute.coordinates);

      // ✅ SMART: if user is way off route (>2km), assume testing/wrong GPS
      //    → just show total route distance instead of GPS-to-destination
      if (offRouteKm > 2) {
        setRemainingDistance(totalRouteKm.toFixed(2));
        setEta(totalRouteMin);
        setRouteDeviation(true);
        setSafetyStatus("CAUTION");
        return;
      }

      // ✅ find nearest point on route + calc remaining distance ALONG route
      const { remainingKm } = getRemainingAlongRoute(lat, lng, selRoute.coordinates);
      setRemainingDistance(remainingKm.toFixed(2));
      setEta(Math.round((remainingKm / AVG_SPEED_KMH) * 60));

      // ✅ arrived?
      if (remainingKm < ARRIVAL_KM) {
        setSafetyStatus("DESTINATION REACHED");
        stopJourney("🎉 DESTINATION REACHED — SAFE JOURNEY COMPLETED");
        return;
      }

      // ✅ deviation check
      if (offRouteKm > DEVIATION_KM) {
        setRouteDeviation(true);
        setSafetyStatus("CAUTION");
      } else {
        setRouteDeviation(false);
        setSafetyStatus("VERY SAFE");
      }
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );

  watchIdRef.current = id;
}

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
        const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
        const triggers = [
          "help me", "danger", "emergency", "save me", "sos",
          "please help", "i am scared", "someone follows me",
          "someone is following me",
        ];
        if (triggers.some((t) => text.includes(t))) {
          activateSOS();
        }
      };

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
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const liveLocation = currentLocation ? { lat: currentLocation[0], lng: currentLocation[1] } : null;
  
  // Save live location for bridge/Android to read
  localStorage.setItem("liveLocation", JSON.stringify(liveLocation));
  
  // ✅ Show alert immediately
  alert("🚨 HERGUARDIAN SOS ACTIVATED — Emergency contacts notified");

  // ✅ Call your Spring backend to send SMS/WhatsApp immediately
  fetch(
"https://herguardian-production-2950.up.railway.app/api/sos/trigger",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:userData.email,

fullName:userData.fullName,

emergencyContact1:
userData.emergencyContact1,

emergencyContact2:
userData.emergencyContact2,

emergencyContact3:
userData.emergencyContact3,

latitude:
liveLocation?.lat,

longitude:
liveLocation?.lng,

timestamp:
new Date().toISOString(),

triggerPhrase:
"voice-detected"

})

})

.catch((error)=>{

console.log(error);

});
  // ✅ Also notify Android native (if it needs to send direct SMS/WhatsApp)
  if (window.AndroidBridge && window.AndroidBridge.triggerNativeSOS) {
   const locationMessage=

`https://maps.google.com/?q=
${liveLocation?.lat},
${liveLocation?.lng}`;



window.AndroidBridge.triggerNativeSOS(

userData.emergencyContact1,

userData.emergencyContact2,

userData.emergencyContact3,

locationMessage

);
  }
}

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function degToRad(d) { return (d * Math.PI) / 180; }

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

  return (
    <>
      {journeyStarted && (() => {
  // ✅ get REAL selected route data
  const currentRoute = routeResults.find(r => r.routeNumber === selectedRoute);

  // ✅ show route distance if GPS hasn't updated yet
  const displayDistance = currentLocation
    ? Number(remainingDistance).toFixed(2)
    : currentRoute ? (currentRoute.distance / 1000).toFixed(2) : "—";

  // ✅ show route ETA if GPS hasn't updated yet
  const displayEta = currentLocation
    ? eta
    : currentRoute ? Math.round(currentRoute.duration / 60) : "—";

  // ✅ tracking status = real (based on watchId)
  const trackingActive = watchIdRef.current != null;

  // ✅ status color from real safetyStatus
  const statusColor = safetyStatus === "VERY SAFE"
    ? "text-emerald-300"
    : safetyStatus === "CAUTION"
    ? "text-amber-300"
    : "text-blue-300";

  return (
    <div className="mb-5 rounded-3xl bg-gradient-to-r from-purple-700 to-pink-600 p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">SAFE JOURNEY ACTIVE</h1>
          <p className="mt-2 text-lg">
            Route {selectedRoute} • <span className={statusColor}>{safetyStatus}</span>
          </p>
        </div>
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
          <p>{displayEta} mins {!currentLocation && <span className="text-xs opacity-70">(waiting GPS...)</span>}</p>
        </div>
        <div>
          <h2 className="font-bold">Distance Left</h2>
          <p>{displayDistance} KM</p>
        </div>
        <div>
          <h2 className="font-bold">Voice SOS</h2>
          <p>{voiceSOS ? "ACTIVE 🎤" : "OFF ❌"}</p>
        </div>
        <div>
          <h2 className="font-bold">Tracking</h2>
          <p>{trackingActive ? "LIVE 📍" : "STARTING..."}</p>
        </div>
      </div>

      {routeDeviation && (
        <div className="mt-5 animate-pulse rounded-2xl bg-red-600 p-4">
          <h2 className="text-xl font-bold">⚠ WARNING</h2>
          <p>You are moving away from the selected route.</p>
        </div>
      )}
    </div>
  );
})()}
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

          {source && <Marker position={source}><Popup>YOUR LOCATION</Popup></Marker>}
          {destination && <Marker position={destination}><Popup>YOUR DESTINATION</Popup></Marker>}

          {journeyStarted && currentLocation && (
            <Marker position={currentLocation} icon={LiveIcon}>
              <Popup>HERGUARDIAN<br />LIVE TRACKING ACTIVE</Popup>
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