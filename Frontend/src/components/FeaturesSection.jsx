import { Shield, Mic, MapPinned, Users, Sparkles } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Dynamic Safety Score",
      desc: "Every road receives a real-time safety score based on AI analysis.",
      gradient: "from-pink-500 to-rose-600",
      glow: "rgba(236, 72, 153, 0.4)"
    },
    {
      icon: Mic,
      title: "Secret Voice SOS",
      desc: "Trigger emergency alerts using a discreet secret phrase.",
      gradient: "from-red-500 to-pink-600",
      glow: "rgba(239, 68, 68, 0.4)"
    },
    {
      icon: MapPinned,
      title: "AI Safety Map",
      desc: "Visualize safe and unsafe areas around you instantly.",
      gradient: "from-blue-500 to-purple-600",
      glow: "rgba(59, 130, 246, 0.4)"
    },
    {
      icon: Users,
      title: "Community Intelligence",
      desc: "Citizens contribute real-time safety insights & alerts.",
      gradient: "from-purple-500 to-pink-600",
      glow: "rgba(168, 85, 247, 0.4)"
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
              <div
                key={index}
                className="group relative cursor-pointer rounded-2xl bg-white/5 backdrop-blur-xl p-6 
                           border border-white/10 overflow-hidden
                           transition-all duration-500 ease-out
                           hover:scale-[1.04] hover:border-pink-500/60"
                style={{
                  boxShadow: `0 0 0 rgba(0,0,0,0)`,
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 20px 50px ${feature.glow}`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`}
              >
                {/* Animated shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl rounded-full group-hover:opacity-30 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  {/* Icon Box */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-all duration-500`}>
                    <Icon size={26} className="text-white drop-shadow-lg" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                    {feature.desc}
                  </p>

                  {/* Learn more arrow */}
                  <div className="mt-4 flex items-center gap-2 text-pink-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                    <span className="text-xs font-semibold">Learn more</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}