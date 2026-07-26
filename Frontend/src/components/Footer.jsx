import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Heart,
  Send,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import AboutUsModal from "../components/AboutUsModal";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setSubscribed(true);
    setEmail("");

    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <>
      <footer className="relative overflow-hidden border-t border-white/10">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute top-0 left-1/4 h-[300px] w-[500px] rounded-full bg-pink-500/10 blur-[120px]"></div>
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-[300px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          {/* Newsletter Section */}
          <div className="mb-16 rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl md:p-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                  Stay{" "}
                  <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                    Protected
                  </span>
                  , Stay Informed
                </h3>
                <p className="text-gray-400">
                  Get safety tips & product updates directly in your inbox.
                </p>
              </div>

              <div className="w-full md:w-auto">
                {subscribed ? (
                  <div className="flex items-center gap-3 rounded-xl border border-green-500/40 bg-green-500/10 px-6 py-4 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                    <CheckCircle size={22} className="text-green-400" />
                    <div>
                      <p className="text-sm font-semibold text-green-300">
                        Successfully Subscribed! 🎉
                      </p>
                      <p className="text-xs text-green-400/70">
                        Welcome to the HerGuardian family
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                        className={`flex-1 rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition md:w-72 ${
                          error
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-pink-500/60"
                        }`}
                      />
                      <button
                        onClick={handleSubscribe}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]"
                      >
                        <Send size={16} />
                        <span className="hidden sm:inline">Subscribe</span>
                      </button>
                    </div>

                    {error && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                        ⚠️ {error}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">HerGuardian</h2>
                  <p className="text-[10px] tracking-wider text-pink-300">
                    Your Safety, Our Priority
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                AI-powered women safety platform providing safer mobility,
                community-driven reporting, and emergency assistance across India.
              </p>

              <div className="mt-5 flex gap-3">
                {[
                  { emoji: "📷", label: "Instagram" },
                  { emoji: "🐦", label: "Twitter" },
                  { emoji: "▶️", label: "Youtube" },
                  { emoji: "💼", label: "LinkedIn" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    title={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-base transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                  >
                    {social.emoji}
                  </a>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Key Features</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Dynamic Safety Score",
                  "Secret Voice SOS",
                  "Community Network",
                  "Real-Time Risk Prediction",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-pink-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-pink-500 transition-all duration-300 group-hover:w-3"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/dashboard"
                    className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-pink-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-pink-500 transition-all duration-300 group-hover:w-3"></span>
                    Dashboard
                  </a>
                </li>

                <li>
                  <a
                    href="/safety-map"
                    className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-pink-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-pink-500 transition-all duration-300 group-hover:w-3"></span>
                    Safety Map
                  </a>
                </li>

                <li>
                  <a
                    href="/reports"
                    className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-pink-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-pink-500 transition-all duration-300 group-hover:w-3"></span>
                    Community Reports
                  </a>
                </li>

                <li>
                  <button
                    onClick={() => setShowAboutUs(true)}
                    className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-pink-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-pink-500 transition-all duration-300 group-hover:w-3"></span>
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Contact</h3>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:support@herguardian.ai"
                  className="group flex items-center gap-3 text-gray-400 transition-colors hover:text-pink-400"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-pink-500/50 group-hover:bg-pink-500/10">
                    <Mail size={14} />
                  </div>
                  support@herguardian.ai
                </a>

                <a
                  href="tel:112"
                  className="group flex items-center gap-3 text-gray-400 transition-colors hover:text-pink-400"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-pink-500/50 group-hover:bg-pink-500/10">
                    <Phone size={14} />
                  </div>
                  Emergency: 112
                </a>

                <div className="flex items-center gap-3 text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <MapPin size={14} />
                  </div>
                  India 🇮🇳
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm md:flex-row">
            <p className="text-gray-500">
              © 2026 <span className="font-semibold text-white">HerGuardian</span>. Empowering safer journeys through AI.
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              Made with{" "}
              <Heart
                size={14}
                className="fill-pink-500 text-pink-500 animate-pulse"
              />{" "}
              in India 🇮🇳
            </p>
          </div>
        </div>
      </footer>

      <AboutUsModal
        isOpen={showAboutUs}
        onClose={() => setShowAboutUs(false)}
      />
    </>
  );
}