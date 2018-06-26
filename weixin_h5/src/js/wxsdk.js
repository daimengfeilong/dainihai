/*share*/
var appID = "";
var timestamp = "";
var nonceStr = "";
var signature = "";
//var wx_title = "贷你嗨-手机贷款，想嗨就嗨！";
//wx_title = "贷你嗨提供1000-50000元的借款服务。APP一站式服务，20分钟极速信审，当天放款秒提现。";
//var wx_titlepy = "贷你嗨-手机贷款，想嗨就嗨！";
//var wx_desc = "贷你嗨提供1000-50000元的借款服务。APP一站式服务，20分钟极速信审，当天放款秒提现。";
//    "贷你嗨借款神器，钱多多惊喜多多，戳我免填邀请码：" + localStorage.string_invite_code;
var wx_title = "", wx_titlepy = "", wx_desc = "";
var wx_llinkurl = imgLink + "/share.html?vcode=" + localStorage.string_invite_code;
var wx_logo = imgLink + "/images/logo.png";
var linkurl = window.location.href;
var timeout = null; // loading timeout

$.ajax({
    url: urlLink + '/web/fieldconfigurationget/get',
    type: 'get',
    async: false,
    data: {
        int32_type: '0'
    },
    xhrFields:{
        withCredentials:true
    },
    success: function (data) {
        console.log(data);
        if (data.code == 0) {
            wx_title = data.data.string_title;
            wx_titlepy = data.data.string_title;
            wx_desc = data.data.string_content;
        } else {
            wx_title = "贷你嗨-手机分期，想嗨就嗨！";
            wx_titlepy = "贷你嗨-手机分期，想嗨就嗨！";
            wx_desc = "贷你嗨提供1000-50000元的分期服务。APP一站式服务，20分钟极速信审，当天受理秒使用。";
        }
    },
    err: function () {
        console.log('请求失败');
    }
});
function loadWXJson() {
    /*Loading();
     var timeout = setTimeout(function () {
     LoadingOver();
     top_meassage("请求超时，请稍后再试");
     show_topmessage();
     }, 30000);*/
    var vcode = GetUrlParameter("vcode");
    if (vcode != '' && vcode != null && vcode != 'undefined') {
        wx_desc = "贷你嗨提供1000-50000元的分期服务。APP一站式服务，20分钟极速信审，当天受理秒使用。";
//            "贷你嗨借款神器，钱多多惊喜多多，戳我免填邀请码：" + vcode;
        wx_llinkurl = imgLink + "/share.html?vcode=" + vcode;
    }
    if (localStorage.int32_tag == 0) {
        if ((linkurl.indexOf('home.html') > -1) || (linkurl.indexOf('myIndex.html') > -1) || (linkurl.indexOf('better.html') > -1) || (linkurl.indexOf('yreddetail.html') > -1) || (linkurl.indexOf('share.html') > -1)) {
            wx_logo = imgLink + "/images/logo_nhb.png";
            wx_title = "贷你嗨新年红包，免费领！（真的领到钱啦~）";
            wx_titlepy = "贷你嗨新年红包，免费领！（真的领到钱啦~）";
            if (vcode != '' && vcode != null && vcode != 'undefined') {
                wx_desc = "使用邀请码" + vcode + "注册[贷你嗨]，新春红包免费领~";
            } else {
                wx_desc = "使用邀请码" + localStorage.string_invite_code + "注册[贷你嗨]，新春红包免费领~";
            }
        }
    }

    var _url = window.location.href.split('#')[0];
    $.post(wxurllink + "/web/wechat/get_signature", {
        url: _url
    }, function (result) {
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
                    'chooseImage',
                    'uploadImage',
                    'downloadImage',
                    'getLocation'
                ]
            });
            wx.error(function (res) {
                console.log("configErr:" + res.errMsg);
            });
        }
    });

    wx.ready(function () {
        var shareData = {
            title: wx_title,
            desc: wx_desc,
            link: wx_llinkurl,
            imgUrl: wx_logo,
            success: function (res) {
                if ((linkurl.indexOf('home.html') > -1) || (linkurl.indexOf('myIndex.html') > -1) || (linkurl.indexOf('better.html') > -1) || (linkurl.indexOf('yreddetail.html') > -1)) {
                    if (localStorage.int32_tag == 0) {
                        localStorage.isNewYearRed = 1;
                        localStorage.isredsharei = 1;
                        if (linkurl.indexOf('isred=1') > -1) {
                            window.location.href = linkurl;
                        } else {
                            if (linkurl.indexOf('?') > -1) {
                                window.location.href = linkurl + "&isred=1";
                            } else {
                                window.location.href = linkurl + "?isred=1";
                            }
                        }
                    } else {
                        window.location.href = linkurl;
                    }
                } else {
                    window.location.href = linkurl;
                }
            },
            cancel: function (res) {
                window.location.href = linkurl;
            }
        };

        var shareDatapy = {
            title: wx_titlepy,
            desc: wx_desc,
            link: wx_llinkurl,
            imgUrl: wx_logo,
            success: function (res) {
                if ((linkurl.indexOf('home.html') > -1) || (linkurl.indexOf('myIndex.html') > -1) || (linkurl.indexOf('better.html') > -1) || (linkurl.indexOf('yreddetail.html') > -1)) {
                    if (localStorage.int32_tag == 0) {
                        localStorage.isNewYearRed = 1;
                        localStorage.isredsharei = 1;
                        if (linkurl.indexOf('isred=1') > -1) {
                            window.location.href = linkurl;
                        } else {
                            if (linkurl.indexOf('?') > -1) {
                                window.location.href = linkurl + "&isred=1";
                            } else {
                                window.location.href = linkurl + "?isred=1";
                            }
                        }
                    } else {
                        window.location.href = linkurl;
                    }
                } else {
                    window.location.href = linkurl;
                }
            },
            cancel: function (res) {
                window.location.href = linkurl;
            }
        };


        wx.onMenuShareAppMessage(shareDatapy); //朋友
        wx.onMenuShareTimeline(shareData); //朋友圈
        wx.onMenuShareQQ(shareDatapy); //QQ
        wx.onMenuShareQZone(shareDatapy); //QQZone
    });
}

