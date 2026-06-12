export default function HowItWorks() {
  const steps = [
    "User selects destination",
    "AI analyzes route safety",
    "Community reports are considered",
    "Safety score is generated",
    "Voice SOS remains active",
  ];

  return (
    <section className="bg-[#0B0A1F] py-20 text-white"> {/* Adjusted to match your dark theme screenshot */}
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          How It Works
        </h2>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 rounded-xl border border-slate-700 p-5 
                         transition-all duration-500 ease-out cursor-pointer
                         hover:border-pink-500 hover:bg-pink-500/5 
                         hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 font-bold text-white
                              transition-all duration-500 
                              group-hover:bg-pink-500 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.8)]">
                {index + 1}
              </div>

              <p className="text-slate-300 transition-colors duration-300 group-hover:text-white">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
