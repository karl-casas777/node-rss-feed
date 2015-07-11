var FeedParser = require('feedparser'), 
    request = require('request'), 
    updater, 
    rssFeeds = {
      config: require('./rss-feeds-config'),
      autoUpdate: function(auto, interval) {
        if (!updater && auto)
          updater = setInterval(rssFeeds.updateFeed, interval || rssFeeds.config.interval);
        else if (!auto && updater)
          clearInterval(updater);
      },
      updateFeed: function() {
        rssFeeds.config.sources.forEach(function(url) {
          rssFeeds.accessRSS(url, rssFeeds.processRSS);
        });
      },
      accessRSS: function(url, fxn) {
        var req = request(url), 
            feedparser = new FeedParser();

        req.on('error', function (error) {
          console.log('Request Error `'+url+'`: '+error);
        });

        req.on('response', function (res) {
          var stream = this;

          if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

          stream.pipe(feedparser);
        });


        feedparser.on('error', function(error) {
          console.log('FeedParser Error `'+url+'`: '+error);
        });

        feedparser.on('readable', fxn);
      },
      processRSS: function() {
        var rss = this,
            item = rss.read();
        while (item) {
          var source = rss.meta.link.match(/\/\/[^\/]*/);
          source = source[0].replace('//', '');
          source = source.replace('www.', '');

          var row = {
            id: item.guid,
            source: source,
            title: item.title,
            link: item.link,
            guid: item.guid,
            date: item.pubDate,
            likes: []
          };
          rssFeeds.config.database.insert(row);
          item = rss.read();
        }
      }
    };

module.exports = rssFeeds;