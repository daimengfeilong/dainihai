function addList(n){if(null!=n&&""!=n&&"undefined"!=n){var s=' <div class="dnh-mask-box"><div class="dnh-mask" style="display: none"></div><div class="dnh-actionsheet"><ul class="actionsheet-list">'+n+'</ul><ul class="actionsheet-btn"><li id="btn-cancel" onclick="cancel()"><span>取消</span></li></ul></div></div>';$("body").append(s)}}function show(){$(".dnh-actionsheet").css("transform","translate(0,0)"),$(".dnh-mask").css("display","block"),$(".dnh-mask").stop().animate({opacity:1},300)}function cancel(){$(".dnh-actionsheet").css("transform","translate(0,100%)"),$(".dnh-mask").stop().animate({opacity:0},300,function(){$(".dnh-mask").css("display","none")})}$(function(){$(document).on("click",".actionsheet-list li",function(){var n="<li>"+$(this).html()+"</li>";thisCallB(n)})});