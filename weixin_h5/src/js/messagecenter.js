//窗口滚动
var mheight = 0;
var C_mheight = 0;
window.scrollTo(0, 0);
$(window).scroll(function() {
	mheight = $(window).scrollTop();
});

function Div_IDQh(xs, yc, yce, type) {
	$("#" + xs).show();
	$("#" + yc).hide();
	$("#" + yce).hide();
	if (type == 0) {
		$("body").animate({
			scrollTop: "0px"
		});
	} else {
		$("body").animate({
			scrollTop: C_mheight + "px"
		});
	}
}




function LoadDataList() {
	Loading();
//    get_message_list(2);
	get_message_list(1);
	setTimeout(function() {
		get_message_list(2);
	}, 500);
	setTimeout(function() {
		get_message_list(3);
	}, 900);
}


/*获取消息列表*/
function get_message_list(msgtype) {
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlHttpRequestxl = createXmlHttpRequest();
	if (_xmlHttpRequestxl != null) {
		var _url = urlLink + "/web/message/get_message_list";
		var _method = "POST";
		_xmlHttpRequestxl.open(_method, _url, true);
		_xmlHttpRequestxl.withCredentials = true;
		_xmlHttpRequestxl.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequestxl.onreadystatechange = function() {
			if (_xmlHttpRequestxl.readyState == 4) {
				if (_xmlHttpRequestxl.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlHttpRequestxl.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK
							switch (msgtype) {
								case 1:
									NewActiveList(_datajson.data);
//                                    console.log(_datajson.data,1)
									break
								case 2:
									MyMessageList(_datajson.data);
//                                    console.log(_datajson.data,2)
									break;
								case 3:
									SystemNoticeList(_datajson.data);
//                                    console.log(_datajson.data,3)
									break;
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
				}
			}
		}
		_xmlHttpRequestxl.send("msg_type=" + msgtype + "&max_mess_id=0");
	}
}


/*最新活动*/
function NewActiveList(data) {
	var newhtml = "";
	if (data.mess_info_list != null) {
		$.each(data.mess_info_list, function(i, item) {
			newhtml += "<div class=\"msgnew_div\">";
			newhtml += "<div class=\"msgnew_divfirst\">";
			newhtml += "<a href=" + item.string_url + ">";
			newhtml += "<div class=\"msg_pic\"><img src=\"";
			if (item.string_pic_address != '') {
				newhtml += item.string_pic_address;
			} else {
				newhtml += "images/banner_loading.png";
			}
			newhtml += "\" /></div>";
			newhtml += "<div class=\"msg_title\"><div class=\"msg_titleilist\">" + item.string_title + "</div><img src=\"images/icon_arrow@2x.png\" /></div>";
			newhtml += "</a>";
			newhtml += "</div>";
			newhtml += "<div class=\"msgnew_divsencod\">";
			newhtml += "<img src=\"images/icon_small_clock.png\" />" + item.string_start_time + "~" + item.string_end_time + "";
			if (item.int32_is_active == 0) {
				newhtml += " <i class=\"msg_i_hong\">活动进行中";
			} else {
				newhtml += " <i class=\"\">活动已结束";
			}
			newhtml += "</i></div>";
			newhtml += "</div>";
		});
		newhtml += "<div class=\"msg_nodata_no\">";
		newhtml += "<img src=\"images/lion_non.png\" />";
		newhtml += "<p>没有更多的内容了</p>";
		newhtml += "</div>";
	} else {
		newhtml += "<div class=\"msg_nodata\">";
		newhtml += "<img src=\"images/lion_non.png\" />";
		newhtml += "<p>没有更多内容了</p>";
		newhtml += "</div>";
	}
	$(".mnewlist1").html(newhtml);
	LoadingOver();
}



/*我的消息*/
function MyMessageList(data) {
	var nmsghtml = "";
	if (data.mess_info_list != null) {
		nmsghtml = "<div class=\"msg_mymsglist\">";
		nmsghtml += "<ul class=\"msg_mymsglistul\">";
		$.each(data.mess_info_list, function(i, item) {
			if (item.int32_is_read == 1) {
				nmsghtml += "<li class=\"li_msgwd\"";
			} else {
				nmsghtml += "<li class=\"li_msgyd\"";
			}
			nmsghtml += " onclick=\"btnWinInfo(" + item.int32_msg_id + ",this,2)\">";
			nmsghtml += "<div class=\"li_msgfrist\">";
			nmsghtml += "<p><i class=\"xt_i_left\">" + item.string_title + "</i>";
			if (item.int32_is_read == 1) {
				nmsghtml += "<i class=\"i_msg_wd f_left\"></i></p>";
			} else {
				nmsghtml += "<i class=\"i_msg_wd f_left hide_mian_page\"></i></p>";
			}
			nmsghtml += "<p class='times'>" + item.string_start_time + "</p>";
			nmsghtml += "<p>" + item.string_describe + "</p>";
			nmsghtml += "</div>";
			nmsghtml += "<div class=\"li_msgsecond\"><img src=\"images/arr-right.png\" /></div>";
			nmsghtml += "</li>";
		});
		nmsghtml += "</ul>";
		nmsghtml += "</div>";
	} else {
		nmsghtml += "<div class=\"msg_nodata\">";
		nmsghtml += "<img src=\"images/lion_non.png\" />";
		nmsghtml += "<p>没有更多内容了</p>";
		nmsghtml += "</div>";
	}
	$(".mnewlist2").html(nmsghtml);
}
/*系统公告*/
function SystemNoticeList(data) {
	var smsghtml = "";
	if (data.mess_info_list != null) {
		smsghtml = "<div class=\"msg_mymsglist\">";
		smsghtml += "<ul class=\"msg_mymsglistul\">";
		$.each(data.mess_info_list, function(i, item) {
			if (item.int32_is_read == 1) {
				smsghtml += "<li class=\"msg_xt_wd\"";
			} else {
				smsghtml += "<li class=\"msg_xt_yd\"";
			}
			smsghtml += " onclick=\"btnWinInfo(" + item.int32_msg_id + ",this,3)\">";
			smsghtml += "<div class=\"msg_xt_icon\"><img src=\"images/";
			if (item.int32_is_read == 1) {
				smsghtml += "icon_notice.png\"";
			} else {
				smsghtml += "icon_notice_non.png\"";
			}
			smsghtml += "/></div>";
			smsghtml += "<div class=\"msg_xt_first\">";
			smsghtml += "<p>" + item.string_title + "</p>";
			smsghtml += "<p>" + item.string_start_time + "</p>";
			smsghtml += "</div>";
			smsghtml += "<div class=\"msg_xt_arright\"><img src=\"images/arr-right.png\" /></div>";
			smsghtml += "</li>";
		});
		smsghtml += "</ul>";
		smsghtml += "</div>";
	} else {
		smsghtml += "<div class=\"msg_nodata\">";
		smsghtml += "<img src=\"images/lion_non.png\" />";
		smsghtml += "<p>没有更多内容了</p>";
		smsghtml += "</div>";
	}
	$(".mnewlist3").html(smsghtml);
}


/*查看*/
function btnWinInfo(msgid, obj, msgtype) {
	read_message(msgid, obj, msgtype);
	get_message_detail(msgid, msgtype);
	C_mheight = mheight;
	if (msgtype == 3) {
		Div_IDQh('maincontentsecond', 'maincontentthree', 'maincontentfrist', 0);
	} else {
		Div_IDQh('maincontentthree', 'maincontentsecond', 'maincontentfrist', 0);
	}

}


/*将消息标为已读*/
function read_message(msgid, obj, msgtype) {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlHttpRequestread = createXmlHttpRequest();
	if (_xmlHttpRequestread != null) {
		var _url = urlLink + "/web/message/read_message";
		var _method = "POST";
		_xmlHttpRequestread.open(_method, _url, true);
		_xmlHttpRequestread.withCredentials = true;
		_xmlHttpRequestread.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequestread.onreadystatechange = function() {
			if (_xmlHttpRequestread.readyState == 4) {
				if (_xmlHttpRequestread.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlHttpRequestread.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK
							switch (msgtype) {
								case 2:
									$(obj).find(".i_msg_wd").hide();
									$(obj).attr("class", "li_msgyd");
									$("#mymsgmenuwd").hide();
									if (btnstatusvalue(_datajson.data.int32_read_point, 2) == 1) {
										$("#mymsgmenuwd").show();
									}
									break;
								case 3:
									$(obj).attr("class", "msg_xt_yd");
									$(obj).find(".msg_xt_icon").find("img").attr("src", "images/icon_notice_non.png");
									$("#mynoticemenuwd").hide();
									if (btnstatusvalue(_datajson.data.int32_read_point, 3) == 1) {
										$("#mynoticemenuwd").show();
									}
									break;
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
		_xmlHttpRequestread.send("msg_id=" + msgid);
	}
}


function get_message_detail(msgid, msgtype) {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlHttpRequestdetail = createXmlHttpRequest();
	if (_xmlHttpRequestdetail != null) {
		var _url = urlLink + "/web/message/get_message_detail";
		var _method = "POST";
		_xmlHttpRequestdetail.open(_method, _url, true);
		_xmlHttpRequestdetail.withCredentials = true;
		_xmlHttpRequestdetail.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequestdetail.onreadystatechange = function() {
			if (_xmlHttpRequestdetail.readyState == 4) {
				if (_xmlHttpRequestdetail.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlHttpRequestdetail.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK
							var _datasub = _datajson.data;
							if (msgtype == 3) {
								$("#detail_title").html(_datasub.string_title);
								$("#detail_time").html(_datasub.string_start_time);
								$(".detailli_msg_content").html(_datasub.string_content);
							} else {
								$("#mymsgtitle").html(_datasub.string_title);
								$("#mymsgtime").html(_datasub.string_start_time);
								$("#mymsgcontent").html(_datasub.string_content);
								var linkurl = "#";
								/*1--我的资料  2--提现  3--我的积分  4--菜单-我的*/
								switch (_datasub.int32_operation) {
									case 1:
										$("#msglinkurl").show();
										linkurl = "check_status.html";
										break;
									case 2:
										if (localStorage.int32_apply_status == 3) {
											$("#msglinkurl").show();
											linkurl = "javascript:KS_XX_IsBankNo();"; // ;"rapiddeposit.html";
										} else {
											$("#msglinkurl").hide();
										}
										break;
									case 3:
										$("#msglinkurl").show();
										linkurl = "mypoints.html";
										break;
									case 4:
										$("#msglinkurl").show();
										linkurl = "myIndex.html";
										break;
                                    case 6:
                                        $("#msglinkurl").show();
                                        linkurl='inviteFriends.html'
                                        break;
									case 0:
										$("#msglinkurl").hide();
										break;
								}
								$("#msglinkurl").attr("href", linkurl);
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
		_xmlHttpRequestdetail.send("msg_id=" + msgid);
	}
}



function KS_XX_IsBankNo() {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	_xmlHttpRequest = createXmlHttpRequest();
	if (_xmlHttpRequest != null) {
		var _url = urlLink + "/web/bank_card/has_bind_card";
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
						case 0: //OK    
							if (_datajson.data.bind == 0) {
								divshow('nobankcard');
							} else {
								checkno_xx_loanorder();
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
		_xmlHttpRequest.send(null);
	}
}


function checkno_xx_loanorder() {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	_xmlHttpRequest = createXmlHttpRequest();
	if (_xmlHttpRequest != null) {
		var _url = urlLink + "/web/loan/check_order";
		var _method = "GET";
		_xmlHttpRequest.open(_method, _url, true);
		_xmlHttpRequest.withCredentials = true;
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
						case 0: //OK    
							if (_datajson.data.string_order_number != '' && _datajson.data.string_order_number != null && _datajson.data.string_order_number != 'undefined') {
								divshow('udoneloan');
							} else {
								window.location.href = "rapiddeposit.html";
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
		_xmlHttpRequest.send(null);
	}
}



function btnaddbenkpay_xx() {
	if (localStorage.int32_is_set_pay_password != null) {
		localStorage.urllintype = "bank";
		if (localStorage.int32_is_set_pay_password == 0) {
//			History.pushState(null, null, 'myIndex.html');
			window.location.href = 'paypwd.html';
		} else {
//			History.pushState(null, null, 'brandcard.html');
			window.location.href = 'add_bankcard.html';
		}

	}
}



function loaddatainfoxx(uname, usession, uuin, msgid, type) {
	Loading();
	if (localStorage.khdsession != "" && localStorage.khdsession != null && localStorage.khdsession != 'undefined') {
		if (localStorage.tk_session == 'undefined' || localStorage.tk_session == '' || localStorage.tk_session == null) {
			xxinfo_login(uname, usession, uuin, msgid, type);
		} else {
			if (msgid != '' && msgid != null && msgid != 'undefined') {
				read_message(msgid, null, 0);
				get_message_detail(msgid, type);
			}
		}
	}
}



function xxinfo_login(uname, usession, uuin, msgid, type) {
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
							if (msgid != '' && msgid != null && msgid != 'undefined') {
								read_message(msgid, null, 0);
								get_message_detail(msgid, type);
							}
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