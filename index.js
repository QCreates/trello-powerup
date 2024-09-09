if (typeof TrelloPowerUp !== 'undefined') {
  window.TrelloPowerUp.initialize({
    // Auto-update card cover when a card is opened or loaded
    'card-badges': function(t, options) {
      return t.card('id', 'name')
        .then(function(card) {
          const cardId = card.id;
          const cardName = card.name;
          const targetName = 'Max'; // Replace with the specific name to check
          const apiKey = process.env.TRELLO_API_KEY; // Use environment variables for security
          const apiToken = process.env.TRELLO_API_TOKEN;
  
          if (cardName.includes(targetName)) {
            // Define the cover properties
            const coverColor = 'red'; // Valid colors: red, green, yellow, blue, purple, pink, black, sky, lime
  
            // Update the cover color using Trello API
            return fetch(`https://api.trello.com/1/cards/${cardId}/cover?key=${apiKey}&token=${apiToken}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                color: coverColor, // Set the cover color
                brightness: 'light', // Set brightness to 'light' or 'dark'
                size: 'full' // Set to 'full' or 'half' depending on the desired cover size
              })
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to update cover color');
              }
              return response.json();
            })
            .then(data => {
              console.log('Cover updated:', data);
              // Return badges or empty as per your requirement
              return [];
            })
            .catch(error => {
              console.error('Error updating cover:', error);
              return []; // Return empty badges on error
            });
          }
          // If the name does not match, return empty badges or some indicator
          return [];
        });
    }
  });
} else {
  console.error('TrelloPowerUp is not defined');
}
