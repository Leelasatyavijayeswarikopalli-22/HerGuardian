import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            alert("Please enter Email and Password");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    fullName: response.data.fullName,
                    email: email,
                    emergencyContact1: response.data.emergencyContact1,
                    emergencyContact2: response.data.emergencyContact2,
                    emergencyContact3: response.data.emergencyContact3,
                })
            );

            localStorage.setItem("isLoggedIn", "true");

            alert("Login Successful");

            navigate("/profile");

        } catch (error) {

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Server Error");
            }

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
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>

                </form>

                <p className="mt-4 text-center">

                    Don't have an account?

                    <button
                        className="ml-2 text-pink-600 font-semibold"
                        onClick={()=>navigate("/signup")}
                    >
                        Sign Up
                    </button>

                </p>

            </Card>

        </div>

    );

}