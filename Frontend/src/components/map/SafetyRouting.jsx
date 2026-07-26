import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getAlternativeRoutes } from "../../services/maptilerService";
import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/routes/analyze";

export default function SafetyRouting({
  source,
  destination,
  setRouteResults,
  selectedRoute,
  setSelectedRoute,
}) {
  const map = useMap();
  const layersRef = useRef({});
  const baseColorRef = useRef({});

  // STRICT SCORE COLOR ONLY — NO BLUE OVERRIDE
  const getScoreColor = (score) => {
    if (score > 70) return "#00F5A0";      // Green
    if (score >= 50) return "#FFD166";     // Yellow
    return "#FF4D6D";                      // Red
  };

  const getScoreLabel = (score) => {
    if (score > 70) return "VERY SAFE";
    if (score >= 50) return "MODERATE / CAUTION";
    return "UNSAFE / RED ZONE";
  };

  useEffect(() => {
    if (!source || !destination) return;

    const clearRoutes = () => {
      Object.values(layersRef.current).forEach((layer) => map.removeLayer(layer));
      layersRef.current = {};
      baseColorRef.current = {};
    };

    const loadRealSafetyRoutes = async () => {
      try {
        clearRoutes();

        const routes = await getAlternativeRoutes(source, destination);
        console.log("RAW ROUTE OPTIONS:", routes.length, routes);

        if (!routes.length) return;

        const payload = {
          routes: routes.map((route, index) => ({
            routeNumber: index + 1,
            distance: route.distance,
            duration: route.duration,
            coordinates: route.geometry.coordinates.map((pt) => ({
              latitude: pt[1],
              longitude: pt[0],
            })),
          })),
        };

        const response = await axios.post(BACKEND_URL, payload);
        const analyzedRoutes = response.data;
        console.log("REAL BACKEND SCORES RECEIVED:", analyzedRoutes);

        setRouteResults(analyzedRoutes);

        if (analyzedRoutes.length > 0 && !selectedRoute) {
          setSelectedRoute(analyzedRoutes[0].routeNumber);
        }

        const allBounds = [];

        // Draw in reverse: lowest score first so highest score draws ON TOP
        [...analyzedRoutes].reverse().forEach((route) => {
          const latLngs = route.coordinates.map((point) => [
            point.latitude,
            point.longitude,
          ]);
          allBounds.push(...latLngs);

          const score = route.totalSafetyScore;
          const color = getScoreColor(score);
          baseColorRef.current[route.routeNumber] = color;

          const polyline = L.polyline(latLngs, {
            color: color,
            weight: 5,
            opacity: 0.85,
          }).addTo(map);

          polyline.bindPopup(
            `<div style="text-align:center;font-family:sans-serif;">
              <b>Route ${route.routeNumber}</b><br/>
              <span style="font-size:16px;font-weight:bold;">${score.toFixed(1)} / 100</span><br/>
              <span style="color:${color};font-weight:bold;">${getScoreLabel(score)}</span>
            </div>`
          );

          polyline.on("click", (e) => {
            L.DomEvent.stopPropagation(e);
            setSelectedRoute(route.routeNumber);
          });

          layersRef.current[route.routeNumber] = polyline;
        });

        if (allBounds.length) {
          map.fitBounds(allBounds, { padding: [50, 50] });
        }
      } catch (error) {
        console.error("Route analysis error:", error.response?.data || error.message || error);
      }
    };

    loadRealSafetyRoutes();

    return () => clearRoutes();
  }, [source, destination, map, setRouteResults, setSelectedRoute]);

  // Update line thickness / opacity when user clicks card — KEEP SAME COLOR
  useEffect(() => {
    Object.entries(layersRef.current).forEach(([routeNum, layer]) => {
      const num = parseInt(routeNum);
      const base = baseColorRef.current[num];
      if (!base) return;

      if (num === selectedRoute) {
        layer.setStyle({ color: base, weight: 8, opacity: 1 });
        layer.bringToFront();
      } else {
        layer.setStyle({ color: base, weight: 5, opacity: 0.55 });
      }
    });
  }, [selectedRoute]);

  return null;
}