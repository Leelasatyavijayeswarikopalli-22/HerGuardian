import SafetyScoreCard from "../components/dashboard/SafetyScoreCard";
import StatCard from "../components/dashboard/StatCard";
import SecretPhraseForm from "../components/voice/SecretPhraseForm";

import {
  AlertTriangle,
  MapPin,
  Users,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">

      <SafetyScoreCard />

      <div className="grid gap-4 md:grid-cols-3">

        <StatCard
          title="Unsafe Reports"
          value="126"
          icon={<AlertTriangle />}
        />

        <StatCard
          title="Risk Zones"
          value="18"
          icon={<MapPin />}
        />

        <StatCard
          title="Community Members"
          value="342"
          icon={<Users />}
        />

      </div>

      <SecretPhraseForm />

    </div>
  );
}