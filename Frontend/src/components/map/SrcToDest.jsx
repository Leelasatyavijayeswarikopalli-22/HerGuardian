import { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import Input from "../Input";
import Button from "../Button";

export default function SrcToDest({
  source,
  destination,
  setSource,
  setDestination,
  onFindRoute,
}) {
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  const [sourceText, setSourceText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [sourceResults, setSourceResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [sourceCoords, setSourceCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // ✅ Spinner stays ON until SafetyRouting says routes are drawn
  useEffect(() => {
    const handleRoutesLoaded = () => setIsLoading(false);

    window.addEventListener("hg-routes-loaded", handleRoutesLoaded);
    return () =>
      window.removeEventListener("hg-routes-loaded", handleRoutesLoaded);
  }, []);

  const searchLocation = async (query, setResults) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();

    if (!query.trim()) {
      setResults([]);
      return;
    }

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          query
        )}.json?key=${apiKey}&country=IN&language=en&limit=8&types=address,street,place,locality,neighbourhood`,
        { signal: abortControllerRef.current.signal }
      );

      const data = await response.json();
      setResults(data.features || []);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Search Error:", error);
      }
    }
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;

    if (type === "source") {
      setSourceText(value);
      setSourceCoords(null);
    } else {
      setDestinationText(value);
      setDestCoords(null);
    }

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(
        value,
        type === "source" ? setSourceResults : setDestinationResults
      );
    }, 350);
  };

  const selectLocation = (item, type) => {
    const coords = [item.center[1], item.center[0]];

    if (type === "source") {
      setSourceText(item.place_name);
      setSourceCoords(coords);
      setSource(coords);
      setSourceResults([]);
    } else {
      setDestinationText(item.place_name);
      setDestCoords(coords);
      setDestination(coords);
      setDestinationResults([]);
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
        const coords = [lat, lng];

        setSourceCoords(coords);
        setSource(coords);

        try {
          const response = await fetch(
            `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${apiKey}`
          );
          const data = await response.json();
          const placeName =
            data.features?.[0]?.place_name ||
            `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

          setSourceText(placeName);
        } catch {
          setSourceText(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
      },
      (error) => {
        const messages = {
          1: "Location permission denied",
          2: "Location unavailable",
          3: "Location request timed out",
        };
        alert(messages[error.code] || "Unable to get location");
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  const geocodePlace = async (place) => {
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(
        place
      )}.json?key=${apiKey}&country=IN&language=en&limit=5&types=address,street,place,locality,neighbourhood`
    );

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      return {
        name: feature.place_name,
        coords: [feature.center[1], feature.center[0]],
      };
    }

    return null;
  };

  const handleFindSafeRoute = async () => {
    if ((!sourceText && !source) || (!destinationText && !destination)) {
      alert("Please select both source and destination");
      return;
    }

    setIsLoading(true); // ✅ spinner ON now...

    try {
      let finalSource = sourceCoords || source;
      let finalDestination = destCoords || destination;

      if (!finalSource && sourceText) {
        const srcResult = await geocodePlace(sourceText);
        if (!srcResult) {
          alert("Could not find source location.");
          setIsLoading(false);
          return;
        }
        finalSource = srcResult.coords;
        setSourceText(srcResult.name);
      }

      if (!finalDestination && destinationText) {
        const destResult = await geocodePlace(destinationText);
        if (!destResult) {
          alert("Could not find destination location.");
          setIsLoading(false);
          return;
        }
        finalDestination = destResult.coords;
        setDestinationText(destResult.name);
      }

      if (!finalSource || !finalDestination) {
        alert("Please select both source and destination");
        setIsLoading(false);
        return;
      }

      // ✅ new array identities so SafetyRouting ALWAYS re-runs,
      // even if you press Find twice with the same points
      setSource([...finalSource]);
      setDestination([...finalDestination]);
      setSourceCoords([...finalSource]);
      setDestCoords([...finalDestination]);

      if (onFindRoute) {
        await onFindRoute([...finalSource], [...finalDestination]);
      }

      // ❌ NO setIsLoading(false) here anymore!
      // The "hg-routes-loaded" event from SafetyRouting turns it off.
    } catch (error) {
      console.error("Route finding error:", error);
      alert("Failed to find route. Please try again.");
      setIsLoading(false);
    }
  };

  const ResultDropdown = ({ results, type }) => {
    if (!results.length) return null;

    return (
      <div className="mt-3 overflow-hidden rounded-3xl border border-pink-500/20 bg-[#14081f]/95 shadow-[0_20px_80px_rgba(236,72,153,0.18)] backdrop-blur-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300/80">
          <Search size={14} />
          Search Results
        </div>

        <div className="max-h-64 overflow-y-auto py-2">
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group flex w-full flex-col items-start px-4 py-3 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10"
              onClick={() => selectLocation(item, type)}
            >
              <span className="truncate text-sm font-semibold text-white group-hover:text-pink-200">
                {item.text || item.place_name}
              </span>
              <span className="mt-1 line-clamp-2 text-xs text-white/45 group-hover:text-white/70">
                {item.place_name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative z-[9999] mb-8 rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/15 to-purple-500/15">
              <Navigation size={18} className="text-pink-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Plan a Safe Journey
              </h3>
              <p className="text-sm text-white/45">
                Search by area, street, neighbourhood or pinpoint directly on the map
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <div>
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                <MapPin size={18} className="text-pink-300/80" />
              </div>

              <Input
                placeholder="Enter source location"
                value={sourceText}
                onChange={(e) => handleInputChange(e, "source")}
                className="h-16 rounded-2xl border border-white/15 bg-white/5 pl-12 pr-4 text-base text-white placeholder:text-white/35 backdrop-blur-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-500/25"
              />
            </div>

            <ResultDropdown results={sourceResults} type="source" />
          </div>

          <div>
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                <Navigation size={18} className="text-purple-300/80" />
              </div>

              <Input
                placeholder="Enter destination"
                value={destinationText}
                onChange={(e) => handleInputChange(e, "destination")}
                className="h-16 rounded-2xl border border-white/15 bg-white/5 pl-12 pr-4 text-base text-white placeholder:text-white/35 backdrop-blur-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-500/25"
              />
            </div>

            <ResultDropdown results={destinationResults} type="destination" />
          </div>

          <div className="flex items-start">
            <Button
              onClick={handleFindSafeRoute}
              disabled={isLoading}
              className={`h-16 w-full rounded-2xl px-6 text-base font-semibold whitespace-nowrap ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoading ? "Finding..." : "Find Safe Route"}
            </Button>
          </div>

          <div className="flex items-start">
            <Button
              onClick={getCurrentLocation}
              className="h-16 w-full rounded-2xl px-6 text-base font-semibold whitespace-nowrap"
            >
              Use My Location
            </Button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 opacity-60 blur-2xl animate-pulse"></div>

            <div className="relative flex min-w-[320px] flex-col items-center gap-6 rounded-3xl border border-pink-500/40 bg-gradient-to-br from-[#1a0b2e]/95 via-[#0a041d]/95 to-[#1a0b2e]/95 px-10 py-12 shadow-[0_0_60px_rgba(236,72,153,0.5)]">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-pink-500/30 border-t-pink-500"></div>
                <div className="absolute inset-2 rounded-full border-4 border-purple-500/30 border-b-purple-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <div className="h-8 w-8 animate-pulse rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.8)]"></div>
              </div>

              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-white">
                  Finding{" "}
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Safest Route
                  </span>
                </h3>
                <p className="text-sm text-gray-400">
                  Analyzing safety zones, lighting & crime data...
                </p>
              </div>

              <div className="flex gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-500 [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-500 [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-500"></span>
              </div>

              <div className="w-full space-y-2 border-t border-white/10 pt-2">
                <LoadingStep text="Locating start point" delay="0s" />
                <LoadingStep text="Scanning safety zones" delay="0.5s" />
                <LoadingStep text="Calculating safest path" delay="1s" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes checkPop {
          0% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        .animate-checkPop {
          animation: checkPop 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}

function LoadingStep({ text, delay }) {
  return (
    <div
      className="flex items-center gap-3 text-xs text-gray-300 opacity-0 animate-checkPop"
      style={{ animationDelay: delay, animationFillMode: "forwards" }}
    >
      <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
        <span className="text-[10px] font-bold text-white">✓</span>
      </div>
      <span>{text}</span>
    </div>
  );
}