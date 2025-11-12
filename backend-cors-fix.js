// Add this to your backend server (Express.js example)
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Or allow all origins (less secure)
// app.use(cors());

app.use(express.json());

// Your existing routes...
app.post('/auth/login', (req, res) => {
  // Your login logic here
});