if (typeof TrelloPowerUp !== 'undefined') {
  console.log("TrelloPowerUp is defined");
  window.TrelloPowerUp.initialize({
    'card-badges': function(t, options) {
      return t.card('id', 'name')
        .then(function(card) {
          const cardId = card.id;
          const cardName = card.name;
          const targetName = 'Max'; // Replace with the specific name to check

          console.log('Card ID:', cardId);
          console.log('Card Name:', cardName);

          if (cardName.includes(targetName)) {
            console.log('Updating cover color for card:', cardId);

            // Define the cover properties
            const coverColor = 'red';

            // Call your backend server to update the cover color
            return fetch('http://localhost:3000/update-cover', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                brightness: 'light', // or 'dark'
                color: coverColor,
                size: 'full',// or 'normal'
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
              return [];
            });
          } else {
            console.log('Card name does not match the target name.');
            return [];
          }
        })
        .catch(error => {
          console.error('Error handling card-badges capability:', error);
          return [];
        });
  }});
} else {
  console.error('TrelloPowerUp is not defined');
}
