import { useNavigate } from "react-router-dom";

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
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-center text-3xl font-bold text-purple-600">
          Welcome to HerGuardian
        </h1>

        <div className="space-y-4">

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-purple-600 p-4 text-white"
          >
            Login
          </button>

          <button
            onClick={handleSignup}
            className="w-full rounded-xl border border-purple-600 p-4 text-purple-600"
          >
            Sign Up
          </button>

          <button
  onClick={() => navigate("/")}
  className="rounded-lg border px-4 py-2"
>
  Back to Home
</button>

        </div>

      </div>
    </div>
  );
}