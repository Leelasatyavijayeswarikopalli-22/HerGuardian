import { useNavigate } from "react-router-dom";
import { Shield, LogIn, UserPlus, ArrowLeft, Lock, Star } from "lucide-react";

export default function AuthChoice() {
  const navigate = useNavigate();

  const handleSignup = () => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      alert("Account already exists. Please Login.");
      navigate("/login");
      return;
    }
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-[#05010f]">
      
      {/* ===== BACKGROUND ORBS ===== */}
      <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-pink-500/25 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-purple-600/25 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Cyber grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 2 === 0 ? '#ec4899' : '#a855f7',
              animation: `luxFloat ${6 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: `0 0 10px currentColor`,
              color: i % 2 === 0 ? '#ec4899' : '#a855f7',
            }}
          ></div>
        ))}
      </div>

      {/* ===== BACK TO HOME ===== */}
      <button
        onClick={() => navigate("/")}
        className="group absolute top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full 
                   bg-black/50 backdrop-blur-xl border border-pink-500/40 text-white text-sm font-medium
                   hover:border-pink-500/80 hover:bg-pink-500/10 hover:scale-105
                   shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]
                   transition-all duration-300"
      >
        <ArrowLeft size={16} className="text-pink-400 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </button>

      {/* ===== SQUARE CARD ===== */}
      <div className="relative z-10">
        
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
        
        {/* SQUARE CARD - 480x480 */}
        <div className="relative w-[480px] h-[480px] rounded-3xl overflow-hidden
                        bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 
                        backdrop-blur-2xl border border-pink-500/30
                        shadow-[0_0_80px_rgba(236,72,153,0.4)]">
          
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/70 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-pink-400/70 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-400/70 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/70 rounded-br-lg"></div>

          {/* ===== CONTENT ===== */}
          <div className="relative h-full flex flex-col items-center justify-center px-8">
            
            {/* Shield Logo - CLEAN, no orbits */}
            {/* Logo - Circle with icon.png */}
<div className="relative mb-6">
  {/* Pink glow behind */}
  <div className="absolute inset-0 bg-pink-500/50 blur-2xl rounded-full"></div>
  
  {/* Gradient ring border */}
  <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600
                  shadow-[0_0_40px_rgba(236,72,153,0.7)]">
    {/* Inner white circle with logo */}
    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
      <img 
        src="/icon.png" 
        alt="HerGuardian Logo" 
        className="w-full h-full object-contain p-1"
      />
    </div>
  </div>
</div>

            {/* Heading */}
            <h1 className="text-3xl font-black tracking-tight text-center mb-2">
              <span className="text-white">Welcome to </span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                HerGuardian
              </span>
            </h1>
            <p className="text-gray-400 text-sm mb-8">Choose how you'd like to continue</p>

            {/* ===== BUTTONS ===== */}
            <div className="w-full space-y-3">
              
              {/* LOGIN */}
              <button
                onClick={handleLogin}
                className="group relative w-full overflow-hidden rounded-xl
                           shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]
                           hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative flex items-center justify-center gap-3 w-full py-3.5 rounded-xl 
                                bg-gradient-to-r from-pink-500 to-purple-600 
                                group-hover:from-pink-400 group-hover:to-purple-500
                                transition-all duration-300">
                  <LogIn size={18} className="text-white" />
                  <span className="text-white font-bold text-base">Login</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>

              {/* SIGN UP */}
              <button
                onClick={handleSignup}
                className="group relative w-full flex items-center justify-center gap-3 py-3.5 rounded-xl
                           bg-white/5 backdrop-blur-xl border-2 border-pink-500/50 font-bold text-base
                           hover:bg-pink-500/10 hover:border-pink-500/90 hover:scale-[1.02]
                           hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]
                           transition-all duration-300"
              >
                <UserPlus size={18} className="text-pink-400" />
                <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">Sign Up</span>
                <span className="text-pink-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Footer stats */}
            <div className="mt-6 flex items-center gap-3 text-[10px] text-gray-500 font-mono tracking-wider">
              <div className="flex items-center gap-1">
                <Lock size={9} className="text-green-400" />
                <span>256-BIT SSL</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="flex items-center gap-1">
                <Shield size={9} className="text-pink-400" />
                <span>25K+ USERS</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600"></div>
              <div className="flex items-center gap-1">
                <Star size={9} className="text-yellow-400 fill-yellow-400" />
                <span>4.9 RATING</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes luxFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-120px) translateX(30px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}