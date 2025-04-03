import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./chatboot";
import Login from "./login";
import Signup from "./signup";
import HomePage from "./home";
import ProtectedRoute from "./protect"; 
import  Logout  from "./logout";
import VerifyCode from "./verifyaccount";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/chatbot" element={<ProtectedRoute element={<Chatbot />} />} /> {/* Chatbot Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
          <Route path="/Logout" element={<Logout />} />
          <Route path="/verifycode" element={<VerifyCode/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;