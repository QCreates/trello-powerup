window.TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      text: 'Update Label',
      callback: function(t) {
        return t.card('id', 'name')
          .then(function(card) {
            const cardId = card.id;
            const cardName = card.name;
            const targetName = 'Specific Name'; // Replace with the name you're checking for

            if (cardName.includes(targetName)) {
              // Define your API key and token
              const apiKey = process.env.TRELLO_API_KEY;
              const apiToken = process.env.TRELLO_API_TOKEN;
              const labelName = 'Important'; // Name of the label you want to add
              const labelColor = 'red'; // Color of the label: red, green, yellow, blue, etc.

              // Check if the label already exists on the board
              fetch(`https://api.trello.com/1/boards/${options.context.board}/labels?key=${apiKey}&token=${apiToken}`)
                .then(response => response.json())
                .then(labels => {
                  let label = labels.find(l => l.name === labelName && l.color === labelColor);

                  if (!label) {
                    // Create the label if it does not exist
                    fetch(`https://api.trello.com/1/labels?name=${labelName}&color=${labelColor}&idBoard=${options.context.board}&key=${apiKey}&token=${apiToken}`, {
                      method: 'POST'
                    })
                      .then(response => response.json())
                      .then(newLabel => {
                        // Add the newly created label to the card
                        return fetch(`https://api.trello.com/1/cards/${cardId}/idLabels?value=${newLabel.id}&key=${apiKey}&token=${apiToken}`, {
                          method: 'POST'
                        });
                      });
                  } else {
                    // Add existing label to the card
                    return fetch(`https://api.trello.com/1/cards/${cardId}/idLabels?value=${label.id}&key=${apiKey}&token=${apiToken}`, {
                      method: 'POST'
                    });
                  }
                })
                .then(() => {
                  alert('Label updated successfully!');
                  t.closePopup();
                })
                .catch(error => {
                  console.error('Error updating label:', error);
                  alert('Failed to update label.');
                });
            } else {
              t.closePopup();
            }
          });
      }
    }];
  }
});
