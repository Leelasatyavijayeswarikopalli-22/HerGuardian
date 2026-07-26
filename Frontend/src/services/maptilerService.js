import axios from "axios";

const API_KEY = import.meta.env.VITE_ORS_API_KEY;

export async function getAlternativeRoutes(source, destination) {
  try {
    const startCoords = Array.isArray(source)
      ? [source[1], source[0]]
      : [source.lng, source.lat];

    const endCoords = Array.isArray(destination)
      ? [destination[1], destination[0]]
      : [destination.lng, destination.lat];

    const response = await axios.post(
      "/ors/v2/directions/driving-car/geojson",
      {
        coordinates: [startCoords, endCoords],
        preference: "recommended",
        alternative_routes: {
          target_count: 3,      // ✅ ask for 3 routes
          weight_factor: 1.6,   // ✅ allow longer alternatives
          share_factor: 0.5,    // ✅ allow more overlap so 3rd route is found
        },
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ORS RESPONSE FEATURES COUNT:", response.data?.features?.length);

    if (!response.data?.features?.length) {
      throw new Error("No routes found");
    }

    return response.data.features.map((feature) => ({
      geometry: feature.geometry,
      distance: feature.properties.summary.distance,
      duration: feature.properties.summary.duration,
    }));
  } catch (error) {
    console.error("getAlternativeRoutes ERROR:", error.response?.data || error.message || error);
    throw error;
  }
}