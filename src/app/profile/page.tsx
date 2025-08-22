"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function page() {
  const router = useRouter();
  const [Data, setData] = useState("nothing");
  const getUserDetails = async () => {
    const response = await axios.post("/api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
        <hr className="border-gray-700 mb-6" />

        {/* Data Section */}
        <div className="mb-6">
          <h2 className="text-lg text-gray-300">
            {Data === "nothing" ? (
              <span className="italic text-gray-500">No data to display</span>
            ) : (
              <Link
                href={`/profile/${Data}`}
                className="text-blue-400 hover:text-blue-500 font-medium transition"
              >
                {Data}
              </Link>
            )}
          </h2>
        </div>

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
      </div>
    </div>
  );
}
