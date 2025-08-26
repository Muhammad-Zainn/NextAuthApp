"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  email: string;
  username: string;
};

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // ✅ Get user details
  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");
      console.log(response.data);

      const { _id, email, username } = response.data.data;
      setUser({ _id, email, username }); // store full user object
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

  // ✅ Logout user
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-4">Profile Page</h1>
        <hr className="border-gray-700 mb-6" />

        {/* User Info */}
        {user ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-inner border border-gray-700 mb-6 text-left space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-400">Username</h2>
              <p className="text-gray-200">{user.username}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-400">Email</h2>
              <p className="text-gray-200">{user.email}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-400">User ID</h2>
              <p className="text-gray-200 break-words">{user._id}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic mb-6">
            No user details loaded yet.
          </p>
        )}

        {/* Get User Details Button */}
        <button
          onClick={getUserDetails}
          className="w-full py-2 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-white font-medium transition"
        >
          Get User Details
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-lg text-white font-medium transition"
        >
          Log Out
        </button>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-200 text-sm transition"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
