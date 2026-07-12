import SrcToDest from "../components/map/SrcToDest";
import GoogleMapView from "../components/map/GoogleMapView";
import SafetyLegend from "../components/map/SafetyLegend";

import { useState } from "react";

export default function SafetyMap() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  const [pickingMode, setPickingMode] =
    useState(null);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Safety Map
      </h1>

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="lg:col-span-3">

          <div className="relative z-[9999]">
            <SrcToDest
              setSource={setSource}
              setDestination={setDestination}
            />
          </div>

          <div className="mb-4 flex gap-4">

            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              onClick={() =>
                setPickingMode("source")
              }
            >
              Select Source On Map
            </button>
            </div>
          <div className="mb-4 flex gap-4">
            <button
              className="rounded-lg bg-green-600 px-4 py-2 text-white"
              onClick={() =>
                setPickingMode(
                  "destination"
                )
              }
            >
              Select Destination On Map
            </button>

          </div>

          <GoogleMapView
            source={source}
            destination={destination}
            setSource={setSource}
            setDestination={setDestination}
            pickingMode={pickingMode}
            setPickingMode={setPickingMode}
          />

        </div>

        <div className="space-y-4">
          <SafetyLegend />
        </div>

      </div>
    </div>
  );
}
