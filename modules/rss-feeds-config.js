module.exports = {
  interval: 5000,
  sources: [
    'http://www.smashingmagazine.com/feed',
    'https://hacks.mozilla.org/feed',
    'http://feeds.feedburner.com/CssTricks?format=xml'
  ],
  database: require('./rss-nosql'),
  firstPage: 5,
  perPage: 5
};