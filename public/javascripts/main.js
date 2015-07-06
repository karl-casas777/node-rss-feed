(function($) {
    var $rssItems = $('.rss-feeds');
    var socket = io();
    socket.on('rss-items', function(rssItems) {
        $rssItems.empty();
        rssItems.forEach(function(item) {
            var likeCount = item.likes.length ? item.likes.length : 0;
            var $likeBtn = $('<a class="custom-link" href="#"><i class="fa fa-angle-up"></i></a>');
            var $likeCount = $('<span>'+likeCount+'</span>');
            var $likeCont = $('<div class="rss-like"></div>');

            var $li = $(
                '<li class="rss-item">'+
                    '<div class="rss-content">'+
                        '<h5>MEDIUM.COM</h5>'+
                        '<p class="rss-item-title">'+
                            '<a href="'+item.link+'" target="_blank">'+item.title+'</a>'+
                        '</p>'+
                    '</div>'+
                '</li>'
            );
            $li.prepend($likeCont.append($likeBtn).append($likeCount));
            $li.on('click', function(evt) {
                evt.preventDefault();
                var count = parseInt($likeCount.text()) + 1;
                $likeCount.text(count);
                socket.emit('like rss', item.id);
            });

            $rssItems.append($li);
        });
    });
})(jQuery);