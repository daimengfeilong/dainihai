/*share*/
var appID = "";
var timestamp = "";
var nonceStr = "";
var signature = "";
var wx_title;
var wx_titlepy;
var wx_desc;
var wx_llinkurl;
var wx_logo = imgLink + "/images/yzlogo.jpg";
$(document).ready(function() {
	setTimeout(wxLoad, 1000);
});


function wxLoad() {
	wx_title = "我与" + localStorage.YZrstarname + "的相似度为" + localStorage.YZmaxscore + "%，惊为天人！戳戳戳~~~~";
	wx_titlepy = "我与" + localStorage.YZrstarname + "的相似度为" + localStorage.YZmaxscore + "%，惊为天人！戳戳戳~~~~";
	wx_desc = "你的颜值有多高！明星脸戳戳戳~~~~~";
	wx_llinkurl = imgLink + "/yanval/share.html?index=" + localStorage.YZIndex + "&yzscore=" + localStorage.YZmaxscore + "&yzpic=" + escape(localStorage.YZPic)+"&type=fxy";

	$.post(wxurllink + "/web/wechat/get_signature", {
		url: window.location.href
	}, function(result) {
		var datat = $.toJSON(result);
		var obj = jQuery.parseJSON(datat);
		if (obj.code == 0) {
			var datat_p = $.toJSON(obj.data);
			var obj_p = jQuery.parseJSON(datat_p);
			timestamp = obj_p.timestamp;
			nonceStr = obj_p.noncestr;
			signature = obj_p.signature;
			appID = obj_p.appid;
			wx.config({
				debug: false,
				appId: appID,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareQZone',
					'hideOptionMenu'
				]
			});
			wx.error(function(res) {
				console.log(res.errMsg);
			});
		}
	});
	wx.ready(function() {
		var linkurl = window.location.href;
		if ((linkurl.indexOf('share.html') > -1)) {
			console.log(wx_llinkurl);
			var shareData = {
				title: wx_title,
				desc: wx_desc,
				link: wx_llinkurl,
				imgUrl: wx_logo,
				success: function(res) {
					window.location.href=linkurl;
				},
				cancel: function(res) {
					window.location.href=linkurl;
				}
			};

			var shareDatapy = {
				title: wx_titlepy,
				desc: wx_desc,
				link: wx_llinkurl,
				imgUrl: wx_logo,
				success: function(res) {
					window.location.href=linkurl;
				},
				cancel: function(res) {
					window.location.href=linkurl;
				}
			};
			wx.onMenuShareAppMessage(shareDatapy); //朋友
			wx.onMenuShareTimeline(shareData); //朋友圈
			wx.onMenuShareQQ(shareDatapy); //QQ
			wx.onMenuShareQZone(shareData); //QQZone
			wx.showOptionMenu();
		} else {
			wx.hideOptionMenu();
		}
	});
}