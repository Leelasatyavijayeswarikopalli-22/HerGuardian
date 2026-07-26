import { MapPin, Brain, Users, Gauge, Mic, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "User selects destination",
      desc: "Enter your starting point and destination in the app.",
      Icon: MapPin,
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "AI analyzes route safety",
      desc: "Our AI scans multiple routes for safety metrics in real-time.",
      Icon: Brain,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Community reports are considered",
      desc: "Live inputs from verified users near your route are factored in.",
      Icon: Users,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Safety score is generated",
      desc: "You receive a color-coded safety score for each available path and also provided with a dynamic dashboard.",
      Icon: Gauge,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Voice SOS remains active",
      desc: "Say your secret phrase anytime to trigger emergency alerts.",
      Icon: Mic,
      color: "from-red-500 to-pink-600"
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-10 right-20 w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-20 w-[500px] h-[500px] bg-pink-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="relative mx-auto max-w-5xl">
        {/* Section Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm text-sm text-purple-200 font-medium">
            <Zap size={14} className="text-purple-400" />
            Simple 5-Step Process
          </span>
        </div>

        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-4">
          How It <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
          From destination to safety in seconds. Here's how HerGuardian protects you.
        </p>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-500/50 via-purple-500/50 to-pink-500/10 hidden md:block"></div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.Icon;
              return (
                <div
                  key={index}
                  className="group relative flex items-start gap-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6
                             transition-all duration-500 ease-out cursor-pointer overflow-hidden
                             hover:border-pink-500/50 hover:scale-[1.02]
                             hover:shadow-[0_10px_30px_rgba(236,72,153,0.2)]"
                >
                  {/* Number + Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 relative`}>
                      <Icon size={26} className="text-white drop-shadow-lg" />
                      {/* Step number badge */}
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-pink-600 text-xs font-bold flex items-center justify-center shadow-md">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-gray-400 text-sm md:text-base group-hover:text-gray-200 transition-colors">
                      {step.desc}
                    </p>
                  </div>

                  {/* Corner glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-500`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}