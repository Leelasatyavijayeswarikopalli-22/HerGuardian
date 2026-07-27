import { useEffect, useState } from "react";
import api from "../../api/api";
import Card from "../Card";
import { ShieldCheck, MapPin, Users, Calendar, Inbox } from "lucide-react";

export default function RectifiedReports({ refresh }) {
  const [reports, setReports] = useState([]);

  async function loadReports() {
    try {
      const response = await api.get("/reports/user/rectified");
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadReports();
    const interval = setInterval(() => loadReports(), 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <Card>
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
          <ShieldCheck size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-wide">
            SAFE <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">NOW</span>
          </h2>
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Verified resolved
          </p>
        </div>
      </div>

      {reports.length === 0 && (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Inbox size={28} className="text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm">No Rectified Reports Found.</p>
        </div>
      )}

      {reports.map((report) => (
        <div
          key={report.id}
          className="group mb-4 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl p-5 shadow-lg
                     hover:border-green-500/60 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                <ShieldCheck size={16} className="text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{report.category}</h3>
            </div>
            <span className="px-2 py-1 rounded-md bg-green-500/20 border border-green-500/40 text-green-300 text-[10px] font-semibold uppercase tracking-wider">
              SAFE NOW
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-300">
            <p className="flex items-start gap-2">
              <MapPin size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
              <span><b className="text-white">Location:</b> {report.location}</span>
            </p>
            <p><b className="text-white">Resolved By:</b> {report.authorityName}</p>
            <p className="flex items-center gap-2">
              <Calendar size={14} className="text-blue-400" />
              <span><b className="text-white">Resolved On:</b> {report.resolvedAt ? new Date(report.resolvedAt).toLocaleString() : "-"}</span>
            </p>
            <p className="flex items-center gap-2">
              <Users size={14} className="text-purple-400" />
              <span><b className="text-white">Reported By:</b> {report.reportCount} Users</span>
            </p>
            {report.adminRemark && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-green-300">
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