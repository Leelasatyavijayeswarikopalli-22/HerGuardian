import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
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
    console.log(formData);
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
            name="emergencyContact"
            placeholder="Emergency Contact Number"
            value={formData.emergencyContact}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block font-medium">
              Secret Voice SOS Phrase
            </label>

            <Input
              name="secretPhrase"
              placeholder="Example: The blue notebook is on my desk"
              value={formData.secretPhrase}
              onChange={handleChange}
            />

            <p className="mt-2 text-sm text-slate-500">
              This phrase will trigger emergency alerts.
            </p>
          </div>

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