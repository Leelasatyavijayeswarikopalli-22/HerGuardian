import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";      
export default function Profile() {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/auth");
};
  const [user, setUser] = useState(null);

  useEffect(() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/auth");
    return;
  }

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  setUser(user);
}, [navigate]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Card className="p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-pink-600">
            No Profile Found
          </h2>
          <p className="text-slate-500">
            Please sign up or log in first.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <Card className="mb-6 p-8">
          <div className="flex flex-col items-center">

            <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-pink-100">
              <User size={50} className="text-pink-600" />
            </div>

            <h1 className="text-3xl font-bold text-pink-600">
              {user.fullName}
            </h1>

            <p className="mt-2 text-slate-500">
              HerGuardian Member
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
              <CheckCircle size={18} />
              Verified Account
            </div>
          </div>
        </Card>

        {/* Profile Details */}
        <div className="grid gap-6 md:grid-cols-2">

          <Card className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <Mail className="text-pink-600" />
              <h3 className="font-semibold text-slate-700">
                Email Address
              </h3>
            </div>

            <p className="text-lg text-slate-800">
              {user.email}
            </p>
          </Card>

          <Card className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <Phone className="text-pink-600" />
              <h3 className="font-semibold text-slate-700">
                Emergency Contact
              </h3>
            </div>

            <p className="text-lg text-slate-800">
              {user.emergencyContact}
            </p>
          </Card>

          <Card className="p-6 md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <Shield className="text-pink-600" />
              <h3 className="font-semibold text-slate-700">
                SOS Phrase Status
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                Active & Protected
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                Hidden for Security
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Your emergency voice trigger phrase is securely stored and
              never displayed on screen.
            </p>
          </Card>

          {/* Safety Stats */}
          <Card className="p-6">
            <h3 className="mb-3 font-semibold text-slate-700">
              Safety Score
            </h3>

            <div className="text-4xl font-bold text-green-600">
              95
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Excellent account security.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-3 font-semibold text-slate-700">
              Account Status
            </h3>

            <div className="text-lg font-semibold text-green-600">
              Protected
            </div>

            <p className="mt-2 text-sm text-slate-500">
              SOS and emergency features are active.
            </p>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mt-6 p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-700">
            Account Actions
          </h3>

          <div className="flex flex-wrap gap-4">
            <Button>
              Edit Profile
            </Button>

            <Button className="bg-slate-700 hover:bg-slate-800">
              Change Password
            </Button>

            <button
  onClick={handleLogout}
  className="rounded-lg bg-red-500 px-4 py-2 text-white"
>
  Logout
</button>
          </div>
        </Card>

      </div>
    </div>
  );
}