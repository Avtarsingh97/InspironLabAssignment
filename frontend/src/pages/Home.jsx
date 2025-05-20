import React from 'react';
import NavBar from '../components/NavBar';
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <NavBar/>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Simplify Your Thoughts with <span className="text-indigo-500">NoteX</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          A modern note-taking app to capture, organize, and access your thoughts instantly. Secure, clean, and built for speed.
        </p>

        <div className="flex justify-center gap-4">
          <NavLink
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
          >
            Get Started
          </NavLink>
          <NavLink
            to="/signin"
            className="border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
          >
            Sign In
          </NavLink>
        </div>
      </div>

      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} NoteX. All rights reserved.
      </footer>
    </div>
    </div>
  )
}

export default Home;