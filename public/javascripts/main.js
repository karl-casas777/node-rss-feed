(function($) {
    var $rssItems = $('.rss-feeds')
      , $loadMoreBtn = $('.rss-load-more')
      , $rssSearch = $('.rss-search')
      , socket = io()
      , cookie = document.cookie.match(/rssapp\=[^\;]*/);
    cookie = cookie[0].replace('rssapp=', '');

    $loadMoreBtn.on('click', function(evt) {
        evt.preventDefault();
        socket.emit('load more');
    });

    $rssSearch.on('keydown', function(evt) {
        if (evt.keyCode == 13) {
            socket.emit('search for', $rssSearch.val());
        }
    });

    socket.on('rss-items', function(rssItems) {
        $rssItems.empty();
        rssItems.forEach(function(item) {
            var likeCount = item.likes.length ? item.likes.length : 0
              , $likeImg = $('<i class="fa fa-angle-up"></i>')
              , $likeBtn = $('<a class="custom-link" href="#"></a>').append($likeImg)
              , $likeCount = $('<span>'+likeCount+'</span>')
              , $likeCont = $('<div class="rss-like"></div>')
              , $li = $(
                    '<li class="rss-item">'+
                        '<div class="rss-content">'+
                            '<h5>'+item.source.toUpperCase()+'</h5>'+
                            '<p class="rss-item-title">'+
                                '<a href="'+item.link+'" target="_blank">'+item.title+'</a>'+
                            '</p>'+
                        '</div>'+
                    '</li>'
                );

            $li.prepend($likeCont.append($likeBtn).append($likeCount));
            $likeBtn.on('click', function(evt) {
                evt.preventDefault();
                var count = parseInt($likeCount.text()) + 1;
                item.likes.push(cookie);
                ifLiked();
                $likeCount.text(count);
                socket.emit('like rss', item.id);
            });

            var ifLiked = function() {
                if (item.likes.indexOf(cookie) >= 0) {
                    $likeBtn.off('click').on('click', function(evt) {
                        evt.preventDefault();
                    });
                    $likeImg.addClass('faded');
                }
            };
            ifLiked();

            $rssItems.append($li);
        });
    });
})(jQuery);