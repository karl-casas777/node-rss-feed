(function($) {
    'use strict';
        
    var $rssItems = $('.rss-list'), 
        $loadMoreBtn = $('.load-more'), 
        $loadMoreBtnLoading = $loadMoreBtn.find('.fa-refresh'), 
        $rssSearch = $('.rss-search'), 
        $searchIcon = $('.search-icon .fa-search'), 
        socket = io(), 
        cookie = document.cookie.match(/rssapp\=[^\;]*/);

    $searchIcon.loading = function() {
        $searchIcon.removeClass('fa-search').addClass('fa-spinner').addClass('fa-spin');
    };
    $searchIcon.stopLoading = function() {
        $searchIcon.removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-search');
    };

    cookie = (cookie && cookie.length) ? cookie[0].replace('rssapp=', '') : '';

    $loadMoreBtn.on('click', function(evt) {
        evt.preventDefault();
        socket.emit('load more');
        $loadMoreBtnLoading.addClass('fa-spin');
    });

    $rssSearch.on('keydown', function(evt) {
        if (evt.keyCode == 13) {
            socket.emit('search for', $rssSearch.val());
            $searchIcon.loading();
        }
    });

    socket.on('rss-items', function(rssItems) {
        $rssItems.empty();
        $loadMoreBtnLoading.removeClass('fa-spin');
        $searchIcon.stopLoading();
        rssItems.forEach(function(item) {
            var likeCount = item.likes.length ? item.likes.length : 0, 
                $likeImg = $('<i class="fa fa-angle-up"></i>'), 
                $likeBtn = $('<a class="redlink" href=""></a>').append($likeImg), 
                $likeCount = $('<strong>'+likeCount+'</strong>'), 
                $likeCont = $('<div class="col-xs-1 col-xs-offset-2 padding-less likebox"></div>'), 
                $li = $(
                    '<li class="row">'+
                        '<article class="col-xs-6 contentbox">'+
                            '<h5 class="text-uppercase">'+item.source+'</h5>'+
                            '<p>'+
                                '<a href="'+item.link+'" target="_blank" class="subtle-link">'+item.title+'</a>'+
                            '</p>'+
                        '</article>'+
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