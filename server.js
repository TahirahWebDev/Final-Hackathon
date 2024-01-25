// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your_connection_string' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/projectSharing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});


// Define a user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Define a project schema
const projectSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: String,
  developer: String,
  description: String,
  url: String,
  image: String,
});


const Project = mongoose.model('Project', projectSchema);

app.post('/projects', async (req, res) => {
  console.log('Received POST request to /projects');
  console.log('Request Body:', req.body);

  // Extract the username from the request body or set a default value if not provided
  const { username = 'defaultUsername', title, developer, description, url, image } = req.body;

  const project = new Project({
    username,
    title,
    developer,
    description,
    url,
    image,
  });

  try {
    const newProject = await project.save();
    console.log('Project saved successfully:', newProject);

    // Log the data in a format that MongoDB Compass understands
    console.log(JSON.stringify(newProject));
    
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error saving project:', error.message);
    res.status(400).json({ message: error.message });
  }
});


  

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the username or email is already taken
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or Email already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during signup:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // You might want to generate a token for user authentication
    // For simplicity, we'll just send a success message for now
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
