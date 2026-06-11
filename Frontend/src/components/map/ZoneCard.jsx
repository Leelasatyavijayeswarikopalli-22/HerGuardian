import Card from "../Card";
import Badge from "../Badge";

export default function ZoneCard() {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          MG Road
        </h2>

        <Badge
          text="Moderate"
          color="yellow"
        />

      </div>

      <div className="mt-4">

        <p>
          Safety Score:
          <strong> 68/100</strong>
        </p>

        <p className="mt-2">
          Crowd Density:
          <strong> Medium</strong>
        </p>

        <p className="mt-2">
          Lighting:
          <strong> Good</strong>
        </p>

        <p className="mt-2">
          Nearby Police:
          <strong> 1.2 km</strong>
        </p>

      </div>

    </Card>
  );
}