// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const apiKey = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

app.use(express.json());

app.put('/update-cover', async (req, res) => {
  const { cardId, color } = req.body;
  try {
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
    if (!response.ok) throw new Error('Failed to update cover color');
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    console.error('Error updating cover:', error);
    res.status(500).send({ error: 'Failed to update cover color' });
  }
});

app.listen(3000, () => console.log('Backend server running on http://localhost:3000'));
