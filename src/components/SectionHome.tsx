"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import axios from "axios";
const SectionHome = () => {
  type User = {
    _id: string;
    email: string;
    username: string;
  };
  const [user, setUser] = useState<User | null>(null);

  // ✅ Fetch user details on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("/api/users/me");
        setUser(response.data.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unexpected error occurred");
        }
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AuthProject
        </h1>
        <div className="flex gap-6 text-gray-300">
          <Link
            href="/"
            className="hover:text-blue-400 group transition flex gap-1 items-center"
          >
            <IoHomeOutline className="text-white group-hover:text-blue-400" />
            Home
          </Link>
          {user && (
            <Link href="/profile" className="hover:text-blue-400 transition">
              {user.username}
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 px-8 lg:px-20 py-20 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Secure Authentication <br /> with Next.js
          </h1>
          <p className="mt-6 text-gray-400 max-w-lg">
            A modern authentication system built using Next.js, TailwindCSS and
            robust security practices. Sign up, log in, and manage your profile
            with ease.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              href="/login"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-medium shadow-lg shadow-blue-900/40 transition"
            >
              Get Started
            </Link>
            <Link
              href="/profile"
              className="px-8 py-3 border border-gray-700 hover:bg-gray-800 rounded-xl font-medium transition"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center">
          <Image
            src="/hero-auth.png" // 👉 put any nice illustration in /public
            alt="Authentication Illustration"
            width={500}
            height={400}
            className="rounded-2xl shadow-2xl shadow-purple-900/30"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 lg:px-20 py-20 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {[
          {
            title: "🔒 Authentication",
            desc: "Secure login, signup, and session handling with JWT & NextAuth.",
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "👤 Profile",
            desc: "Manage and update user details with a clean UI & database integration.",
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "⚡ Next.js",
            desc: "Built on Next.js App Router, server actions, and the latest React features.",
            color: "from-purple-500 to-pink-500",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="relative bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-xl hover:scale-105 hover:shadow-2xl transition"
          >
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${f.color} opacity-10`}
            />
            <h2 className="text-2xl font-semibold mb-3">{f.title}</h2>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-gray-800 text-gray-400 px-8 py-10 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AuthProject
            </h1>
            <p className="mt-2 text-gray-500">
              A demo authentication project with Next.js & TailwindCSS.
            </p>
          </div>
          <div className="flex gap-6 justify-center md:justify-end text-sm">
            <Link
              href="/"
              className="hover:text-blue-400 group transition flex gap-1 items-center "
            >
              <IoHomeOutline className="text-white group-hover:text-blue-400" />
              Home
            </Link>
            <Link href="/profile" className="hover:text-blue-400 transition">
              Profile
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} AuthProject. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SectionHome;
