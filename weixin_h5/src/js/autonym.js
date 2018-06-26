$(function () {

//    loadLogin_three();
//    localStorage.string_phone_number,localStorage.login_pwd

    //if (localStorage.int64_real_id_verify_status != 0) {

    //	}
    //	else
    //	{
    //		loadddata();
    //	}
    
    // 设置默认用户类型
    if(!localStorage.userBusinessType){
    	localStorage.userBusinessType = 1
    }

    setTimeout(function () {
        $(".hyzhuangkuang").find("img").click(function () {
            $("#lbl_hyzk").val($(this).attr('alt'));
            $(".hyzhuangkuang").find("img").attr("src", "images/user_detail/icon_xuanze.png");
            $(this).attr('src', 'images/user_detail/icon_xuanze_press.png');
        });
        $(".dkzhuangkuang").find("img").click(function () {
            var dkzkVal = $(this).attr('alt');
            $("#lbl_dkzk").val(dkzkVal);
            $(".dkzhuangkuang").find("img").attr("src", "images/user_detail/icon_xuanze.png");
            $(this).attr('src', 'images/user_detail/icon_xuanze_press.png');
            var loanTypeHtml = '<div class="weui_cell loan_type"> ' +
                '<div class="weui_cell_hd"> ' +
                '<label class="weui_label">贷款类型</label> ' +
                '</div> ' +
                '<div class="weui_cell_bd weui_cell_primary"> ' +
                '<select class="weui_input" id="sel_loan_type"> ' +
                '<option value="F1201">房屋按揭贷款</option> ' +
                '<option value="F1202">个人信用贷款</option> ' +
                '<option value="F1203">经营贷款</option> ' +
                '<option value="F1204">汽车贷款</option> ' +
                '<option value="F1205">教育贷款</option> ' +
                '<option value="F1206">其他贷款</option> ' +
                '</select> ' +
                '</div> ' +
                '<i class="arrow"> ' +
                '<img src="images/arrow_new.png"> ' +
                '</i> ' +
                '</div>';
            if (dkzkVal == "1") {
                $(this).parents(".float-wrap-box").append(loanTypeHtml);
            } else {
                $(".loan_type").remove();
            }
        });
        $(".zhiyezhuangk").find("img").click(function () {
            $("#lbl_zhiye").val($(this).attr('alt'));
            if ($(this).attr('alt') == 2) {
                $(".addrhindind").show();
            } else {
                $(".addrhindind").hide();
            }
            $(".zhiyezhuangk").find("img").attr("src", "images/user_detail/icon_xuanze.png");
            $(this).attr('src', 'images/user_detail/icon_xuanze_press.png');
        });
    }, 500);
    
    loadddata();
    
    LoadingOver();
});


function loadddata(data) {
	console.log("load data ....");
	// faceId 认证状态
	if(btnstatusvalue(localStorage.int64_status, 10) !== 0 && btnstatusvalue(localStorage.int64_status, 11) !== 0){
		$(".fail").hide();
		$(".success").show();

		if(localStorage.antonym_uname && localStorage.antonym_ucardcode){
			var id_num = localStorage.antonym_ucardcode;
			id_num = id_num.split('');
			id_num.splice(4, 12, " **** **** **** ");
			id_num = id_num.join('');
			$(".id_p").text(localStorage.antonym_uname + " " + id_num).show();
		}
	}
		
    if (localStorage.string_qq != '' && localStorage.string_qq != 'undefined' && localStorage.string_qq != null) {
        $("#txt_tqq").val(localStorage.string_qq);
    } else {
        $("#txt_tqq").val(localStorage.qq);
    }
//    string_education
    $("#sel-education").val(localStorage.string_education);
//    $("#txt_address").val(localStorage.antonym_addr);
    if (localStorage.antonym_addr != '' && localStorage.antonym_addr != undefined && localStorage.antonym_addr != null) {
        var allAddress = localStorage.antonym_addr;
        var addrStrspt = allAddress.split("#");
        var province = addrStrspt[0];

        var city = addrStrspt[1];

        var county = addrStrspt[2];
        var addr = addrStrspt[3];
        $("#province").val(province);
        provincedchange();
        $("#city").val(city);
        cityChange();
        $("#county").val(county);
        $("#txt_address").val(addr);
    } else {
        provincedchange();
    }


    if (localStorage.int32_married != '' && localStorage.int32_married != 'undefined' && localStorage.int32_married != null) {

        $("#lbl_hyzk").val(localStorage.int32_married);
        if (localStorage.int32_married == 1) {
            $(".hyzhuangkuang").find("img").attr("src", "images/user_detail/icon_xuanze.png");
            $(".hyzhuangkuang").find("img").eq(1).attr("src", "images/user_detail/icon_xuanze_press.png");
        } else {
            $(".hyzhuangkuang").find("img").attr("src", "images/user_detail/icon_xuanze.png");
            $(".hyzhuangkuang").find("img").eq(0).attr("src", "images/user_detail/icon_xuanze_press.png");
        }
    } else {
        $(".hyzhuangkuang").find("img").attr("src", "images/user_detail/icon_xuanze.png");
        $(".hyzhuangkuang").find("img").eq(0).attr("src", "images/user_detail/icon_xuanze_press.png");
    }
    if (localStorage.int32_stu_worker != '' && localStorage.int32_stu_worker != 'undefined' && localStorage.int32_stu_worker != null) {
//        $("#lbl_zhiye").val(localStorage.int32_stu_worker);
        if (localStorage.int32_stu_worker == 2) {
            $(".addrhindind").show();
            $(".zhiyezhuangk").find("img").attr("src", "images/user_detail/icon_xuanze.png");
            $(".zhiyezhuangk").find("img").eq(1).attr("src", "images/user_detail/icon_xuanze_press.png");
        } else {
            $(".zhiyezhuangk").find("img").attr("src", "images/user_detail/icon_xuanze.png");
            $(".zhiyezhuangk").find("img").eq(0).attr("src", "images/user_detail/icon_xuanze_press.png");
        }
    } else {
        $(".zhiyezhuangk").find("img").attr("src", "images/user_detail/icon_xuanze.png");
        $(".zhiyezhuangk").find("img").eq(0).attr("src", "images/user_detail/icon_xuanze_press.png");
    }
}

