export default function SafetyLegend() {
  return (
    <div className="rounded-2xl bg-[#12081f] border border-white/10 p-6 shadow-[0_10px_30px_rgba(168,85,247,0.35)]">
      <h3 className="mb-6 text-xl font-bold text-white">
        Safety Zones
      </h3>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-emerald-500 "></div>
          <span className="font-medium">
            Safe
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-yellow-500 "></div>
          <span className="font-medium ">
            Moderate
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-red-500 "></div>
          <span className="font-medium">
            Unsafe
          </span>
        </div>
      </div>
    </div>
  );
}