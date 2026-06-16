import { useState } from "react";
import Input from "../Input";
import Button from "../Button";

export default function SrcToDest({
  setSource,
  setDestination,
}) {
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  const [sourceText, setSourceText] = useState("");
  const [destinationText, setDestinationText] = useState("");

  const [sourceResults, setSourceResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);

  const searchLocation = async (query, setResults) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          query
        )}.json?key=${apiKey}`
      );

      const data = await response.json();

      setResults(data.features || []);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("Current Location:", lat, lng);
      console.log("Accuracy:", position.coords.accuracy);

      setSource([lat, lng]);

      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${apiKey}`
        );

        const data = await response.json();

        if (data.features?.length > 0) {
          setSourceText(data.features[0].place_name);
        } else {
          setSourceText(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
      } catch (error) {
        console.error(error);
        setSourceText(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    },
    (error) => {
      console.error(error);

      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Location permission denied");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location unavailable");
          break;
        case error.TIMEOUT:
          alert("Location request timed out");
          break;
        default:
          alert("Unable to get location");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    }
  );
};

  return (
    <div className="relative z-[9999] mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

      {/* SOURCE */}

      <div className="relative">
        <Input
          placeholder="Current Location"
          value={sourceText}
          onChange={(e) => {
            setSourceText(e.target.value);

            searchLocation(
              e.target.value,
              setSourceResults
            );
          }}
        />

        {sourceResults.length > 0 && (
          <div className="absolute top-full left-0 z-[9999] mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-purple-500 bg-white shadow-lg">
            {sourceResults.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer p-3 hover:bg-purple-100"
                onClick={() => {
                  setSourceText(item.place_name);

                  setSource([
                    item.center[1],
                    item.center[0],
                  ]);

                  setSourceResults([]);
                }}
              >
                {item.place_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DESTINATION */}

      <div className="relative">
        <Input
          placeholder="Destination"
          value={destinationText}
          onChange={(e) => {
            setDestinationText(
              e.target.value
            );

            searchLocation(
              e.target.value,
              setDestinationResults
            );
          }}
        />

        {destinationResults.length > 0 && (
          <div className="absolute top-full left-0 z-[9999] mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-purple-500 bg-white shadow-lg">
            {destinationResults.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer p-3 hover:bg-purple-100"
                onClick={() => {
                  setDestinationText(
                    item.place_name
                  );

                  setDestination([
                    item.center[1],
                    item.center[0],
                  ]);

                  setDestinationResults([]);
                }}
              >
                {item.place_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-2">
         <Button
          className="whitespace-nowrap"
        >
          Find Safe Route
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={getCurrentLocation}
          className="whitespace-nowrap"
        >
          Use My Location
        </Button>
      </div>

    </div>
  );
}