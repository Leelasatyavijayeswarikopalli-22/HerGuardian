import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Navigation, Share2, Siren } from "lucide-react";

export default function EmergencyCard({ police, hospital }) {
  const navigate = useNavigate();

  return (
    <Card className="relative space-y-5 overflow-hidden">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/15 to-red-500/15 blur-3xl"></div>

      <div className="relative flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.25)]">
          <ShieldCheck size={22} />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Emergency Support</h1>
      </div>

      <div className="relative grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-6 backdrop-blur-md">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
            Nearest Police
          </h2>
          <h1 className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-black text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              {police}
            </span>
            <span className="text-lg font-bold text-gray-400">KM</span>
          </h1>
        </div>
      </div>

      <div className="relative grid gap-4 md:grid-cols-3">
        <button
          onClick={() => navigate("/safety-map")}
          className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 p-3.5 font-semibold text-white shadow-[0_0_20px_rgba(147,51,234,0.35)] transition-all duration-300 hover:scale-[1.03] hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-[0_0_35px_rgba(147,51,234,0.6)]"
        >
          <Navigation size={18} className="transition-transform group-hover:translate-x-0.5" />
          Start Safe Journey
        </button>

        <button className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 p-3.5 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.03] hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.6)]">
          <Share2 size={18} className="transition-transform group-hover:scale-110" />
          Share Location
        </button>

        <button className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 p-3.5 font-semibold text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-[1.03] hover:from-red-500 hover:to-rose-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.8)]">
          <span className="absolute inset-0 animate-pulse bg-white/10"></span>
          <Siren size={18} className="relative transition-transform group-hover:scale-110" />
          <span className="relative">Activate SOS</span>
        </button>
      </div>
    </Card>
  );
}