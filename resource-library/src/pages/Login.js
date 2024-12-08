import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API requests
import '../styles/LoginPage.css';  // Import the new CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // For programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the backend login endpoint
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      
      // If login is successful, navigate to the appropriate dashboard
      if (response.status === 200) {
        // Assuming the backend can differentiate users
        if (username === 'admin') {
          navigate('/admin-dashboard');  // Admin dashboard
        } else {
          navigate('/user-dashboard');  // User dashboard
        }
      }
    } catch (error) {
      // Handle invalid credentials or other errors
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src="/images/library.gif" alt="Library" />
      </div>
      <div className="form-section">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/user-register">Register</a></p> {/* Link to the registration page */}
      </div>
    </div>
  );
};

export default Login;
