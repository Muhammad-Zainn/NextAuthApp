import Link from "next/link";
import React from "react";

export default function Page({ params }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-4">Profile Page</h1>
        <hr className="border-gray-700 mb-6" />

        {/* User Info */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-inner border border-gray-700">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">User ID</h2>
          <p className="text-gray-300 break-words">{params.id}</p>
        </div>

        {/* Extra Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/profile"
            className="w-full py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-lg text-white font-medium transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
