import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    savedUser.email === email &&
    savedUser.password === password
  ) {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/profile");
  } else {
    alert("Invalid credentials");
  }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <Card className="w-full max-w-md">

        <h1 className="mb-6 text-center text-3xl font-bold text-pink-600">
          Welcome Back
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>

        </form>

      </Card>

    </div>
  );
}