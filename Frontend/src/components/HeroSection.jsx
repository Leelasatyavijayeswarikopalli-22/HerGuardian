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
          {/* EXPLORE DASHBOARD BUTTON - Pink/Purple Glow Hover */}
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
                       hover:from-pink-400 hover:to-purple-500"
          >
            Explore Dashboard
          </Link>

          {/* LEARN MORE BUTTON - Pink/Purple Glow Hover */}
          <Link
            to="/about"
            className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold
                       transition-all duration-300 ease-out
                       hover:scale-105 hover:border-pink-500/60 
                       hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-600/20
                       hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]"
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

        {/* CENTER LOGO - White Glow Hover */}
        <div className="relative z-10 flex items-center justify-center w-40 h-40 rounded-full 
                        bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl overflow-hidden
                        cursor-pointer transition-all duration-500 ease-out
                        hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]
                        hover:from-white hover:to-white">
          <img
            src="/icon.png"
            alt="HerGuardian Logo"
            className="w-full h-full object-contain p-0 transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Safety Map (Top Center) - Pink/Purple Hover */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 float-card group cursor-pointer">
          <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 
                          flex flex-col items-center justify-center
                          transition-all duration-300 ease-out
                          group-hover:scale-110 group-hover:border-pink-500/80
                          group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:to-purple-600/30
                          group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]">
            <MapPinned className="text-blue-400 transition-all duration-300 group-hover:text-pink-300 group-hover:scale-110" size={30} />
          </div>
          <p className="text-center text-sm mt-2 transition-colors duration-300 group-hover:text-pink-300">Safety Map</p>
        </div>

        {/* Dynamic Safety Score (Left Center) - Pink/Purple Hover */}
        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 -translate-x-1/2 float-card group cursor-pointer">
          <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 
                          flex items-center justify-center
                          transition-all duration-300 ease-out
                          group-hover:scale-110 group-hover:border-pink-500/80
                          group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:to-purple-600/30
                          group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]">
            <Shield className="text-green-400 transition-all duration-300 group-hover:text-pink-300 group-hover:scale-110" size={30} />
          </div>
          <p className="text-center text-sm mt-2 transition-colors duration-300 group-hover:text-pink-300">Dynamic Safety Score</p>
        </div>

        {/* Secret Voice SOS (Right Center) - Pink/Purple Hover */}
        <div className="absolute top-1/2 left-[85%] -translate-y-1/2 -translate-x-1/2 float-card group cursor-pointer">
          <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 
                          flex items-center justify-center
                          transition-all duration-300 ease-out
                          group-hover:scale-110 group-hover:border-pink-500/80
                          group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:to-purple-600/30
                          group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]">
            <Mic className="text-red-400 transition-all duration-300 group-hover:text-pink-300 group-hover:scale-110" size={30} />
          </div>
          <p className="text-center text-sm mt-2 transition-colors duration-300 group-hover:text-pink-300">Secret Voice SOS</p>
        </div>

        {/* Community Report (Bottom Center) - Pink/Purple Hover */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 float-card group cursor-pointer">
          <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-pink-500/20 
                          flex items-center justify-center
                          transition-all duration-300 ease-out
                          group-hover:scale-110 group-hover:border-pink-500/80
                          group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:to-purple-600/30
                          group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]">
            <Users className="text-pink-400 transition-all duration-300 group-hover:text-pink-300 group-hover:scale-110" size={30} />
          </div>
          <p className="text-center text-sm mt-2 transition-colors duration-300 group-hover:text-pink-300">Community Report</p>
        </div>
      </div>
    </section>
  );
}