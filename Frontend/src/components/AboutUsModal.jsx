import {
  X,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  Users,
  Mail,
  Heart,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

const ajnabh = "/founders/ajnabh.jpeg";
const vijayeswari = "/founders/vijayeswari.jpeg";

export default function AboutUsModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-16 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md"></div>

      <div
        className="relative z-10 w-full max-w-5xl max-h-[88vh] rounded-3xl animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 backdrop-blur-2xl border border-pink-500/30 rounded-3xl shadow-[0_0_80px_rgba(236,72,153,0.4)] overflow-hidden">

          <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />

          {/* Header */}
          <div className="sticky top-0 z-30 bg-gradient-to-r from-[#1a0b2e]/95 via-[#2a0f3d]/95 to-[#1a0b2e]/95 backdrop-blur-xl border-b border-pink-500/20 px-6 py-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-pink-400 animate-ping"></span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg md:text-xl leading-tight">
                  About HerGuardian
                </h2>
                <p className="text-pink-300 text-xs md:text-sm">
                  Meet the founders • Discover our mission
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/60 border border-pink-500/40 flex items-center justify-center hover:bg-pink-500 hover:border-pink-400 hover:scale-110 hover:rotate-90 transition-all duration-300"
              aria-label="Close modal"
            >
              <X size={16} className="text-white" strokeWidth={3} />
            </button>
          </div>

          {/* Body */}
          <div className="custom-scrollbar relative overflow-y-auto max-h-[calc(88vh-80px)] px-6 py-8 md:px-10 md:py-10">

            {/* Hero */}
            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <Sparkles size={12} className="text-pink-300 animate-pulse" />
                Building Safer Futures
              </div>

              <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-5">
                Empowering Women Through{" "}
                <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  Safer Technology
                </span>
              </h1>

              <p className="text-sm md:text-base leading-7 text-gray-300/90">
                HerGuardian is an AI-powered women safety platform designed to make everyday travel{" "}
                <span className="text-pink-300 font-semibold">safer, smarter, and more empowering</span>. We combine
                real-time risk awareness, secure route intelligence, emergency responsiveness, and community-focused
                reporting into one mission-driven ecosystem.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
                <StatBox icon={Users} value="25K+" label="Women Protected" />
                <StatBox icon={Target} value="8.5K+" label="Reports Handled" />
                <StatBox icon={Award} value="99%" label="Response Rate" />
              </div>
            </div>

            {/* Core Values */}
            <div className="mt-12">
              <div className="mb-6 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-bold tracking-widest uppercase">
                  <Zap size={11} />
                  Our Core Values
                </span>
                <h3 className="mt-3 text-2xl md:text-3xl font-black text-white">
                  What Drives <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Us Forward</span>
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <InfoCard
                  icon={ShieldCheck}
                  title="Safer Mobility"
                  text="Helping users identify safer routes and travel with confidence using intelligent decision support."
                  color="pink"
                />
                <InfoCard
                  icon={HeartHandshake}
                  title="Human-Centered Vision"
                  text="Built with empathy and purpose to address real-world challenges in women's safety and mobility."
                  color="fuchsia"
                />
                <InfoCard
                  icon={GraduationCap}
                  title="Student-Led Innovation"
                  text="Driven by young innovators who believe technology should create meaningful social impact."
                  color="purple"
                />
              </div>
            </div>

            {/* Founders */}
            <div className="mt-14">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold tracking-widest uppercase">
                  <Heart size={11} />
                  The Dream Team
                </span>
                <h3 className="mt-3 text-2xl md:text-3xl font-black text-white">
                  Meet the <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Founders</span>
                </h3>
                <p className="mt-2 text-sm text-gray-400">Two builders. One mission. A safer future for all.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FounderCard
                  name="Ajnabh Koushik"
                  role="Co-Founder"
                  image={ajnabh}
                  fallback="AK"
                  bio="Ajnabh Koushik is a Co-Founder of HerGuardian and a B.Tech student at NIT Patna, graduating in 2028."
                  instagram="https://www.instagram.com/ajnabh_koushik/"
                  linkedin="https://www.linkedin.com/in/ajnabh-koushik-baruah-0ba92a336/"
                  email="ajnabhkoushikbaruah@gmail.com"
                />

                <FounderCard
                  name="Kopalli Vijayeswari"
                  role="Founder"
                  image={vijayeswari}
                  fallback="KV"
                  bio="Kopalli Vijayeswari is the Founder of HerGuardian and a B.Tech student at NIT Patna, graduating in 2028."
                  instagram="https://www.instagram.com/vijji__22/"
                  linkedin="https://www.linkedin.com/in/vijayeswari-kopalli-5a2949325/"
                  email="leelasatyavijayeswari1022@gmail.com"
                />
              </div>
            </div>

            {/* Vision */}
            <div className="mt-14 relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-fuchsia-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-60"></div>

              <div className="relative bg-gradient-to-br from-[#1a0b2e] via-[#2a0f3d]/80 to-[#1a0b2e] border border-pink-500/30 rounded-3xl p-8 md:p-10">
                <div className="flex flex-col items-center gap-5 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                    <Users size={26} className="text-white" />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 text-[10px] font-bold tracking-widest uppercase mb-3">
                      🎓 NIT PATNA • Class of 2028
                    </span>
                    <h4 className="text-2xl md:text-3xl font-black text-white mb-3">
                      Our Shared <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Vision</span>
                    </h4>
                  </div>

                  <p className="max-w-3xl text-sm md:text-base leading-7 text-gray-300">
                    Founded by two aspiring engineers from{" "}
                    <span className="font-bold text-pink-300">NIT Patna</span>, HerGuardian reflects a shared commitment to using
                    technology for real social good — helping women move more safely, feel more confident, and stay better
                    protected in everyday life.
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <Heart size={16} className="text-pink-400 fill-pink-400 animate-pulse" />
                    <span className="text-xs text-gray-400 font-medium">Made with love, in India 🇮🇳</span>
                    <Heart size={16} className="text-pink-400 fill-pink-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500 text-xs">
                © 2026 HerGuardian • <span className="text-pink-300">Empowering Every Journey</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1); }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #ec4899, #a855f7); border-radius: 10px; }
      `}</style>
    </div>
  );
}

/* ===== HELPER COMPONENTS ===== */

function StatBox({ icon: Icon, value, label }) {
  return (
    <div className="bg-white/5 border border-pink-500/20 rounded-2xl p-3 hover:border-pink-500/50 hover:bg-white/10 transition-all">
      <Icon size={16} className="text-pink-400 mx-auto mb-1.5" />
      <p className="text-white font-black text-lg leading-tight">{value}</p>
      <p className="text-gray-400 text-[10px] uppercase tracking-wider">{label}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text, color = "pink" }) {
  const colorMap = {
    pink: {
      iconBg: "from-pink-500 to-pink-600",
      iconShadow: "shadow-[0_0_20px_rgba(236,72,153,0.4)]",
      border: "border-pink-500/20 hover:border-pink-400/60",
      titleHover: "group-hover:text-pink-300",
    },
    fuchsia: {
      iconBg: "from-fuchsia-500 to-fuchsia-600",
      iconShadow: "shadow-[0_0_20px_rgba(217,70,239,0.4)]",
      border: "border-fuchsia-500/20 hover:border-fuchsia-400/60",
      titleHover: "group-hover:text-fuchsia-300",
    },
    purple: {
      iconBg: "from-purple-500 to-purple-600",
      iconShadow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      border: "border-purple-500/20 hover:border-purple-400/60",
      titleHover: "group-hover:text-purple-300",
    },
  };

  const c = colorMap[color];

  return (
    <div className={`group relative rounded-2xl border ${c.border} bg-black/40 backdrop-blur-xl p-5 transition-all duration-300 hover:bg-white/[0.05] hover:scale-[1.02] hover:shadow-lg`}>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

      <div className={`relative mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${c.iconBg} ${c.iconShadow} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
        <Icon size={22} className="text-white" />
      </div>
      <h4 className={`relative text-lg font-bold text-white mb-2 ${c.titleHover} transition-colors`}>
        {title}
      </h4>
      <p className="relative text-sm leading-6 text-gray-400">{text}</p>
    </div>
  );
}

