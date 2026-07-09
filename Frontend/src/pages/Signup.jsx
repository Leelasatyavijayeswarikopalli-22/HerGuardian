import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {

  const navigate = useNavigate();

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

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const {
      fullName,
      email,
      password,
      confirmPassword,
      emergencyContact1,
      emergencyContact2,
      emergencyContact3,
      secretPhrase,
    } = formData;

    // ================= Required Fields =================

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !emergencyContact1.trim() ||
      !emergencyContact2.trim() ||
      !emergencyContact3.trim() ||
      !secretPhrase.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    // ================= Email Validation =================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // ================= Password Match =================

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // ================= Strong Password =================

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (!passwordRegex.test(password)) {

      alert(
        "Password must be at least 8 characters and contain uppercase, lowercase, number and special character."
      );

      return;
    }

    // ================= Phone Validation =================

    const phoneRegex = /^[6-9]\d{9}$/;

    if (
      !phoneRegex.test(emergencyContact1) ||
      !phoneRegex.test(emergencyContact2) ||
      !phoneRegex.test(emergencyContact3)
    ) {
      alert("Enter valid 10-digit mobile numbers.");
      return;
    }

    // ================= Different Contacts =================

    if (
      emergencyContact1 === emergencyContact2 ||
      emergencyContact1 === emergencyContact3 ||
      emergencyContact2 === emergencyContact3
    ) {

      alert("All emergency contacts must be different.");

      return;
    }

    // ================= Secret Phrase =================

    if (secretPhrase.trim().length < 4) {

      alert("Secret phrase must contain at least 4 characters.");

      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          fullName,
          email,
          password,
          emergencyContact1,
          emergencyContact2,
          emergencyContact3,
          voicePhrase: secretPhrase,
        }
      );

      if (
        response.data === "OTP Sent Successfully" ||
        response.data === "OTP Already Sent"
      ) {

        alert(response.data);

        navigate("/verify-otp", {
          state: { email },
        });

      } else if (
        response.data === "Email already registered"
      ) {

        alert("Email already registered. Please Login.");

        navigate("/login");

      } else {

        alert(response.data);

      }

    } catch (error) {

      console.log(error);

      if (error.response) {

        alert(error.response.data);

      } else {

        alert("Server Error");

      }

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

      <Card className="w-full max-w-lg">

        <h1 className="mb-6 text-center text-3xl font-bold text-pink-600">
          HerGuardian
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

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
            name="emergencyContact1"
            placeholder="Emergency Contact 1"
            value={formData.emergencyContact1}
            onChange={handleChange}
          />

          <Input
            name="emergencyContact2"
            placeholder="Emergency Contact 2"
            value={formData.emergencyContact2}
            onChange={handleChange}
          />

          <Input
            name="emergencyContact3"
            placeholder="Emergency Contact 3"
            value={formData.emergencyContact3}
            onChange={handleChange}
          />

          <Input
            name="secretPhrase"
            placeholder="Secret SOS Phrase"
            value={formData.secretPhrase}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className="w-full"
          >
            Create Account
          </Button>

        </form>

      </Card>

    </div>

  );

}