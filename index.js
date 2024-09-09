window.TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: 'https://example.com/icon.png', // Replace with your icon URL
      text: 'My Button',
      callback: function(t) {
        return t.popup({
          title: 'Hello Trello!',
          url: 'index.html'
        });
      }
    }];
  }
});
