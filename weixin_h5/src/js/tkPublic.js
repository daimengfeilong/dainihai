var regPhone = /^(((1[0-9][0-9]{1}))+\d{8})$/;
var regPhoneFax = /^((0\d{2,3}))(\d{7,8})((\d{3,}))?$/;
var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var regQQ = /^\d+(\.\d+)?$/;
var lenRegQQ = /^\d{5,12}$/;
var regPhoneLength = 11;
var regPwd = /^[a-zA-Z0-9_]+$/;
var DXType = 0;
var vtype = 0;
var nobanklist = 0;
var touchstart = "touchstart"; //"touchstart";
var app_id = "1000732";//芝麻分商户技术开发自助创建的应用标识
var loadingTimer; //loading动画定时器
var mxApiKey="ef24c4aea075411aa6bf88e7bb0e1f89";//魔蝎ApiKey
//6229180014963856

localStorage.removeItem("login_pwd");

function ajaxFn(url, parameter, successFn, failFn, type) {
    $.ajax({
        url: url,
        data: parameter,
        type: type,
        xhrFields:{
          withCredentials:true
        },
        success: function (data) {
            successFn(data);
        },
        error: function () {
        	if(failFn && typeof failFn === "function") failFn();
            $("#loadd_pageinfog").hide();
            ShowMsg("请求超时，请稍后再试！");
        }
    });
}
//后来加的公用xmlHttpRequest请求函数
function xmlHttpRequest(send, url, callback, type) {
    Loading();
//  $("#loadd_pageinfog").show();
    var timeout = setTimeout(function () {
        $("#loadd_pageinfog").hide();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    var _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = url;
        if (type == "get" || type == "GET") {
            if (send != null && send != 'undefined' && send != '') {
                _url = url + send;
            }
        }
        var _method = type;
        _xmlHttpRequest.open(_method, _url, true);
        _xmlHttpRequest.withCredentials = true;
        _xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        _xmlHttpRequest.onreadystatechange = function () {
            if (_xmlHttpRequest.readyState == 4) {
                if (_xmlHttpRequest.status == 200) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    severResponse = _xmlHttpRequest.responseText;
                    var _datajson = JSON.parse(severResponse);
                    if (callback != 'undefined' && callback != "" && callback != null) {
                        callback(_datajson);
                    }
//                  LoadingOver();
                }
            }
        }
        if (type == "post" || type == "POST") {
            _xmlHttpRequest.send(send);
        } else {
            _xmlHttpRequest.send(null);
        }

    }
}


//后来加的公用原生js请求函数
//function xmlHttpRequest(send, url, callback, type) {
//    Loading();
//    var timeout = setTimeout(function () {
//        LoadingOver();
//        top_meassage("请求超时，请稍后再试");
//        show_topmessage();
//    }, 30000);
//    _xmlHttpRequest = createXmlHttpRequest();
//    if (_xmlHttpRequest != null) {
//        var _url = urlLink + "/web/bank_card/get_list";
//        var _method = "GET";
//        _xmlHttpRequest.open(_method, _url, true);
//        _xmlHttpRequest.withCredentials = true;
//        _xmlHttpRequest.onreadystatechange = function () {
//            if (_xmlHttpRequest.readyState == 4) {
//                if (_xmlHttpRequest.status == 200) {
//                    if (timeout) {
//                        clearTimeout(timeout);
//                        timeout = null;
//                    }
//                    severResponse = _xmlHttpRequest.responseText;
//                    var _datajson = JSON.parse(severResponse);
//                    if (callback != null && callback != 'undefined' && callback != '') {
//                        callback(_datajson);
//                    } else {
//                        console.log("回调函数不可为空");
//                    }
//                }
//            }
//        }
//        console.log(send)
//        if (send != null && send != 'undefined' && send != '') {
//            _xmlHttpRequest.send(send);
//        } else {
//            _xmlHttpRequest.send(null);
//        }
//    }
//}

/*send*/
var _xmlHttpRequest;

function createXmlHttpRequest() {
    return window.XMLHttpRequest ? new XMLHttpRequest() : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
}

/*The elimination of all events, browser makes the style of the active phone work normally*/
document.addEventListener("touchstart", function (e) {
    return false;
}, true);


/*Get the URL of the value parameter*/
function GetUrlParameter(paramName, arg2) {
    var returnVal = "";
    if (arg2 == undefined) {
        arg2 = '';
    }
    try {
        var paramUrl = window.location.search;
        if (paramUrl.length > 0) {
            paramUrl = paramUrl.substring(1, paramUrl.length);
            var paramUrlArray = paramUrl.split("&");
            for (var i = 0; i < paramUrlArray.length; i++) {
                returnVal = "";
                if (paramUrlArray[i].toLowerCase().indexOf(paramName.toLowerCase()) != -1) {
                    var temp = paramUrlArray[i].split("=");
                    console.log(temp);
                    if (temp[0].toLowerCase() == paramName.toLowerCase()) {
                        for (var a = 1; a < temp.length; a++) {
                            if (a == (temp.length - 1)) {
                                returnVal += temp[a];
                            } else {
                                returnVal += temp[a] + '=';
                            }
                        }
                        break;
                    }
                } else {
                    returnVal = arg2
                }
            }
        }
    } catch (e) {
    }
    return returnVal;
}


