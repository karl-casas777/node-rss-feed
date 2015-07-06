(function($) {
    var $rssItems = $('.rss-feeds');
    var socket = io();
    socket.on('rss-items', function(rssItems) {
        rssItems.forEach(function(item) {
            var $item = $('<li class="rss-item"><div class="rss-like"><a class="custom-link" href="#"><i class="fa fa-angle-up"></i></a><span>11</span></div><div class="rss-content"><h5>MEDIUM.COM</h5><p class="rss-item-title"><a href="'+item.link+'" target="_blank">'+item.title+'</a></p></div></li>');
            $rssItems.append($item);
        });
    });
})(jQuery);