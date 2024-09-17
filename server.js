// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware

dotenv.config(); // Load environment variables from .env file

const app = express();
const apiKey = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

// Enable CORS with specific options
app.use(cors({
  origin: 'https://qcreates.github.io', // Allow only this origin (Update this for local testing)
  methods: ['GET', 'POST', 'PUT'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Enable credentials if needed
}));

app.use(express.json()); // Middleware to parse JSON requests

app.put('/update-cover', async (req, res) => {
  const { cardId, color } = req.body;
  try {
    // Make a PUT request to the Trello API to update the cover
    const response = await fetch(`https://api.trello.com/1/cards/${cardId}/cover?key=${apiKey}&token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        color: color, // Set the cover color
        brightness: 'light', // Set brightness to 'light' or 'dark'
        size: 'full' // Set to 'full' or 'half' depending on the desired cover size
      })
    });

    if (!response.ok) throw new Error('Failed to update cover color'); // Handle errors

    const data = await response.json();
    res.status(200).send(data); // Send the Trello API response back to the client
  } catch (error) {
    console.error('Error updating cover:', error);
    res.status(500).send({ error: 'Failed to update cover color' });
  }
});

// Start the backend server
app.listen(3000, () => console.log('Backend server running on http://localhost:3000'));
