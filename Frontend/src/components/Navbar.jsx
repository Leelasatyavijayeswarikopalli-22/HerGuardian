import { 
  Bell, Menu, X, Phone, UserCircle, Siren, MessageCircle, Mail, LifeBuoy, 
  MapPin, AlertTriangle, Heart, Clock, HelpCircle, Shield, Info, CheckCircle,
  Zap, TrendingUp, Users, Sparkles, ChevronRight, Trash2
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AboutUsModal from "./AboutUsModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "danger",
      title: "⚠️ High Alert Zone Detected",
      message: "Incident reported near MG Road last night. Avoid the area between 10 PM - 5 AM. Take alternate routes.",
      time: "2 hours ago",
      location: "MG Road, Bengaluru",
      unread: true,
    },
    {
      id: 2,
      type: "warning",
      title: "🚨 Recent Incident Alert",
      message: "A harassment case was reported yesterday at 11:30 PM near Park Street. Community members advised to stay cautious.",
      time: "5 hours ago",
      location: "Park Street, Kolkata",
      unread: true,
    },
    {
      id: 3,
      type: "update",
      title: "✨ New Feature Released",
      message: "Secret Voice SOS is now available! Set your custom phrase in Settings to activate hands-free emergency alerts.",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 4,
      type: "safe",
      title: "✅ Safety Zone Verified",
      message: "Your frequent route through Koramangala has been verified as SAFE by 200+ community reports.",
      time: "2 days ago",
      location: "Koramangala, Bengaluru",
      unread: false,
    },
    {
      id: 5,
      type: "info",
      title: "📢 Community Milestone",
      message: "HerGuardian now protects 25,000+ women across India. Thank you for being part of this movement! 💖",
      time: "3 days ago",
      unread: false,
    },
    {
      id: 6,
      type: "danger",
      title: "⚠️ Weather Safety Alert",
      message: "Heavy rainfall expected tonight in your area. Reduced visibility on roads. Please travel with caution.",
      time: "4 days ago",
      unread: false,
    },
    {
      id: 7,
      type: "update",
      title: "🎉 App Update v2.5 Released",
      message: "New AI-powered danger detection, improved map accuracy, and dark mode enhancements. Update now!",
      time: "5 days ago",
      unread: false,
    },
    {
      id: 8,
      type: "info",
      title: "👥 New Community Group",
      message: "Join the 'Delhi Safe Commute' community — 1,200+ women sharing daily safety tips and route info.",
      time: "6 days ago",
      unread: false,
    },
  ]);

  // ✅ Total count (all notifications)
  const totalCount = notifications.length;
  // ✅ Unread count (for the modal "3 unread messages" text)
  const unreadCount = notifications.filter(n => n.unread).length;

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case "alerts":
        return notifications.filter(n => n.type === "danger" || n.type === "warning");
      case "updates":
        return notifications.filter(n => n.type === "update");
      case "community":
        return notifications.filter(n => n.type === "info" || n.type === "safe");
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleProfileClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const msg = `🚨 EMERGENCY! I need help. My live location: https://maps.google.com/?q=${latitude},${longitude}`;
          window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
        },
        () => alert("Please enable location access to share your location.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#12081f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto h-16 px-4 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src="/logo.jpeg" alt="HerGuardian" className="w-10 h-10 rounded-full object-cover border border-white/10" />
            <div className="hidden sm:block">
              <p className="font-bold text-white text-lg leading-tight">HerGuardian</p>
              <p className="text-[10px] text-pink-300 tracking-wider">Empowering Every Journey</p>
            </div>
          </Link>

          {/* ✅ Mobile — subtle hover, TOTAL count */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-200"
            >
              <Bell size={18} className="text-white hover:text-pink-300 transition-colors" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-600 text-white text-[9px] font-bold flex items-center justify-center border border-[#12081f]">
                  {totalCount > 9 ? "9+" : totalCount}
                </span>
              )}
            </button>

            <button
              onClick={handleProfileClick}
              className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200"
            >
              <UserCircle size={18} className="text-white hover:text-purple-300 transition-colors" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <NavItem to="/" label="Home" active={location.pathname === "/"} />
            <NavItem to="/dashboard" label="Dashboard" active={location.pathname.startsWith("/dashboard")} />
            <NavItem to="/safety-map" label="Safety Map" active={location.pathname === "/safety-map"} />
            <NavItem to="/reports" label="Reports" active={location.pathname.startsWith("/reports")} />
          </div>

          {/* ✅ Desktop — subtle hover, TOTAL count */}
          <div className="hidden md:flex items-center gap-3">
            {/* 🔔 BELL */}
            <button
              onClick={() => setShowNotifications(true)}
              className="group relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-200"
            >
              <Bell
                size={18}
                className="text-white group-hover:text-pink-300 transition-colors duration-200"
              />

              {/* ✅ Shows TOTAL notifications count (8) */}
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-600 text-white text-[9px] font-bold flex items-center justify-center border border-[#12081f]">
                  {totalCount > 9 ? "9+" : totalCount}
                </span>
              )}

              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 text-pink-300 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                Notifications
              </span>
            </button>

            {/* 👤 USER */}
            <button
              onClick={handleProfileClick}
              className="group relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200"
            >
              <UserCircle
                size={18}
                className="text-white group-hover:text-purple-300 transition-colors duration-200"
              />

              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 text-purple-300 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                Profile
              </span>
            </button>

            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition"
            >
              <Phone size={16} />
              Get Help
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/5 text-white">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-[9998] bg-[#12081f]/95 backdrop-blur-xl border-b border-white/10">
          <div className="p-4 space-y-2">
            <MobileItem to="/" label="Home" active={location.pathname === "/"} onClick={() => setOpen(false)} />
            <MobileItem to="/dashboard" label="Dashboard" active={location.pathname.startsWith("/dashboard")} onClick={() => setOpen(false)} />
            <MobileItem to="/safety-map" label="Safety Map" active={location.pathname === "/safety-map"} onClick={() => setOpen(false)} />
            <MobileItem to="/reports" label="Reports" active={location.pathname.startsWith("/reports")} onClick={() => setOpen(false)} />

            <button
              onClick={() => { setShowHelp(true); setOpen(false); }}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Get Help
            </button>
          </div>
        </div>
      )}

      {/* ===== NOTIFICATIONS MODAL ===== */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-[10000] flex items-start justify-center p-4 pt-20 animate-fadeIn"
          onClick={() => setShowNotifications(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

          <div
            className="relative z-10 w-full max-w-2xl max-h-[85vh] rounded-3xl animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>

            <div className="relative bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 backdrop-blur-2xl border border-pink-500/30 rounded-3xl shadow-[0_0_80px_rgba(236,72,153,0.4)] overflow-hidden">

              <div className="sticky top-0 z-20 bg-gradient-to-r from-[#1a0b2e]/95 via-[#2a0f3d]/95 to-[#1a0b2e]/95 backdrop-blur-xl border-b border-pink-500/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                      <Bell size={20} className="text-white" />
                    </div>
                    {totalCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#1a0b2e]">
                        {totalCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">Notifications</h2>
                    <p className="text-pink-300 text-xs">
                      {unreadCount} unread of {totalCount} total
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold hover:bg-pink-500/20 hover:border-pink-500/60 transition-all"
                    >
                      <CheckCircle size={12} />
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-9 h-9 rounded-full bg-black/60 border border-pink-500/40 flex items-center justify-center hover:bg-pink-500 hover:border-pink-400 hover:scale-110 hover:rotate-90 transition-all duration-300"
                  >
                    <X size={16} className="text-white" strokeWidth={3} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 px-6 py-3 border-b border-white/5 overflow-x-auto custom-scrollbar">
                <FilterPill
                  label="All"
                  count={notifications.length}
                  active={activeFilter === "all"}
                  onClick={() => setActiveFilter("all")}
                />
                <FilterPill
                  label="Alerts"
                  count={notifications.filter(n => n.type === "danger" || n.type === "warning").length}
                  icon={AlertTriangle}
                  active={activeFilter === "alerts"}
                  onClick={() => setActiveFilter("alerts")}
                />
                <FilterPill
                  label="Updates"
                  count={notifications.filter(n => n.type === "update").length}
                  icon={Sparkles}
                  active={activeFilter === "updates"}
                  onClick={() => setActiveFilter("updates")}
                />
                <FilterPill
                  label="Community"
                  count={notifications.filter(n => n.type === "info" || n.type === "safe").length}
                  icon={Users}
                  active={activeFilter === "community"}
                  onClick={() => setActiveFilter("community")}
                />
              </div>

              <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-16 px-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                      <Bell size={32} className="text-pink-400" />
                    </div>
                    <p className="text-white font-bold text-lg mb-1">
                      {activeFilter === "all" ? "All caught up!" : `No ${activeFilter} notifications`}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {activeFilter === "all"
                        ? "You have no new notifications."
                        : `Switch to another category to see more.`}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-2">
                    {filteredNotifications.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notification={n}
                        onDelete={() => deleteNotification(n.id)}
                        onMarkRead={() => markAsRead(n.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-gradient-to-r from-[#1a0b2e]/95 via-[#2a0f3d]/95 to-[#1a0b2e]/95 backdrop-blur-xl border-t border-pink-500/20 px-6 py-3 flex items-center justify-between">
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <Shield size={12} className="text-pink-400" />
                  Updates from <span className="text-pink-300 font-semibold">HerGuardian Admin</span>
                </p>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-pink-400 text-xs font-semibold hover:text-pink-300 flex items-center gap-1"
                >
                  View all
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== GET HELP MODAL ===== */}
      {showHelp && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowHelp(false)}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>

          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] rounded-3xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>

            <div className="relative bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 backdrop-blur-2xl border border-pink-500/30 rounded-3xl shadow-[0_0_80px_rgba(236,72,153,0.4)] overflow-hidden">
              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 border-2 border-pink-500/60 flex items-center justify-center hover:bg-pink-500 hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.6)]"
              >
                <X size={18} className="text-white" strokeWidth={3} />
              </button>

              <div className="overflow-y-auto max-h-[90vh] p-8 md:p-10 custom-scrollbar">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse">
                    <LifeBuoy size={28} className="text-white" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-semibold tracking-widest uppercase mb-1">
                      <Clock size={10} />
                      24/7 Emergency Support
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black">
                      <span className="text-white">Need </span>
                      <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Immediate Help?</span>
                    </h2>
                  </div>
                </div>

                <a href="tel:112" className="block bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mb-6 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] transition-all duration-300 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                        <Siren size={28} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-xs font-bold tracking-widest uppercase">In Danger? Tap to Call</p>
                        <p className="text-white font-black text-3xl">112</p>
                        <p className="text-white/80 text-xs">National Emergency Number</p>
                      </div>
                    </div>
                    <Phone size={40} className="text-white" />
                  </div>
                </a>

                <button onClick={shareLocation} className="w-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-4 mb-6 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <MapPin size={22} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white font-bold">Share Live Location</p>
                      <p className="text-white/80 text-xs">Send via WhatsApp to family/friends</p>
                    </div>
                    <span className="text-white text-xl">→</span>
                  </div>
                </button>

                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-red-400" />
                  Emergency Helplines (India)
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <HelplineCard number="112" label="National Emergency" />
                  <HelplineCard number="1091" label="Women Helpline" />
                  <HelplineCard number="100" label="Police" />
                  <HelplineCard number="181" label="Women in Distress" />
                  <HelplineCard number="102" label="Ambulance" />
                  <HelplineCard number="1098" label="Child Helpline" />
                </div>

                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <MessageCircle size={16} className="text-pink-400" />
                  Contact HerGuardian Support
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <ContactCard Icon={Phone} title="Call Us" value="+91 98765 43210" href="tel:+919876543210" />
                  <ContactCard Icon={Mail} title="Email" value="support@herguardian.ai" href="mailto:support@herguardian.ai" />
                  <ContactCard Icon={MessageCircle} title="WhatsApp" value="Chat with us" href="https://wa.me/919876543210" />
                </div>

                <div className="text-center bg-black/40 rounded-2xl p-4 border border-pink-500/20">
                  <Heart size={22} className="mx-auto mb-1 text-pink-400 fill-pink-400 animate-pulse" />
                  <p className="text-white font-bold text-sm">You're not alone.</p>
                  <p className="text-gray-400 text-xs">Our team is available 24/7 to help you stay safe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slideDown { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #ec4899, #a855f7); border-radius: 10px; }
      `}</style>
    </>
  );
}

/* ===== Helper Components ===== */

function NavItem({ to, label, active }) {
  return (
    <Link to={to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active ? "bg-pink-500/20 text-pink-300" : "text-gray-300 hover:text-white hover:bg-white/5"}`}>
      {label}
    </Link>
  );
}

function MobileItem({ to, label, active, onClick }) {
  return (
    <Link to={to} onClick={onClick} className={`block px-4 py-3 rounded-lg transition ${active ? "bg-pink-500/20 text-pink-300" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
      {label}
    </Link>
  );
}

function HelplineCard({ number, label }) {
  return (
    <a href={`tel:${number}`} className="group flex items-center justify-between bg-black/40 border border-red-500/30 rounded-lg px-4 py-2.5 hover:border-red-500/70 hover:bg-red-500/10 hover:scale-[1.03] transition-all">
      <div>
        <p className="text-red-300 text-[10px] uppercase tracking-wider">{label}</p>
        <p className="text-white font-black text-lg">{number}</p>
      </div>
      <Phone size={16} className="text-red-400 group-hover:scale-125 group-hover:rotate-12 transition-transform" />
    </a>
  );
}

function ContactCard({ Icon, title, value, href }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="group bg-black/40 border border-pink-500/30 rounded-xl p-4 hover:border-pink-500/70 hover:bg-pink-500/10 hover:scale-[1.03] transition-all duration-300">
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        <Icon size={16} className="text-white" />
      </div>
      <p className="text-gray-400 text-[10px] uppercase tracking-wider">{title}</p>
      <p className="text-white text-xs font-bold mt-1 truncate">{value}</p>
    </a>
  );
}

/* ===== NOTIFICATION COMPONENTS ===== */

function FilterPill({ label, count, active, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
        active
          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] scale-105"
          : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-pink-500/40 hover:bg-white/10"
      }`}
    >
      {Icon && <Icon size={12} />}
      {label}
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-white/10"}`}>
        {count}
      </span>
    </button>
  );
}

function NotificationCard({ notification, onDelete, onMarkRead }) {
  const typeConfig = {
    danger: {
      icon: AlertTriangle,
      iconColor: "text-red-400",
      bg: "from-red-500/10 to-pink-500/10",
      border: "border-red-500/30",
      badge: "bg-red-500/20 text-red-300 border-red-500/40",
      badgeText: "HIGH ALERT",
    },
    warning: {
      icon: Siren,
      iconColor: "text-orange-400",
      bg: "from-orange-500/10 to-red-500/10",
      border: "border-orange-500/30",
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
      badgeText: "WARNING",
    },
    update: {
      icon: Sparkles,
      iconColor: "text-purple-400",
      bg: "from-purple-500/10 to-fuchsia-500/10",
      border: "border-purple-500/30",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      badgeText: "NEW FEATURE",
    },
    safe: {
      icon: CheckCircle,
      iconColor: "text-green-400",
      bg: "from-green-500/10 to-emerald-500/10",
      border: "border-green-500/30",
      badge: "bg-green-500/20 text-green-300 border-green-500/40",
      badgeText: "SAFE ZONE",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-400",
      bg: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-500/30",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      badgeText: "COMMUNITY",
    },
  };

  const config = typeConfig[notification.type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      onClick={onMarkRead}
      className={`relative group bg-gradient-to-br ${config.bg} border ${config.border} rounded-2xl p-4 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 cursor-pointer ${notification.unread ? "ring-1 ring-pink-500/30" : ""}`}
    >
      {notification.unread && (
        <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]"></span>
      )}

      <div className="flex gap-3">
        <div className={`w-11 h-11 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0 ${config.iconColor}`}>
          <Icon size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-wider border ${config.badge}`}>
              {config.badgeText}
            </span>
            <span className="text-gray-500 text-[10px] flex items-center gap-1">
              <Clock size={10} />
              {notification.time}
            </span>
          </div>

          <h4 className="text-white font-bold text-sm mb-1">{notification.title}</h4>
          <p className="text-gray-300 text-xs leading-relaxed">{notification.message}</p>

          {notification.location && (
            <p className="text-pink-300 text-[11px] mt-2 flex items-center gap-1">
              <MapPin size={11} />
              {notification.location}
            </p>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          title="Delete"
        >
          <Trash2 size={12} className="text-gray-400 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
}