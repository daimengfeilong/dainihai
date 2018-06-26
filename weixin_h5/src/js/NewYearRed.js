function RED_Frist() {
	var wh = $(window).height();
	var total = 0;
	var z = setInterval(function() {
		var f = $(document).width();
		var e = Math.random() * f;
		var o = 0.3 + Math.random();
		var l = e + Math.random();
		var k = 1000 + 3000 * Math.random();
		var html = "<div class='snow'><img src=\"images/coin_single.png\"/><div>";
		$(html).clone().appendTo("#moneyhl").css({
			left: e + "px",
			opacity: o
		}).animate({
			top: (wh * 2) + "px",
			left: l + "px",
			opacity: 0.1
		}, k, "linear", function() {
			$(this).remove();
		});
		total++;
		if (total == 20) {
			clearInterval(z);
			$(".snow").remove();
			$("#red_close").show();
			var w_hb = 30;
			var k_hb = 10 + 10 * Math.random();
			var hb = setInterval(function() {
				$("#red_close").find("img").animate({
					width: w_hb + "%"
				}, k_hb);
				w_hb = w_hb + 10;
				if (w_hb == 120) {
					$("#red_close").find("img").animate({
						width: "100%"
					}, 300);
					clearInterval(hb);
				}
			}, 0);
		}
	}, 100);
}


function BtnKqRed(obj) {
	$(obj).addClass("ybhb_swing");
	setTimeout(function() {
		divhide('red_close');
		divshow('red_open');
		var w_hb = 30;
		var k_hb = 10 + 10 * Math.random();
		var hb = setInterval(function() {
			$("#dfristhb").animate({
				width: w_hb + "%"
			}, k_hb);
			w_hb = w_hb + 10;
			w_hb = w_hb == 110 ? 101 : w_hb;
			if (w_hb > 100) {
				$("#dfristhb").animate({
					width: "100%"
				}, 300);
				$(".red_open_share").fadeIn();
				$("#dfristhtooptip").fadeIn();
				$("#bh_wenhao").fadeIn();
				$("#bh_wenhao").addClass("jb_icon_question");
				clearInterval(hb);
			}
		}, 0);
	}, 350)
}


function BtnShareRed() {
	divhide("newyearreds");
	divhide('newyear_hongbao');
	divhide('red_close');
	divhide('red_open');
	divshow('ny_reddiv');
	divshow('red_shareh');
	var w_hb = 30;
	var k_hb = 10 + 10 * Math.random();
	var hb = setInterval(function() {
		$("#dsencodkhb").animate({
			width: w_hb + "%"
		}, k_hb);
		w_hb = w_hb + 10;
		w_hb = w_hb == 110 ? 101 : w_hb;
		if (w_hb > 100) {
			$("#dsencodkhb").animate({
				width: "100%"
			}, 300);
			$(".red_open_lq").fadeIn();
			$("#dsencodtooptip").fadeIn();
			$("#fx_duigou").fadeIn();
			$("#fx_duigou").addClass("jb_icon_question");
			clearInterval(hb);
		}
	}, 0);
}




function Div_Hide_TWO(D1, D2) {
	$("#" + D1).hide();
	$("#" + D2).hide();
}

function Div_Hide_Three(D1, D2, D3, X1) {
	$("#" + D1).hide();
	$("#" + D2).hide();
	$("#" + D3).hide();
	$("#" + X1).show();
}


