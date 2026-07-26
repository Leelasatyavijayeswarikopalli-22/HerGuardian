import { LayoutDashboard, MapPinned, FileText, User, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { to: "/safety-map", label: "Safety Map", Icon: MapPinned },
    { to: "/reports", label: "Reports", Icon: FileText },
    { to: "/profile", label: "Profile", Icon: User },
  ];

  return (
    <aside className="relative hidden w-64 shrink-0 overflow-hidden border-r border-white/10 bg-black/20 backdrop-blur-xl md:block md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
      {/* Ambient glow */}
      <div className="absolute top-1/3 -left-20 w-60 h-60 bg-pink-500/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="relative p-6">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-pink-400" />
          <h2 className="text-sm font-bold tracking-widest text-white uppercase">
            Navigation
          </h2>
        </div>
      </div>

      <nav className="relative space-y-2 px-4">
        {navItems.map((item) => {
          const Icon = item.Icon;
          const isActive =
            location.pathname === item.to ||
            (item.to !== "/" && location.pathname.startsWith(item.to));

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative flex items-center gap-3 rounded-xl p-3 overflow-hidden transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/40 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                    : "text-gray-400 border border-transparent hover:border-pink-500/30 hover:bg-white/5 hover:text-white"
                }`}
            >
              {/* Left accent bar for active */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-600 rounded-r-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"></span>
              )}

              {/* Hover shine effect */}
              

              <div
                className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/5 border border-white/10 text-gray-400 group-hover:text-pink-400 group-hover:border-pink-500/40 group-hover:scale-110"
                }`}
              >
                <Icon size={18} />
              </div>

              <span
                className={`relative z-10 font-medium text-sm ${
                  isActive ? "text-white" : ""
                }`}
              >
                {item.label}
              </span>

              {/* Arrow indicator on hover */}
              <span
                className={`relative z-10 ml-auto text-pink-400 opacity-0 -translate-x-2 transition-all duration-300 ${
                  !isActive && "group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                →
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}