export default function ProblemSection() {
  return (
    <section className="py-20 text-white"> 
      <div className="mx-auto max-w-4xl px-6 text-center">

        {/* The Unique Hover Box */}
        <div className="group relative overflow-hidden rounded-3xl border-2 border-slate-800 bg-[#0B0A1F]/50 p-12 
                        transition-all duration-700 ease-out cursor-default
                        hover:border-pink-500 hover:bg-slate-900/80
                        hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]">

          {/* Background Ambient Glow (Fades in on hover) */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-purple-600/10 
                          opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="mb-6 text-4xl font-bold tracking-wide text-slate-200 
                           transition-all duration-500 
                           group-hover:text-pink-500 group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
              The Problem
            </h2>

            <p className="text-xl leading-relaxed text-slate-400 transition-colors duration-500 
                          group-hover:text-slate-100">
              Many women avoid educational and employment
              opportunities due to unsafe commuting routes,
              poor lighting, unreliable transport and
              lack of real-time safety information.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
