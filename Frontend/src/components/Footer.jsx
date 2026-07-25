import { Shield, Mail, Phone, MapPin, Heart, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    // Success!
    setError("");
    setSubscribed(true);
    setEmail("");

    // Reset after 4 seconds
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-500/20 backdrop-blur-xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Stay <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Protected</span>, Stay Informed
              </h3>
              <p className="text-gray-400">Get safety tips & product updates directly in your inbox.</p>
            </div>
            <div className="w-full md:w-auto">
  {subscribed ? (
    /* SUCCESS MESSAGE */
    <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/40 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
      <CheckCircle size={22} className="text-green-400" />
      <div>
        <p className="text-green-300 font-semibold text-sm">Successfully Subscribed! 🎉</p>
        <p className="text-green-400/70 text-xs">Welcome to the HerGuardian family</p>
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
          className={`flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none transition
            ${error 
              ? "border-red-500/60 focus:border-red-500" 
              : "border-white/10 focus:border-pink-500/60"
            }`}
        />
        <button
          onClick={handleSubscribe}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all duration-300"
        >
          <Send size={16} />
          <span className="hidden sm:inline">Subscribe</span>
        </button>
      </div>
      {/* Error message */}
      {error && (
        <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">HerGuardian</h2>
                <p className="text-[10px] text-pink-300 tracking-wider">Your Safety, Our Priority</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              AI-powered women safety platform providing safer mobility, community-driven reporting, and emergency assistance across India.
            </p>

            {/* Social Icons - EMOJI VERSION */}
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
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-base
                             hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:border-transparent
                             hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300"
                >
                  {social.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-4 font-bold text-white text-lg">Key Features</h3>
            <ul className="space-y-3 text-sm">
              {["Dynamic Safety Score", "Secret Voice SOS", "Community Network", "Real-Time Risk Prediction"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-pink-500 group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold text-white text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Safety Map", href: "/safety-map" },
                { label: "Community Reports", href: "/reports" },
                { label: "About Us", href: "/about" },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-pink-500 group-hover:w-3 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-bold text-white text-lg">Contact</h3>
            <div className="space-y-3 text-sm">
              <a href="mailto:support@herguardian.ai" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all">
                  <Mail size={14} />
                </div>
                support@herguardian.ai
              </a>
              <a href="tel:112" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all">
                  <Phone size={14} />
                </div>
                Emergency: 112
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                India 🇮🇳
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500">
            © 2026 <span className="text-white font-semibold">HerGuardian</span>. Empowering safer journeys through AI.
          </p>
          <p className="text-gray-500 flex items-center gap-2">
            Made with <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" /> in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}