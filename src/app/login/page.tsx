"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function page() {
  type userType = {
    email: string;
    password: string;
  };

  const [User, setUser] = useState<userType>({
    email: "",
    password: "",
  });

  const [ButtonDisabled, setButtonDisabled] = useState(false);
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", User);
      console.log("Login Success", response.data);
      setUser({ email: "", password: "" });
      router.push("/profile");
    } catch (error: any) {
      console.log("Sign Up Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (User.email.length > 0 && User.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [User]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {Loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-6 border-gray-700" />

        {/* Email */}
        <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={User.email}
          onChange={(e) => setUser({ ...User, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="block text-gray-300 font-medium mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={User.password}
          onChange={(e) => setUser({ ...User, password: e.target.value })}
          placeholder="Enter your password"
          className="w-full px-4 py-2 mb-6 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />

        {/* Button */}
        <button
          onClick={onLogin}
          disabled={ButtonDisabled}
          className={`w-full py-3 rounded-lg font-semibold transition 
        ${
          ButtonDisabled
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl"
        }`}
        >
          {ButtonDisabled ? "Login Disabled" : "Log In"}
        </button>

        {/* Extra Links */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Doesn't have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-400 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
