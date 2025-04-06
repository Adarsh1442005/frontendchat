import React, { useState } from "react";
import './index.css';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

export default function Login() {
  const [formdata, setformdata] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false); // Spinner state
  const [message, setMessage] = useState(""); // Message state for success/error
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner
    setMessage(""); // Clear previous messages
    try {
      const res = await axios.post('https://chatbotbackend-vd8a.onrender.com/login', formdata);
      if (res.data.code === 1) {
        console.log("Logged in successfully");
        localStorage.setItem('token',formdata.email); // Store the JWT token
        setMessage("Login successful!");

        // Redirect to the chatbot page
        navigate("/chatbot");
      } else if (res.data.code === 0) {
        console.log("Login unsuccessful");
        setMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Chatbot Login</h2>
        <p className="text-gray-400 text-center mb-8">Welcome back! Please login to your account.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              value={formdata.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Display success or error message */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-gray-400 text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        <p>  <Link to="/" className="text-pink-500 hover:underline">visithome</Link> </p>
        </p>
      </div>
    </div>
  );
}
