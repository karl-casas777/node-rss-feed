var rssFeeds = require('./rss-feeds');
rssFeeds.autoUpdate(true);

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    rssFeeds.config.database.items(function(err, items) {
        socket.emit('rss-items', items);
    }, 0, 10);
  });

  return io;
};