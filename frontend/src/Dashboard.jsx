// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';

const Dashboard = ({ user, onLogout }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch all projects from the server when the component mounts
    const fetchAllProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/all-projects', {
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming you have a token after login
          },
        });

        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchAllProjects();
  }, [user]);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={onLogout}>Logout</button>

      <h2>All Projects:</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>Developer: {project.developer}</p>
            <p>Description: {project.description}</p>
            <p>URL: {project.url}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
