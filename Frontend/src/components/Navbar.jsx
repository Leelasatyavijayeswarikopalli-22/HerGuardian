import { Shield, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" >
          <img src="/logo.jpeg" alt="HerGuardian Logo" className="h-16 w-auto" />
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">

          <Link
            to="/dashboard"
            className="font-medium text-slate-600 hover:text-pink-600"
          >
            Dashboard
          </Link>

          <Link
            to="/safety-map"
            className="font-medium text-slate-600 hover:text-pink-600"
          >
            Safety Map
          </Link>

          <Link
            to="/reports"
            className="font-medium text-slate-600 hover:text-pink-600"
          >
            Reports
          </Link>

          <Link
            to="/mobility"
            className="font-medium text-slate-600 hover:text-pink-600"
          >
            Mobility
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="rounded-full p-2 hover:bg-slate-100">
            <Bell
              size={22}
              className="text-slate-600"
            />
          </button>

          <button className="rounded-full p-2 hover:bg-slate-100">
            <User
              size={22}
              className="text-slate-600"
            />
          </button>

        </div>

      </div>
    </nav>
  );
}