import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [loading, setLoading] = useState(false); // State for the spinner
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    const email = localStorage.getItem("token"); // Retrieve email/token from localStorage
    console.log(email);

    if (email) {
      setLoading(true); // Show spinner while waiting for response
      try {
        // Send the email to the backend for logout processing
        const res = await axios.post('https://chatbotbackend-2-p6w5.onrender.com/logout', { email });

        if (res.data.code === 1) { // Example response code check
          localStorage.removeItem("token"); // Clear JWT token from localStorage
          alert("Logout successful!");
          navigate("/"); // Redirect to home page
        } else {
          alert("Logout failed. Server returned an error.");
        }
      } catch (error) {
        console.error("Error during logout:", error);
        alert("Logout failed. Please try again.");
      } finally {
        setLoading(false); // Hide spinner after response
      }
    } else {
      alert("No user is logged in.");
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Are you sure you want to logout?</h1>
        <p className="text-gray-400 mb-6">
          By logging out, you will be redirected to the homepage or login screen.
        </p>

        {/* Show spinner while loading */}
        {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="ml-2">Logging out...</span>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}