import { Bell, Menu, X, Phone, UserCircle, Siren, MessageCircle, Mail, LifeBuoy, MapPin, AlertTriangle, Heart, Clock, HelpCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);   // ✅ NEW
  const location = useLocation();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  // ✅ Share live location via WhatsApp
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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src="/logo.jpeg" alt="HerGuardian" className="w-10 h-10 rounded-full object-cover border border-white/10" />
            <div className="hidden sm:block">
              <p className="font-bold text-white text-lg leading-tight">HerGuardian</p>
              <p className="text-[10px] text-pink-300 tracking-wider">Empowering Every Journey</p>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:hidden">
            <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Bell size={18} className="text-white" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-600 text-white text-[10px] flex items-center justify-center">3</span>
            </button>
            <button onClick={handleProfileClick} className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <UserCircle size={18} className="text-white" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <NavItem to="/" label="Home" active={location.pathname === "/"} />
            <NavItem to="/dashboard" label="Dashboard" active={location.pathname.startsWith("/dashboard")} />
            <NavItem to="/safety-map" label="Safety Map" active={location.pathname === "/safety-map"} />
            <NavItem to="/reports" label="Reports" active={location.pathname.startsWith("/reports")} />
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Bell size={18} className="text-white" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-600 text-white text-[10px] flex items-center justify-center">3</span>
            </button>
            <button onClick={handleProfileClick} className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <UserCircle size={18} className="text-white" />
            </button>

            {/* ✅ GET HELP BUTTON — now opens modal */}
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition"
            >
              <Phone size={16} />
              Get Help
            </button>
          </div>

          {/* Mobile Menu Button */}
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

            {/* ✅ Mobile Get Help — opens modal */}
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

              {/* Close Button */}
              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 border-2 border-pink-500/60 flex items-center justify-center hover:bg-pink-500 hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.6)]"
              >
                <X size={18} className="text-white" strokeWidth={3} />
              </button>

              <div className="overflow-y-auto max-h-[90vh] p-8 md:p-10 custom-scrollbar">

                {/* Header */}
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

                {/* SOS EMERGENCY BUTTON */}
                <a
                  href="tel:112"
                  className="block bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 mb-6 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] transition-all duration-300 animate-pulse"
                >
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

                {/* SHARE LIVE LOCATION */}
                <button
                  onClick={shareLocation}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-4 mb-6 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
                >
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

                {/* QUICK EMERGENCY HELPLINES */}
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

                {/* CONTACT SUPPORT */}
                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <MessageCircle size={16} className="text-pink-400" />
                  Contact HerGuardian Support
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <ContactCard Icon={Phone} title="Call Us" value="+91 98765 43210" href="tel:+919876543210" />
                  <ContactCard Icon={Mail} title="Email" value="support@herguardian.ai" href="mailto:support@herguardian.ai" />
                  <ContactCard Icon={MessageCircle} title="WhatsApp" value="Chat with us" href="https://wa.me/919876543210" />
                </div>

                {/* FAQ Link / Tips */}
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-2xl p-5 mb-4">
                  <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                    <HelpCircle size={16} className="text-pink-400" />
                    Quick Safety Tips
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-xs">
                    <li>✅ Set your Secret Voice SOS phrase in Settings</li>
                    <li>✅ Add 3 trusted emergency contacts to your profile</li>
                    <li>✅ Enable location sharing for accurate help</li>
                    <li>✅ Keep your phone charged when traveling</li>
                  </ul>
                </div>

                {/* Reassurance footer */}
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

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #ec4899, #a855f7); border-radius: 10px; }
      `}</style>
    </>
  );
}

/* ===== Helper Components ===== */

function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active ? "bg-pink-500/20 text-pink-300" : "text-gray-300 hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileItem({ to, label, active, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-lg transition ${
        active ? "bg-pink-500/20 text-pink-300" : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function HelplineCard({ number, label }) {
  return (
    <a
      href={`tel:${number}`}
      className="group flex items-center justify-between bg-black/40 border border-red-500/30 rounded-lg px-4 py-2.5 hover:border-red-500/70 hover:bg-red-500/10 hover:scale-[1.03] transition-all"
    >
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
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group bg-black/40 border border-pink-500/30 rounded-xl p-4 hover:border-pink-500/70 hover:bg-pink-500/10 hover:scale-[1.03] transition-all duration-300"
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        <Icon size={16} className="text-white" />
      </div>
      <p className="text-gray-400 text-[10px] uppercase tracking-wider">{title}</p>
      <p className="text-white text-xs font-bold mt-1 truncate">{value}</p>
    </a>
  );
}