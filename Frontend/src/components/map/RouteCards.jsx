import {useMap} from "../../context/MapContext";
export default function RouteCards({
  routeResults,
  selectedRoute,
  setSelectedRoute,
  startJourney,
  journeyStarted,
}) {
  if (routeResults.length === 0) return null;
  // ✅ pull real live values from context
const {
  safetyStatus,
  voiceSOS,
  routeDeviation,
  currentLocation,
  watchIdRef,
} = useMap();
  const getScoreInfo = (score) => {
    if (score > 70)
      return { label: "VERY SAFE", hex: "#00F5A0", badge: "bg-emerald-600 text-emerald-50", bar: "bg-emerald-400", ring: "ring-emerald-400/50" };
    if (score >= 50)
      return { label: "MODERATE", hex: "#FFD166", badge: "bg-amber-600 text-amber-50", bar: "bg-amber-400", ring: "ring-amber-400/50" };
    return { label: "UNSAFE", hex: "#FF4D6D", badge: "bg-red-600 text-red-50", bar: "bg-red-400", ring: "ring-red-400/50" };
  };

  return (
    <div className="mt-6 space-y-6">
      {routeResults.map((route) => {
        // ✅ safe score: never NaN / undefined
        const score = Number(route.totalSafetyScore) || 0;
        const info = getScoreInfo(score);
        const isSelected = selectedRoute === route.routeNumber;

        return (
          <div
            key={route.routeNumber}
            onClick={() => setSelectedRoute(route.routeNumber)}
            className={`cursor-pointer rounded-3xl border-2 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] shadow-2xl ${
              isSelected
                ? "border-pink-500/50 bg-gradient-to-br from-pink-900/40 via-purple-900/30 to-slate-900/80"
                : "border-white/10 bg-slate-900/60 hover:border-white/20"
            }`}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`h-4 w-4 rounded-full ring-2 ${info.ring}`}
                  style={{ backgroundColor: info.hex, boxShadow: `0 0 12px ${info.hex}` }}
                />
                <div>
                  <h1 className="text-2xl font-extrabold text-white">
                    Route {route.routeNumber}
                  </h1>
                  <p className="text-sm text-white/50">Overall Safety Score</p>
                </div>
              </div>

              <div className={`rounded-2xl px-5 py-3 text-center shadow-lg ${info.badge}`}>
                <h1 className="text-3xl font-black leading-none">
                  {score.toFixed(1)}
                </h1>
                <p className="mt-1 text-[10px] font-bold tracking-widest opacity-90">
                  {info.label}
                </p>
              </div>
            </div>

            {/* SCORE BAR */}
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${info.bar} transition-all duration-700`}
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>

            {/* DISTANCE & TIME */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-bold text-blue-300">Distance</h3>
                <p className="mt-1 text-xl font-bold text-white">
                  {(route.distance / 1000).toFixed(2)} km
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-bold text-purple-300">Time</h3>
                <p className="mt-1 text-xl font-bold text-white">
                  {Math.round(route.duration / 60)} mins
                </p>
              </div>
            </div>

            {/* INDIVIDUAL SCORES */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[
                ["Crime", route.crimeScore],
                ["Lighting", route.lightingScore],
                ["Police", route.policeScore],
                ["CCTV", route.cctvScore],
                ["Road", route.roadScore],
                ["Time", route.timeScore],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 flex justify-between items-center">
                  <span className="text-white/60 text-xs font-semibold">{label}</span>
                  <b className="text-white text-sm">{Number(value).toFixed(1)}</b>
                </div>
              ))}
            </div>

            {/* BADGES */}
            <div className="mt-6 flex flex-wrap gap-3">
              {route.safest && (
                <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                  🛡 SAFEST ROUTE
                </span>
              )}
              {route.fastest && (
                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]">
                  ⚡ FASTEST ROUTE
                </span>
              )}
              {journeyStarted && isSelected && (
                <span className="animate-pulse rounded-full bg-red-600 px-4 py-2 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                  🎙 LIVE SAFETY TRACKING
                </span>
              )}
            </div>

            {/* GUARDIAN MODE */}
           {/* GUARDIAN MODE - now uses REAL data from context */}
{isSelected && journeyStarted && (() => {
  // ✅ real values
  const trackingActive = watchIdRef.current != null;
  const locationSharing = currentLocation != null;

  // ✅ risk level derived from safetyStatus + deviation
  let riskLevel = "LOW";
  let riskColor = "text-emerald-200";
  if (routeDeviation) {
    riskLevel = "HIGH";
    riskColor = "text-red-200";
  } else if (safetyStatus === "CAUTION") {
    riskLevel = "MEDIUM";
    riskColor = "text-amber-200";
  } else if (score < 50) {
    riskLevel = "HIGH";
    riskColor = "text-red-200";
  } else if (score < 70) {
    riskLevel = "MEDIUM";
    riskColor = "text-amber-200";
  }

  // ✅ feature list built from real state
  const features = [
    { emoji: "📍", label: "Live Location Tracking", active: trackingActive },
    { emoji: "🎙", label: "Secret Voice SOS", active: voiceSOS },
    { emoji: "🚨", label: "Emergency Monitoring", active: journeyStarted },
    { emoji: "🤖", label: "AI Risk Detection", active: routeResults.length > 0 },
    { emoji: "🛡", label: "Route Safety Monitoring", active: !routeDeviation },
    { emoji: "👨‍👩", label: "Emergency Contacts", active: true },
    { emoji: "📢", label: "Microphone Until Destination", active: voiceSOS },
  ];

  return (
    <div className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-cyan-600 p-6 text-white shadow-2xl border border-white/10">
      <h1 className="mb-4 text-2xl font-black">SAFE JOURNEY MODE ACTIVE</h1>

      <div className="space-y-2.5 text-base font-medium">
        {features.map((f) => (
          <p key={f.label} className="flex items-center justify-between">
            <span>
              {f.emoji} {f.label}
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                f.active
                  ? "bg-emerald-900/60 text-emerald-200"
                  : "bg-red-900/60 text-red-200"
              }`}
            >
              {f.active ? "ENABLED" : "OFF"}
            </span>
          </p>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-white/20 p-4 backdrop-blur-md">
        <h3 className="font-black text-xl">CURRENT STATUS</h3>
        <div className="mt-2 space-y-1.5 text-sm opacity-95">
          <p className="flex justify-between">
            <span>Risk Level</span>
            <b className={riskColor}>{riskLevel}</b>
          </p>
          <p className="flex justify-between">
            <span>Safety Status</span>
            <b>{safetyStatus}</b>
          </p>
          <p className="flex justify-between">
            <span>Safety Score</span>
            <b>{score.toFixed(1)} / 100</b>
          </p>
          <p className="flex justify-between">
            <span>Route Deviation</span>
            <b className={routeDeviation ? "text-red-200" : "text-emerald-200"}>
              {routeDeviation ? "YES ⚠️" : "NO ✓"}
            </b>
          </p>
          <p className="flex justify-between">
            <span>Location Sharing</span>
            <b className={locationSharing ? "text-emerald-200" : "text-amber-200"}>
              {locationSharing ? "ACTIVE" : "WAITING GPS..."}
            </b>
          </p>
          <p className="flex justify-between">
            <span>Voice SOS</span>
            <b className={voiceSOS ? "text-emerald-200" : "text-red-200"}>
              {voiceSOS ? "LISTENING" : "OFF"}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
})()}

            {/* START BUTTON */}
            {isSelected &&
              (journeyStarted ? (
                // ✅ journey running → informational only, cannot double-start
                <button
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 py-4 text-xl font-black text-white opacity-80 shadow-[0_10px_40px_rgba(16,185,129,0.4)]"
                >
                  🛡 SAFE JOURNEY ACTIVE
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startJourney(route);
                  }}
                  className="mt-6 w-full rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-xl font-black text-white shadow-[0_10px_40px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_50px_rgba(16,185,129,0.6)]"
                >
                  START SAFE JOURNEY
                </button>
              ))}
          </div>
        );
      })}
    </div>
  );
}