import {
  LayoutDashboard,
  MapPinned,
  FileText,
  Route,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r bg-white md:block">

      <div className="p-6">

        <h2 className="text-lg font-bold text-pink-600">
          Navigation
        </h2>

      </div>

      <nav className="space-y-2 px-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-400"
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link
          to="/safety-map"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-400"
        >
          <MapPinned />
          Safety Map
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-400"
        >
          <FileText />
          Reports
        </Link>

        <Link
          to="/mobility"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-400"
        >
          <Route />
          Mobility Report
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-400"
        >
          <User />
          Profile
        </Link>

      </nav>

    </aside>
  );
}