/*是否有未领取的红包*/
function RedBagFlag() {
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlHttpRequestWD = createXmlHttpRequest();
	if (_xmlHttpRequestWD != null) {
		var _url = urlLink + "/web/commodity/red_bag_flag";
		var _method = "POST";
		_xmlHttpRequestWD.open(_method, _url, true);
		_xmlHttpRequestWD.withCredentials = true;
		_xmlHttpRequestWD.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequestWD.onreadystatechange = function() {
			if (_xmlHttpRequestWD.readyState == 4) {
				if (_xmlHttpRequestWD.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlHttpRequestWD.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK  
							if (_datajson.data.int32_active == 1) {
								divhide('red_shareh');
								$("#btnnewyred").attr("class", "my_overall");
								localStorage.int32_tag = _datajson.data.int32_tag;
								if (_datajson.data.int32_tag == 1 && localStorage.isredsharei == 1) {
									ShowMsg('您已领取过现金红包！');
									localStorage.isredsharei = 0;
								} else {
									if (_datajson.data.int32_tag == 0) {
										divshow('newyear_hongbao');
										if (window.location.href.indexOf('home.html') > -1) {
											if (localStorage.btnshred == null && localStorage.isNewYearRed == null) {
												divshow('newyearreds');
												divhide('newyear_hongbao');
											}
										}
										if (window.location.href.indexOf('yreddetail.html') > -1) {
											$("#btnnewyred").attr("class", "btn_overall");
											$("#btnnewyred").unbind();
											$("#newyear_hongbao").unbind();
											var formc = GetUrlParameter("from");
											$("#btnnewyred").bind('click', function() {
												BtnNowLq(formc);
											});
											$("#newyear_hongbao").bind('click', function() {
												BtnNowLq(formc);
											});
											if (formc != "" && formc != null && formc != 'undefined') {
												switch (formc) {
													case "iOS":
														divhide('newyear_hongbao');
														break;
												}
											}
										}
									}
								}
							}
							break;
						case -10004:
						case -10003:
							session_expired(_datajson.msg);
							break;
						case 404:
						case -10002:
							logout();
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
		_xmlHttpRequestWD.send(null);
	}
}



function BtnNowLq(formc) {
	if (formc != "" && formc != null && formc != 'undefined') {
		switch (formc) {
			case "iOS":
				window.location.href = "http://js//openHB";
				break;
			case "android":
				javaCode.call("openHB");
				break;
		}
	} else {
		divshow('newyearreds');
		divhide('newyear_hongbao');
	}
}

function loadLogin_newyeared(uname, usession, uuin) {
	Loading();
	if (localStorage.khdsession != "" && localStorage.khdsession != null && localStorage.khdsession != 'undefined') {
		if (localStorage.tk_session == 'undefined' || localStorage.tk_session == '' || localStorage.tk_session == null) {
			nyed_login(uname, usession, uuin);
		} else {
			RedBagFlag();
		}
	}
}


function nyed_login(uname, usession, uuin) {
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlHttpRequestU = createXmlHttpRequest();
	if (_xmlHttpRequestU != null) {
		var _url = urlLink + "/web/user/login_s";
		var _method = "POST";
		_xmlHttpRequestU.open(_method, _url, true);
		_xmlHttpRequestU.withCredentials = true;
		_xmlHttpRequestU.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequestU.onreadystatechange = function() {
			if (_xmlHttpRequestU.readyState == 4) {
				if (_xmlHttpRequestU.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlHttpRequestU.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK,进入个人中心   						
							var obj_sub = _datajson.data;
							if(typeof obj_sub.struct_idinfo == "undefined") obj_sub['struct_idinfo'] = '';
							
							localSave(obj_sub.string_phone_number, localStorage.code, obj_sub.tk_session, obj_sub.int64_uin, obj_sub.int64_status, obj_sub.int64_verify_status, obj_sub.int64_increase_check_status, obj_sub.int32_limit_amount, obj_sub.int32_is_set_pay_password, obj_sub.int32_market_score, obj_sub.int32_apply_status, obj_sub.int64_real_id_verify_status, obj_sub.int32_is_register, obj_sub.int32_stu_worker, obj_sub.int32_married, obj_sub.string_qq, obj_sub.string_invite_code, obj_sub.string_username, obj_sub.int32_remainday,obj_sub.struct_idinfo.string_id);
							RedBagFlag();
							break;
						default:
							var obj_sub = _datajson.data;
							if (obj_sub.openid != '' && obj_sub.openid != null && obj_sub.openid != 'undefined') {
								localStorage.openid = obj_sub.openid;
							}
							$("#top_title_sigle").html(_datajson.msg);
							$("#filesubmit").show();
							break;
					}
				}
			}
		}
		_xmlHttpRequestU.send("uin=" + uuin + "&username=" + uname + "&session=" + usession);
	}

}


function BtnLqRed() {
	divhide('newyear_hongbao');
	divhide('newyearreds');
	divhide('newyearrnewyear_hongbaoeds');
	if (parseInt(localStorage.isNewYearRed) > 0) {
		BtnShareRed();
	} else {
		divshow('moneyhl');
		divshow('ny_reddiv');
		RED_Frist();
	}
}



function AddJRedSCore() {
	if (localStorage.isNewYearRed != '' && localStorage.isNewYearRed != 'undefined' && localStorage.isNewYearRed != null) {
		if (parseInt(localStorage.isNewYearRed) > 0) {
			Loading();
			var timeout = setTimeout(function() {
				LoadingOver();
				top_meassage("请求超时，请稍后再试");
				show_topmessage();
			}, 30000);
			var _xmlHttpRequesty = createXmlHttpRequest();
			if (_xmlHttpRequesty != null) {
				var _url = urlLink + "/web/commodity/increasescore";
				var _method = "POST";
				_xmlHttpRequesty.open(_method, _url, true);
				_xmlHttpRequesty.withCredentials = true;
				_xmlHttpRequesty.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				_xmlHttpRequesty.onreadystatechange = function() {
					if (_xmlHttpRequesty.readyState == 4) {
						if (_xmlHttpRequesty.status == 200) {
							if (timeout) {
								clearTimeout(timeout);
								timeout = null;
							}
							severResponse = _xmlHttpRequesty.responseText;
							var _datajson = JSON.parse(severResponse);
							switch (_datajson.code) {
								case 0:
									divhide('red_shareh');
									divhide('ny_reddiv');
									divshow('subtooptip');
									localStorage.isNewYearRed = 0;
									RedBagFlag();
									return false;
									break;
								case -10004:
								case -10003:
									divhide('red_shareh');
									divhide('ny_reddiv');
									session_expired(_datajson.msg);
									break;
								case 404:
								case -10002:
									logout();
									break;
								case -10050:
									divhide('red_shareh');
									divhide('ny_reddiv');
									localStorage.yzcdscore = '';
									top_meassage(_datajson.msg);
									show_topmessage();
									break;
								case -10016:
									top_meassage(_datajson.msg);
									show_topmessage();
									break;
								default:
									divhide('red_shareh');
									divhide('ny_reddiv');
									top_meassage(_datajson.msg);
									show_topmessage();
									break;
							}
							LoadingOver();
						}
					}
				}
				_xmlHttpRequesty.send("score=300&int32_activity_type=2");
			}
		}
	}
}


function btnSHRed() {
	divhide('newyearreds');
	divshow('newyear_hongbao');
	localStorage.btnshred = 1;
}