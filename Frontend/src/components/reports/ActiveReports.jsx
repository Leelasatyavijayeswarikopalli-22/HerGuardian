import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";
import { AlertTriangle, MapPin, Users, ShieldAlert, Inbox } from "lucide-react";

export default function ActiveReports() {
  const [reports, setReports] = useState([]);

  async function loadReports() {
    try {
      const response = await axios.get("http://localhost:8080/api/reports/active");
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadReports();
    const interval = setInterval(() => loadReports(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      {/* Header with live indicator */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)]">
          <ShieldAlert size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wide">
            ACTIVE <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">REPORTS</span>
          </h2>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Live updating every 5s
          </p>
        </div>
      </div>

      {/* Empty state */}
      {reports.length === 0 && (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Inbox size={28} className="text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm">No Active Reports Found.</p>
          <p className="text-gray-600 text-xs mt-1">All areas are currently safe ✨</p>
        </div>
      )}

      {/* Reports List */}
      {reports.map((report) => (
        <div
          key={report.id}
          className="group mb-4 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl p-5 shadow-lg
                     hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:scale-[1.02] transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <AlertTriangle size={16} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{report.category}</h3>
            </div>
            <span className="px-2 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-semibold uppercase tracking-wider">
              {report.status}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-300">
            <p className="flex items-start gap-2">
              <MapPin size={14} className="text-pink-400 mt-0.5 flex-shrink-0" />
              <span><b className="text-white">Location:</b> {report.location}</span>
            </p>
            <p className="pl-6">
              <b className="text-white">Description:</b> {report.description}
            </p>
            <p className="flex items-center gap-2">
              <Users size={14} className="text-purple-400" />
              <span><b className="text-white">Reported By:</b> {report.reportCount} Users</span>
            </p>
            {report.adminRemark && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-yellow-300">
                  <b>Authority Remark:</b> {report.adminRemark}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </Card>
  );
}