import Card from "../Card";
export default function SafetyLegend() {
  return (
    <Card>
      
      <h3 className="text-xl font-bold text-white mb-5">Safety Routes</h3>
      
      <div className="space-y-4">
        
        {/* SAFEST */}
        <div className="flex items-center gap-4">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#00F5A0", boxShadow: "0 0 10px #00F5A0" }}
          ></div>
          <span className="text-slate-300 font-medium text-lg">Safest Route</span>
        </div>

        {/* FASTEST */}
        <div className="flex items-center gap-4">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#00C2FF", boxShadow: "0 0 10px #00C2FF" }}
          ></div>
          <span className="text-slate-300 font-medium text-lg">Fastest Route</span>
        </div>

        {/* SAFEST + FASTEST (blue border) */}
        <div className="flex items-center gap-4">
          <div
            className="w-5 h-5 rounded-full border-2"
            style={{ backgroundColor: "#00F5A0", borderColor: "#00C2FF", boxShadow: "0 0 10px #00C2FF" }}
          ></div>
          <span className="text-slate-300 font-medium text-lg">Safest + Fastest</span>
        </div>

        {/* SAFER */}
        <div className="flex items-center gap-4">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#22c55e", boxShadow: "0 0 10px #22c55e" }}
          ></div>
          <span className="text-slate-300 font-medium text-lg">Safer</span>
        </div>

        {/* MODERATE */}
        <div className="flex items-center gap-4">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#FFD93D", boxShadow: "0 0 10px #FFD93D" }}
          ></div>
          <span className="text-slate-300 font-medium text-lg">Moderate</span>
        </div>

        {/* UNSAFE */}
        <div className="flex items-center gap-4">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#FF4D6D", boxShadow: "0 0 10px #FF4D6D" }}
          ></div>
          <span className="text-slate-300 font-medium text-lg">Unsafe</span>
        </div>

      </div>
    </Card>
  );
}