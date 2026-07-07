import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check empty fields
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please Sign Up first.");
      navigate("/signup");
      return;
    }

    if (
      savedUser.email === email.trim() &&
      savedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful!");

      navigate("/profile");
    } else {
      alert("Invalid Email or Password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-pink-600">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            className="text-pink-600 font-semibold"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </Card>
    </div>
  );
}