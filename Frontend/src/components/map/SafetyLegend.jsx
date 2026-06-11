export default function SafetyLegend() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md">

      <h3 className="mb-4 text-lg font-semibold">
        Safety Zones
      </h3>

      <div className="space-y-3">

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-green-500" />
          <span>Safe</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-yellow-500" />
          <span>Moderate</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-red-500" />
          <span>Unsafe</span>
        </div>

      </div>

    </div>
  );
}