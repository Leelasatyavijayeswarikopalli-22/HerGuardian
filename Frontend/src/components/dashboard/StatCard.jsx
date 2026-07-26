import Card from "../Card";

export default function StatCard({ title, value, icon, suffix = "/100 Safety Score" }) {
  const isNumber = typeof value === "number" && !isNaN(value);

  const level = !isNumber
    ? null
    : value >= 80
    ? {
        text: "text-emerald-500",
        bar: "from-emerald-400 to-teal-500",
        tile: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.2)]",
      }
    : value >= 60
    ? {
        text: "text-cyan-500",
        bar: "from-cyan-400 to-blue-500",
        tile: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.2)]",
      }
    : value >= 40
    ? {
        text: "text-amber-500",
        bar: "from-amber-400 to-orange-500",
        tile: "border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]",
      }
    : {
        text: "text-rose-500",
        bar: "from-rose-400 to-red-500",
        tile: "border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.2)]",
      };

  return (
    <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent"></div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
            {title}
          </p>

          {/* 👇 softer score: -500 shade, no glow */}
          {isNumber ? (
            <h3 className={`mt-3 text-5xl font-black ${level.text}`}>
              {value}
            </h3>
          ) : (
            <h3 className="mt-3 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-2xl font-extrabold leading-snug text-transparent md:text-3xl">
              {value}
            </h3>
          )}

          {isNumber && suffix && (
            <p className="mt-2 text-sm text-gray-500">{suffix}</p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 [&_svg]:h-6 [&_svg]:w-6 ${
            level
              ? level.tile
              : "border-pink-500/30 bg-pink-500/10 text-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.2)]"
          }`}
        >
          {icon}
        </div>
      </div>

      {isNumber && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            className={`h-full rounded-full bg-gradient-to-r ${level.bar} transition-all duration-700`}
          ></div>
        </div>
      )}
    </Card>
  );
}