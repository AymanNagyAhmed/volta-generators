"use client";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from 'next/link';
import { loginUser } from "@/lib/services/auth.service";
import { LoginFormData } from "@/lib/types/auth.types";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user was redirected from registration
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setSuccessMessage("You are registered successfully! Please login.");
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Trim whitespace for email and password fields
    const trimmedValue = name === 'email' || name === 'password' ? value.trim() : value;
    
    setFormData({
      ...formData,
      [name]: trimmedValue
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Ensure email and password are trimmed before submission
    const trimmedFormData = {
      email: formData.email.trim(),
      password: formData.password.trim()
    };
    
    try {
      setIsLoading(true);
      const response = await loginUser(trimmedFormData);
      
      if (response.success) {
        // Login successful - cookies are set in the loginUser function
        // Check user role and redirect accordingly
        const userData = response.data.user;
        
        if (userData && userData.role === 'admin') {
          router.push("/dashboard");
        } else {
          // For non-admin users, redirect to a different page
          router.push("/");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h1>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter your email"
          />
          
          <Input
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter your password"
          />
          
          <Button
            type="submit"
            color="primary"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Sign In
          </Button>

          <div className="text-center mt-4">
            <NextLink href="/register" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
              Don't have an account? Register
            </NextLink>
          </div>
        </form>
      </div>
    </div>
  );
} 