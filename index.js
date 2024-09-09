window.TrelloPowerUp.initialize({
  // Add a card button to manually trigger the color update
  'card-buttons': function(t, options) {
    return [{
      icon: 'https://qcreates.github.io/trello-powerup/assets/icon.png', // Icon for the button
      text: 'Update Color',
      callback: function(t) {
        return t.card('id', 'name')
          .then(function(card) {
            const cardId = card.id;
            const cardName = card.name;
            const targetName = 'Qasem'; // Replace with the name you're checking for
            const apiKey = process.env.TRELLO_API_KEY; // Use environment variables for security
            const apiToken = process.env.TRELLO_API_TOKEN;

            if (cardName.includes(targetName)) {
              // Define label properties
              const labelName = 'Highlighted';
              const labelColor = 'red'; // Choose the color you want

              // Add the label to the card using Trello API
              fetch(`https://api.trello.com/1/cards/${cardId}/labels?key=${apiKey}&token=${apiToken}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name: labelName,
                  color: labelColor
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log('Label added:', data);
                t.closePopup();
              })
              .catch(error => {
                console.error('Error adding label:', error);
                t.closePopup();
              });
            } else {
              alert('Card name does not match the target name.');
              t.closePopup();
            }
          });
      }
    }];
  },

  // Add a badge to indicate the card has a special label
  'card-badges': function(t, options) {
    return t.card('name')
      .get('name')
      .then(function(cardName) {
        const targetName = 'Specific Name'; // Replace with the name you're checking for

        if (cardName.includes(targetName)) {
          return [{
            text: 'Special',
            color: 'red' // Badge color for quick indication
          }];
        }
        return [];
      });
  }
});
