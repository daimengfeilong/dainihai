/*是否提交 0，1*/
/*是否审核*/
/* 未通过0;   通过 3;   拒绝  2;  审核中 1;*/
/*新浪0，电商6，征信3，流水4*/
function IsAubitLiftLimit() {
	/*新浪*/
	//if (btnstatusvalue(localStorage.int64_increase_status, 0) == 1) {
	//	switch (btnstatusvalue(localStorage.int64_increase_status, 0)) {
	//		case 0:
	//			$("section").eq(0).find(".bank-title").html("未通过");
	//			$("section").eq(0).find(".bank-title").addClass("bank-check");
	//			break;
	//		case 1:
	//			$("section").eq(0).find(".bank-title").html("审核中");
	//			$("section").eq(0).find(".bank-title").addClass("bank-check");
	//			break;
	//		case 2:
	//			$("section").eq(0).find(".bank-title").html("拒绝");
	//			$("section").eq(0).find(".bank-title").addClass("bank-unbind");
	//			break;
	//		case 3:
	//			$("section").eq(0).find(".bank-title").html("通过");
	//			$("section").eq(0).find(".bank-title").addClass("bank-bind");
	//			break;
	//	}
	//} else {
	//	$("section").eq(0).find(".bank-title").html("尚未提交");
	//	$("section").eq(0).find(".bank-title").addClass("bank-committed");
	//	$("section").eq(0).bind("click", function() {
	//		//window.location.href = "https://api.weibo.com/oauth2/authorize?client_id=3528751628&response_type=code&redirect_uri=" + window.location.href;
	//	});
	//}


   //提升状态从服务器返回的值是320  或者4416


	//电商的二进制转码等于1  不等于1就是尚未提交      提交完之后二进制转码就是1
//	console.log(2,btnstatusvalue(localStorage.int64_increase_status, 6));

	//征信的二进制转码等于1  不等于1就是尚未提交
//	console.log(3,btnstatusvalue(localStorage.int64_increase_status, 3));

	//流水的二进制转码等于6  不等于1就是尚未提交
//	console.log(4,btnstatusvalue(localStorage.int64_increase_status, 4));


	//用来算申请状态的值，分别放到6,3,4里面去算
//	console.log(2,localStorage.int64_increase_check_status);
	//电商
//	console.log(6,btnstatusvalue(localStorage.int64_increase_check_status, 6));
	//征信
//	console.log(7,btnstatusvalue(localStorage.int64_increase_check_status, 3));
	//流水
//	console.log(8,btnstatusvalue(localStorage.int64_increase_check_status, 4));
	//alert('asd')







	/*电商*/
//	if (btnstatusvalue(localStorage.int64_increase_status, 6) == 1) {
//		//console.log('22222222');
//		$("section").eq(0).find(".bank-title").html("审核通过");
//		$("section").eq(0).find(".bank-title").addClass("bank-bind");
//		$("#jingdong").attr("src","images/icon_jt.png");

		//switch (btnstatusvalue(localStorage.int64_increase_check_status, 6)) {
        //
		//	case 0:
		//		$("section").eq(0).find(".bank-title").html("未通过");
		//		$("section").eq(0).find(".bank-title").addClass("bank-check");
		//		break;
		//	case 1:
		//		$("section").eq(0).find(".bank-title").html("审核中");
		//		$("section").eq(0).find(".bank-title").addClass("bank-check");
		//		$("section").eq(0).click(function(){
		//			window.location.href="#";
		//		});
        //
		//		$("#jingdong").attr("src","images/icon_jt.png");
        //
		//		break;
		//	case 2:
		//		$("section").eq(0).find(".bank-title").html("拒绝");
		//		$("section").eq(0).find(".bank-title").addClass("bank-unbind");
		//		break;
		//	case 3:
		//		$("section").eq(0).find(".bank-title").html("通过");
		//		$("section").eq(0).find(".bank-title").addClass("bank-bind");
		//		$("#jingdong").attr("src","images/icon_jt.png");
		//		break;
		//}
//	} else {
//		$("section").eq(0).find(".bank-title").html("尚未提交");
//		$("section").eq(0).find(".bank-title").addClass("bank-committed");
//		$("section").eq(0).bind("click", function() {
//			window.location.href="learntruet_ds2.html"
//		});
//	}
	/*征信*/
	//console.log(btnstatusvalue(localStorage.int64_increase_status, 3));
	//console.log(localStorage.int32_apply_status);   这个值只能在电商里走一次，之后就不能在征信和流水里走了！
	if (btnstatusvalue(localStorage.int64_increase_status, 3) == 1) {
		//console.log(1)
		switch (btnstatusvalue(localStorage.int64_increase_check_status, 3)) {

			//因为返回的字符串所以必须要加单引号
			case 0:
				$("section").eq(0).find(".bank-title").html("未通过");
				$("section").eq(0).find(".bank-title").addClass("bank-check");
				break;
			case 1:
				$("section").eq(0).find(".bank-title").html("审核中");
				$("section").eq(0).find(".bank-title").addClass("bank-check");
				$("section").eq(0).click(function(){
					window.location.href="#";
				});
				$("#zhengxin").attr("src","images/icon_quota_zx.png");
				break;
			case 2:
				$("section").eq(0).find(".bank-title").html("拒绝");
				$("section").eq(0).find(".bank-title").addClass("bank-unbind");
				break;
			case 3:
				$("section").eq(0).find(".bank-title").html("审核通过");
				$("section").eq(0).find(".bank-title").addClass("bank-bind");
				$("#zhengxin").attr("src","images/icon_quota_zx.png");
				break;
		}
	} else {
		$("section").eq(0).find(".bank-title").html("尚未提交");
		$("section").eq(0).find(".bank-title").addClass("bank-committed");
		$("section").eq(0).bind("click", function() {
			window.location.href="liftLimit_BankZX.html";
		});
	}
	/*流水*/
	if (btnstatusvalue(localStorage.int64_increase_status, 4) == 1) {
		//console.log(localStorage.int32_apply_status)

		//这里应该等于3，却被强行等于1
		//switch (btnstatusvalue(localStorage.int64_increase_check_status, 4)) {
		switch (btnstatusvalue(localStorage.int64_increase_check_status, 4)) {
			case 0:
				$("section").eq(1).find(".bank-title").html("未通过");
				$("section").eq(1).find(".bank-title").addClass("bank-check");
				break;
			case 1:
				$("section").eq(1).find(".bank-title").html("审核中");
				$("section").eq(1).find(".bank-title").addClass("bank-check");
				$("section").eq(1).click(function(){
					window.location.href="#";
				});
				$("#liushui").attr("src","images/icon_quota_ls.png");
				break;
			case 2:
				$("section").eq(1).find(".bank-title").html("拒绝");
				$("section").eq(1).find(".bank-title").addClass("bank-unbind");
				break;
			case 3:
				$("section").eq(1).find(".bank-title").html("审核通过");
				$("section").eq(1).find(".bank-title").addClass("bank-bind");
				$("#liushui").attr("src","images/icon_quota_ls.png");
				break;
		}
	} else {
		$("section").eq(1).find(".bank-title").html("尚未提交");
		$("section").eq(1).find(".bank-title").addClass("bank-committed");
		$("section").eq(1).bind("click", function() {
			window.location.href="liftLimit_BankLS.html";
		});
	}
}


