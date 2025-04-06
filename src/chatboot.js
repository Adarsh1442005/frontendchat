import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Ensure the session ID persists
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId); // Use existing session ID from localStorage
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem('sessionId', newSessionId); // Save new session ID to localStorage
      setSessionId(newSessionId); // Update state with the new session ID
    }
  }, []); // Runs once when the component mounts

  // Fetch chat history once the sessionId is properly initialized
  useEffect(() => {
    if (sessionId) {
      const fetchChatHistory = async () => {
        try {
          const response = await axios.get('https://chatbotbackend-vd8a.onrender.com/api/chatHistory', {
            params: { sessionId: sessionId }, // Pass session ID to identify the user
          });
          setMessages(response.data.history); // Set chat history
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      };

      fetchChatHistory(); // Fetch history
    }
  }, [sessionId]); // Runs only when sessionId changes from null to a valid value

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('https://chatbotbackend-vd8a.onrender.com/chat', {
        message: input,
        sessionId: sessionId, // Include session ID in the request
      });

      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add bot reply to chat
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Failed to get a response!', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]); // Add error message to chat
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-5 flex">
      {/* Chat History Section */}
      <div className="w-1/4 bg-gray-800 text-white p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-3">Chat History</h2>
        <button
          onClick={() => setMessages([])} // Clear messages for a new chat
          className="p-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold mb-4"
        >
          Start New Conversation
        </button>
            <button
          onClick={navigate("/")} // Clear messages for a new chat
          className="p-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold mb-4"
        >
          Start New Conversation
        </button>
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className={msg.sender === 'user' ? 'text-blue-400' : 'text-green-400'}>
              {msg.sender === 'user' ? 'You: ' : 'Bot: '}
              {msg.message}
            </li>
          ))}
        </ul>
      </div>
  
      {/* Chat Interface Section */}
      <div className="w-3/4 ml-4 bg-gray-800 text-white p-4 rounded-md shadow-lg flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mb-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-gray-300"></div>
          </div>
        )}
        
        {/* Input Form */}
        <form onSubmit={handleSend} className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 p-3 rounded-l-md bg-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-r-md text-white font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
