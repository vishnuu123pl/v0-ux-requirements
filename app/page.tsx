"use client"; // ⭐ REQUIRED FOR BUTTON CLICK TO WORK

import { useState } from "react";

export default function Page() {
  // ⭐ STATE TO CONTROL MODAL
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center px-8">
        <div className="text-2xl font-bold text-blue-600">Fluxera</div>

        {/* ⭐ SIGN IN BUTTON — THIS MAKES IT RESPOND */}
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <main className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Rent Anything on Campus
        </h1>
        <p className="text-gray-600 text-lg">
          The trusted marketplace for students at your college.
        </p>
      </main>

      {/* ================= AUTH MODAL ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
            >
              ×
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? "Sign In to Fluxera" : "Create Account"}
              </h2>

              <p className="text-gray-500 mb-6 text-sm">
                {isLogin
                  ? "Welcome back! Please enter your details."
                  : "Join the campus marketplace community."}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Demo only. Backend not connected.");
                  setOpen(false);
                }}
                className="space-y-4"
              >
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                  />
                )}

                <input
                  type="email"
                  required
                  placeholder="College Email"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />

                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Continue
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-bold hover:underline ml-1"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
