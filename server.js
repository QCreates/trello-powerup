import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const apiKey = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

app.use(cors({
  origin: 'https://qcreates.github.io',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.put('/update-cover', async (req, res) => {
  const { cardId, color } = req.body;
  
  // Ensure that the color is valid
  const validColors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'sky', 'lime', 'pink', 'black'];
  
  if (!validColors.includes(color)) {
    return res.status(400).send({ error: 'Invalid color value' });
  }

  try {
    const response = await fetch(`https://api.trello.com/1/cards/${cardId}/cover?key=${apiKey}&token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        brightness: 'light', // Can be 'light' or 'dark'
        color: color, // Valid Trello color
        size: 'full' // Can be 'full' or 'normal'
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
