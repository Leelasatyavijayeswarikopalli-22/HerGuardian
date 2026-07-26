import Card from "../Card";
import { AlertTriangle } from "lucide-react";

export default function AlertCard({ alerts }) {
  return (
    <Card className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.25)]">
            <AlertTriangle size={22} />
          </div>
          <h1 className="text-2xl font-extrabold text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
            Live Safety Alerts
          </h1>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-bold tracking-widest text-red-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-400"></span>
          LIVE
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-red-500/30 border-l-4 border-l-red-500 bg-red-500/10 p-4 shadow-[0_0_20px_rgba(239,68,68,0.12)] transition-all duration-300 hover:bg-red-500/15"
          >
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-400" />
            <p className="text-sm leading-relaxed text-red-200">{alert}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}