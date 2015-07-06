var rssFeeds = require('./rss-feeds')
  , cookie = require('cookie')
  , db = rssFeeds.config.database;
rssFeeds.autoUpdate(true);

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    var cookies = cookie.parse(socket.client.request.headers.cookie);

    db.items(function(err, items) {
        socket.emit('rss-items', items);
    }, 0, 10);

    socket.on('like rss', function(id) {
      db.like(id, cookies.rssapp);
    });
  });

  setInterval(function() {
    db.items(function(err, items) {
        io.emit('rss-items', items);
    }, 0, 10);
  }, 5000);

  return io;
};