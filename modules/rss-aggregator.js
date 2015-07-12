var feedConfig = require('./rss-feeds-config'), 
    cookie = require('cookie'), 
    db = feedConfig.database, 
    offset = 0, 
    limit = feedConfig.firstPage, 
    itemSort = {
      likes: -1, //descending likes
      date: -1   //descending date
    };

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    var cookieHeader = socket.client.request.headers.cookie, 
        cookies = cookieHeader ? cookie.parse(cookieHeader) : {rssapp: ''}, 
        sockOffset = offset, 
        sockLimit = limit, 
        q;

    var loadRssItems = function() {
      if (q) searchRssItems(q);
      else {
        db.items(function(err, items) {
          socket.emit('rss-items', items);
        }, sockOffset, sockLimit, itemSort);
      }
    };
    loadRssItems();

    var searchRssItems = function(q) {
      var callback = function(items) {
        socket.emit('rss-items', items);
      };
      db.search(q, sockOffset, sockLimit, itemSort, callback);
    };

    socket.on('like rss', function(id) {
      db.like(id, cookies.rssapp);
    });

    socket.on('load more', function() {
      sockLimit += feedConfig.perPage;
      loadRssItems();
    });

    socket.on('search for', function(search) {
      if (q != search) {
        sockOffset = offset;
        sockLimit = limit;
        q = search;
        searchRssItems(q);
      }
    });

    setInterval(loadRssItems, 5000);
  });

  return io;
};