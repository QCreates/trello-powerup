if (typeof TrelloPowerUp !== 'undefined') {
  console.log("TrelloPowerUp is defined");
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
          console.log('Card ID:', cardId);
          console.log('Card Name:', cardName);
          
          console.log('Key', apiKey);

          if (cardName.includes(targetName)) {
            console.log('Updating cover color for card:', cardId);
            
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
              console.log('Response status:', response.status);
              if (!response.ok) {
                return response.json().then(err => {
                  console.error('Failed to update cover color:', err);
                  throw new Error('Failed to update cover color');
                });
              }
              return response.json();
            })
            .then(data => {
              console.log('Cover updated successfully:', data);
              return [];
            })
            .catch(error => {
              console.error('Error updating cover:', error);
              // Return empty badges on error to ensure the handler still responds correctly
              return [];
            });
          } else {
            console.log('Card name does not match the target name.');
            // Return empty badges if the card name does not match the target
            return [];
          }
        })
        .catch(error => {
          console.error('Error handling card-badges capability:', error);
          // Ensure the promise resolves to an empty array to avoid unhandled errors
          return [];
        });
    }
  });
} else {
  console.error('TrelloPowerUp is not defined');
}
