/**
 * Created by Administrator on 16-11-28.
 */

$(function () {
    $(document).on("click", ".actionsheet-list li", function () {
        var html = '<li>' +
            $(this).html() +
            '</li>';
        thisCallB(html);
    })
});

function addList(html) {
    if (html != null && html != '' && html != 'undefined') {
        var boxHtml = ' <div class="dnh-mask-box">' +
            '<div class="dnh-mask" style="display: none"></div>' +
            '<div class="dnh-actionsheet">' +
            '<ul class="actionsheet-list">' +
            html +
            '</ul>' +
            '<ul class="actionsheet-btn">' +
            '<li id="btn-cancel" onclick="cancel()">' +
            '<span>取消</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>';
        $('body').append(boxHtml);
    }
}
//显示
function show() {
    $(".dnh-actionsheet").css("transform", 'translate(0,0)');
    $(".dnh-mask").css("display", "block");
    $(".dnh-mask").stop().animate({
        opacity: 1
    }, 300);
}

//取消按钮
function cancel() {
    $(".dnh-actionsheet").css("transform", 'translate(0,100%)');
    $(".dnh-mask").stop().animate({
        opacity: 0
    }, 300, function () {
        $(".dnh-mask").css("display", "none");
    });
}