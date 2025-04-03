import React, { useState } from "react";
import axios from "axios"; // Make sure to install Axios

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        try {
            const response = await axios.post("http://your-backend-api.com/login", {
                username,
                password,
            });

            if (response.data.success) {
                alert("Login successful!");
                // Proceed to redirect or save user data, etc.
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred while logging in.");
            console.error(err);
        }
    };

    return (
        <div style={{ backgroundColor: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
            <form onSubmit={handleLogin} style={{ textAlign: "center", padding: "20px", border: "1px solid white", borderRadius: "10px" }}>
                <h1>Login</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <label>Username:</label><br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: "10px", margin: "10px", width: "80%" }}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: "10px", margin: "10px", width: "80%" }}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: "10px 20px", marginTop: "10px", backgroundColor: "white", color: "black", border: "none", borderRadius: "5px" }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
