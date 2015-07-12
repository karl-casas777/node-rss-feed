var utility = {
  uniqNum: function() {
    var uniqnum = Math.random().toString();
    uniqnum = uniqnum.substring(2, uniqnum.length);
    uniqnum += (new Date().getTime());

    return uniqnum;
  },
  normalizePort: function(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }
};

module.exports = utility;