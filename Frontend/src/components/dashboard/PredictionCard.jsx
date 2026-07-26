import Card from "../Card";
import { ShieldCheck, Shield, ShieldAlert, ShieldX } from "lucide-react";

export default function PredictionCard({ predictions }) {
  const timings = [
    "NOW",
    "NEXT 1 HOUR",
    "NEXT 3 HOURS",
    "NEXT 6 HOURS",
    "NEXT 12 HOURS",
  ];

  function getStatus(score) {
    if (score >= 90) {
      return {
        text: "VERY SAFE",
        color: "text-emerald-400",
        num: "text-emerald-500",
        advice: "Safe To Travel",
        border: "border-l-emerald-400",
        bar: "bg-emerald-400",
        Icon: ShieldCheck,
      };
    }

    if (score >= 75) {
      return {
        text: "SAFE",
        color: "text-cyan-400",
        num: "text-cyan-500",
        advice: "Prefer Main Roads",
        border: "border-l-cyan-400",
        bar: "bg-cyan-400",
        Icon: Shield,
      };
    }

    if (score >= 60) {
      return {
        text: "MODERATE",
        color: "text-amber-400",
        num: "text-amber-500",
        advice: "Avoid Isolated Areas",
        border: "border-l-amber-400",
        bar: "bg-amber-400",
        Icon: ShieldAlert,
      };
    }

    return {
      text: "UNSAFE",
      color: "text-rose-400",
      num: "text-rose-500",
      advice: "Avoid Solo Travel",
      border: "border-l-rose-500",
      bar: "bg-rose-500",
      Icon: ShieldX,
    };
  }

  return (
    <Card className="h-full space-y-5">
      <h1 className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
        AI Safety Predictions
      </h1>

      <div className="space-y-4">
        {predictions.map((score, index) => {
          const status = getStatus(Math.round(score));
          const StatusIcon = status.Icon;

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl border border-white/10 border-l-4 ${status.border} bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]`}
            >
              <h3 className="text-xs font-bold tracking-[0.2em] text-gray-400">
                {timings[index]}
              </h3>

              <div className="mt-2 flex items-center justify-between gap-4">
                {/* 👇 softer score: uses status.num (-500), no glow */}
                <h1 className={`text-5xl font-black ${status.num}`}>
                  {Math.round(score)}
                </h1>

                <div className="text-right">
                  <h2 className={`flex items-center justify-end gap-2 text-xl font-bold ${status.color}`}>
                    <StatusIcon size={20} />
                    {status.text}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-gray-400">
                    {status.advice}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  style={{ width: `${Math.min(100, Math.max(0, Math.round(score)))}%` }}
                  className={`h-full rounded-full ${status.bar} transition-all duration-700`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}