import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, Mic, MapPinned, Users, Sparkles,
  X, Heart, Lock, Zap, Award
} from "lucide-react";

export default function FeaturesSection() {
  const [showLearnMore, setShowLearnMore] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "Dynamic Safety Score",
      desc: "Every road receives a real-time safety score based on AI analysis.",
      gradient: "from-pink-500 to-rose-600",
      glow: "rgba(236, 72, 153, 0.4)",
    },
    {
      icon: Mic,
      title: "Secret Voice SOS",
      desc: "Trigger emergency alerts using a discreet secret phrase.",
      gradient: "from-red-500 to-pink-600",
      glow: "rgba(239, 68, 68, 0.4)",
    },
    {
      icon: MapPinned,
      title: "AI Safety Map",
      desc: "Visualize safe and unsafe areas around you instantly.",
      gradient: "from-blue-500 to-purple-600",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: Users,
      title: "Community Reports",
      desc: "Reports are considered and rectified.",
      gradient: "from-purple-500 to-pink-600",
      glow: "rgba(168, 85, 247, 0.4)",
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-sm text-sm text-pink-200 font-medium">
            <Sparkles size={14} className="text-pink-400" />
            Powerful Features
          </span>
        </div>

        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-4">
          Key <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Features</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
          Cutting-edge AI technology designed to keep women safe everywhere they go.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              // ✅ CHANGED: Link → button (opens modal)
              <button
                type="button"
                onClick={() => setShowLearnMore(true)}
                key={index}
                className="group relative cursor-pointer rounded-2xl bg-white/5 backdrop-blur-xl p-6 
                           border border-white/10 overflow-hidden text-left w-full
                           transition-all duration-500 ease-out
                           hover:scale-[1.04] hover:border-pink-500/60"
                style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 20px 50px ${feature.glow}`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl rounded-full group-hover:opacity-30 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-all duration-500`}>
                    <Icon size={26} className="text-white drop-shadow-lg" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                    {feature.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-pink-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                    <span className="text-xs font-semibold">Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== LEARN MORE MODAL (copied from Hero.jsx) ===== */}
      {showLearnMore && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowLearnMore(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

          <div 
            className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-3xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 
                            backdrop-blur-2xl border border-pink-500/30 rounded-3xl
                            shadow-[0_0_80px_rgba(236,72,153,0.4)] overflow-hidden">
              
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/70 rounded-tl-lg z-20 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-400/70 rounded-bl-lg z-20 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/70 rounded-br-lg z-20 pointer-events-none"></div>

              <button
                onClick={() => setShowLearnMore(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md
                           border-2 border-pink-500/60 flex items-center justify-center
                           hover:bg-pink-500 hover:border-pink-400 hover:scale-110 hover:rotate-90
                           transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.6)]"
              >
                <X size={18} className="text-white" strokeWidth={3} />
              </button>

              <div className="overflow-y-auto max-h-[90vh] p-8 md:p-10 custom-scrollbar">
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-pink-500/50 blur-xl rounded-full"></div>
                    <div className="relative w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_30px_rgba(236,72,153,0.6)]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img src="/icon.png" alt="HerGuardian" className="w-full h-full object-contain p-1" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-semibold tracking-widest uppercase mb-1">
                      <Sparkles size={10} className="text-pink-400" />
                      About HerGuardian
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black">
                      <span className="text-white">Empowering Women, </span>
                      <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        One Step at a Time
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-500/50"></div>
                  <Sparkles size={12} className="text-pink-400" />
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-500/50"></div>
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  <span className="text-pink-400 font-bold">HerGuardian</span> is an <span className="text-white font-semibold">AI-powered women safety platform</span> designed to keep you protected wherever you go. From real-time route analysis to community-verified safety alerts, we bring cutting-edge technology together with a caring community to ensure your peace of mind — 24/7.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <FeatureBox Icon={Shield} color="text-green-400" bg="from-green-500/10 to-emerald-500/10" border="border-green-500/30" title="Dynamic Safety Score" desc="Our AI analyzes crime data, lighting, foot-traffic, and time-of-day to score every route in real-time." />
                  <FeatureBox Icon={Mic} color="text-red-400" bg="from-red-500/10 to-pink-500/10" border="border-red-500/30" title="Secret Voice SOS" desc="Discreetly trigger emergency alerts by whispering your personal secret phrase — no phone unlock needed." />
                  <FeatureBox Icon={MapPinned} color="text-blue-400" bg="from-blue-500/10 to-cyan-500/10" border="border-blue-500/30" title="Smart Safety Map" desc="Interactive map with color-coded zones showing safe areas, risk zones, and community reports live." />
                  <FeatureBox Icon={Users} color="text-pink-400" bg="from-pink-500/10 to-fuchsia-500/10" border="border-pink-500/30" title="Community Reports" desc="Verified users share real-time incident reports, helping others stay informed and safe." />
                </div>

                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Award size={20} className="text-yellow-400" />
                    Why Choose HerGuardian?
                  </h3>
                  <div className="space-y-3">
                    <BulletPoint Icon={Zap} text="Real-time AI analysis with 98% accuracy rate" />
                    <BulletPoint Icon={Lock} text="End-to-end encrypted — your data stays yours" />
                    <BulletPoint Icon={Heart} text="Built with love by a team that cares about women's safety" />
                    <BulletPoint Icon={Users} text="Trusted by 25,000+ women across India" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatBox value="12K+" label="Women Protected" color="text-pink-400" />
                  <StatBox value="8.5K+" label="Incidents Reported" color="text-orange-400" />
                  <StatBox value="98%" label="Safety Score" color="text-green-400" />
                </div>

                <div className="text-center bg-black/40 rounded-2xl p-6 border border-pink-500/20 mb-6">
                  <Heart size={28} className="mx-auto mb-2 text-pink-400 fill-pink-400" />
                  <p className="text-gray-300 text-sm italic">
                    "Every woman deserves to feel safe, empowered, and free — everywhere she goes.
                    <span className="block mt-2 text-pink-400 font-semibold">That's our mission at HerGuardian.</span>"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signup"
                    onClick={() => setShowLearnMore(false)}
                    className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-xl 
                               bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold
                               hover:from-pink-400 hover:to-purple-500 hover:scale-[1.02]
                               shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]
                               transition-all duration-300"
                  >
                    Get Started Free
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <button
                    onClick={() => setShowLearnMore(false)}
                    className="flex-1 py-3 rounded-xl border border-pink-500/40 bg-white/5 text-white font-bold
                               hover:bg-pink-500/10 hover:border-pink-500/80 transition-all duration-300"
                  >
                    Close
                  </button>
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
    </section>
  );
}

/* ===== Helper Components ===== */

function FeatureBox({ Icon, color, bg, border, title, desc }) {
  return (
    <div className={`bg-gradient-to-br ${bg} border ${border} rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300`}>
      <div className={`w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center mb-2 ${color}`}>
        <Icon size={20} />
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function BulletPoint({ Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-pink-400" />
      </div>
      <p className="text-gray-300 text-sm">{text}</p>
    </div>
  );
}

function StatBox({ value, label, color }) {
  return (
    <div className="text-center bg-black/40 border border-white/10 rounded-xl p-3">
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}