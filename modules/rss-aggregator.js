var rssFeeds = require('./rss-feeds')
  , cookie = require('cookie')
  , db = rssFeeds.config.database
  , itemSort = {
    likes: -1, //descending likes
    date: -1   //descending date
  };
rssFeeds.autoUpdate(true);

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    var cookies = cookie.parse(socket.client.request.headers.cookie);

    db.items(function(err, items) {
        socket.emit('rss-items', items);
    }, 0, 10, itemSort);

    socket.on('like rss', function(id) {
      db.like(id, cookies.rssapp);
    });
  });

  setInterval(function() {
    db.items(function(err, items) {
        io.emit('rss-items', items);
    }, 0, 10, itemSort);
  }, 5000);

  return io;
};