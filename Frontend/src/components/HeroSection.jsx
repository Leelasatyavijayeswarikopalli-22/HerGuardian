import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Shield, Mic, MapPinned, Users, Siren, ShieldCheck, UsersRound,
  X, Sparkles, Heart, Lock, Zap, Award,
  MessageCircle, Phone, Mail, HelpCircle, LifeBuoy, Clock, ChevronDown
} from "lucide-react";

export default function Hero() {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
            <section
      className="relative min-h-screen flex flex-col overflow-hidden justify-between pt-28 lg:pt-20 pb-20"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(30, 5, 50, 0.88) 0%, rgba(80, 10, 60, 0.75) 40%, rgba(10, 2, 25, 0.95) 100%),
          url('https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Purple/Pink Neon Glow Overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-600/25 rounded-full blur-[150px]"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-4 pb-2">
        {/* LEFT SIDE */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-sm text-sm text-pink-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
            AI-Powered Women Safety Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mt-5 leading-[1.1] tracking-tight">
            <span className="text-white">Your Safety,</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Our Priority
            </span>
          </h1>

          <div className="mt-5 pl-4 border-l-2 border-pink-500/60">
            <p className="text-gray-200 text-base leading-relaxed">
              HerGuardian is your smart companion for a safer life. Report, track, and stay protected anywhere.
            </p>
          </div>

          <div className="flex gap-4 mt-6 justify-center lg:justify-start">
            <Link
              to="/dashboard"
              className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold
                         transition-all duration-300 ease-out flex items-center gap-2
                         hover:scale-105 hover:shadow-[0_0_35px_rgba(236,72,153,0.7)]
                         hover:from-pink-400 hover:to-purple-500"
            >
              Explore Dashboard
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

            <button
              onClick={() => setShowLearnMore(true)}
              className="group px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold
                         transition-all duration-300 ease-out flex items-center gap-2
                         hover:scale-105 hover:border-pink-500/60 hover:bg-white/10
                         hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
            >
              Learn More
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
                        {/* RIGHT SIDE */}
        <div className="flex-1 relative flex flex-col items-center justify-center my-6 lg:my-0 min-h-[350px] lg:min-h-[500px] w-full">
          <div className="absolute w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-pink-500/40 blur-[130px] rounded-full"></div>

          <div className="hidden lg:block absolute w-[500px] h-[500px] border border-pink-500/30 rounded-full animate-[spin_30s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.9)]"></div>
          </div>
          <div className="hidden lg:block absolute w-[400px] h-[400px] border border-purple-500/30 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
          <div className="hidden lg:block absolute w-[300px] h-[300px] border border-pink-500/40 rounded-full"></div>

          <div className="hidden lg:block absolute w-[200px] h-[200px] rounded-full border-4 border-pink-500 shadow-[0_0_60px_rgba(236,72,153,0.9),inset_0_0_40px_rgba(236,72,153,0.4)] animate-pulse"></div>

          <div className="relative z-10 flex items-center justify-center w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-white overflow-hidden shadow-[0_0_28px_rgba(236,72,153,0.45)] mx-auto">
  <img src="/icon.png" alt="HerGuardian Logo" className="w-full h-full object-contain p-1" />
</div>

          {/* ✅ 1. Wrap your existing FloatCards in hidden lg:block so they only show on desktop */}
          <div className="hidden lg:block">
            <FloatCard className="absolute top-0 left-1/2 -translate-x-1/2" Icon={MapPinned} iconColor="text-blue-400" title="Safety Map" />
            <FloatCard className="absolute top-1/2 left-[8%] -translate-y-1/2" Icon={Shield} iconColor="text-green-400" title="Dynamic Safety Score"/>
            <FloatCard className="absolute top-1/2 right-[8%] -translate-y-1/2" Icon={Mic} iconColor="text-red-400" title="Secret Voice SOS" />
            <FloatCard className="absolute bottom-0 left-1/2 -translate-x-1/2" Icon={Users} iconColor="text-pink-400" title="Community Report" />
          </div>

          {/* ✅ 2. Add this clean mobile grid right below it so mobile devices never overlap */}
          <div className="grid grid-cols-2 gap-3 mt-8 lg:hidden w-full max-w-xs z-10">
            <MobileFloatCard Icon={MapPinned} iconColor="text-blue-400" title="Safety Map" />
            <MobileFloatCard Icon={Shield} iconColor="text-green-400" title="Safety Score" />
            <MobileFloatCard Icon={Mic} iconColor="text-red-400" title="Voice SOS" />
            <MobileFloatCard Icon={Users} iconColor="text-pink-400" title="Community" />
          </div>

        </div>
        </div>
      
             {/* BOTTOM STATS & HELP CONTAINER */}
      {/* BOTTOM STATS & HELP CONTAINER */}
<div className="relative z-10 w-full px-6 lg:px-12 mt-6 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6">
        
        {/* Stats Box */}
        <div className="max-w-2xl rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-5 shadow-2xl w-full lg:w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center sm:place-items-start">
            <StatItem Icon={ShieldCheck} value="12K+" label="Women Protected" color="text-pink-400" />
            <StatItem Icon={Siren} value="8.5K+" label="Incidents Reported" color="text-orange-400" />
            <StatItem Icon={UsersRound} value="25K+" label="Trusted Users" color="text-purple-400" />
          </div>
        </div>

        {/* "Need Help?" Widget */}
                {/* "Need Help?" Widget */}
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-3 bg-black/85 backdrop-blur-xl border border-pink-500/50 rounded-full pl-3 pr-5 py-3 shadow-[0_0_35px_rgba(236,72,153,0.5)] cursor-pointer hover:scale-105 hover:border-pink-500 hover:shadow-[0_0_45px_rgba(236,72,153,0.8)] transition-all duration-300 w-full sm:w-auto justify-center lg:justify-start lg:ml-auto"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-sm leading-tight">Need Help?</p>
            <p className="text-pink-300 text-xs">We're here for you</p>
          </div>
        </button>

      </div>
      {/* ===== LEARN MORE MODAL ===== */}
      {showLearnMore && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowLearnMore(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

          <div 
            className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-3xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 
                            backdrop-blur-2xl border border-pink-500/30 rounded-3xl
                            shadow-[0_0_80px_rgba(236,72,153,0.4)] overflow-hidden">
              
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/70 rounded-tl-lg z-20 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-400/70 rounded-bl-lg z-20 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/70 rounded-br-lg z-20 pointer-events-none"></div>

              <button
                onClick={() => setShowLearnMore(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md
                           border-2 border-pink-500/60 flex items-center justify-center
                           hover:bg-pink-500 hover:border-pink-400 hover:scale-110 hover:rotate-90
                           transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.6)]"
              >
                <X size={18} className="text-white" strokeWidth={3} />
              </button>

              <div className="overflow-y-auto max-h-[90vh] p-8 md:p-10 custom-scrollbar">
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-pink-500/50 blur-xl rounded-full"></div>
                    <div className="relative w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-[0_0_30px_rgba(236,72,153,0.6)]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img src="/icon.png" alt="HerGuardian" className="w-full h-full object-contain p-1" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-semibold tracking-widest uppercase mb-1">
                      <Sparkles size={10} className="text-pink-400" />
                      About HerGuardian
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black">
                      <span className="text-white">Empowering Women, </span>
                      <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        One Step at a Time
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-500/50"></div>
                  <Sparkles size={12} className="text-pink-400" />
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-500/50"></div>
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  <span className="text-pink-400 font-bold">HerGuardian</span> is an <span className="text-white font-semibold">AI-powered women safety platform</span> designed to keep you protected wherever you go. From real-time route analysis to community-verified safety alerts, we bring cutting-edge technology together with a caring community to ensure your peace of mind — 24/7.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <FeatureBox Icon={Shield} color="text-green-400" bg="from-green-500/10 to-emerald-500/10" border="border-green-500/30" title="Dynamic Safety Score" desc="Our AI analyzes crime data, lighting, foot-traffic, and time-of-day to score every route in real-time." />
                  <FeatureBox Icon={Mic} color="text-red-400" bg="from-red-500/10 to-pink-500/10" border="border-red-500/30" title="Secret Voice SOS" desc="Discreetly trigger emergency alerts by whispering your personal secret phrase — no phone unlock needed." />
                  <FeatureBox Icon={MapPinned} color="text-blue-400" bg="from-blue-500/10 to-cyan-500/10" border="border-blue-500/30" title="Smart Safety Map" desc="Interactive map with color-coded zones showing safe areas, risk zones, and community reports live." />
                  <FeatureBox Icon={Users} color="text-pink-400" bg="from-pink-500/10 to-fuchsia-500/10" border="border-pink-500/30" title="Community Reports" desc="Verified users share real-time incident reports, helping others stay informed and safe." />
                </div>

                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Award size={20} className="text-yellow-400" />
                    Why Choose HerGuardian?
                  </h3>
                  <div className="space-y-3">
                    <BulletPoint Icon={Zap} text="Real-time AI analysis with 98% accuracy rate" />
                    <BulletPoint Icon={Lock} text="End-to-end encrypted — your data stays yours" />
                    <BulletPoint Icon={Heart} text="Built with love by a team that cares about women's safety" />
                    <BulletPoint Icon={Users} text="Trusted by 25,000+ women across India" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatBox value="12K+" label="Women Protected" color="text-pink-400" />
                  <StatBox value="8.5K+" label="Incidents Reported" color="text-orange-400" />
                  <StatBox value="98%" label="Safety Score" color="text-green-400" />
                </div>

                <div className="text-center bg-black/40 rounded-2xl p-6 border border-pink-500/20 mb-6">
                  <Heart size={28} className="mx-auto mb-2 text-pink-400 fill-pink-400" />
                  <p className="text-gray-300 text-sm italic">
                    "Every woman deserves to feel safe, empowered, and free — everywhere she goes.
                    <span className="block mt-2 text-pink-400 font-semibold">That's our mission at HerGuardian.</span>"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signup"
                    onClick={() => setShowLearnMore(false)}
                    className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-xl 
                               bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold
                               hover:from-pink-400 hover:to-purple-500 hover:scale-[1.02]
                               shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]
                               transition-all duration-300"
                  >
                    Get Started Free
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <button
                    onClick={() => setShowLearnMore(false)}
                    className="flex-1 py-3 rounded-xl border border-pink-500/40 bg-white/5 text-white font-bold
                               hover:bg-pink-500/10 hover:border-pink-500/80 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== NEED HELP MODAL ===== */}
      {showHelp && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowHelp(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

          <div 
            className="relative z-10 w-full max-w-2xl max-h-[90vh] rounded-3xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
            
            <div className="relative bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 
                            backdrop-blur-2xl border border-pink-500/30 rounded-3xl
                            shadow-[0_0_80px_rgba(236,72,153,0.4)] overflow-hidden">
              
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/70 rounded-tl-lg z-20 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-400/70 rounded-bl-lg z-20 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/70 rounded-br-lg z-20 pointer-events-none"></div>

              <button
                onClick={() => setShowHelp(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md
                           border-2 border-pink-500/60 flex items-center justify-center
                           hover:bg-pink-500 hover:border-pink-400 hover:scale-110 hover:rotate-90
                           transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.6)]"
              >
                <X size={18} className="text-white" strokeWidth={3} />
              </button>

              <div className="overflow-y-auto max-h-[90vh] p-8 md:p-10 custom-scrollbar">
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-pink-500/50 blur-xl rounded-full"></div>
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 
                                    flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.6)]">
                      <LifeBuoy size={28} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-semibold tracking-widest uppercase mb-1">
                      <Clock size={10} className="text-pink-400" />
                      24/7 Support
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black">
                      <span className="text-white">How can we </span>
                      <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        help you?
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-500/50"></div>
                  <Sparkles size={12} className="text-pink-400" />
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-500/50"></div>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/40 rounded-2xl p-4 mb-6 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.6)]">
                      <Siren size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-red-300 text-[10px] font-bold tracking-widest uppercase">In Immediate Danger?</p>
                      <p className="text-white font-bold text-lg">Call Emergency Helpline</p>
                    </div>
                    <a href="tel:112" className="px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-400 text-white font-black text-lg shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:scale-105 transition-all">
                      112
                    </a>
                  </div>
                </div>

                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <MessageCircle size={16} className="text-pink-400" />
                  Contact Us
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <ContactCard Icon={Phone} title="Call Us" value="+91 98765 43210" href="tel:+919876543210" />
                  <ContactCard Icon={Mail} title="Email" value="support@herguardian.ai" href="mailto:support@herguardian.ai" />
                  <ContactCard Icon={MessageCircle} title="Live Chat" value="Available 24/7" href="#" />
                </div>

                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <Siren size={16} className="text-pink-400" />
                  Emergency Helplines (India)
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <HelplineCard number="112" label="National Emergency" />
                  <HelplineCard number="1091" label="Women Helpline" />
                  <HelplineCard number="100" label="Police" />
                  <HelplineCard number="181" label="Women in Distress" />
                </div>

                <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                  <HelpCircle size={16} className="text-pink-400" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-2 mb-6">
                  <FAQItem 
                    q="How does the Secret Voice SOS work?"
                    a="Just set your unique secret phrase in Settings. When you speak it — even softly — HerGuardian instantly triggers an SOS alert to your emergency contacts with your live location, no phone unlock needed."
                  />
                  <FAQItem 
                    q="Is my personal data secure?"
                    a="Absolutely! We use bank-grade 256-bit encryption. Your location, contacts, and voice data are stored securely and never shared with third parties."
                  />
                  <FAQItem 
                    q="How accurate is the Safety Map?"
                    a="Our AI analyzes real-time data from police reports, community submissions, lighting conditions, and foot traffic to give you 98% accurate safety scores for every route."
                  />
                  <FAQItem 
                    q="Can I use HerGuardian without internet?"
                    a="Basic SOS functions work offline via SMS. However, the Safety Map and real-time features need an internet connection to work best."
                  />
                  <FAQItem 
                    q="How do I add emergency contacts?"
                    a="Go to Profile → Emergency Contacts. You can add up to 3 trusted contacts who will be notified during any emergency alert."
                  />
                </div>

                <div className="text-center bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-2xl p-5">
                  <Heart size={24} className="mx-auto mb-2 text-pink-400 fill-pink-400 animate-pulse" />
                  <p className="text-white font-bold text-sm mb-1">You're not alone</p>
                  <p className="text-gray-400 text-xs">Our support team is available 24/7 to help you stay safe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #ec4899, #a855f7); border-radius: 10px; }
      `}</style>
    </section>
  );
}

/* Floating Feature Card */
function FloatCard({ className, Icon, iconColor, title, desc }) {
  return (
    <div className={`${className} group cursor-pointer w-40`}>
      <div className="w-20 h-20 mx-auto rounded-full bg-white/5 backdrop-blur-xl border border-pink-500/30
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      group-hover:scale-110 group-hover:border-pink-500/80
                      group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-purple-600/20
                      group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]">
        <Icon className={`${iconColor} transition-all duration-300 group-hover:scale-110`} size={28} />
      </div>
      <div
  className="mt-3 rounded-lg
             bg-black/45 backdrop-blur-md
             border border-violet-500/25
             px-3 py-2 text-center
             transition-all duration-300
             group-hover:border-fuchsia-400/60
             group-hover:shadow-[0_0_18px_rgba(168,85,247,0.35)]"
>
        <p className="text-white text-sm font-semibold leading-tight">{title}</p>
        <p className="text-gray-400 text-[11px] mt-1 leading-tight">{desc}</p>
      </div>
    </div>
  );
}

/* Stat Item */
function StatItem({ Icon, value, label, color }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-white text-xl font-bold leading-tight">{value}</p>
        <p className="text-gray-400 text-xs">{label}</p>
      </div>
    </div>
  );
}

/* Feature Box for modal */
function FeatureBox({ Icon, color, bg, border, title, desc }) {
  return (
    <div className={`bg-gradient-to-br ${bg} border ${border} rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300`}>
      <div className={`w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center mb-2 ${color}`}>
        <Icon size={20} />
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

/* Bullet point for modal */
function BulletPoint({ Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-pink-400" />
      </div>
      <p className="text-gray-300 text-sm">{text}</p>
    </div>
  );
}

/* Stat box for modal */
function StatBox({ value, label, color }) {
  return (
    <div className="text-center bg-black/40 border border-white/10 rounded-xl p-3">
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

/* Contact Card */
function ContactCard({ Icon, title, value, href }) {
  return (
    <a 
      href={href}
      className="group bg-black/40 border border-pink-500/30 rounded-xl p-4 hover:border-pink-500/70 hover:bg-pink-500/10 hover:scale-[1.03] transition-all duration-300"
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        <Icon size={16} className="text-white" />
      </div>
      <p className="text-gray-400 text-[10px] uppercase tracking-wider">{title}</p>
      <p className="text-white text-xs font-bold mt-1 truncate">{value}</p>
    </a>
  );
}
/* Mobile Responsive Feature Card */
function MobileFloatCard({ Icon, iconColor, title }) {
  return (
    <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-pink-500/30 rounded-xl p-2.5 shadow-md">
      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ${iconColor}`}>
        <Icon size={16} />
      </div>
      <span className="text-white text-xs font-semibold leading-tight">{title}</span>
    </div>
  );
}
/* Helpline Card */
function HelplineCard({ number, label }) {
  return (
    <a
      href={`tel:${number}`}
      className="group flex items-center justify-between bg-black/40 border border-red-500/30 rounded-lg px-4 py-2.5 hover:border-red-500/70 hover:bg-red-500/10 transition-all"
    >
      <div>
        <p className="text-red-300 text-[10px] uppercase tracking-wider">{label}</p>
        <p className="text-white font-black text-lg">{number}</p>
      </div>
      <Phone size={16} className="text-red-400 group-hover:scale-125 group-hover:rotate-12 transition-transform" />
    </a>
  );
}

/* FAQ Item (expandable) */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-black/40 border border-pink-500/20 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="text-white font-semibold text-sm">{q}</span>
        <ChevronDown size={18} className={`text-pink-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-400 text-xs leading-relaxed border-t border-pink-500/10 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}