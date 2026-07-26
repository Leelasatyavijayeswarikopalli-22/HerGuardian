import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { getAlternativeRoutes } from "../../services/maptilerService";

export default function SafetyRouting({
  source,
  destination,
  setRouteResults,
  selectedRoute,
  setSelectedRoute,
}) {
  const map = useMap();
  const polylines = useRef([]); // { routeNumber, polyline, glow, border, baseWeight }

  // ✅ whenever selection changes (card click OR line click), restyle the map
  useEffect(() => {
    polylines.current.forEach((entry) => {
      if (selectedRoute == null) {
        // no selection → show ALL routes normally
        entry.polyline.setStyle({ opacity: 0.9, weight: entry.baseWeight });
        entry.glow.setStyle({ opacity: 0.15 });
        if (entry.border) entry.border.setStyle({ opacity: 0.9 });
      } else if (entry.routeNumber === selectedRoute) {
        // selected → bright, thick, on top
        entry.polyline.setStyle({ opacity: 1, weight: entry.baseWeight + 3 });
        entry.glow.setStyle({ opacity: 0.35 });
        if (entry.border) entry.border.setStyle({ opacity: 1 });
        entry.polyline.bringToFront();
      } else {
        // not selected → dimmed but still visible
        entry.polyline.setStyle({ opacity: 0.25, weight: 4 });
        entry.glow.setStyle({ opacity: 0.05 });
        if (entry.border) entry.border.setStyle({ opacity: 0.15 });
      }
    });
  }, [selectedRoute]);

  useEffect(() => {
    if (!source || !destination) return;

    let cancelled = false;

    loadRoutes();

    async function loadRoutes() {
      try {
        window.dispatchEvent(new Event("hg-routes-loading"));
        clearRoutes();

        const routes = await getAlternativeRoutes(source, destination);
        if (cancelled) return;

        await analyzeRoutes(routes);
      } catch (error) {
        console.log(error);
      } finally {
        if (!cancelled) {
          window.dispatchEvent(new Event("hg-routes-loaded"));
        }
      }
    }

    async function analyzeRoutes(routes) {
      let backendList = [];

      try {
        const payload = {
          routes: routes.map((route, index) => ({
            routeNumber: index + 1,
            distance: route.distance,
            duration: route.duration,
            coordinates: route.geometry.coordinates.map((point) => ({
              latitude: point[1],
              longitude: point[0],
            })),
          })),
        };

        const response = await axios.post(
          "http://localhost:8080/api/routes/analyze",
          payload
        );

        backendList = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error("Backend analyze failed, using fallback scores:", error);
      }

      // ✅ MERGE: guarantee an entry for EVERY route so none get skipped
      const byNumber = {};
      backendList.forEach((r) => {
        byNumber[r.routeNumber] = r;
      });

      const rankedRoutes = routes.map((route, i) => {
        const num = i + 1;
        const b = byNumber[num] || backendList[i]; // match by number, else by position

        if (b) {
          return {
            ...b,
            routeNumber: num,
            distance: route.distance,
            duration: route.duration,
            coordinates: route.geometry.coordinates, // [lng,lat] for tracking
          };
        }

        // fallback so the route is ALWAYS drawn
        return {
          routeNumber: num,
          distance: route.distance,
          duration: route.duration,
          coordinates: route.geometry.coordinates,
          totalSafetyScore: 50,
          crimeScore: 0,
          crowdScore: 0,
          lightingScore: 0,
          policeScore: 0,
          cctvScore: 0,
          roadScore: 0,
          timeScore: 0,
          safest: num === 1,
          fastest: num === 2,
        };
      });

      if (cancelled) return;

      setRouteResults(rankedRoutes);
      drawRoutes(routes, rankedRoutes);
    }

    function drawRoutes(routes, rankedRoutes) {
      routes.forEach((route, index) => {
        const aiRoute = rankedRoutes[index]; // ✅ always exists now
        if (!aiRoute) return;

        let color = "#FF4D6D";
        let weight = 5;

        if (aiRoute.safest) {
          color = "#00F5A0";
          weight = 7;
        } else if (aiRoute.fastest) {
          color = "#00C2FF";
          weight = 6;
        } else if (aiRoute.totalSafetyScore >= 80) {
          color = "#22c55e";
        } else if (aiRoute.totalSafetyScore >= 60) {
          color = "#FFD93D";
        }

        const coordinates = route.geometry.coordinates.map((point) => [
          point[1],
          point[0],
        ]);

        const glow = L.polyline(coordinates, {
          color,
          weight: weight + 10,
          opacity: 0.15,
        }).addTo(map);

        // ✅ blue border underlay when the route is BOTH safest and fastest
        let border = null;
        if (aiRoute.safest && aiRoute.fastest) {
          border = L.polyline(coordinates, {
            color: "#00C2FF",
            weight: weight + 4,
            opacity: 0.9,
            lineCap: "round",
            lineJoin: "round",
          }).addTo(map);
        }

        const polyline = L.polyline(coordinates, {
          color,
          weight,
          opacity: 0.9,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        polylines.current.push({
          routeNumber: aiRoute.routeNumber,
          polyline,
          glow,
          border,
          baseWeight: weight,
        });

        polyline.bindPopup(`
<div style="font-family:Arial;width:260px">
<h3>Route ${aiRoute.routeNumber}</h3>
<hr/>
<h2 style="color:#16a34a">Safety Score ${Number(aiRoute.totalSafetyScore).toFixed(1)}</h2>
Crime : ${Number(aiRoute.crimeScore).toFixed(1)}<br/>
Crowd : ${Number(aiRoute.crowdScore).toFixed(1)}<br/>
Lighting : ${Number(aiRoute.lightingScore).toFixed(1)}<br/>
Police : ${Number(aiRoute.policeScore).toFixed(1)}<br/>
CCTV : ${Number(aiRoute.cctvScore).toFixed(1)}<br/>
Road : ${Number(aiRoute.roadScore).toFixed(1)}<br/>
Time : ${Number(aiRoute.timeScore).toFixed(1)}<br/><br/>
${aiRoute.safest ? "<span style='color:green;font-weight:bold'>🛡️ SAFEST ROUTE</span><br/>" : ""}
${aiRoute.fastest ? "<span style='color:#2563eb;font-weight:bold'>⚡ FASTEST ROUTE</span>" : ""}
</div>
`);

        // clicking the line also selects it (syncs with cards)
        polyline.on("click", () => {
          setSelectedRoute(aiRoute.routeNumber);
        });
      });
    }

    function clearRoutes() {
      polylines.current.forEach((entry) => {
        map.removeLayer(entry.polyline);
        map.removeLayer(entry.glow);
        if (entry.border) map.removeLayer(entry.border);
      });
      polylines.current = [];
    }

    return () => {
      cancelled = true;
      clearRoutes();
    };
  }, [source, destination]);

  return null;
}