import { Link } from "react-router-dom";
import { Shield, Mic, MapPinned, Users, Siren, ShieldCheck, UsersRound, Gauge } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden justify-center"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(30, 5, 50, 0.88) 0%, rgba(80, 10, 60, 0.75) 40%, rgba(10, 2, 25, 0.95) 100%),
          url('https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Purple/Pink Neon Glow Overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-600/25 rounded-full blur-[150px]"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-4 pb-2">
        {/* LEFT SIDE */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-sm text-sm text-pink-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
            AI-Powered Women Safety Platform
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold mt-5 leading-[1.1] tracking-tight">
            <span className="text-white">Your Safety,</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Our Priority
            </span>
          </h1>

          {/* Description */}
         <div className="mt-5 pl-4 border-l-2 border-pink-500/60">
  <p className="text-gray-200 text-base leading-relaxed">
              HerGuardian is your smart companion for a safer life. Report, track, and stay protected anywhere.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center lg:justify-start">
            <Link
              to="/dashboard"
              className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold
                         transition-all duration-300 ease-out flex items-center gap-2
                         hover:scale-105 hover:shadow-[0_0_35px_rgba(236,72,153,0.7)]
                         hover:from-pink-400 hover:to-purple-500"
            >
              Explore Dashboard
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

            <Link
              to="/about"
              className="group px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold
                         transition-all duration-300 ease-out flex items-center gap-2
                         hover:scale-105 hover:border-pink-500/60 hover:bg-white/10
                         hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
            >
              Learn More
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - GLOWING RING WITH FLOATING CARDS */}
        <div className="flex-1 relative flex items-center justify-center mt-8 lg:mt-0 min-h-[480px]">

          {/* Massive pink glow behind */}
          <div className="absolute w-[500px] h-[500px] bg-pink-500/40 blur-[130px] rounded-full"></div>

          {/* Rotating Rings */}
          <div className="absolute w-[500px] h-[500px] border border-pink-500/30 rounded-full animate-[spin_30s_linear_infinite]">
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.9)]"></div>
</div>
<div className="absolute w-[400px] h-[400px] border border-purple-500/30 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
<div className="absolute w-[300px] h-[300px] border border-pink-500/40 rounded-full"></div>

          {/* BRIGHT GLOWING RING around logo */}
          <div className="absolute w-[200px] h-[200px] rounded-full border-4 border-pink-500 shadow-[0_0_60px_rgba(236,72,153,0.9),inset_0_0_40px_rgba(236,72,153,0.4)] animate-pulse"></div>

          {/* CENTER LOGO - FIXED */}
          <div className="relative z-10 flex items-center justify-center w-36 h-36 rounded-full  
                          bg-white shadow-2xl overflow-hidden
                          cursor-pointer transition-all duration-500 ease-out
                          hover:scale-110 hover:shadow-[0_0_60px_rgba(255,255,255,1)]">
            <img
              src="/icon.png"
              alt="HerGuardian Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>

          {/* Safety Map (TOP) */}
          <FloatCard
            className="absolute top-4 left-1/2 -translate-x-1/2"
            Icon={MapPinned}
            iconColor="text-blue-400"
            title="Safety Map"
            desc="Real-time safe zone & risk alerts"
          />

          {/* Dynamic Safety Score (LEFT) */}
          <FloatCard
            className="absolute top-1/2 left-[8%] -translate-y-1/2"
            Icon={Shield}
            iconColor="text-green-400"
            title="Dynamic Safety Score"
            desc="AI-powered risk analysis"
          />

          {/* Secret Voice SOS (RIGHT) */}
          <FloatCard
            className="absolute top-1/2 right-[8%] -translate-y-1/2"
            Icon={Mic}
            iconColor="text-red-400"
            title="Secret Voice SOS"
            desc="Discreet voice emergency call"
          />

          {/* Community Report (BOTTOM) */}
          <FloatCard
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
            Icon={Users}
            iconColor="text-pink-400"
            title="Community Report"
            desc="Stronger together, safer together"
          />
        </div>
      </div>

      {/* BOTTOM STATS BAR */}
      <div className="relative z-10 px-6 lg:px-20 pb-6 -mt-4">
        <div className="max-w-3xl mx-auto lg:mx-0 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-5 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem Icon={ShieldCheck} value="12K+" label="Women Protected" color="text-pink-400" />
            <StatItem Icon={Siren} value="8.5K+" label="Incidents Reported" color="text-orange-400" />
            <StatItem Icon={UsersRound} value="25K+" label="Trusted Users" color="text-purple-400" />
            <StatItem Icon={Gauge} value="98%" label="Safety Score" color="text-green-400" />
          </div>
        </div>
      </div>

      {/* FLOATING "Need Help?" CHAT WIDGET */}
<div className="absolute bottom-20 right-6 z-[50] flex items-center gap-3 bg-black/70 backdrop-blur-xl border border-pink-500/30 rounded-full pl-3 pr-5 py-3 shadow-[0_0_30px_rgba(236,72,153,0.4)] cursor-pointer hover:scale-105 transition-all duration-300">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div className="text-left">
          <p className="text-white font-semibold text-sm leading-tight">Need Help?</p>
          <p className="text-pink-300 text-xs">We're here for you</p>
        </div>
      </div>
    </section>
  );
}

/* Floating Feature Card */
function FloatCard({ className, Icon, iconColor, title, desc }) {
  return (
    <div className={`${className} group cursor-pointer w-40`}>
      <div className="w-20 h-20 mx-auto rounded-full bg-white/5 backdrop-blur-xl border border-pink-500/30
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      group-hover:scale-110 group-hover:border-pink-500/80
                      group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-purple-600/20
                      group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]">
        <Icon className={`${iconColor} transition-all duration-300 group-hover:scale-110`} size={28} />
      </div>
      <div className="mt-3 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 px-3 py-2 text-center group-hover:border-pink-500/40 transition-all">
        <p className="text-white text-sm font-semibold leading-tight">{title}</p>
        <p className="text-gray-400 text-[11px] mt-1 leading-tight">{desc}</p>
      </div>
    </div>
  );
}

/* Stat Item */
function StatItem({ Icon, value, label, color }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-white text-xl font-bold leading-tight">{value}</p>
        <p className="text-gray-400 text-xs">{label}</p>
      </div>
    </div>
  );
}