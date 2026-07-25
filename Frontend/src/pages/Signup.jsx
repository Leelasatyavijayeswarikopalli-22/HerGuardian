import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, User, Mail, Lock as LockIcon, Phone, Mic, Sparkles, UserPlus, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    emergencyContact1: "",
    emergencyContact2: "",
    emergencyContact3: "",
    secretPhrase: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullName, email, password, confirmPassword,
      emergencyContact1, emergencyContact2, emergencyContact3, secretPhrase,
    } = formData;

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword ||
        !emergencyContact1.trim() || !emergencyContact2.trim() ||
        !emergencyContact3.trim() || !secretPhrase.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { alert("Please enter a valid email address."); return; }

    if (password !== confirmPassword) { alert("Passwords do not match."); return; }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters and contain uppercase, lowercase, number and special character.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(emergencyContact1) || !phoneRegex.test(emergencyContact2) || !phoneRegex.test(emergencyContact3)) {
      alert("Enter valid 10-digit mobile numbers."); return;
    }

    if (emergencyContact1 === emergencyContact2 || emergencyContact1 === emergencyContact3 || emergencyContact2 === emergencyContact3) {
      alert("All emergency contacts must be different."); return;
    }

    if (secretPhrase.trim().length < 4) { alert("Secret phrase must contain at least 4 characters."); return; }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        fullName, email, password,
        emergencyContact1, emergencyContact2, emergencyContact3,
        voicePhrase: secretPhrase,
      });

      if (response.data === "OTP Sent Successfully" || response.data === "OTP Already Sent") {
        alert(response.data);
        navigate("/verify-otp", { state: { email } });
      } else if (response.data === "Email already registered") {
        alert("Email already registered. Please Login.");
        navigate("/login");
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response) alert(error.response.data);
      else alert("Server Error");
    }
  };

  // Reusable input component
  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative group">
      <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-pink-300 transition z-10" />
      <input
        {...props}
        onChange={handleChange}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 backdrop-blur-md
                   border border-pink-500/30 text-white placeholder-gray-500 text-sm
                   focus:border-pink-500/80 focus:bg-black/60 focus:outline-none
                   focus:shadow-[0_0_20px_rgba(236,72,153,0.3)]
                   transition-all duration-300"
      />
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-10 bg-[#05010f]">
      
      {/* Background */}
      <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-pink-500/25 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-purple-600/25 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>

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

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full"
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

      {/* Back to Home */}
      <Link
        to="/"
        className="group absolute top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full 
                   bg-black/50 backdrop-blur-xl border border-pink-500/40 text-white text-sm font-medium
                   hover:border-pink-500/80 hover:bg-pink-500/10 hover:scale-105
                   shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]
                   transition-all duration-300"
      >
        <ArrowLeft size={16} className="text-pink-400 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </Link>

      {/* MAIN CARD */}
      <div className="relative z-10">
        
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
        
        <div className="relative w-[520px] rounded-3xl overflow-hidden
                        bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 
                        backdrop-blur-2xl border border-pink-500/30
                        shadow-[0_0_80px_rgba(236,72,153,0.4)] p-8">
          
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/70 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-pink-400/70 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-400/70 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/70 rounded-br-lg"></div>

          {/* Logo */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/50 blur-2xl rounded-full"></div>
              <div className="relative w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600
                              shadow-[0_0_40px_rgba(236,72,153,0.7)]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img src="/icon.png" alt="HerGuardian" className="w-full h-full object-contain p-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-black tracking-tight text-center mb-1">
            <span className="text-white">Join </span>
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              HerGuardian
            </span>
          </h1>
          <p className="text-gray-400 text-xs text-center mb-4">Create your account and stay protected</p>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-500/50"></div>
            <Sparkles size={12} className="text-pink-400" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-500/50"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            
            <InputField icon={User} name="fullName" placeholder="Full Name" value={formData.fullName} />
            <InputField icon={Mail} name="email" type="email" placeholder="Email Address" value={formData.email} />
            
            {/* Password with toggle */}
            <div className="relative group">
              <LockIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 z-10" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/40 backdrop-blur-md
                           border border-pink-500/30 text-white placeholder-gray-500 text-sm
                           focus:border-pink-500/80 focus:bg-black/60 focus:outline-none
                           focus:shadow-[0_0_20px_rgba(236,72,153,0.3)]
                           transition-all duration-300"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 transition">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm password with toggle */}
            <div className="relative group">
              <LockIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 z-10" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/40 backdrop-blur-md
                           border border-pink-500/30 text-white placeholder-gray-500 text-sm
                           focus:border-pink-500/80 focus:bg-black/60 focus:outline-none
                           focus:shadow-[0_0_20px_rgba(236,72,153,0.3)]
                           transition-all duration-300"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 transition">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Emergency contacts label */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex-1 h-px bg-pink-500/20"></div>
              <span className="text-pink-300 text-[10px] font-bold tracking-widest uppercase">Emergency Contacts</span>
              <div className="flex-1 h-px bg-pink-500/20"></div>
            </div>

            <InputField icon={Phone} name="emergencyContact1" placeholder="Emergency Contact 1" value={formData.emergencyContact1} />
            <InputField icon={Phone} name="emergencyContact2" placeholder="Emergency Contact 2" value={formData.emergencyContact2} />
            <InputField icon={Phone} name="emergencyContact3" placeholder="Emergency Contact 3" value={formData.emergencyContact3} />

            <InputField icon={Mic} name="secretPhrase" placeholder="Secret SOS Phrase" value={formData.secretPhrase} />

            {/* Submit */}
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl mt-3
                         shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]
                         hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative flex items-center justify-center gap-3 w-full py-3.5 rounded-xl 
                              bg-gradient-to-r from-pink-500 to-purple-600 
                              group-hover:from-pink-400 group-hover:to-purple-500
                              transition-all duration-300">
                <UserPlus size={18} className="text-white" />
                <span className="text-white font-bold text-base">Create Account</span>
                <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </form>

          {/* Login link */}
          <p className="mt-5 text-center text-gray-400 text-sm">
            Already have an account?
            <button
              className="ml-2 text-pink-400 font-bold hover:text-pink-300 transition-colors"
              onClick={() => navigate("/login")}
            >
              Login →
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes luxFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-120px) translateX(30px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}