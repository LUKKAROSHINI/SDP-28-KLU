import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = useState(''); // Manage username state
  const [password, setPassword] = useState(''); // Manage password state
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simulate login logic
    if (username === 'admin' && password === 'adminpassword') {
      navigate('/admin-dashboard'); // Navigate to admin dashboard if credentials match
    } else if (username === 'user' && password === 'userpassword') {
      navigate('/user-dashboard'); // Navigate to user dashboard for user credentials
    } else {
      alert('Invalid credentials, please try again'); // Alert on invalid credentials
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
