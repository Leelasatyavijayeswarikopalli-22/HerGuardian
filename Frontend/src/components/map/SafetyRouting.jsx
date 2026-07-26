import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getAlternativeRoutes } from "../../services/maptilerService";

export default function SafetyRouting({
  source,
  destination,
  setRouteResults,
  setSelectedRoute,
}) {
  const map = useMap();
  const layersRef = useRef([]);

  useEffect(() => {
    if (!source || !destination) return;

    const clearRoutes = () => {
      layersRef.current.forEach((layer) => map.removeLayer(layer));
      layersRef.current = [];
    };

    const loadRoutes = async () => {
      try {
        clearRoutes();

        const routes = await getAlternativeRoutes(source, destination);
        console.log("ROUTES:", routes);

        const fakeRankedRoutes = routes.map((route, index) => ({
          routeNumber: index + 1,
          totalSafetyScore: 75,
          crimeScore: 70,
          crowdScore: 70,
          lightingScore: 70,
          policeScore: 70,
          cctvScore: 70,
          roadScore: 70,
          timeScore: 70,
          safest: index === 0,
          fastest: false,
          distance: route.distance,
          duration: route.duration,
        }));

        setRouteResults(fakeRankedRoutes);

        const bounds = [];

        routes.forEach((route, index) => {
          const coordinates = route.geometry.coordinates.map((point) => [
            point[1],
            point[0],
          ]);

          bounds.push(...coordinates);

          const polyline = L.polyline(coordinates, {
            color: index === 0 ? "#00F5A0" : "#FF4D6D",
            weight: 6,
            opacity: 0.95,
          }).addTo(map);

          polyline.bindPopup(`Route ${index + 1}`);
          polyline.on("click", () => {
            setSelectedRoute(index + 1);
          });

          layersRef.current.push(polyline);
        });

        if (bounds.length) {
          map.fitBounds(bounds, { padding: [40, 40] });
        }
      } catch (error) {
        console.error("loadRoutes error:", error.response?.data || error.message || error);
      }
    };

    loadRoutes();

    return () => clearRoutes();
  }, [source, destination, map, setRouteResults, setSelectedRoute]);

  return null;
}