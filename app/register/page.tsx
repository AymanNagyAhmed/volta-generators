"use client";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle registration
    // For now, we'll just redirect to login
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Create Account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
          
          <Input
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full"
          />
          
          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full"
          />
          
          <Button
            type="submit"
            color="primary"
            className="w-full mt-6"
          >
            Register
          </Button>

          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
            <Link href="/login" className="hover:underline">
            Already have an account?{" "}
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 