// Client-side request example (index.js or another frontend JS file)
fetch('http://localhost:3000/update-cover', { // Update to your backend URL in production
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    cardId: '66df7ba4d4dd5484287028f4', // Replace with the actual card ID
    color: 'red', // Or any color supported by Trello
  }),
})
.then(response => response.json())
.then(data => {
  console.log('Cover updated successfully:', data);
})
.catch(error => {
  console.error('Error updating cover:', error);
});
