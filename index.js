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
              const coverColor = 'red'; // Choose the cover color

              // Update the cover color using Trello API
              fetch(`https://api.trello.com/1/cards/${cardId}/cover?key=${apiKey}&token=${apiToken}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  color: coverColor // Set the cover color
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log('Cover updated:', data);
                t.closePopup();
              })
              .catch(error => {
                console.error('Error updating cover:', error);
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
