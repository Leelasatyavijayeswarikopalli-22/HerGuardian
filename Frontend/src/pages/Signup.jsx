import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    emergencyContact: "",
    secretPhrase: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      password,
      confirmPassword,
      emergencyContact,
      secretPhrase,
    } = formData;

    // Check empty fields
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !emergencyContact ||
      !secretPhrase
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check existing user
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser) {
      alert("Account already exists. Please Login.");
      navigate("/login");
      return;
    }

    // Save user
    const user = {
      fullName,
      email,
      password,
      emergencyContact,
      secretPhrase,
    };

    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("isLoggedIn", "true");

    alert("Account created successfully!");

    navigate("/profile");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <Card className="w-full max-w-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-pink-600">
          HerGuardian
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Input
            name="emergencyContact"
            placeholder="Emergency Contact Number"
            value={formData.emergencyContact}
            onChange={handleChange}
          />

          <Input
            name="secretPhrase"
            placeholder="Secret SOS Phrase"
            value={formData.secretPhrase}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button
            className="text-pink-600 font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </Card>
    </div>
  );
}