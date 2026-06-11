import GoogleMapView from "../components/map/GoogleMapView";
import SafetyLegend from "../components/map/SafetyLegend";
import ZoneCard from "../components/map/ZoneCard";

export default function SafetyMap() {
  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Safety Map
      </h1>

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="lg:col-span-3">
          <GoogleMapView />
        </div>

        <div className="space-y-4">
          <SafetyLegend />
          <ZoneCard />
        </div>

      </div>

    </div>
  );
}