function yourname() {
    var uname = $("#txt_uname").val();
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入您的真实姓名！");
        return false;
    } else {
        var regex = /^[\u4e00-\u9fa5]{2,10}$/;
        if (!regex.test(uname)) {
            ShowMsg("姓名必须由2-10个汉字组成！");
        }
    }
}

function cardcode() {
    var ucardcode = $("#txt_cardcode").val();
    if (ucardcode == "" || ucardcode == null || ucardcode == "undefined") {
        ShowMsg("请输入您的身份证号码！");
        return false;
    } else {
        var correct = validateIdCard(ucardcode);
        if (correct == 1) {
            ShowMsg("请输入正确的身份证号码！");
            return false;
        }
    }
}

function education() {
    var education = $("#sel-education").val();
    if (education == null || education == "undefined" || education == 0) {
        ShowMsg("请选择您的学历！");
        return false;
    }
}

//function provinceblur() {
//    var province = $("#province").val();
//    if (province == null || province == "undefined" || province == 0) {
//        ShowMsg("请选择省份");
//        return false;
//    }
//}

//function cityblur() {
//    var city = $("#city").val();
//    if (city == null || city == "undefined" || city == 0) {
//        ShowMsg("请选择所属市");
//        return false;
//    }
//}

//function countyblur() {
//    var county = $("#county").val();
//    if (county == null || county == "undefined" || county == 0) {
//        ShowMsg("请选择所属区(县)");
//        return false;
//    }
//}


function yourqq() {
    var qq = $("#txt_tqq").val();
    if (qq == "" || qq == null || qq == "undefined") {
        ShowMsg("请输入您的QQ号！");
        return false;
    } else if (!regQQ.exec(qq)) {
        ShowMsg("请输入正确的QQ号！");
        return false;
    } else if (!lenRegQQ.exec(qq)) {
        ShowMsg("请输入正确的QQ号！");
        return false;
    }
}

function youraddress() {
    var addr = $("#txt_address").val();
    if (addr == "" || addr == null || addr == "undefined") {
        ShowMsg("请输入您的家庭地址！");
        return false;
    }
}