function ShowMsg(msg) {

	if(!msg) msg = "请求失败，请稍后再试";

    var str = "<div class='information_box'>";
    str += "<div class='information_border'>";
    str += "<div class='information_Info'>";
    str += msg + "</div></div></div>";
    $("body").append(str);
    $(".information_box").fadeIn(500, function () {
        setTimeout(function () {
            $(".information_box").fadeOut(500, function () {
                $(".information_box").remove();
            });
        }, 1500);
    });

}


function LoadingOver() {
//	console.log(arguments.callee.caller.name)
    $("#loadd_pageinfog").hide();
}

function Loading(){
	$("#loadd_pageinfog").show();
//	console.log(arguments.callee.caller.name)
}

addLoading();
function addLoading() {
    var imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAADACAYAAAC09adDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2OEMzNzk0RTcwODBFNjExOTRBN0M2QzVENzRFODRERCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MTA0MTdDNEFGQjMxMUU2OEYwQUI2RThBMDBGRDUwMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MTA0MTdDM0FGQjMxMUU2OEYwQUI2RThBMDBGRDUwMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNGQjdCMjFGOEU4NEU2MTE5QjhEREFCMzIyNDhDQUMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY4QzM3OTRFNzA4MEU2MTE5NEE3QzZDNUQ3NEU4NEREIi8+IDwvcmRmOkRlc2NyaXB0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";
    var str = "<div class='looding loading' id='loadd_pageinfog'>";
    str += "<div class='loading_bg'>";
    str += "<div>"
    str += "<img src='" + imgSrc + "'>";
    str += "<ul class='loading_radio'>";
    str += "<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>";
    str += "</ul>";
    str += "</div>";
    str += "<p>努力加载中...</p>";
    str += "</div>";
    str += "</div>";

    $("body").prepend(str);
    $(".loading_radio li").addClass("hide");

    clearInterval(loadingTimer);
    var j = 0;
    var len = $(".loading_radio li").length;
    loadingTimer = setInterval(function () {
        if (j === len) j = 0;
        $(".loading_radio li").addClass("hide").eq(j).removeClass("hide");
        j++;
    }, 60);
}

$(document).ready(function () {

    $.ajaxSetup({
        cache: false //关闭AJAX相应的缓存
    });

    if (localStorage.sharefriend == '' && localStorage.sharefriend == null && localStorage.sharefriend == 'undefined') {
        localStorage.sharefriend = 0;
    }


    $('#onMenuShareAppMessage').on("touchstart", function () {
        document.getElementById('mcover').style.display = 'block';
    });

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    $('#onMenuShareTimeline').on("touchstart", function () {
        document.getElementById('mcover').style.display = 'block';
        ShareFriend();
    });

    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    $('#onMenuShareQQ').on("touchstart", function () {
        document.getElementById('mcover').style.display = 'block';
        ShareFriend();
    });

    // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
    $('#onMenuShareQZone').on("touchstart", function () {
        document.getElementById('mcover').style.display = 'block';
        ShareFriend();
    });

    $('#mcover').on({
        'touchstart': function () {
            document.getElementById('mcover').style.display = '';
        }
    });
});

function ShareFriend() {
    //wx_title = "贷你嗨借款神器，邀请码拿走";
    wx_title = "贷你嗨分期神器，钱多多惊喜多多，戳我免填邀请码：" + localStorage.string_invite_code;
    wx_titlepy = "贷你嗨";
    wx_desc = "贷你嗨分期神器，钱多多惊喜多多，戳我免填邀请码：" + localStorage.string_invite_code;
}

/*The assignment*/
var top_me;
function top_meassage(str) {
    clearTimeout(top_me);
    var shtml = "<div class=\"plaint_img_first\"><img src=\"" + imgLink + "/images/plaint.png\"/></div>";
    shtml += "<div class=\"plaint_txt_first\" >" + str + " </div>";
    shtml += "<div  class=\"plaint_img_two\" onclick=\"hide_topmessage()\"><img src=\"" + imgLink + "/images/close.png\"/></div>";
    $("#topmeassage").html(shtml);
    $("#topmeassage").show();
    top_me = setTimeout(function () {
        $("#topmeassage").hide();
    }, 5000);
}

/*show*/

function show_topmessage() {
    $("#topmeassage").show();
    setTimeout(hide_topmessage, 5000);
}

/*hide*/
function hide_topmessage() {
    $("#topmeassage").hide();
}

// 判断微信环境
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
	return false
}

// 跳转至二次引流页
function toMoreLoan(link) {
    var string_work_address = localStorage.string_work_address;
    var userAddress = string_work_address.substring(0, string_work_address.indexOf("#"));
    var uin = localStorage.int64_uin;
    var session = localStorage.tk_session;
    if (link == "" || link == null || link == undefined) {
        window.location.href = "wap/partner_list.html?address=" + userAddress +"&uin="+ uin + "&session=" + session +"&source=html5";
    } else {
        window.location.href = link + "?address=" + userAddress +"&uin="+ uin + "&session=" + session +"&source=html5";
    }

}