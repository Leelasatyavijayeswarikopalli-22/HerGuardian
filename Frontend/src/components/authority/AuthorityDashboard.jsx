import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, LogOut, LayoutDashboard, ClipboardCheck, Users,
  CheckCircle2, Bell, Search, Building2,
  UserCircle, Menu, X, Shield,
} from "lucide-react";
import api from "../../api/api";
import ManageReports from "./ManageReports";

export default function AuthorityDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const authorityName = localStorage.getItem("name") || "Authority Officer";
  const authorityEmail = JSON.parse(localStorage.getItem("user") || "{}")?.email || "";
  const authorityRole = localStorage.getItem("role") || "AUTHORITY";

  useEffect(() => {
    const rootEl = document.getElementById("root");
    const originalDisplay = rootEl ? rootEl.style.display : "";
    const originalBodyOverflow = document.body.style.overflow;

    if (rootEl) rootEl.style.display = "none";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";

    return () => {
      if (rootEl) rootEl.style.display = originalDisplay;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  const loadAllReports = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reports");
      setReports(res.data || []);
    } catch (err) {
      console.error("Unable to load reports for stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllReports();
    const interval = setInterval(loadAllReports, 10000);
    return () => clearInterval(interval);
  }, []);

  const isMyReport = (report) => {
    if (!authorityEmail) return false;
    const email = authorityEmail.toLowerCase();

    return (
      (report.authorityEmail && report.authorityEmail.toLowerCase() === email) ||
      (report.authorityName && report.authorityName.toLowerCase() === email) ||
      (report.updatedBy && report.updatedBy.toLowerCase() === email) ||
      (report.resolvedBy && report.resolvedBy.toLowerCase() === email) ||
      (report.verifiedBy && report.verifiedBy.toLowerCase() === email)
    );
  };

  const totalReports = reports.length;
  const activeCases = reports.filter((r) => r.status === "ACTIVE").length;

  const myReports = reports.filter(isMyReport);

  const myPendingReview = myReports.filter((r) => r.status === "UNDER_VERIFICATION").length;
  const myInProgress = myReports.filter((r) => r.status === "IN_PROGRESS").length;
  const myResolvedCases = myReports.filter((r) => r.status === "RECTIFIED").length;

  const todayStr = new Date().toDateString();
  const myVerifiedToday = myReports.filter(
    (r) =>
      r.status === "RECTIFIED" &&
      r.resolvedAt &&
      new Date(r.resolvedAt).toDateString() === todayStr
  ).length;

  const myUniqueUsers = new Set(myReports.map((r) => r.reportedBy)).size;

  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const myNewHandledCount = myReports.filter(
    (r) => r.reportedAt && new Date(r.reportedAt).getTime() >= oneDayAgo
  ).length;

  const myTotalHandled = myReports.length;

  const activeCasesList = reports.filter((r) => r.status === "ACTIVE");

  const myVerifiedCasesList = myReports.filter(
    (r) => r.status === "UNDER_VERIFICATION" || r.status === "IN_PROGRESS"
  );

  const myUserRecords = myReports.reduce((acc, r) => {
    const key = r.reportedBy || "Unknown";
    if (!acc[key]) acc[key] = { name: key, count: 0, cases: [] };
    acc[key].count += 1;
    acc[key].cases.push(r);
    return acc;
  }, {});
  const myUserRecordsList = Object.values(myUserRecords).sort((a, b) => b.count - a.count);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout from the Authority Portal?")) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  const sidebarItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, badge: null },
    {
      id: "manage-cases",
      name: "Manage Cases",
      icon: ClipboardCheck,
      badge: activeCases > 0 ? `${activeCases} Active` : null,
    },
    {
      id: "verified-cases",
      name: "My Verified Cases",
      icon: CheckCircle2,
      badge: myVerifiedCasesList.length > 0 ? `${myVerifiedCasesList.length}` : null,
    },
    {
      id: "user-records",
      name: "My User Records",
      icon: Users,
      badge: myUniqueUsers > 0 ? `${myUniqueUsers}` : null,
    },
  ];

  const renderReportCard = (report) => (
    <div
      key={report.id}
      className="rounded-2xl bg-[#1a1630] border border-white/10 p-5 mb-4 hover:border-purple-500/40 transition"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-bold text-white">{report.category}</h4>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            report.status === "ACTIVE"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : report.status === "UNDER_VERIFICATION"
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : report.status === "IN_PROGRESS"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}
        >
          {report.status}
        </span>
      </div>
      <p className="text-sm text-slate-300">
        <b className="text-white">Location:</b> {report.location}
      </p>
      <p className="text-sm text-slate-300 mt-1">
        <b className="text-white">Description:</b> {report.description}
      </p>
      <p className="text-sm text-slate-300 mt-1">
        <b className="text-white">Reported By:</b> {report.reportedBy}
      </p>
      <p className="text-sm text-slate-300 mt-1">
        <b className="text-white">Reported At:</b>{" "}
        {report.reportedAt ? new Date(report.reportedAt).toLocaleString() : "-"}
      </p>
      {report.authorityEmail && (
        <p className="text-sm text-slate-300 mt-1">
          <b className="text-white">Handled By:</b> {report.authorityName || report.authorityEmail}
        </p>
      )}
      {report.adminRemark && (
        <p className="text-sm text-yellow-300 mt-2">
          <b>Remark:</b> {report.adminRemark}
        </p>
      )}
    </div>
  );

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return (
        <>
          <section className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-md mb-4">
                  <Shield size={16} className="text-purple-300" />
                  Authority Access Granted
                </div>
                <h2 className="text-4xl font-black mb-3 tracking-tight">
                  Welcome,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                    {authorityName}
                  </span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                  You are logged into the secure administrative portal. Review submitted safety
                  reports, verify incident details, and manage case resolutions efficiently.
                </p>
              </div>

              <div className="flex flex-col gap-3 min-w-[250px]">
                <div className="rounded-2xl bg-white/10 border border-white/20 p-5 backdrop-blur-md">
                  <p className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
                    Current Session
                  </p>
                  <p className="text-2xl font-black text-white">{authorityRole}</p>
                  <p className="text-sm text-slate-300 mt-1">Secure administrative access</p>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                    <p className="text-2xl font-bold text-green-400">{myTotalHandled}</p>
                    <p className="text-xs text-green-300">My Cases</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center">
                    <p className="text-2xl font-bold text-blue-400">{myResolvedCases}</p>
                    <p className="text-xs text-blue-300">My Resolved</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                title: "My Handled (24h)",
                value: myNewHandledCount,
                icon: ClipboardCheck,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
              },
              {
                title: "My Pending Review",
                value: myPendingReview,
                icon: Shield,
                color: "text-amber-400",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
              },
              {
                title: "My Verified Today",
                value: myVerifiedToday,
                icon: CheckCircle2,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
              },
              {
                title: "My Users Served",
                value: myUniqueUsers,
                icon: Users,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#13102a] border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-purple-400 transition">
                    My Stats
                  </span>
                </div>
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 rounded-3xl bg-[#13102a] border border-white/10 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Case Management</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Review and process citizen incident reports
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition">
                    Filter
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-purple-600 text-sm text-white font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-600/25">
                    Export Data
                  </button>
                </div>
              </div>
              {/* ✅ pass authority identity so updates are tagged */}
              <ManageReports
                onUpdate={loadAllReports}
                authorityEmail={authorityEmail}
                authorityName={authorityName}
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-purple-400" size={20} />
                  Authority Tools
                </h3>
                <div className="space-y-3">
                  {[
                    "Verify Incident Reports",
                    "Update Case Status",
                    "Add Official Remarks",
                  ].map((tool, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition text-sm text-slate-300 hover:text-white"
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[#13102a] border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4">My Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Total Handled</span>
                    <span className="text-sm font-bold text-white">{myTotalHandled}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Resolved</span>
                    <span className="text-sm font-bold text-emerald-400">{myResolvedCases}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">In Progress</span>
                    <span className="text-sm font-bold text-blue-400">{myInProgress}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Pending Review</span>
                    <span className="text-sm font-bold text-amber-400">{myPendingReview}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }

    if (activeTab === "manage-cases") {
      return (
        <section className="rounded-3xl bg-[#13102a] border border-white/10 p-6 shadow-xl">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">Active Cases</h3>
            <p className="text-sm text-slate-400 mt-1">
              Total Active:{" "}
              <span className="text-red-400 font-bold">{activeCasesList.length}</span>
              <span className="text-slate-500 ml-2">
                (All unassigned cases visible for pickup)
              </span>
            </p>
          </div>
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : activeCasesList.length === 0 ? (
            <p className="text-slate-400">No active cases at the moment.</p>
          ) : (
            activeCasesList.map(renderReportCard)
          )}
        </section>
      );
    }

    if (activeTab === "verified-cases") {
      return (
        <section className="rounded-3xl bg-[#13102a] border border-white/10 p-6 shadow-xl">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">My Verified Cases</h3>
            <p className="text-sm text-slate-400 mt-1">
              Under Verification:{" "}
              <span className="text-amber-400 font-bold">{myPendingReview}</span> · In Progress:{" "}
              <span className="text-blue-400 font-bold ml-1">{myInProgress}</span>
              <span className="text-slate-500 ml-2">(Only cases handled by you)</span>
            </p>
          </div>
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : myVerifiedCasesList.length === 0 ? (
            <p className="text-slate-400">
              You have no cases under verification or in progress.
            </p>
          ) : (
            myVerifiedCasesList.map(renderReportCard)
          )}
        </section>
      );
    }

    if (activeTab === "user-records") {
      return (
        <section className="rounded-3xl bg-[#13102a] border border-white/10 p-6 shadow-xl">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">My User Records</h3>
            <p className="text-sm text-slate-400 mt-1">
              Users whose reports you handled:{" "}
              <span className="text-blue-400 font-bold">{myUniqueUsers}</span>
            </p>
          </div>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : myUserRecordsList.length === 0 ? (
            <p className="text-slate-400">
              You haven't handled any reports yet.
            </p>
          ) : (
            <div className="space-y-4">
              {myUserRecordsList.map((user, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#1a1630] border border-white/10 p-5 hover:border-purple-500/40 transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-bold">{user.name}</p>
                        <p className="text-xs text-slate-400">
                          You handled {user.count} case(s) from this user
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                      {user.count} Reports
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {user.cases.map((c) => (
                      <div
                        key={c.id}
                        className="text-xs text-slate-300 flex justify-between items-center py-2 px-3 rounded-lg bg-white/5 border border-white/5"
                      >
                        <span>
                          <b className="text-white">{c.category}</b> — {c.location}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold ${
                            c.status === "ACTIVE"
                              ? "text-red-400 bg-red-500/10"
                              : c.status === "UNDER_VERIFICATION"
                              ? "text-amber-400 bg-amber-500/10"
                              : c.status === "IN_PROGRESS"
                              ? "text-blue-400 bg-blue-500/10"
                              : "text-green-400 bg-green-500/10"
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      );
    }

    return null;
  };

  const dashboardUI = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2147483647,
        backgroundColor: "#0a0814",
        color: "#f1f5f9",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      <div className="relative w-full h-full flex">
        <aside
          className={`h-full flex-shrink-0 bg-[#13102a] border-r border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${
            isSidebarOpen ? "w-72" : "w-0"
          }`}
        >
          <div className="flex h-full flex-col w-72">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 blur-lg opacity-50 rounded-full"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                    <ShieldCheck className="text-white" size={26} />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight">HerGuardian</h1>
                  <p className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                    Authority Portal
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-b border-white/10">
              <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/20 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20 border border-purple-500/30">
                    <Building2 className="text-purple-400" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{authorityName}</p>
                    <p className="text-xs text-slate-400 truncate">
                      {authorityEmail || "officer@herguardian.gov"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Online
                  </span>
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                    {authorityRole}
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white shadow-lg shadow-purple-900/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className={`${
                          isActive
                            ? "text-purple-400"
                            : "text-slate-500 group-hover:text-purple-400"
                        } transition-colors`}
                      />
                      <span className={`text-sm font-semibold ${isActive ? "text-white" : ""}`}>
                        {item.name}
                      </span>
                    </div>
                    {item.badge && (
                      <span className="text-xs font-bold text-white bg-pink-600 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-bold text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/50 active:scale-95"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          <header className="flex-shrink-0 bg-[#13102a]/95 backdrop-blur-xl border-b border-white/10 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <div className="hidden md:flex items-center gap-1 bg-black/20 rounded-lg p-1 border border-white/5">
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 capitalize">
                    {activeTab.replace("-", " ")}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2 bg-black/30 border border-white/10 rounded-xl px-4 py-2 w-64">
                  <Search size={16} className="text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search case ID..."
                    className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
                  />
                </div>

                <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition">
                  <Bell size={20} />
                  {activeCases > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                <div className="flex items-center gap-3 pl-4 pr-2 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-white">{authorityName}</p>
                    <p className="text-xs text-purple-400">Administrator</p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center border border-white/20">
                    <UserCircle className="text-white" size={20} />
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/20 transition"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-7xl mx-auto">{renderContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );

  return createPortal(dashboardUI, document.body);
}