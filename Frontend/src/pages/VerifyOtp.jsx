import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function VerifyOtp() {

    const navigate = useNavigate();
    const location = useLocation();

    // Email received from Signup page
    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const handleVerify = async (e) => {

        e.preventDefault();

        if (!otp) {
            alert("Enter OTP");
            return;
        }

        try {

            const response = await axios.post(
                "https://herguardian-production-2950.up.railway.app/api/auth/verify",
                {
                    email: email,
                    otp: otp
                }
            );

            alert(response.data);

            navigate("/login");

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

                <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
                    Verify OTP
                </h1>

                <p className="text-center mb-4">
                    OTP sent to
                    <br />
                    <b>{email}</b>
                </p>

                <form
                    onSubmit={handleVerify}
                    className="space-y-4"
                >

                    <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Verify OTP
                    </Button>

                </form>

            </Card>

        </div>

    );

}