import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  User, Mail, Phone, Shield, CheckCircle, X, Eye, EyeOff,
  Lock, Mic, Edit3, KeyRound, Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Modal state
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'password' | 'phrase' | null
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form fields
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    emergencyContact1: "",
    emergencyContact2: "",
    emergencyContact3: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    newVoicePhrase: "",
    confirmVoicePhrase: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPhrase, setShowPhrase] = useState(false);

  // ---------------- LIFECYCLE ----------------

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, [navigate]);

  // ---------------- HELPERS ----------------

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const closeModal = () => {
    setActiveModal(null);
    setOtpSent(false);
    setOtp("");
    setMessage({ type: "", text: "" });
    setFormData({
      fullName: "",
      emergencyContact1: "",
      emergencyContact2: "",
      emergencyContact3: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      newVoicePhrase: "",
      confirmVoicePhrase: "",
    });
    setShowPassword(false);
    setShowPhrase(false);
  };

  const openModal = (type) => {
    setActiveModal(type);
    // Pre-fill for profile edit
    if (type === "profile") {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        emergencyContact1: user.emergencyContact1 || "",
        emergencyContact2: user.emergencyContact2 || "",
        emergencyContact3: user.emergencyContact3 || "",
      }));
    }
  };

  const handleFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- SEND OTP ----------------

  const handleSendOtp = async () => {
    setSendingOtp(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await api.post("/user/request-otp");
      setOtpSent(true);
      setMessage({ type: "success", text: res.data || "OTP sent to your email" });
    } catch (err) {
      const text = err.response?.data || "Failed to send OTP";
      setMessage({ type: "error", text: typeof text === "string" ? text : "Failed to send OTP" });
    } finally {
      setSendingOtp(false);
    }
  };

  // ---------------- SUBMIT HANDLERS ----------------

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setMessage({ type: "error", text: "Please enter the OTP" });
      return;
    }
    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await api.put("/user/update-profile", {
        otp: otp.trim(),
        fullName: formData.fullName,
        emergencyContact1: formData.emergencyContact1,
        emergencyContact2: formData.emergencyContact2,
        emergencyContact3: formData.emergencyContact3,
      });

      // update localStorage
      const updated = {
        ...user,
        fullName: formData.fullName,
        emergencyContact1: formData.emergencyContact1,
        emergencyContact2: formData.emergencyContact2,
        emergencyContact3: formData.emergencyContact3,
      };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);

      setMessage({ type: "success", text: res.data || "Profile updated" });
      setTimeout(() => closeModal(), 1500);
    } catch (err) {
      const text = err.response?.data || "Update failed";
      setMessage({ type: "error", text: typeof text === "string" ? text : "Update failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return setMessage({ type: "error", text: "Please enter the OTP" });
    if (formData.newPassword !== formData.confirmNewPassword) {
      return setMessage({ type: "error", text: "New passwords do not match" });
    }
    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await api.put("/user/change-password", {
        otp: otp.trim(),
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setMessage({ type: "success", text: res.data || "Password changed" });
      setTimeout(() => closeModal(), 1500);
    } catch (err) {
      const text = err.response?.data || "Change failed";
      setMessage({ type: "error", text: typeof text === "string" ? text : "Change failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePhrase = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return setMessage({ type: "error", text: "Please enter the OTP" });
    if (formData.newVoicePhrase !== formData.confirmVoicePhrase) {
      return setMessage({ type: "error", text: "Phrases do not match" });
    }
    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await api.put("/user/change-voice-phrase", {
        otp: otp.trim(),
        currentPassword: formData.currentPassword,
        newVoicePhrase: formData.newVoicePhrase,
      });
      setMessage({ type: "success", text: res.data || "Voice phrase changed" });
      setTimeout(() => closeModal(), 1500);
    } catch (err) {
      const text = err.response?.data || "Change failed";
      setMessage({ type: "error", text: typeof text === "string" ? text : "Change failed" });
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------- RENDER ----------------

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Card className="p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-pink-600">No Profile Found</h2>
          <p className="text-slate-500">Please sign up or log in first.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">

        {/* Profile Header */}
        <Card className="mb-6 p-8">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-pink-100">
              <User size={50} className="text-pink-600" />
            </div>
            <h1 className="text-3xl font-bold text-pink-600">{user.fullName || "User"}</h1>
            <p className="mt-2 text-slate-500">HerGuardian Member</p>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
              <CheckCircle size={18} />
              Verified Account
            </div>
          </div>
        </Card>

        {/* Profile Details */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <Mail className="text-pink-600" />
              <h3 className="font-semibold text-slate-700">Email Address</h3>
            </div>
            <p className="text-lg text-slate-800">{user.email}</p>
          </Card>

          <Card className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <Phone className="text-pink-600" />
              <h3 className="font-semibold text-slate-700">Emergency Contact</h3>
            </div>
            <p className="text-lg text-slate-800">Hidden for Security</p>
          </Card>

          <Card className="p-6 md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <Shield className="text-pink-600" />
              <h3 className="font-semibold text-slate-700">SOS Phrase Status</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-green-900 px-4 py-2 text-sm font-medium text-white">
                Active & Protected
              </span>
              <span className="rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300">
                Hidden for Security
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Your emergency voice trigger phrase is securely stored and never displayed on screen.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-3 font-semibold text-slate-700">Safety Score</h3>
            <div className="text-4xl font-bold text-green-600">95</div>
            <p className="mt-2 text-sm text-slate-500">Excellent account security.</p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-3 font-semibold text-slate-700">Account Status</h3>
            <div className="text-lg font-semibold text-green-600">Protected</div>
            <p className="mt-2 text-sm text-slate-500">SOS and emergency features are active.</p>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mt-6 p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-700">Account Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => openModal("profile")}
              className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 transition"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>

            <button
              onClick={() => openModal("password")}
              className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-800 transition"
            >
              <KeyRound size={18} />
              Change Password
            </button>

            <button
              onClick={() => openModal("phrase")}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition"
            >
              <Mic size={18} />
              Change Secret Voice Phrase
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </Card>
      </div>

      {/* ============================================================ */}
      {/* MODAL WRAPPER                                                 */}
      {/* ============================================================ */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  {activeModal === "profile" && <Edit3 size={20} className="text-pink-600" />}
                  {activeModal === "password" && <Lock size={20} className="text-pink-600" />}
                  {activeModal === "phrase" && <Mic size={20} className="text-pink-600" />}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {activeModal === "profile" && "Edit Profile"}
                    {activeModal === "password" && "Change Password"}
                    {activeModal === "phrase" && "Change Secret Voice Phrase"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Verify with OTP sent to <span className="font-semibold">{user.email}</span>
                  </p>
                </div>
              </div>
              <button onClick={closeModal} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">

              {/* Step 1: Send OTP */}
              {!otpSent ? (
                <div className="text-center">
                  <div className="mb-4 rounded-lg bg-pink-50 p-4 text-sm text-pink-700">
                    🔒 For your security, we'll send a 6-digit OTP to your registered email before proceeding.
                  </div>
                  {message.text && (
                    <div className={`mb-4 rounded-lg px-4 py-2 text-sm ${
                      message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    }`}>
                      {message.text}
                    </div>
                  )}
                  <button
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 py-3 font-medium text-white hover:bg-pink-700 disabled:opacity-60 transition"
                  >
                    {sendingOtp ? (<><Loader2 size={18} className="animate-spin" /> Sending OTP...</>) : "Send OTP"}
                  </button>
                </div>
              ) : (
                <>
                  {/* Step 2: Show form */}

                  {message.text && (
                    <div className={`mb-4 rounded-lg px-4 py-2 text-sm ${
                      message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    }`}>
                      {message.text}
                    </div>
                  )}

                  {/* OTP field (common) */}
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Enter OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="6-digit OTP"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 tracking-widest text-center text-lg font-semibold text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={sendingOtp}
                      className="mt-1 text-xs text-pink-600 hover:underline"
                    >
                      {sendingOtp ? "Resending..." : "Resend OTP"}
                    </button>
                  </div>

                  {/* ---------- EDIT PROFILE FORM ---------- */}
                  {activeModal === "profile" && (
                    <form onSubmit={handleUpdateProfile} className="space-y-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                        <input
                          type="text" name="fullName" value={formData.fullName} onChange={handleFieldChange}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Emergency Contact 1</label>
                        <input
                          type="text" name="emergencyContact1" value={formData.emergencyContact1} onChange={handleFieldChange} maxLength={10}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Emergency Contact 2</label>
                        <input
                          type="text" name="emergencyContact2" value={formData.emergencyContact2} onChange={handleFieldChange} maxLength={10}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Emergency Contact 3</label>
                        <input
                          type="text" name="emergencyContact3" value={formData.emergencyContact3} onChange={handleFieldChange} maxLength={10}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={closeModal} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-slate-600 hover:bg-slate-50">Cancel</button>
                        <button type="submit" disabled={submitting} className="flex-1 rounded-lg bg-pink-600 px-4 py-2.5 font-medium text-white hover:bg-pink-700 disabled:opacity-60 flex items-center justify-center gap-2">
                          {submitting ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : "Update Profile"}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* ---------- CHANGE PASSWORD FORM ---------- */}
                  {activeModal === "password" && (
                    <form onSubmit={handleChangePassword} className="space-y-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"} name="currentPassword" value={formData.currentPassword} onChange={handleFieldChange}
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pr-10 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
                        <input
                          type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleFieldChange}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        />
                        <p className="mt-1 text-xs text-slate-400">Min 8 chars: uppercase, lowercase, number, special char</p>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Confirm New Password</label>
                        <input
                          type={showPassword ? "text" : "password"} name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleFieldChange}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={closeModal} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-slate-600 hover:bg-slate-50">Cancel</button>
                        <button type="submit" disabled={submitting} className="flex-1 rounded-lg bg-pink-600 px-4 py-2.5 font-medium text-white hover:bg-pink-700 disabled:opacity-60 flex items-center justify-center gap-2">
                          {submitting ? (<><Loader2 size={16} className="animate-spin" /> Updating...</>) : "Change Password"}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* ---------- CHANGE VOICE PHRASE FORM ---------- */}
                  {activeModal === "phrase" && (
                    <form onSubmit={handleChangePhrase} className="space-y-3">
                      <div className="rounded-lg bg-pink-50 p-3 text-xs text-pink-700">
                        🎙️ Choose a phrase you can say naturally in an emergency. Avoid common phrases like "help me".
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Your Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"} name="currentPassword" value={formData.currentPassword} onChange={handleFieldChange}
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pr-10 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">New Voice Phrase</label>
                        <div className="relative">
                          <input
                            type={showPhrase ? "text" : "password"} name="newVoicePhrase" value={formData.newVoicePhrase} onChange={handleFieldChange}
                            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pr-10 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                          />
                          <button type="button" onClick={() => setShowPhrase(!showPhrase)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            {showPhrase ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">Minimum 4 characters</p>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Confirm New Phrase</label>
                        <input
                          type={showPhrase ? "text" : "password"} name="confirmVoicePhrase" value={formData.confirmVoicePhrase} onChange={handleFieldChange}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={closeModal} className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-slate-600 hover:bg-slate-50">Cancel</button>
                        <button type="submit" disabled={submitting} className="flex-1 rounded-lg bg-pink-600 px-4 py-2.5 font-medium text-white hover:bg-pink-700 disabled:opacity-60 flex items-center justify-center gap-2">
                          {submitting ? (<><Loader2 size={16} className="animate-spin" /> Updating...</>) : "Update Phrase"}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}