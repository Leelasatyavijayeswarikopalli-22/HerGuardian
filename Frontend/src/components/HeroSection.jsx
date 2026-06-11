import { Link } from "react-router-dom";
import { Shield, Mic, MapPinned, Users } from "lucide-react";

export default function Hero() {
  const features = [
    { icon: Shield, label: "Safety Score" },
    { icon: Mic, label: "Voice SOS" },
    { icon: MapPinned, label: "Safe Map" },
    { icon: Users, label: "Community" },
  ];

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
      <div className="flex-1 relative flex items-center justify-center mt-16 lg:mt-0">
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-3xl rounded-full" />
        {/* Center Shield */}
        <div className="relative z-10 flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl">
          <Shield size={70} className="text-white" />
        </div>

        {/* Floating Feature Bubbles */}
        {features.map((item, index) => {
          const Icon = item.icon;

          const positions = [
            "top-0 left-1/2 -translate-x-1/2",
            "bottom-0 left-1/2 -translate-x-1/2",
            "left-0 top-1/2 -translate-y-1/2",
            "right-0 top-1/2 -translate-y-1/2",
          ];

          return (
            <div
              key={index}
              className={`absolute ${positions[index]} animate-bounce-slow`}
            >
              <div className="flex flex-col items-center gap-1">
                
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg">
                  <Icon className="text-pink-500" size={22} />
                </div>

                <span className="text-xs text-gray-300">
                  {item.label}
                </span>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}