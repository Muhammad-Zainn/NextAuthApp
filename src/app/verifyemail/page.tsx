"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// ✅ Component name must be PascalCase
export default function VerifyEmailPage() {
  const [Token, setToken] = useState("");
  const [Verified, setVerified] = useState(false);
  const [Error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token: Token });
      setVerified(true);
      setError(false);
    } catch (error: unknown) {
      // ✅ safer than `any`
      setError(true);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else if (error instanceof globalThis.Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (Token.length > 0) {
      verifyUserEmail();
    }
    // ✅ add dependency for ESLint warning fix
  }, [Token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-4">Verify Email</h1>
        <p className="text-gray-400 text-sm mb-6 break-all">
          {Token ? `Token: ${Token}` : "No Token found."}
        </p>

        {/* Success */}
        {Verified && (
          <div className="p-4 mb-4 rounded-lg bg-green-900/30 border border-green-700">
            <h2 className="text-green-400 text-lg font-semibold mb-2">
              ✅ You’re Verified!
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Your email has been successfully verified. You can now log in.
            </p>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition"
            >
              Login
            </Link>
          </div>
        )}

        {/* Error */}
        {Error && (
          <div className="p-4 mb-4 rounded-lg bg-red-900/30 border border-red-700">
            <h2 className="text-red-400 text-lg font-semibold mb-2">
              ❌ Verification Failed
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Something went wrong with the verification link.
            </p>
            <Link
              href="/login"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
