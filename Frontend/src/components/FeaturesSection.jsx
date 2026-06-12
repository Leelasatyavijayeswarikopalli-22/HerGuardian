import {
  Shield,
  Mic,
  MapPinned,
  Users,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Dynamic Safety Score",
      desc: "Every road receives a real-time safety score.",
    },
    {
      icon: Mic,
      title: "Secret Voice SOS",
      desc: "Trigger emergency alerts using a secret phrase.",
    },
    {
      icon: MapPinned,
      title: "AI Safety Map",
      desc: "Visualize safe and unsafe areas instantly.",
    },
    {
      icon: Users,
      title: "Community Intelligence",
      desc: "Citizens contribute safety insights.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Key Features
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative cursor-pointer rounded-2xl bg-white p-6 shadow-md 
                           transition-all duration-500 ease-out
                           hover:-translate-y-3 hover:shadow-2xl hover:shadow-pink-500/40
                           hover:border-pink-500 border-2 border-transparent
                           before:absolute before:inset-0 before:rounded-2xl 
                           before:bg-gradient-to-br before:from-pink-500/10 before:to-purple-500/10 
                           before:opacity-0 before:transition-opacity before:duration-500
                           hover:before:opacity-100 overflow-hidden"
              >
                <div className="relative z-10">
                  <Icon
  size={40}
  className="mb-4 text-pink-600 transition-transform duration-500 ease-out
             group-hover:-translate-y-2
             group-hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]"
/>

                  <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 
                                 group-hover:text-pink-600">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 transition-colors duration-300 
                                group-hover:text-slate-800">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
