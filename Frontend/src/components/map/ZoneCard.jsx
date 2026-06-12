import Card from "../Card";
import Badge from "../Badge";

export default function ZoneCard() {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/40 rounded-2xl p-6 shadow-lg shadow-purple-900/30">

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">MG Road</h2>
        <Badge text="Moderate" color="yellow" />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-slate-300">
          Safety Score: <strong className="text-white">68/100</strong>
        </p>
        <p className="text-slate-300">
          Crowd Density: <strong className="text-white">Medium</strong>
        </p>
        <p className="text-slate-300">
          Lighting: <strong className="text-white">Good</strong>
        </p>
        <p className="text-slate-300">
          Nearby Police: <strong className="text-white">1.2 km</strong>
        </p>
      </div>

    </Card>
  );
}
