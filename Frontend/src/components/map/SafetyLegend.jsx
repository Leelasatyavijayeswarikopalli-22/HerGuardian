export default function SafetyLegend() {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-6 shadow-lg shadow-purple-900/30">
      
      <h3 className="text-xl font-bold text-white mb-5">Safety Zones</h3>
      
      <div className="space-y-4">
        
        {/* SAFE */}
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full border border-teal-700/50"></div>
          <span className="text-slate-300 font-medium text-lg">Safe</span>
        </div>

        {/* MODERATE */}
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-amber-900 border border-amber-700/50"></div>
          <span className="text-slate-300 font-medium text-lg">Moderate</span>
        </div>

        {/* UNSAFE */}
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-rose-900 border border-rose-700/50"></div>
          <span className="text-slate-300 font-medium text-lg">Unsafe</span>
        </div>

      </div>
    </div>
  );
}
