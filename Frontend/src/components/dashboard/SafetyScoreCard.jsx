import Card from "../Card";
import Badge from "../Badge";

export default function SafetyScoreCard() {
  const score = 84;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Current Safety Score
        </h2>

        <Badge text="Safe Zone" color="green" />
      </div>

      <h1 className="text-6xl font-bold text-green-600">
        {score}
      </h1>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-green-500"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-sm text-slate-500">
        Based on community reports, crowd density,
        lighting and transport availability.
      </p>
    </Card>
  );
}