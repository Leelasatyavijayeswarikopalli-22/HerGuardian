import { Shield, MapPin, Mic, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">

      <div className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}

          <div>

            <div className="mb-4 inline-flex items-center rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
              AI-Powered Women's Safety Platform
            </div>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight lg:text-6xl">

              Navigate
              <span className="text-pink-600">
                {" "}Fearlessly
              </span>

            </h1>

            <p className="mb-8 text-lg text-slate-600">

              HerGuardian combines AI, community intelligence,
              dynamic safety mapping and Voice SOS to help women
              travel, work and live more safely.

            </p>

            <div className="flex flex-wrap gap-4">

              <button className="rounded-xl bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700">

                Get Started

              </button>

              <button className="flex items-center gap-2 rounded-xl border px-6 py-3 font-medium">

                Learn More

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

          {/* Right */}

          <div className="grid gap-4">

            <div className="rounded-2xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-3">

                <Shield className="text-green-600" />

                <h3 className="font-semibold">
                  Safety Score
                </h3>

              </div>

              <h1 className="mt-4 text-5xl font-bold text-green-600">
                84
              </h1>

              <p className="text-slate-500">
                Safe Zone
              </p>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-3">

                <MapPin className="text-red-500" />

                <h3 className="font-semibold">
                  Risk Detection
                </h3>

              </div>

              <p className="mt-4">
                AI predicts unsafe areas before incidents occur.
              </p>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-3">

                <Mic className="text-pink-600" />

                <h3 className="font-semibold">
                  Voice SOS
                </h3>

              </div>

              <p className="mt-4">
                Secret phrase triggers emergency support.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}