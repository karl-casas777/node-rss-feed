var nosql = require('nosql')
  , fs = require('fs');
  
try {
  fs.mkdirSync('database');
} catch(e){}
var db = nosql.load('database/rss');

db.stored.create('insertIfNew', function(nosql, next, params) {
  nosql.one(function(o) {
    if (o.id == params.id) {
      return o;
    }
  }, function(err, o) {
    if (o == null) {
      nosql.insert(params);
    }
    next();
  });
});

var rssNosql = {
  insert: function(row) {
    // db.stored.execute('insertIfNew', row);
    db.one(function(o) {
      if (o.id == row.id) {
        return o;
      }
    }, function(err, o) {
      if (o == null) {
        db.insert(row);
      }
    }); 
  },
  like: function(id, liker) {
    db.update(function(o) {
      if (o.id == id && o.likes.indexOf(liker) < 0) {
        o.likes.push(liker);
      }

      return o;
    });
  },
  // sortBy param should be an object with keys as the column 
  // and value as -1 for descending and 1 for acsending
  // ex. sort by id descending and name ascending
  // sortBy = { id: -1, name: 1 }
  items: function(fxn, offset, limit, sortBy) {
    db.sort(function(o) {
      return o;
    }, function(a, b) {
        var sortInt = 0;
        for (var column in sortBy) {
          if (sortBy.hasOwnProperty(column)) {
            var av = typeof a[column] == typeof [] ? a[column].length: a[column];
            var bv = typeof b[column] == typeof [] ? b[column].length: b[column];

            sortInt = (av < bv) ? -sortBy[column] : sortBy[column];
            if (av != bv) break;
          }
        }

        return sortInt;
    }, offset, limit, fxn);
  }
};

module.exports = rssNosql;