/* ✅ UPDATED FOUNDER CARD — Left side profile pic + Right side details */
function FounderCard({
  name,
  role,
  image,
  bio,
  fallback,
  instagram,
  linkedin,
  email,
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative rounded-3xl overflow-hidden">
      {/* Glowing gradient border on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/50 via-fuchsia-500/50 to-purple-500/50 rounded-3xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

      <div className="relative bg-gradient-to-br from-[#1a0b2e] via-[#20102f]/95 to-[#1a0b2e] border border-pink-500/20 group-hover:border-pink-500/60 rounded-3xl p-6 transition-all duration-300">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 opacity-60"></div>

        {/* ✅ FLEX LAYOUT — Image LEFT | Content RIGHT */}
        <div className="flex flex-row items-start gap-5">

          {/* ===== LEFT SIDE — CIRCULAR PROFILE PIC ===== */}
          <div className="relative shrink-0">
            {/* Outer glowing ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse"></div>

            {/* Middle ring */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>

            {/* ✅ Profile Circle — Image OR Fallback Initials */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#1a0b2e] shadow-[0_0_25px_rgba(236,72,153,0.5)] group-hover:scale-105 transition-transform duration-300">
              {!imgError ? (
                <img
  src={image}
  alt={name}
  onError={() => setImgError(true)}
  className="w-full h-full object-cover object-center"
/>
              ) : (
                /* ✅ Fallback: Gradient circle with initials */
                <div className="w-full h-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-black text-2xl md:text-3xl tracking-wider">
                    {fallback}
                  </span>
                </div>
              )}
            </div>

            {/* Online status dot */}
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-[#1a0b2e] shadow-[0_0_10px_rgba(74,222,128,0.8)] z-10"></span>
          </div>

          {/* ===== RIGHT SIDE — DETAILS ===== */}
          <div className="flex-1 min-w-0">
            {/* Role Badge */}
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 text-pink-300 text-[10px] font-bold tracking-widest uppercase mb-2">
              {role}
            </span>

            {/* Name */}
            <h3 className="text-lg md:text-xl font-black text-white mb-1 leading-tight">
              {name}
            </h3>

            {/* College info */}
            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <GraduationCap size={12} className="text-purple-400" />
              B.Tech, NIT Patna • Class of 2028
            </p>

            {/* Bio */}
            <p className="text-xs md:text-sm leading-6 text-gray-300 mb-4">
              {bio}
            </p>

            {/* Social buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-pink-300 hover:from-pink-500/30 hover:to-fuchsia-500/30 hover:border-pink-500/60 hover:scale-105 transition-all duration-300"
              >
                <FaInstagram size={12} />
                Instagram
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-500/60 hover:scale-105 transition-all duration-300"
              >
                <FaLinkedin size={12} />
                LinkedIn
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300"
              >
                <Mail size={12} />
                Mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}