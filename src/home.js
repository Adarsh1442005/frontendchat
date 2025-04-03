import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center p-5">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChatBot Universe</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Your personal AI assistant is here to help! Navigate through the links below to explore
          more and start chatting with your virtual assistant.
        </p>
        <p className="text-lg text-yellow-400 font-semibold mt-4">
          Note: Our chatbot specializes in discussions about healthcare and fitness only.
        </p>
      </header>

      {/* Links Section */}
      <div className="flex flex-col items-center space-y-6">
        <Link
          to="/chatbot"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all text-lg font-semibold"
        >
          Go to ChatBot
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg shadow-lg transition-all text-lg font-semibold"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg shadow-lg transition-all text-lg font-semibold"
        >
          Signup
        </Link>
        <Link
          to="/logout"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg shadow-lg transition-all text-lg font-semibold"
        >
          Logout
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>&copy; 2025 ChatBot Universe. All rights reserved.</p>
        <p>
          Built with ❤️ by <span className="text-blue-400">Adarsh Pandey</span>.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;