import { Link } from "react-router-dom";
import {
  Shield,
  Mic,
  MapPinned,
  Users
} from "lucide-react";

export default function Hero() {
  

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-16">

      {/* LEFT SIDE */}
      <div className="flex-1 text-center lg:text-left">
        
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-purple-300">
          AI-Powered Women Safety Platform
        </span>

        <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
          Your <span className="text-pink-400">Safety</span>, <br />
          Our <span className="text-blue-400">Priority</span>
        </h1>

        <p className="text-gray-300 mt-6 max-w-xl mx-auto lg:mx-0">
          HerGuardian is your smart companion for a safer life. Report, track,
          and stay protected anywhere.
        </p>

        <div className="flex gap-4 mt-8 justify-center lg:justify-start">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white"
          >
            Explore Dashboard
          </Link>

          <Link
            to="/about"
            className="px-6 py-3 rounded-xl border border-white/20"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 relative flex items-center justify-center mt-16 lg:mt-0 min-h-[700px]">
      <div className="absolute w-[550px] h-[550px] bg-pink-500/30 blur-[140px] rounded-full" />
      <div className="absolute w-[650px] h-[650px] border border-pink-500/20 rounded-full"></div>

<div className="absolute w-[500px] h-[500px] border border-blue-500/20 rounded-full"></div>

<div className="absolute w-[350px] h-[350px] border border-purple-500/20 rounded-full"></div>
        {/* Center Shield */}
        {/* Center Women Image */}
<div className="relative z-10 flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl overflow-hidden">
  <img
  src="/icon.png"
  alt="HerGuardian Logo"
  className="w-full h-full object-contain p-0"
/>
</div>
        {/* Safety Map Card */}
{/* Safety Map (Top Center) */}
<div className="absolute top-8 left-1/2 -translate-x-1/2 float-card">
  <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 flex flex-col items-center justify-center">
    <MapPinned className="text-blue-400" size={30} />
  </div>
  <p className="text-center text-sm mt-2">Safety Map</p>
</div>

{/* Resources (Left Center - better spacing) */}
<div className="absolute top-1/2 left-[15%] -translate-y-1/2 -translate-x-1/2 float-card">
  <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 flex items-center justify-center">
    <Shield className="text-green-400" size={30} />
  </div>
  <p className="text-center text-sm mt-2">Dynamic Safety Score</p>
</div>

{/* SOS Alert (Right Center - symmetric) */}
<div className="absolute top-1/2 left-[85%] -translate-y-1/2 -translate-x-1/2 float-card">
  <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 flex items-center justify-center">
    <Mic className="text-red-400" size={30} />
  </div>
  <p className="text-center text-sm mt-2">Secret Voice SOS</p>
</div>

{/* Report Incident (Bottom Center) */}
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 float-card">
  <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 flex items-center justify-center">
    <Users className="text-pink-400" size={30} />
  </div>
  <p className="text-center text-sm mt-2">Community Report</p>
</div>
      </div>
    </section>
  );
}