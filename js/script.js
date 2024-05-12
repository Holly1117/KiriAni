$(function() {
    // トップに戻るを表示 
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            $('#go-top').fadeIn();
        } else {
            $('#go-top').fadeOut();
        }
    });

    // スクロール時にふわっと移動する
    var headerHight = 80;
    $('a[href^=#]').click(function(){
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - headerHight;
        $("html, body").animate({scrollTop: position}, 550, "swing");
        return false;
    });

    /*
    // もっと見る
    $(".more").on("click", function() {
        // クリックされたボタンの親要素(li)から探索を始め、その中の.more-txtを取得
        var $txtHide = $(this).closest('li').find('.more-txt');
        
        // クリックされたボタンとその関連する.more-txtだけを対象にする
        $(this).toggleClass("on-click");
        $txtHide.slideToggle(300);
    });
*/

    $(document).ready(function() {
        $(".more").on("click", function() {
            // クリックされたボタンの親要素から探索を始め、その中の.broadと.broad-timeのli要素を取得
            var $broadList = $(this).closest('.test-box').find('.broad li:nth-child(n+3), .broad-time li:nth-child(n+3)');
            
            // クリックされたボタンとその関連する要素だけを対象にする
            $(this).toggleClass("on-click");
            $broadList.slideToggle(300);
        });
    });



    // ポップアップ外をクリックで閉じる
    $(document).on('click', function(event) {
        var popupOverlay = $('#popup-overlay');
        var popupCheckbox = $('#popup');
        
        if (event.target.id === 'popup-overlay') {
            popupCheckbox.prop('checked', false);
        }
    });
});