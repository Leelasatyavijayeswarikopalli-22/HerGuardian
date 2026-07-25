import { AlertTriangle, TrendingDown, Users, Moon } from "lucide-react";

export default function ProblemSection() {
  const stats = [
    { value: "78%", label: "Women feel unsafe", Icon: AlertTriangle, color: "text-red-400" },
    { value: "62%", label: "Avoid night travel", Icon: Moon, color: "text-orange-400" },
    { value: "45%", label: "Skip job opportunities", Icon: TrendingDown, color: "text-pink-400" },
    { value: "3 in 5", label: "Face harassment daily", Icon: Users, color: "text-purple-400" },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Warning glow */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm text-sm text-red-200 font-medium">
            <AlertTriangle size={14} className="text-red-400 animate-pulse" />
            The Reality
          </span>
        </div>

        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-4">
          The <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Problem</span>
        </h2>
        <p className="text-center text-gray-300 text-lg mb-16 max-w-3xl mx-auto leading-relaxed">
          Many women avoid educational and employment opportunities due to <span className="text-pink-400 font-semibold">unsafe commuting routes</span>, poor lighting, unreliable transport, and lack of <span className="text-pink-400 font-semibold">real-time safety information</span>.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.Icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10 
                           transition-all duration-500 ease-out cursor-pointer overflow-hidden
                           hover:border-red-500/50 hover:-translate-y-2
                           hover:shadow-[0_10px_40px_rgba(239,68,68,0.25)]"
              >
                {/* Gradient bg on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-200 transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call-out message */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 italic">
            "Every woman deserves the freedom to move without fear."
          </p>
        </div>
      </div>
    </section>
  );
}