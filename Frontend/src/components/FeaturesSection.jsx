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
                className="rounded-2xl bg-white p-6 shadow-md"
              >

                <Icon
                  size={40}
                  className="mb-4 text-pink-600"
                />

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-slate-600">
                  {feature.desc}
                </p>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}