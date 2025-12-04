
import React from "react";
import { useNavigate } from "react-router-dom";
import ActionCard from "../layout/ActionCard";

export default function MainHome() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center w-full text-center px-6">
        <h1 className="text-5xl md:text-5xl font-extrabold text-indigo-500 mb-4 drop-shadow-sm">Welcome</h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          Test Your API Faster & Smarter
        </h2>

        <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-8">
          A clean, powerful, and developer-friendly API testing tool built using React & Vite.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="px-8 py-3 rounded-xl signin  text-black text-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all"
        >
          🚀 Let's Start Testing
        </button>
        <div className="py-6 my-6">
    <ActionCard />
        </div>
          
      </div>

    </div>
  );
}
