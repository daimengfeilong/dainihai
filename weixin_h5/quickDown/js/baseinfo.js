//$(document).ready(function() {
//	var strhtml = "<div id='mcover'>";
//	strhtml += "<img src='../images/wb_llq.png'>";
//	strhtml += "</div>";
//	$("body").append(strhtml);
//	if (isWeiXin()) {
//		divshow('mcover');
//	} else {
//		divhide('mcover');
//	}
//})

//function isWeiXin() {
//	var ua = window.navigator.userAgent.toLowerCase();
//	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//		return true;
//	} else {
//		return false;
//	}
//}

/*login*/
function loginclick() {
	var uname = $("#txt_phoneno").val();
	var upwd = $("#txt_phonepwd").val();
	if (uname == "" || uname == null || uname == "undefined") {
		ShowMsg("请输入您的手机号码！");
		return false;
	} else if (!regPhone.exec(uname)) {
		ShowMsg("请输入正确的手机号码！");
		return false;
	} else if (upwd == "" || upwd == null || upwd == "undefined") {
		ShowMsg("请输入您的密码！");
		return false;
	} else if (!regPwd.exec(upwd)) {
		ShowMsg("密码由6-20个字母或数字组成！");
		return false;
	} else if (upwd.length < 6 || upwd.length > 20) {
		ShowMsg("密码由6-20个字母或数字组成！");
		return false;
	} else {
		signin(uname, upwd);
	}
}


function signin(uname, upwd) {
	Loading();
	var returl = GetUrlParameter("returl");
	var timeout = setTimeout(function() {
		linkurlerror();
	}, 30000);
	_xmlHttpRequest = createXmlHttpRequest();
	if (_xmlHttpRequest != null) {
		var _url = urlLink + "/web/user/login";
		var _method = "POST";
		_xmlHttpRequest.open(_method, _url, true);
		_xmlHttpRequest.withCredentials = true;
		_xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequest.onreadystatechange = function() {
			if (_xmlHttpRequest.readyState == 4) {
				if (_xmlHttpRequest.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlHttpRequest.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK,进入个人中心   
							localStorage.isexitstno = 1;
							window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.loanhigh.cash";
							break;
						case -10004:
						case -10003:
						case 404:
						case -10002:
							ShowMsg(_datajson.msg);
							break;
						default:
							top_meassage(_datajson.msg);
							show_topmessage();
							break;
					}
					LoadingOver();
				}
			}
		}
		_xmlHttpRequest.send("username=" + uname + "&password=" + upwd );
	}
}


function registerclick() {
	var u = GetUrlParameter("code");
	if (u != '' && u != 'undefined' && u != null) {
		localStorage.code = u;
	}
	var uname = $("#txt_phoneno").val();
	var vcode = $("#txt_vcode").val();
	var upwd = $("#txt_phonepwd").val();
	var invcode = $("#txt_invcode").val();
	var type = GetUrlParameter("type");
	var name = GetUrlParameter("name");
	if (type != '' && type != 'undefined' && type != null) {
		localStorage.dwontype = type;
	}
	if (name != '' && name != 'undefined' && name != null) {
		localStorage.dwonname = name;
	}
	if (uname == "" || uname == null || uname == "undefined") {
		ShowMsg("请输入您的手机号码！");
		return false;
	} else if (!regPhone.exec(uname)) {
		ShowMsg("请输入正确的手机号码！");
		return false;
	} else if (vcode == "" || vcode == null || vcode == "undefined") {
		ShowMsg("请输入短信中的验证码！");
		return false;
	} else if (upwd == "" || upwd == null || upwd == "undefined") {
		ShowMsg("请输入您的密码！");
		return false;
	} else if (!regPwd.exec(upwd)) {
		ShowMsg("密码由6-20个字母或数字组成！");
		return false;
	} else if (upwd.length < 6 || upwd.length > 20) {
		ShowMsg("密码由6-20个字母或数字组成！");
		return false;
	} else {
		signup(uname, upwd, vcode,invcode,  "wap_wechat|" + localStorage.dwontype + "|" + localStorage.dwonname);
	}

}
/*sbumit signup*/

function signup(uname, upwd, vcode,invcode,  typename) {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	_xmlHttpRequest = createXmlHttpRequest();
	if (_xmlHttpRequest != null) {
		var _url = urlLink + "/web/user/register_withchannel";
		var _method = "POST";
		_xmlHttpRequest.open(_method, _url, true);
		_xmlHttpRequest.withCredentials = true;
		_xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequest.onreadystatechange = function() {
			if (_xmlHttpRequest.readyState == 4) {
				if (_xmlHttpRequest.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlHttpRequest.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK,进入个人中心     
							localStorage.isexitstno = 1;
							window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.loanhigh.cash";
							break;
						case -10004:
						case -10003:
						case 404:
						case -10002:
							ShowMsg(_datajson.msg);
							break;
						default:
							top_meassage(_datajson.msg);
							show_topmessage();
							break;
					}
					LoadingOver();
				}
			}
		}
		_xmlHttpRequest.send("username=" + uname + "&password=" + upwd + "&verify_code=" + vcode  + "&invite_code=" + invcode + "&channel=" + typename);
	}
}
