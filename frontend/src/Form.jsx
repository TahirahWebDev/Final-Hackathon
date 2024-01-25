// src/Form.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

const Form = ({ onFormSubmit, user }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    title: '',
    developer: '',
    description: '',
    url: '',
  });
  

  useEffect(() => {
    // Update the form data when the user prop changes
    if (user && user.username) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: user.username,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Assuming the server returns the saved project
      console.log('Project saved successfully:', data);

      // Pass the saved project data to the parent component
      onFormSubmit(data);

      // Reset the form data
      setFormData({
        username: user?.username || '',
        title: '',
        developer: '',
        description: '',
        url: '',
      });
    } catch (error) {
      console.error('Error submitting project:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add a hidden input for the username */}
      <input type="hidden" name="username" value={formData.username} />

      <label>
        Title:
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </label>
      <br />
      <label>
        Developer:
        <input
          type="text"
          value={formData.developer}
          onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </label>
      <br />
      <label>
        URL:
        <input
          type="text"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Submit Project</button>
    </form>
  );
};

export default Form;
