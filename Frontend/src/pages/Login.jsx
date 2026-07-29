import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { ArrowLeft, Mail, Lock as LockIcon, LogIn, Eye, EyeOff, Sparkles } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        alert("Please enter Email and Password");
        return;
    }

    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        const role = String(response.data.role || "").toUpperCase();

        if (!role) {
            alert("Role was not received from the server.");
            return;
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("id", response.data.id || "");
        localStorage.setItem("name", response.data.fullName || "");

        localStorage.setItem(
            "user",
            JSON.stringify({
                id: response.data.id,
                fullName: response.data.fullName,
                email: response.data.email,
                emergencyContact1: response.data.emergencyContact1,
                emergencyContact2: response.data.emergencyContact2,
                emergencyContact3: response.data.emergencyContact3,
                role,
            })
        );
         if (window.AndroidBridge && window.AndroidBridge.onUserLoggedIn) {
            window.AndroidBridge.onUserLoggedIn(
                response.data.token,
                response.data.email,
                response.data.fullName,
                response.data.emergencyContact1 || "",
                response.data.emergencyContact2 || "",
                response.data.emergencyContact3 || ""
            );
        }
        alert("Login Successful");

        if (role === "AUTHORITY") {
            navigate("/authority", { replace: true });
        } else if (role === "USER" || role === "NULL") {
            navigate("/dashboard", { replace: true });
        } else {
            alert("Invalid user role.");
            localStorage.clear();
        }

    } catch (error) {
        if (error.response) {
            if (error.response) {
    const data = error.response.data;

    const message =
        typeof data === "string"
            ? data
            : data.message || data.error || "Login failed";

    alert(message);
} else {
    alert("Server Error");
}
        } else {
            alert("Server Error");
        }
    }
};

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-[#05010f]">
            
            {/* Background orbs */}
            <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-pink-500/25 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-purple-600/25 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Grid */}
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
                
                {/* Outer glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                
                <div className="relative w-[460px] rounded-3xl overflow-hidden
                                bg-gradient-to-br from-[#1a0b2e]/98 via-[#0a041d]/98 to-[#1a0b2e]/98 
                                backdrop-blur-2xl border border-pink-500/30
                                shadow-[0_0_80px_rgba(236,72,153,0.4)] p-8">
                    
                    {/* Corner brackets */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/70 rounded-tl-lg"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-pink-400/70 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-400/70 rounded-bl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/70 rounded-br-lg"></div>

                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-pink-500/50 blur-2xl rounded-full"></div>
                            <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600
                                            shadow-[0_0_40px_rgba(236,72,153,0.7)]">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img src="/icon.png" alt="HerGuardian" className="w-full h-full object-contain p-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl font-black tracking-tight text-center mb-1">
                        <span className="text-white">Welcome </span>
                        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Back
                        </span>
                    </h1>
                    <p className="text-gray-400 text-sm text-center mb-6">Login to access your account</p>

                    {/* Divider */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-pink-500/50"></div>
                        <Sparkles size={12} className="text-pink-400" />
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-pink-500/50"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Email */}
                        <div className="relative group">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-pink-300 transition" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 backdrop-blur-md
                                           border border-pink-500/30 text-white placeholder-gray-500
                                           focus:border-pink-500/80 focus:bg-black/60 focus:outline-none
                                           focus:shadow-[0_0_20px_rgba(236,72,153,0.3)]
                                           transition-all duration-300"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <LockIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-pink-300 transition" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-black/40 backdrop-blur-md
                                           border border-pink-500/30 text-white placeholder-gray-500
                                           focus:border-pink-500/80 focus:bg-black/60 focus:outline-none
                                           focus:shadow-[0_0_20px_rgba(236,72,153,0.3)]
                                           transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl mt-2
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
                    </form>

                    {/* Signup link */}
                    <p className="mt-6 text-center text-gray-400 text-sm">
                        Don't have an account?
                        <button
                            className="ml-2 text-pink-400 font-bold hover:text-pink-300 transition-colors"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up →
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