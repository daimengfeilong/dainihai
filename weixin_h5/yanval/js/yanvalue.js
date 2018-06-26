function UserData(yzpic) {
	localStorage.YzUserID = yzpic.MD5();
	localStorage.YZPic = yzpic;
}


/*sub pic load data*/
function loadwsan_datapic(pinsrc) {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 70000);
	var _xmlHttpRequestp = createXmlHttpRequest();
	if (_xmlHttpRequestp != null) {
		var _url = urlPicLink + "/upload/bytes";
		var _method = "POST";
		_xmlHttpRequestp.open(_method, _url, true);
		_xmlHttpRequestp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		_xmlHttpRequestp.onreadystatechange = function() {
			if (_xmlHttpRequestp.readyState == 4) {
				if (_xmlHttpRequestp.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponsepic = _xmlHttpRequestp.responseText;
					var _datajsonpic = JSON.parse(severResponsepic);
					switch (_datajsonpic.result_code) {
						case 0: //OK 
							UserData(_datajsonpic.url);
							window.location.href = "scan.html";
							break;
						default:
							if (_datajsonpic.error_message == "undefined") {
								top_meassage('服务器忙，请稍后再试');
								show_topmessage();
							} else {
								top_meassage(_datajsonpic.error_message);
								show_topmessage();
							}
							break;
					}
					LoadingOver();
				}
			}
		}
		_xmlHttpRequestp.send("bytes=" + pinsrc.split(",")[1] + "&type=png&encoder=urlbaes64");
	}
}



function AddPicYanzhi() {
	$(".scan_bg_tm").hide();
	$(".scan_divt_msg").hide();
	$("#pic").attr("src", localStorage.YZPic);
	var facecomment = {};
	facecomment.uid = localStorage.YzUserID;
	facecomment.url = localStorage.YZPic;
	Query_JK(facecomment);
}


function Query_JK(facecomment) {
	var timeout = setTimeout(function() {
		LoadingOver();
		//		top_meassage("请求超时，请稍后再试");
		//		show_topmessage();
		$(".scan_bg_tm").show();
		$(".scan_divt_msg").show();
	}, 30000);
	$.post(urlFaceLink + "/face_recognition_query", $.toJSON(facecomment), function(dataresult) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		switch (dataresult.code) {
			case 0: //OK 
				var objquery = dataresult.data;
				localStorage.YZIndex = objquery.index;
				localStorage.YZmaxscore = parseInt(objquery.max_score * 100);
				localStorage.YZreturnUID = objquery.uid;
				history.pushState(null, null, "index.html");
				console.log(parseInt(objquery.index) <= 0);
				console.log(localStorage.YZmaxscore);
				GetPicName(objquery.index);
				if (parseInt(objquery.index) <= 0) {
					$(".scan_bg_tm").show();
					$(".scan_divt_msg").show();
				} else {
					window.location.href = "final.html";
				}
				break;
			default:
				$(".scan_bg_tm").show();
				$(".scan_divt_msg").show();
				break;
		}
	});
}



function GetPicName(index) {
	switch (index) {
		case "1":
			localStorage.YZrstarname = "高晓松";
			break;
		case "2":
			localStorage.YZrstarname = "胡歌";
			break;
		case "3":
			localStorage.YZrstarname = "刘德华";
			break;
		case "4":
			localStorage.YZrstarname = "鹿晗";
			break;
		case "5":
			localStorage.YZrstarname = "王俊凯";
			break;
		case "6":
			localStorage.YZrstarname = "郑凯";
			break;
		case "7":
			localStorage.YZrstarname = "陈意涵";
			break;
		case "8":
			localStorage.YZrstarname = "郭采洁";
			break;
		case "9":
			localStorage.YZrstarname = "韩红";
			break;
		case "10":
			localStorage.YZrstarname = "刘亦菲";
			break;
		case "11":
			localStorage.YZrstarname = "小S";
			break;
		case "12":
			localStorage.YZrstarname = "谢依霖";
			break;
	}
	console.log(localStorage.YZrstarname);
}


function LoadYZScore() {
	if (localStorage.YzUserID == localStorage.YZreturnUID) {
		$("#pic").attr("src", localStorage.YZPic);
		$("#yzxiangshidu").html(localStorage.YZmaxscore);
		$("#markscore").html(parseInt(80 + 20 * (localStorage.YZmaxscore / 100)));
		$("#jfscore").html(parseInt((80 + 20 * (localStorage.YZmaxscore / 100)) * 2));
		console.log(localStorage.YZIndex);
		switch (localStorage.YZIndex) {
			case "1":
				$("#star").attr("src", "img/port_gxs.jpg");
				$("#starname").html("高晓松");
				localStorage.YZrstarname = "高晓松";
				break;
			case "2":
				$("#star").attr("src", "img/port_hg.jpg");
				$("#starname").html("胡歌");
				localStorage.YZrstarname = "胡歌";
				break;
			case "3":
				$("#star").attr("src", "img/port_ldh.jpg");
				$("#starname").html("刘德华");
				localStorage.YZrstarname = "刘德华";
				break;
			case "4":
				$("#star").attr("src", "img/port_lh.jpg");
				$("#starname").html("鹿晗");
				localStorage.YZrstarname = "鹿晗";
				break;
			case "5":
				$("#star").attr("src", "img/port_wjk.jpg");
				$("#starname").html("王俊凯");
				localStorage.YZrstarname = "王俊凯";
				break;
			case "6":
				$("#star").attr("src", "img/port_zk.jpg");
				$("#starname").html("郑凯");
				localStorage.YZrstarname = "郑凯";
				break;
			case "7":
				$("#star").attr("src", "img/port_cyh.jpg");
				$("#starname").html("陈意涵");
				localStorage.YZrstarname = "陈意涵";
				break;
			case "8":
				$("#star").attr("src", "img/port_gcj.jpg");
				$("#starname").html("郭采洁");
				localStorage.YZrstarname = "郭采洁";
				break;
			case "9":
				$("#star").attr("src", "img/port_hh.jpg");
				$("#starname").html("韩红");
				localStorage.YZrstarname = "韩红";
				break;
			case "10":
				$("#star").attr("src", "img/port_lyf.jpg");
				$("#starname").html("刘亦菲");
				localStorage.YZrstarname = "刘亦菲";
				break;
			case "11":
				$("#star").attr("src", "img/port_xs.jpg");
				$("#starname").html("小S");
				localStorage.YZrstarname = "小S";
				break;
			case "12":
				$("#star").attr("src", "img/port_xyl.jpg");
				$("#starname").html("谢依霖");
				localStorage.YZrstarname = "谢依霖";
				break;
		}
		console.log(localStorage.YZrstarname);
	}
}