// 拍照和选取图片
function chooseImageInWX(index, method) {
	//拍照crash检测
	var isCrashed = localStorage.getItem("isUploadImgCrashed");
	if(!isCrashed){
		localStorage.setItem("isUploadImgCrashed", "yes");		
	}else{
		ShowMsg("拍照失败了吗？清理一下内存，或者去下载App吧")
	}

    var index = index,
        _method = [],
        _count = 1;
    _method = method ? [method] : ['album', 'camera']; // 选择图片方式
    console.log(_method + "typeof ==" + typeof(_method));
    wx.chooseImage({
        count: _count, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: _method, // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        	//未crash
			localStorage.removeItem("isUploadImgCrashed");
			
            console.log("choose image success!");
            Loading();
            //超过100秒之后，右上角就显示“请求超时”
            timeout = setTimeout(function () {
                LoadingOver();
                top_meassage("请求超时，请稍后再试");
                show_topmessage();
            }, 100000);
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log(localIds);
            var filname = ".filname-" + index,
                cname = ".cname" + index;
            $(filname).val(localIds[0]);
            uploadImageWX(index, localIds);
        },
        fail: function (res) {
            alert("选取图片失败：" + JSON.stringify(res));
        }
    });
}

// 上传图片到微信
function uploadImageWX(index, localIds) {
    var index = index;
    wx.uploadImage({
        localId: localIds[0],
        isShowProgressTips: 0,
        success: function (res) {
            $(".cname-" + index).attr("src", localIds[0]);
//      	$(".filname-" + index).val(msg.filename);
            var serverId = res.serverId;

            // 上传图片serverId给后台
            $.ajax({
                type: "post",
                url: urlPicLink + "/upload/url",
                data: {"media_id": serverId},
                success: function (msg) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }

                    if (msg.error_message === "success") {
                        $(".filname-" + index).val(msg.filename);

                        //征信、银行流水处理
                        var _url = window.location.pathname,
                            ZXurl = /liftLimit_BankZX.html/,
                            LSurl = /liftLimit_BankLS.html/;
                        var reg = new RegExp(_url);
                        if (ZXurl.test(_url) || LSurl.test(_url)) {
                            $(".delete-" + index).parent(".content-box-right").attr("isnot", 1);
                            $(".cname-" + index).show();
                            $(".delete-" + index).show();
                            addPictureBox();
                        }

                        LoadingOver();
//	        			ShowMsg("上传成功！");
                    } else {
                        LoadingOver();
                        ShowMsg("图片上传失败，请稍后再试！");
                    }
                },
                error: function (msg) {
                    console.log(msg);
                    LoadingOver();
                    ShowMsg("网络连接失败，请稍后再试！");
                }
            });
        },
        fail: function (res) {
            LoadingOver();
            alert(JSON.stringify(res));
        }
    });
}



//获取地理位置
function getLocationWX(callback) {
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            if (callback != null && callback != '' && callback != 'undefined') {
                callback(latitude, longitude);
            }
        },
        cancel: function () {
            LoadingOver();
            ShowMsg('签到失败，请您开启地址授权权限');
        },
        fail: function (res) {
            LoadingOver();
            ShowMsg('请在手机设置里面打开微信位置权限');
        }
    });
}

