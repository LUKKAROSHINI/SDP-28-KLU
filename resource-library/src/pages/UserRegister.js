import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../styles/LoginPage.css'; // Import the styles

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling error messages
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend to register the user
      const response = await axios.post('http://localhost:5000/register', { username, password });

      // If successful, navigate to the login page
      if (response.status === 201) {
        console.log('User registered:', { username, password });
        navigate('/login');
      }
    } catch (err) {
      // If there's an error, display it
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred, please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src="/images/library.gif" alt="Library" />
      </div>
      <div className="form-section">
        <h1>User Registration</h1>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
