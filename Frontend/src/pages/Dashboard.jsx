import { useEffect, useState } from "react";

import SafetyScoreCard from "../components/dashboard/SafetyScoreCard";
import StatCard from "../components/dashboard/StatCard";
import AlertCard from "../components/dashboard/AlertCard";
import PredictionCard from "../components/dashboard/PredictionCard";
import EmergencyCard from "../components/dashboard/EmergencyCard";

import {
  AlertTriangle,
  Users,
  MapPin,
} from "lucide-react";

import {
  getDashboard,
} from "../services/dashboardService";

export default function Dashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  const [latitude, setLatitude] =
    useState(null);

  const [longitude, setLongitude] =
    useState(null);


  useEffect(() => {

    navigator.geolocation
      .getCurrentPosition(

        (position) => {

          setLatitude(
            position.coords.latitude
          );

          setLongitude(
            position.coords.longitude
          );

        },

        (error) => {

          console.log(error);

        }

      );

  }, []);



  useEffect(() => {

    if (

      latitude !== null &&
      longitude !== null

    ) {

      loadDashboard();

    }

  }, [latitude, longitude]);



  async function loadDashboard() {

    try {

      const data = await getDashboard(

        latitude,
        longitude

      );

      console.log(data);

      setDashboard(data);

    }

    catch (error) {

      console.log(error);

    }

  }



  if (!dashboard) {

    return (

      <div
        className="flex h-[70vh]
        items-center justify-center"
      >

        <h1
          className="text-3xl font-bold"
        >

          Loading Dashboard....

        </h1>

      </div>

    );

  }



  return (

    <div className="space-y-6 p-6">


      {/* SAFETY SCORE */}

      <SafetyScoreCard

        score={
          dashboard.safetyScore
        }

        status={
          dashboard.status
        }

        recommendation={
          dashboard.recommendation
        }

      />
      <div
className="grid
gap-4
md:grid-cols-3"
>


<StatCard

title="Nearest Police"

value={`${dashboard.nearestPoliceDistance} KM`}

icon={<MapPin/>}

/>



<StatCard

title="Nearest Hospital"

value={`${dashboard.nearestHospitalDistance} KM`}

icon={<Users/>}

/>



<StatCard

title="Weather"

value={dashboard.weather}

icon={<AlertTriangle/>}

/>


</div>


      {/* FIRST ROW */}

      <div
        className="grid gap-4
        md:grid-cols-3"
      >

        <StatCard

          title="Crime Score"

          value={
            Math.round(
              dashboard.crimeScore
            )
          }

          icon={
            <AlertTriangle />
          }

        />


        <StatCard

          title="Crowd Score"

          value={
            Math.round(
              dashboard.crowdScore
            )
          }

          icon={
            <Users />
          }

        />


        <StatCard

          title="Police Score"

          value={
            Math.round(
              dashboard.policeScore
            )
          }

          icon={
            <MapPin />
          }

        />

      </div>



      {/* SECOND ROW */}

      <div
        className="grid gap-4
        md:grid-cols-3"
      >

        <StatCard

          title="Lighting Score"

          value={
            Math.round(
              dashboard.lightingScore
            )
          }

          icon={
            <AlertTriangle />
          }

        />


        <StatCard

          title="Road Score"

          value={
            Math.round(
              dashboard.roadScore
            )
          }

          icon={
            <MapPin />
          }

        />


        <StatCard

          title="CCTV Score"

          value={
            Math.round(
              dashboard.cctvScore
            )
          }

          icon={
            <Users />
          }

        />

      </div>



      {/* THIRD ROW */}

      <div
        className="grid gap-4
        md:grid-cols-2"
      >

        <StatCard

          title="Time Score"

          value={
            Math.round(
              dashboard.timeScore
            )
          }

          icon={
            <AlertTriangle />
          }

        />


        <StatCard

          title="Best Time To Travel"

          value={
            dashboard.bestTimeToTravel
          }

          icon={
            <MapPin />
          }

        />

      </div>



      {/* ALERTS & PREDICTIONS */}

      <div
        className="grid gap-4
        md:grid-cols-2"
      >

        <PredictionCard

          predictions={
            dashboard.predictions
          }

        />


        <AlertCard

          alerts={
            dashboard.alerts
          }

        />

      </div>



      {/* EMERGENCY */}

      <div
        className="grid gap-4"
      >

        <EmergencyCard

          police={
            dashboard.nearestPoliceDistance
          }

          hospital={
            dashboard.nearestHospitalDistance
          }

        />

      </div>


    </div>

  );

}