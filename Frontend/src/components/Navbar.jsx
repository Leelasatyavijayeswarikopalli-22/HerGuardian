import { Bell, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.jpeg" alt="HerGuardian Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/dashboard" className="font-medium text-slate-300 hover:text-pink-400 transition">
            Dashboard
          </Link>

          <Link to="/safety-map" className="font-medium text-slate-300 hover:text-pink-400 transition">
            Safety Map
          </Link>

          <Link to="/reports" className="font-medium text-slate-300 hover:text-pink-400 transition">
            Reports
          </Link>

          <Link to="/mobility" className="font-medium text-slate-300 hover:text-pink-400 transition">
            Mobility
          </Link>
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-slate-100">
            <Bell size={22} className="text-slate-600" />
          </button>

          <button className="rounded-full p-2 hover:bg-slate-100">
            <User size={22} className="text-slate-600" />
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden rounded p-2 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X size={24} className="text-slate-700" />
          ) : (
            <Menu size={24} className="text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 border-t border-slate-200 bg-white">
          <Link onClick={() => setOpen(false)} to="/dashboard" className="py-2 text-slate-600 hover:text-pink-600">
            Dashboard
          </Link>

          <Link onClick={() => setOpen(false)} to="/safety-map" className="py-2 text-slate-600 hover:text-pink-600">
            Safety Map
          </Link>

          <Link onClick={() => setOpen(false)} to="/reports" className="py-2 text-slate-600 hover:text-pink-600">
            Reports
          </Link>

          <Link onClick={() => setOpen(false)} to="/mobility" className="py-2 text-slate-600 hover:text-pink-600">
            Mobility
          </Link>

          {/* Mobile Icons */}
          <div className="flex gap-4 pt-2">
            <button className="rounded-full p-2 hover:bg-slate-100">
              <Bell size={22} />
            </button>

            <button className="rounded-full p-2 hover:bg-slate-100">
              <User size={22} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}