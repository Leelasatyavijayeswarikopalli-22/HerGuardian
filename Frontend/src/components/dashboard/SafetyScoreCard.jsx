import Card from "../Card";
import { Sparkles, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

export default function SafetyScoreCard({ score, status, recommendation }) {
  const s = (status || "").toUpperCase();

  const theme =
    s.includes("UNSAFE") || s.includes("DANGER")
      ? {
          pill: "border-red-500/40 bg-red-500/10 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.25)]",
          dot: "bg-red-400",
          Icon: ShieldX,
        }
      : s.includes("CAUTION") || s.includes("MODERATE")
      ? {
          pill: "border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.25)]",
          dot: "bg-amber-400",
          Icon: ShieldAlert,
        }
      : s.includes("SAFE")
      ? {
          pill: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.25)]",
          dot: "bg-emerald-400",
          Icon: ShieldCheck,
        }
      : {
          pill: "border-pink-500/40 bg-pink-500/10 text-pink-300 shadow-[0_0_25px_rgba(236,72,153,0.25)]",
          dot: "bg-pink-400",
          Icon: ShieldCheck,
        };

  const StatusIcon = theme.Icon;

  return (
    <Card className="relative overflow-hidden">
      {/* decorative corner glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 blur-3xl"></div>

      <div className="relative flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          Your Safety Status
        </h1>

        <div
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold tracking-widest ${theme.pill}`}
        >
          <span className={`h-2 w-2 animate-pulse rounded-full ${theme.dot}`}></span>
          <StatusIcon size={16} />
          {status}
        </div>
      </div>

      {/* 👇 softer score: darker gradient, no glow */}
      <h1 className="relative mt-4 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-7xl font-black text-transparent">
        {Math.round(score)}
      </h1>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          style={{ width: `${score}%` }}
          className="relative h-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all duration-700"
        >
          <div className="absolute inset-0 animate-pulse bg-white/20"></div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-purple-600/10 p-5 backdrop-blur-md">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <Sparkles size={20} className="text-pink-400" />
          AI Recommendation
        </h2>
        <p className="mt-2 leading-relaxed text-gray-300">{recommendation}</p>
      </div>
    </Card>
  );
}