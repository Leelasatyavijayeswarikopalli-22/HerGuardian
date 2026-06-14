import { Bell, Menu, X, Phone,UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-[9999] bg-[#12081f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto h-16 px-4 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo.jpeg"
              alt="HerGuardian"
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />

            <span className="hidden sm:block font-bold text-white text-lg">
              HerGuardian
            </span>
          </Link>
          <div className="flex items-center gap-4 md:hidden">
          <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Bell size={18} className="text-white" />

              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-600 text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </button>
            <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <UserCircle size={18} className="text-white" />
            </button>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">

            <NavItem
              to="/"
              label="Home"
              active={location.pathname === "/"}
            />

            <NavItem
              to="/dashboard"
              label="Dashboard"
              active={location.pathname.startsWith("/dashboard")}
            />

            <NavItem
              to="/safety-map"
              label="Safety Map"
              active={location.pathname === "/safety-map"}
            />

            <NavItem
              to="/reports"
              label="Reports"
              active={location.pathname.startsWith("/reports")}
            />
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">

            <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Bell size={18} className="text-white" />

              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-600 text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </button>
            <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <UserCircle size={18} className="text-white" />
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium hover:scale-105 transition">
              <Phone size={16} />
              Get Help
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/5 text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-[9998] bg-[#12081f]/95 backdrop-blur-xl border-b border-white/10">

          <div className="p-4 space-y-2">

            <MobileItem
              to="/"
              label="Home"
              active={location.pathname === "/"}
              onClick={() => setOpen(false)}
            />

            <MobileItem
              to="/dashboard"
              label="Dashboard"
              active={location.pathname.startsWith("/dashboard")}
              onClick={() => setOpen(false)}
            />

            <MobileItem
              to="/safety-map"
              label="Safety Map"
              active={location.pathname === "/safety-map"}
              onClick={() => setOpen(false)}
            />

            <MobileItem
              to="/reports"
              label="Reports"
              active={location.pathname.startsWith("/reports")}
              onClick={() => setOpen(false)}
            />

            <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2">
              <Phone size={18} />
              Get Help
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-pink-500/20 text-pink-300"
          : "text-gray-300 hover:text-white hover:bg-white/5"
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
        active
          ? "bg-pink-500/20 text-pink-300"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}