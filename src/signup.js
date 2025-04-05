import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(3);
  const navigate = useNavigate(); // Hook to handle navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('https://chatbotbackend-vd8a.onrender.com/api/createaccount', formData);

      if (response.data.code === 1) {
        // Redirect to verification code page
        navigate('/verifycode'); // Redirect to the verification page
      } else if (response.data.code === 0) {
        alert('User already exists!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create account!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-5">
      <div className="relative z-10 bg-gray-800 text-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
        {!isLoading && check === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full p-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-semibold transition-all"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