function btnautonym() {
	var type = localStorage.userBusinessType;
	
	var uname = "";
	var ucardcode = 123456;
    var qq = $("#txt_tqq").val();

    var marrid = $("#lbl_hyzk").val();
    var profess = $("#lbl_zhiye").val();
    var loaned = $("#lbl_dkzk").val();
    var education = $("#sel-education").val();
    var province = $("#province").val();
    var city = $("#city").val();
    var county = $("#county").val();
    var addr = $("#txt_address").val();
    var income = $("#income").val();
    var incomeSource = $("#income_source").val();
    var loanType;
    if (loaned == 0) {
        loanType = "";
    } else {
        loanType = $("#sel_loan_type").val();
    }
    var regCharacter = /#/g;
    
    if(btnstatusvalue(localStorage.int64_status, 10) === 0 || btnstatusvalue(localStorage.int64_status, 11) === 0){
    	ShowMsg("请进行身份识别");
    	return
    }
    
    if (regCharacter.test(addr)) {
        ShowMsg("不允许输入特殊字符，请重新输入！");
        return false;
    } else if (county == null || county == '' || county == 'undefined') {
        var allAddress = province + "#" + city + "##" + addr;
    } else {
        var allAddress = province + "#" + city + "#" + county + "#" + addr;
    }


//  if (uname == "" || uname == null || uname == "undefined") {
//      ShowMsg("请输入您的真实姓名！");
//      return false;
//  } else {
//      var regex = /^[\u4e00-\u9fa5]{2,10}$/;
//      if (!regex.test(uname)) {
//          ShowMsg("姓名必须由2-10个汉字组成！");
//          return false;
//      }
//  }

    if (education == null || education == 0 || education == "undefined") {
        ShowMsg("请选择您的学历！");
        return false;
    }

    if (income == null || income == 0 || income == "undefined") {
        ShowMsg("请选择您的收入！");
        return false;
    }

    if (incomeSource == null || incomeSource == 0 || incomeSource == "undefined") {
        ShowMsg("请选择您的收入来源！");
        return false;
    }

    if (province == null || province == "undefined" || province == 0) {
        ShowMsg("请选择省份");
        return false;
    }

    if (city == null || city == "undefined" || city == 0) {
        ShowMsg("请选择所属市");
        return false;
    }

    //if (county == null || county == "undefined" || county == 0) {
    //    ShowMsg("请选择所属区(县)");
    //    return false;
    //}

	if (qq == "" || qq == null || qq == "undefined") {
        ShowMsg("请输入您的QQ号！");
        return false;
    } else if (!regQQ.exec(qq)) {
        ShowMsg("请输入正确的QQ号！");
        return false;
    } else if (!lenRegQQ.exec(qq)) {
        ShowMsg("请输入正确的QQ号！");
        return false;
    } else {
//            if (profess == 2) {
        if (addr == "" || addr == null || addr == "undefined") {
            ShowMsg("请输入您的家庭地址！");
            return false;
        } else {
            localStorage.int32_stu_worker = profess;
            subaunotym(uname, ucardcode, qq, marrid, profess, allAddress, education, type, income, incomeSource, loaned, loanType);
        }
   }
}

/*submit to autonym*/
function subaunotym(name, id_card_no, qq, married, profession, address, education, type, income, incomeSource, loaned, loanType) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    var _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user_profile/real_id_verify";
        var _method = "POST";
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
                    switch (_datajson.code) {
                        case 0: //OK
                            localStorage.int32_auto_check_result = _datajson.data.int32_auto_check_result;
                            localStorage.int64_real_id_verify_status = _datajson.data.int64_real_id_verify_status;

                            if (type == 1) {
                                window.location.href = "credit_learntruet_ds.html";
                            } else {
                                window.location.href = "learntruet_ds.html";
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
        };
        _xmlHttpRequest.send("name=" + name + "&id_card_no=" + id_card_no + "&qq=" + qq + "&married=" + married +
            "&profession=" + profession + "&address=" + address + "&degree=" + education + "&monthlyIncome=" + income + "&incomeSource=" + incomeSource
        + "&hasloan=" + loaned + "&hisLoanType=" + loanType);
    }
}


function provincedchange(obj) {
    var provinceT = $(obj).find("option:selected").text();
    var url = urlLink + "/web/provice_data/provice";
    var data = {
        provice: provinceT
    }
    var type = "post"
    ajaxFn(url, data, provinceChangeSuccess, null, type);
}

function provinceChangeSuccess(data) {

    var cityOptionH = '<option value="0">请选择市</option>';
}


//FaceID
function getFaceToken(){
	Loading();
    $.ajax({
        url: urlLink + "/web/faceid/get_token",
        type: "get",
        xhrFields:{
          withCredentials:true
        },
        success: function (res) {
	        LoadingOver();
        	var code = res.code,
        		_data = res.data;
        	if(code === 0){
	        	var token = _data.string_token;
	        	window.location.href = "https://api.megvii.com/faceid/lite/do?token=" + token;
//	        	location.replace("https://api.megvii.com/faceid/lite/do?token=" + token)
        	}else{
        		ShowMsg(res.msg)
        	}
        },
        error: function (msg) {
        	LoadingOver();
            ShowMsg("请求失败，请稍后再试！");
        }
    });
}

























