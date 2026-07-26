import { useEffect, useState } from "react";

import SafetyScoreCard from "../components/dashboard/SafetyScoreCard";
import StatCard from "../components/dashboard/StatCard";
import AlertCard from "../components/dashboard/AlertCard";
import PredictionCard from "../components/dashboard/PredictionCard";
import EmergencyCard from "../components/dashboard/EmergencyCard";

import {
  ShieldAlert,
  ShieldCheck,
  Lightbulb,
  Route,
  Video,
  Clock,
  CalendarClock,
} from "lucide-react";

import { getDashboard } from "../services/dashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      loadDashboard();
    }
  }, [latitude, longitude]);

  async function loadDashboard() {
    try {
      const data = await getDashboard(latitude, longitude);
      console.log(data);
      setDashboard(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!dashboard) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-pink-500/20"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500"></div>
          <div className="absolute inset-3 animate-pulse rounded-full bg-gradient-to-br from-pink-500/40 to-purple-600/40 blur-md"></div>
        </div>
        <h1 className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
          Loading Dashboard....
        </h1>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 overflow-hidden p-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px]"></div>
      <div className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]"></div>

      {/* SAFETY SCORE */}
      <SafetyScoreCard
        score={dashboard.safetyScore}
        status={dashboard.status}
        recommendation={dashboard.recommendation}
      />

      {/* FIRST ROW */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Crime Score"
          value={Math.round(dashboard.crimeScore)}
          icon={<ShieldAlert />}
        />

        <StatCard
          title="Police Score"
          value={Math.round(dashboard.policeScore)}
          icon={<ShieldCheck />}
        />
      </div>

      {/* SECOND ROW */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Lighting Score"
          value={Math.round(dashboard.lightingScore)}
          icon={<Lightbulb />}
        />

        <StatCard
          title="Road Score"
          value={Math.round(dashboard.roadScore)}
          icon={<Route />}
        />

        <StatCard
          title="Surveillance Score"
          value={Math.round(dashboard.cctvScore)}
          icon={<Video />}
        />
      </div>

      {/* THIRD ROW */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Time Of The Day Score"
          value={Math.round(dashboard.timeScore)}
          icon={<Clock />}
        />

        <StatCard
          title="Best Time To Travel"
          value={dashboard.bestTimeToTravel}
          icon={<CalendarClock />}
        />
      </div>

      {/* ALERTS & PREDICTIONS */}
      <div className="grid gap-4 md:grid-cols-2">
        <PredictionCard predictions={dashboard.predictions} />
        <AlertCard alerts={dashboard.alerts} />
      </div>

      {/* EMERGENCY */}
      <div className="grid gap-4">
        <EmergencyCard police={dashboard.nearestPoliceDistance} />
      </div>
    </div>
  );
}