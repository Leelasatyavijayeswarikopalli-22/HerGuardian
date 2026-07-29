import { useEffect, useState } from "react";
import api from "../../api/api";
import Card from "../Card";
import Button from "../Button";

export default function ManageReports({ onUpdate, authorityEmail, authorityName, searchQuery }) {
  const [reports, setReports] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadReports(true);
  }, []);

  async function loadReports(isInitial = false) {
    try {
      if (isInitial) setLoading(true);
      const response = await api.get("/reports");
      setReports(response.data);

      setStatus((prev) => {
        const newStatuses = { ...prev };
        response.data.forEach((report) => {
          if (newStatuses[report.id] === undefined) {
            newStatuses[report.id] = report.status;
          }
        });
        return newStatuses;
      });

      setRemarks((prev) => {
        const newRemarks = { ...prev };
        response.data.forEach((report) => {
          if (newRemarks[report.id] === undefined) {
            newRemarks[report.id] = report.adminRemark || "";
          }
        });
        return newRemarks;
      });
    } catch (error) {
      console.error("Unable to load reports:", error);
      if (isInitial) {
        alert(error.response?.data?.message || "Unable to load reports.");
      }
    } finally {
      if (isInitial) setLoading(false);
    }
  }

  async function updateReport(id) {
    const selectedStatus = status[id] || "ACTIVE";
    const selectedRemark = remarks[id] || "";

    try {
      setUpdatingId(id);

      // ✅ send authority identity so backend saves WHO updated this report
      await api.put(`/reports/status/${id}`, {
        status: selectedStatus,
        adminRemark: selectedRemark,
        authorityEmail: authorityEmail || "",
        authorityName: authorityName || "",
      });

      alert("Report Updated Successfully.");

      await loadReports(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Unable to update report:", error);
      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to update report."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-purple-500/10 p-5 text-purple-300 border border-purple-500/20">
        Loading reports...
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-xl bg-white/5 p-5 text-slate-400 border border-white/10">
        No reports found.
      </div>
    );
  }

  // ✅ Filter reports based on searchQuery (placed after state and loading check)
  const filteredReports = reports.filter((report) => {
    if (!searchQuery) return true;
    return report.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-5">
      {/* ✅ Mapped over filteredReports instead of reports */}
      {filteredReports.map((report) => (
        <Card key={report.id}>
          <h2 className="text-xl font-bold text-purple-300">{report.category}</h2>

          <p className="mt-2">
            <b>Location:</b> {report.location}
          </p>
          <p>
            <b>Description:</b> {report.description}
          </p>
          <p>
            <b>Reported By:</b> {report.reportedBy}
          </p>
          <p>
            <b>Reported At:</b>{" "}
            {report.reportedAt
              ? new Date(report.reportedAt).toLocaleString()
              : "-"}
          </p>
          <p>
            <b>Current Status:</b>{" "}
            <span className="font-semibold text-purple-300">
              {report.status}
            </span>
          </p>

          {/* ✅ show who last handled this report */}
          {report.authorityEmail && (
            <p>
              <b>Handled By:</b> {report.authorityName || report.authorityEmail}
            </p>
          )}

          {report.resolvedAt && (
            <p>
              <b>Resolved At:</b>{" "}
              {new Date(report.resolvedAt).toLocaleString()}
            </p>
          )}

          <div className="relative w-full mt-4">
            <select
              value={status[report.id] !== undefined ? status[report.id] : report.status}
              onChange={(e) => {
                const val = e.target.value;
                setStatus((prev) => ({ ...prev, [report.id]: val }));
              }}
              className="w-full bg-[#13102a] text-white border border-white/20 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
            >
              <option value="ACTIVE" style={{ backgroundColor: "#13102a", color: "white" }}>ACTIVE</option>
              <option value="UNDER_VERIFICATION" style={{ backgroundColor: "#13102a", color: "white" }}>UNDER VERIFICATION</option>
              <option value="IN_PROGRESS" style={{ backgroundColor: "#13102a", color: "white" }}>IN PROGRESS</option>
              <option value="RECTIFIED" style={{ backgroundColor: "#13102a", color: "white" }}>RECTIFIED</option>
            </select>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <textarea
            rows="4"
            placeholder="Authority Remarks"
            value={remarks[report.id] !== undefined ? remarks[report.id] : (report.adminRemark || "")}
            onChange={(event) => {
              const newRemark = event.target.value;
              setRemarks((previousRemarks) => ({
                ...previousRemarks,
                [report.id]: newRemark,
              }));
            }}
            className="mt-4 w-full rounded-xl border border-white/20 bg-[#13102a] text-white p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <Button
            type="button"
            onClick={() => updateReport(report.id)}
            disabled={updatingId === report.id}
            className="mt-4 w-full"
          >
            {updatingId === report.id ? "UPDATING..." : "UPDATE REPORT"}
          </Button>
        </Card>
      ))}
    </div>
  );
}