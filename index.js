window.TrelloPowerUp.initialize({
  // Add a card button to manually trigger the cover color update
  'card-buttons': function(t, options) {
    return [{
      icon: 'https://qcreates.github.io/trello-powerup/assets/icon.png', // Icon for the button
      text: 'Update Cover',
      callback: function(t) {
        return t.card('id', 'name')
          .then(function(card) {
            const cardId = card.id;
            const cardName = card.name;
            const targetName = 'Specific Name'; // Replace with the name you're checking for
            const apiKey = process.env.TRELLO_API_KEY; // Use environment variables for security
            const apiToken = process.env.TRELLO_API_TOKEN;

            if (cardName.includes(targetName)) {
              // Define the cover properties
              const coverColor = 'red'; // Valid colors: red, green, yellow, blue, purple, pink, black, sky, lime
              
              // Update the cover color using Trello API
              fetch(`https://api.trello.com/1/cards/${cardId}/cover?key=${apiKey}&token=${apiToken}`, {
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
                alert('Cover color updated successfully!');
                t.closePopup();
              })
              .catch(error => {
                console.error('Error updating cover:', error);
                alert('Error updating cover color.');
                t.closePopup();
              });
            } else {
              alert('Card name does not match the target name.');
              t.closePopup();
            }
          });
      }
    }];
  }
});
