import { useState } from "react";
import axios from "axios";
import Button from "../Button";
import Card from "../Card";
import { Search, MapPin, Lightbulb, Video, AlertTriangle, Bus, Eye, ShieldAlert, Ban, MoreHorizontal, Send } from "lucide-react";
export default function ReportForm() {
  const apiKey = import.meta.env.VITE_MAPTILER_KEY;

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [results, setResults] = useState([]);

  const categories = [
    { name: "Poor Lighting", Icon: Lightbulb, color: "from-yellow-500 to-orange-500" },
    { name: "No CCTV", Icon: Video, color: "from-gray-500 to-slate-600" },
    { name: "Harassment", Icon: AlertTriangle, color: "from-red-500 to-pink-600" },
    { name: "Unsafe Transport", Icon: Bus, color: "from-orange-500 to-red-500" },
    { name: "Stalking", Icon: Eye, color: "from-purple-500 to-pink-600" },
    { name: "Suspicious Activity", Icon: ShieldAlert, color: "from-pink-500 to-rose-600" },
    { name: "Unsafe Area", Icon: Ban, color: "from-red-500 to-purple-600" },
    { name: "Others", Icon: MoreHorizontal, color: "from-blue-500 to-purple-600" },
  ];

  async function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        try {
          const response = await fetch(`https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${apiKey}`);
          const data = await response.json();
          if (data.features.length > 0) {
            setLocation(data.features[0].place_name);
          }
        } catch (error) {
          console.log(error);
          alert("Unable to fetch location.");
        }
      },
      (error) => {
        console.log(error);
        alert("Location permission denied.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  async function searchPlaces() {
    if (searchLocation === "") return;
    const response = await fetch(`https://api.maptiler.com/geocoding/${searchLocation}.json?key=${apiKey}`);
    const data = await response.json();
    setResults(data.features);
  }

  async function submitReport() {
    if (category === "" || description === "" || location === "") {
      alert("Please fill all the fields.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/reports", { category, description, location, latitude, longitude });
      alert("Report Submitted Successfully.");
      setCategory("");
      setDescription("");
      setLocation("");
      setLatitude(null);
      setLongitude(null);
      window.dispatchEvent(new Event("reportSubmitted"));
    } catch (error) {
      console.log(error);
      alert("Unable to submit report.");
    }
  }

  return (
    <Card>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="w-full rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/60 focus:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={searchPlaces}
        className="mb-4 w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300"
      >
        <Search size={18} />
        SEARCH LOCATION
      </button>

      {/* Search Results */}
      {results.map((place) => (
        <div
          key={place.id}
          onClick={() => {
            setLocation(place.place_name);
            setLatitude(place.center[1]);
            setLongitude(place.center[0]);
            setResults([]);
          }}
          className="mb-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white transition-all"
        >
          {place.place_name}
        </div>
      ))}

      {/* Use Current Location Button */}
      <button
        onClick={getCurrentLocation}
        className="mb-5 w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300"
      >
        <MapPin size={18} />
        USE MY CURRENT LOCATION
      </button>

      {/* Selected Location Display */}
      {location && (
        <div className="mb-5 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 p-4">
          <h3 className="font-bold text-pink-300 flex items-center gap-2 mb-1">
            <MapPin size={16} />
            Selected Location
          </h3>
          <p className="text-gray-300 text-sm">{location}</p>
        </div>
      )}

      {/* Category Section */}
      <h3 className="mb-4 font-bold text-white text-lg">Select Category</h3>

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        {categories.map((item) => {
          const Icon = item.Icon;
          const isSelected = category === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`group relative flex items-center gap-3 rounded-xl p-4 font-semibold text-sm overflow-hidden transition-all duration-300
                ${
                  isSelected
                    ? `bg-gradient-to-br ${item.color} text-white border-2 border-white/30 shadow-[0_0_25px_rgba(236,72,153,0.5)] scale-105`
                    : "bg-white/5 border border-white/10 text-gray-300 hover:border-pink-500/50 hover:bg-white/10 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                }`}
            >
              
              <div
                className={`relative z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                  ${
                    isSelected
                      ? "bg-white/20 backdrop-blur-sm"
                      : `bg-gradient-to-br ${item.color} opacity-70 group-hover:opacity-100 group-hover:scale-110`
                  }`}
              >
                <Icon size={18} className="text-white drop-shadow-lg" />
              </div>
              <span className="relative z-10">{item.name}</span>

              {isSelected && (
                <span className="relative z-10 ml-auto text-white text-lg">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Description Textarea */}
      <textarea
        rows="6"
        value={description}
        placeholder="Describe the issue here..."
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl bg-white/5 border border-white/10 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/60 focus:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all resize-none"
      />

      {/* Submit Button */}
      <button
        onClick={submitReport}
        className="mt-5 w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all duration-300"
      >
        <Send size={18} />
        SUBMIT REPORT
      </button>
    </Card>
  );
}