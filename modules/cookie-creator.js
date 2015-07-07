var cookieCreator = function(req, res, next) {
  var cookie = req.cookies.rssapp;
  if (!cookie)
  {
    var uniqnum = Math.random().toString();
    uniqnum = uniqnum.substring(2, uniqnum.length);
    uniqnum += (new Date().getTime());
    res.cookie('rssapp', uniqnum, { maxAge: 900000 });
  }
  next();
};

module.exports = cookieCreator;