function ShareVal(index) {
	console.log(index);
	switch (index) {
		case "1":
			$("#star").attr("src", "img/port_gxs.jpg");
			$("#starname").html("高晓松");
			localStorage.YZrstarname = "高晓松";
			break;
		case "2":
			$("#star").attr("src", "img/port_hg.jpg");
			$("#starname").html("胡歌");
			localStorage.YZrstarname = "胡歌";
			break;
		case "3":
			$("#star").attr("src", "img/port_ldh.jpg");
			$("#starname").html("刘德华");
			localStorage.YZrstarname = "刘德华";
			break;
		case "4":
			$("#star").attr("src", "img/port_lh.jpg");
			$("#starname").html("鹿晗");
			localStorage.YZrstarname = "鹿晗";
			break;
		case "5":
			$("#star").attr("src", "img/port_wjk.jpg");
			$("#starname").html("王俊凯");
			localStorage.YZrstarname = "王俊凯";
			break;
		case "6":
			$("#star").attr("src", "img/port_zk.jpg");
			$("#starname").html("郑凯");
			localStorage.YZrstarname = "郑凯";
			break;
		case "7":
			$("#star").attr("src", "img/port_cyh.jpg");
			$("#starname").html("陈意涵");
			localStorage.YZrstarname = "陈意涵";
			break;
		case "8":
			$("#star").attr("src", "img/port_gcj.jpg");
			$("#starname").html("郭采洁");
			localStorage.YZrstarname = "郭采洁";
			break;
		case "9":
			$("#star").attr("src", "img/port_hh.jpg");
			$("#starname").html("韩红");
			localStorage.YZrstarname = "韩红";
			break;
		case "10":
			$("#star").attr("src", "img/port_lyf.jpg");
			$("#starname").html("刘亦菲");
			localStorage.YZrstarname = "刘亦菲";
			break;
		case "11":
			$("#star").attr("src", "img/port_xs.jpg");
			$("#starname").html("小S");
			localStorage.YZrstarname = "小S";
			break;
		case "12":
			$("#star").attr("src", "img/port_xyl.jpg");
			$("#starname").html("谢依霖");
			localStorage.YZrstarname = "谢依霖";
			break;
	}
	console.log(localStorage.YZrstarname);
}


function win_urlopen() {
	if (localStorage.fromdata != "" && localStorage.fromdata != null && localStorage.fromdata != 'undefined') {
		switch (localStorage.fromdata) {
			case "iOS":
				window.location.href = "http://js//addScore$" + BASE64.encoder($("#jfscore").html()) + "";
				break;
			case "android":
				javaCode.call("android_add_Integral", "" + $("#jfscore").html() + "");
				break;
		}
	} else {
		window.location.href = imgLink + "/register.html?yzscore=" + $("#jfscore").html();
	}
}


function win_shareurlopen() { 
	var detailm = "我与" + localStorage.YZrstarname + "的相似度为" + localStorage.YZmaxscore + "%，惊为天人！戳戳戳~~~~";
	var detaildesc = "你的颜值有多高！明星脸戳戳戳~~~~~";
	var detaillinkurl = imgLink + "/yanval/share.html?index=" + localStorage.YZIndex + "&yzscore=" + localStorage.YZmaxscore + "&yzpic=" + escape(localStorage.YZPic) + "&type=fxy";
	if (localStorage.fromdata != "" && localStorage.fromdata != null && localStorage.fromdata != 'undefined') {
		switch (localStorage.fromdata) {
			case "iOS": 
				window.location.href ="http://js//share$" + BASE64.encoder(detailm)+ "$" + BASE64.encoder(detaildesc) + "$" + BASE64.encoder(detaillinkurl) + ""; //
				break;
			case "android":
				javaCode.call("android_share", "" + detailm + "", "" + detaildesc + "", detaillinkurl);
				break;
		}
	} else {
		window.location.href = imgLink + "/yanval/share.html?index=" + localStorage.YZIndex + "&yzscore=" + localStorage.YZmaxscore + "&yzpic=" + escape(localStorage.YZPic);
	}
}

function win_urlopen_i() {
	history.pushState(null, null, "index.html");
	window.location.href = "index.html";
}

function ClearLocal() {
	localStorage.YZIndex = null;
	localStorage.yzcdscore = null;
	localStorage.YZmaxscore = null;
	localStorage.YZPic = null;
	localStorage.YZreturnUID = null;
	localStorage.YZrstarname = null;
	localStorage.YzUserID = null;
}