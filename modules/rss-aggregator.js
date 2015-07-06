var rssFeeds = require('./rss-feeds')
  , cookie = require('cookie')
  , db = rssFeeds.config.database
  , offset = 0
  , limit = 1
  , itemSort = {
    likes: -1, //descending likes
    date: -1   //descending date
  };
rssFeeds.autoUpdate(true);

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    var cookies = cookie.parse(socket.client.request.headers.cookie)
      , sockOffset = offset
      , sockLimit = limit;

    var loadRssItems = function() {
      db.items(function(err, items) {
        socket.emit('rss-items', items);
      }, sockOffset, sockLimit, itemSort);
    };
    loadRssItems();

    socket.on('like rss', function(id) {
      db.like(id, cookies.rssapp);
    });

    socket.on('load more', function() {
      sockLimit += 1;
      loadRssItems();
    });

    setInterval(loadRssItems, 5000);
  });

  return io;
};