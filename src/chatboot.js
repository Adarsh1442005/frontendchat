import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Persist session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Fetch chat history
  useEffect(() => {
    if (sessionId) {
      const fetchChatHistory = async () => {
        try {
          const response = await axios.get('https://chatbotbackend-vd8a.onrender.com/api/chatHistory', {
            params: { sessionId },
          });
          setMessages(response.data.history);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      };

      fetchChatHistory();
    }
  }, [sessionId]);

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle message submission
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('https://chatbotbackend-vd8a.onrender.com/chat', {
        message: input,
        sessionId,
      });

      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Failed to get a response!', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-5 flex flex-col sm:flex-row">
      {/* Chat History */}
      <div className="sm:w-1/4 w-full bg-gray-800 text-white p-4 rounded-md shadow-lg h-64 sm:h-auto overflow-y-auto">
        <h2 className="text-lg font-bold mb-3">Chat History</h2>
        <button
          onClick={() => setMessages([])}
          className="p-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold mb-4 w-full"
        >
          Start New Conversation
        </button>
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className={msg.sender === 'user' ? 'text-blue-400' : 'text-green-400'}>
              {msg.sender === 'user' ? 'You: ' : 'Bot: '}
              {msg.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Interface */}
      <div className="sm:w-3/4 w-full mt-4 sm:mt-0 sm:ml-4 bg-gray-800 text-white p-4 rounded-md shadow-lg flex flex-col">
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
        <form onSubmit={handleSend} className="flex sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 p-3 sm:rounded-l-md rounded-t-md sm:rounded-t-none bg-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 hover:bg-blue-700 sm:rounded-r-md rounded-b-md sm:rounded-b-none text-white font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
