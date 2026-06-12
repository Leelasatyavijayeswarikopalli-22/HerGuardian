import { Bell, User, Menu, X, Moon, Sun, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      {/* Background Ambient Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-10 right-[15%] w-96 h-96 bg-blue-500/8 rounded-full blur-[120px]"></div>
      </div>

      <nav 
        className="
          sticky top-0 z-[9999] 
          /* NO MORE mt-4 or top-4! */
          mx-0 lg:mx-auto max-w-7xl 
          /* Rounded bottom only (flat on top) */
          rounded-b-2xl 
          bg-white/[0.03] 
          backdrop-blur-xl 
          border-x border-b border-white/[0.08] 
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          hover:border-white/20 transition-all duration-500"
      >
        <div className="flex h-16 items-center justify-between px-6 lg:px-8 relative overflow-hidden">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-purple-500/30 group-hover:shadow-purple-400/50 transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-[8px] bg-[#13082a] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-white">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent hidden sm:block">
              HerGuardian
            </span>
          </Link>

          {/* CENTER: Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            
            <NavLink to="/" label="Home" isActive={loc.pathname === '/'} />
            <NavLink to="/dashboard" label="Dashboard" isActive={loc.pathname === '/dashboard' || loc.pathname.startsWith('/dashboard')} hasPill={true} />
            <NavLink to="/safety-map" label="Safety Map" isActive={loc.pathname === '/safety-map'} />
            <NavLink to="/reports" label="Reports" isActive={loc.pathname.startsWith('/report')} />
            <NavLink to="/mobility" label="Mobility" isActive={loc.pathname === '/mobility'} />
            
          </div>

          {/* RIGHT: Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            
            <button onClick={() => setDarkMode(!darkMode)} 
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/10 text-gray-300 hover:text-yellow-300 transition-all duration-200">
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            
            <button className="relative p-2 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-pink-500/50">3</span>
            </button>
            
            <button className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center text-white font-semibold text-xs hover:border-purple-500/40 transition-all">
              JD
            </button>

            <button className="
              flex items-center gap-2 px-4 py-2 
              bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600
              hover:from-pink-500 hover:via-fuchsia-500 hover:to-purple-500
              rounded-lg font-semibold text-xs text-white
              shadow-md shadow-pink-500/25 hover:shadow-pink-400/40
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300
              border border-white/20
            ">
              <Phone size={14} />
              Get Help
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} 
                  className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU - Attached to bottom */}
        {open && (
          <div className="lg:hidden absolute top-full left-0 right-0 
                          bg-[#12081f]/98 backdrop-blur-2xl 
                          border-b border-l border-r border-white/10 
                          rounded-b-2xl shadow-2xl shadow-black/50 p-3 space-y-1">
            
            <MobileItem to="/" label="Home" icon="🏠" active={loc.pathname === '/'} onClick={() => setOpen(false)} />
            <MobileItem to="/dashboard" label="Dashboard" icon="📊" active={loc.pathname === '/dashboard'} onClick={() => setOpen(false)} />
            <MobileItem to="/safety-map" label="Safety Map" icon="🗺️" active={loc.pathname === '/safety-map'} onClick={() => setOpen(false)} />
            <MobileItem to="/reports" label="Reports" icon="📋" active={loc.pathname.startsWith('/report')} onClick={() => setOpen(false)} />
            <MobileItem to="/mobility" label="Mobility" icon="🚗" active={loc.pathname === '/mobility'} onClick={() => setOpen(false)} />
            
            <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 
                                   bg-gradient-to-r from-pink-600 to-purple-600 
                                   rounded-lg text-white font-semibold text-sm shadow-md shadow-pink-500/25">
              <Phone size={16} /> Get Help
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

// Clean Desktop Link Component
function NavLink({ to, label, isActive, hasPill }) {
  
  if (hasPill && isActive) {
    return (
      <Link to={to}
        className="relative px-4 py-1.5 rounded-lg bg-white/[0.08] border border-white/10 text-white font-medium text-sm flex items-center gap-2 backdrop-blur-sm">
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to}
      className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive ? 'text-white font-semibold bg-white/[0.05]' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
      }`}
    >
      {label}
    </Link>
  );
}

function MobileItem({ to, label, icon, active, onClick }) {
  return (
    <Link to={to} onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
        active ? 'bg-pink-500/10 text-pink-300 border-l-2 border-pink-500 ml-2' : 'text-gray-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}