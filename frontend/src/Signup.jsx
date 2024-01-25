// src/Signup.jsx
import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming `onSignup` is a function that makes an API request to your server
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // Assuming the server returns a success message
      console.log(data.message);

      // You can also call onSignup to update the state or perform any other actions
      onSignup(userData);
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