//	if (btnstatusvalue(localStorage.int64_increase_check_status, 4) == 1) {
//		//console.log(2)
//		switch (localStorage.int32_apply_status) {
//			case 0:
//				$("section").eq(2).find(".bank-title").html("未通过");
//				$("section").eq(2).find(".bank-title").addClass("bank-check");
//				break;
//			case 1:
//				$("section").eq(2).find(".bank-title").html("审核中");
//				$("section").eq(2).find(".bank-title").addClass("bank-check");
//				$("section").eq(2).click(function(){
//					window.location.href="#";
//				});
//				$("#liushui").attr("src","images/icon_quota_ls.png");
//				break;
//			case 2:
//				$("section").eq(2).find(".bank-title").html("拒绝");
//				$("section").eq(2).find(".bank-title").addClass("bank-unbind");
//				break;
//			case 3:
//				$("section").eq(2).find(".bank-title").html("通过");
//				$("section").eq(2).find(".bank-title").addClass("bank-bind");
//				break;
//		}
//	} else {
//		$("section").eq(2).find(".bank-title").html("尚未提交");
//		$("section").eq(2).find(".bank-title").addClass("bank-committed");
//		$("section").eq(2).bind("click", function() {
//			window.location.href="liftLimit_BankLS.html";
//		});
//	}
//}

/*tocken*/
function webo_token() {
	var codes = GetUrlParameter("code");
	if (codes != "" && codes != 'undefined' && codes != null) {
//		alert(codes);

		_xmlHttpRequest = createXmlHttpRequest();
		if (_xmlHttpRequest != null) {
			var _url = "https://api.weibo.com/oauth2/access_token";
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
						LoadingOver();
					}
				}
			}
			_xmlHttpRequest.send("client_id=3528751628&client_secret=3f7257e664eb2d7b4aa9d007f0802b5f&grant_type=authorization_code&code=" + codes + "&redirect_uri=http://nwap.bycx.com/jinying/liftLimit.html");
		}


	}
}