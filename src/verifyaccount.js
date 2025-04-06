import React, { useState } from 'react';
import axios from 'axios';

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false); // State for showing spinner
  const [responseMessage, setResponseMessage] = useState(''); // State for response message

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner
    setResponseMessage(''); // Clear any previous response
    try {
      let res = await axios.post('https://chatbotbackend-vd8a.onrender.com/verify', { code: verificationCode });
      setResponseMessage(res.data.message); // Set server response
    } catch (error) {
      
      setResponseMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-5">
      <div className="relative z-10 bg-gray-800 text-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Verification Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="verificationCode"
            placeholder="Enter your code"
            value={verificationCode}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
  <h1><Link to="/chatbot" className="text-blue-500">click for Logging </Link></h1>
        </form>

        {/* Spinner */}
        {loading && (
          <div className="text-center mt-4">
            <svg
              className="animate-spin h-6 w-6 text-white inline-block"
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
            <span className="ml-2">Loading...</span>
          </div>
        )}

        {/* Display Response */}
        {responseMessage && <div className="text-center mt-4">{responseMessage}</div>}
      </div>
    </div>
  );
};

export default VerifyCode;
