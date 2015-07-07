module.exports = {
  interval: 5000,
  sources: [
    'https://medium.com/feed/surviving-the-future',
    'http://rss.cnn.com/rss/cnn_topstories.rss'
  ],
  database: require('./rss-nosql')
};