import SrcToDest from "../components/map/SrcToDest";
import GoogleMapView from "../components/map/GoogleMapView";
import SafetyLegend from "../components/map/SafetyLegend";
import { MapPin, Navigation, Flag, Sparkles } from "lucide-react";
import { useState } from "react";

export default function SafetyMap() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pickingMode, setPickingMode] = useState(null);

  return (
    <div className="p-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs text-pink-200 font-medium mb-3">
          <Sparkles size={12} className="text-pink-400" />
          Live Route Safety
        </span>
        <h1 className="text-4xl font-extrabold text-white">
          Safety <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Map</span>
        </h1>
      </div>

      <div className="relative grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="relative z-[9999]">
            <SrcToDest
  source={source}
  destination={destination}
  setSource={setSource}
  setDestination={setDestination}
/>
          </div>

          {/* Action Buttons Row */}
          <div className="mb-4 flex flex-wrap gap-3">
            <button
              onClick={() => setPickingMode("source")}
              className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300
                ${
                  pickingMode === "source"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_25px_rgba(59,130,246,0.6)] scale-105"
                    : "bg-white/5 border border-blue-500/40 hover:border-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:bg-blue-500/10"
                }`}
            >
              <MapPin size={18} className="text-blue-400 group-hover:text-white transition-colors" />
              Select Source On Map
            </button>

            <button
              onClick={() => setPickingMode("destination")}
              className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300
                ${
                  pickingMode === "destination"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-[0_0_25px_rgba(34,197,94,0.6)] scale-105"
                    : "bg-white/5 border border-green-500/40 hover:border-green-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-500/10"
                }`}
            >
              <Flag size={18} className="text-green-400 group-hover:text-white transition-colors" />
              Select Destination On Map
            </button>

            {pickingMode && (
              <button
                onClick={() => setPickingMode(null)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-gray-300 hover:border-red-500/40 hover:text-red-400 transition-all"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Map with border glow */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <GoogleMapView
              source={source}
              destination={destination}
              setSource={setSource}
              setDestination={setDestination}
              pickingMode={pickingMode}
              setPickingMode={setPickingMode}
            />
          </div>
        </div>

        <div className="space-y-4">
          <SafetyLegend />
        </div>
      </div>
    </div>
  );
}