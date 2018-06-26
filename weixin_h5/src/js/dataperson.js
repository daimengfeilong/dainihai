$(document).ready(function () {
    if (localStorage.bycxtooptip == 0) {
//        divshow('tipsaddedu');
        $("#tipsaddedu").show();
    } else {
        $("#tipsaddedu").hide();
    }
    loadLogin_three();
    divshow('loadd_pageinfog');
//	Loading();
//    if (localStorage.int32_stu_worker != 1) {
//        var strhtml = "";
//        strhtml += "<div class=\"swiper-slide wodrkinfo_data\">";
//        strhtml += "<div class=\"swiper_yuan swiper_6\" onclick=\"btnOpenDatainfo(6)\">";
//        strhtml += "<div class=\"base_return_img bgpic6\"></div>";
//        strhtml += "<div class=\"swiper_yuan_header\">";
//        strhtml += "<div>工作信息</div>";
//        strhtml += "<div>您的财富生产力</div>";
//        strhtml += "</div>";
//        strhtml += "<div class=\"swiper_yuan_pic\"><img src=\"images/profile_job_03.png\" /></div>";
//        strhtml += " <div class=\"swiper_yuan_button\"><button class=\"swiper-btn swiper-btn-6\">立即填写</button></div>";
//        strhtml += "</div>";
//        strhtml += "</div>";
//        $(".swiper-slide-5").after(strhtml);
//    }
    get_all_status(infoCallBack, null, null);


    var marriedhtml = "";
    if (localStorage.int32_stu_worker == 1) {
        marriedhtml += "<option value=\"0\" selected=\"selected\">请选择</option>";
        marriedhtml += "<option value=\"1\">父亲</option>";
        marriedhtml += "<option value=\"2\">母亲</option>";
        marriedhtml += "<option value=\"4\">亲戚</option>";
    } else {
        marriedhtml += "<option value=\"0\" selected=\"selected\">请选择</option>";
        marriedhtml += "<option value=\"6\">同事</option>";
    }
//    $("#drp_mangxe").html(marriedhtml);
    setTimeout(function () {
        loaddatawsd();
    }, 500);
    if (localStorage.int32_apply_status != 0) {
        $("#wanshan").attr("src", "images/progress3.png");
    }
    setInterval(function () {

        if (localStorage.int32_limit_amount != null && localStorage.int32_limit_amount != '' && localStorage.int32_limit_amount != 'undefined' && localStorage.int32_limit_amount != 'NaN') {
            $(".liamount").html(localStorage.int32_limit_amount);
        } else {
            $(".liamount").html(2500);
        }
        $("#txt_phoneno").val(localStorage.string_phone_number);
        $("#lbl_phoneno").html(localStorage.string_phone_number);
        $('#bj_phoneno').text(localStorage.string_phone_number);
        $('#txt_bjphoneno').val(localStorage.string_phone_number);
    }, 500);
    //setTimeout(loaddatawsd, 500);
    setInterval(everytimec, 500);
//    everytimec();
    setTimeout(function () {
        divhide('loadd_pageinfog');
    }, 500);
    setTimeout(function () {
        init(1);
        init(2);
        init(3);
    }, 1000);
    LoadingOver();



});
// 请求查看抽奖活动是否开启
//var is_luck_draw = "";
//$.ajax({
//    url: urlLink + '/web/user_profile/promotion_status?method=0&kind=1',
//    type: 'get',
//    async: false,
//    xhrFields: {
//        withCredentials:true
//    },
//    success: function (data) {
//        is_luck_draw = data.data.int32_status;
//    },
//    err: function (err) {
//        console.log(err);
//    }
//});
//function lCallBack() {
//    alert("1---" + localStorage.int32_limit_amount);
//    $(".liamount").html(localStorage.int32_limit_amount);
//    $("#txt_phoneno").val(localStorage.string_phone_number);
//    $("#lbl_phoneno").html(localStorage.string_phone_number);
//}

//用于通话详单重新发送倒计时
var wait = 45;

function repeatTime(o) {
    if (wait == 0) {
        $("#" + o).bind("click", function () {
            repeatMessage();
        });
        $("#" + o).html("重新发送");
        $("#" + o).attr("class", "hq_message");
        wait = 45;
    } else {
        $("#" + o).unbind();
        $("#" + o).attr("class", "hq_message_gray");
        $("#" + o).html("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            repeatTime(o)
        }, 1000);
    }
}

function repeatMessage() {
    var phone = $("#txt_phoneno").val();
    var upwd = $("#txt_serverpwd").val();
    var vode = $("#txt_vcode").val();
    if (phone == "" || phone == null || phone == "undefined") {
        ShowMsg("请输入您的手机号码");
        return false;
    } else if (!regPhone.exec(phone)) {
        ShowMsg("请输入正确的手机号码");
        return false;
    } else {
        get_message_code(phone, upwd, vode);
    }
}

function get_message_code(phone, upwd, vode) {
    Loading();
    sub_moblieaccount(phone, upwd, vode);
}


function btnbycxttsk() {
    localStorage.bycxtooptip = -1;
//    divhide('tipsaddedu');
    $("#tipsaddedu").hide();
}
//判断完善资料每个的状态
function loaddatawsd() {
    if (localStorage.int64_status != null) {
        if (btnstatusvalue(localStorage.int64_status, 1) == 1) {
            switch (btnstatusvalue(localStorage.int64_verify_status, 1)) {
                case 0:
                    $(".bgpic1").html("<img src=\"images/base_return.png\" />");
                    break;
                case 3:
                    $(".bgpic1").html("<img src=\"images/base_qualified.png\" />");
                    break;
                default:
                    $(".bgpic1").html("<img src=\"images/base_submit.png\" />");
                    break;
            }
            btnaubitstatus(1, 1);
        }
        if (btnstatusvalue(localStorage.int64_status, 6) == 1) {

            switch (btnstatusvalue(localStorage.int64_verify_status, 6)) {
                case 0:
                    $(".bgpic2").html("<img src=\"images/base_return.png\" />");
                    break;
                case 3:
                    $(".bgpic2").html("<img src=\"images/base_qualified.png\" />");
                    break;
                default:
                    $(".bgpic2").html("<img src=\"images/base_submit.png\" />");
                    break;
            }
            btnaubitstatus(2, 6);
        }
        if (btnstatusvalue(localStorage.int64_status, 3) == 1) {
            switch (btnstatusvalue(localStorage.int64_verify_status, 3)) {
                case 0:
                    $(".bgpic3").html("<img src=\"images/base_return.png\" />");
                    break;
                case 3:
                    $(".bgpic3").html("<img src=\"images/base_qualified.png\" />");
                    break;
                default:
                    $(".bgpic3").html("<img src=\"images/base_submit.png\" />");
                    break;
            }
            btnaubitstatus(3, 3);
        }
        if (btnstatusvalue(localStorage.int64_status, 4) == 1) {
            switch (btnstatusvalue(localStorage.int64_verify_status, 4)) {
                case 0:
                    $(".bgpic4").html("<img src=\"images/base_return.png\" />");
                    break;
                case 3:
                    $(".bgpic4").html("<img src=\"images/base_qualified.png\" />");
                    break;
                default:
                    $(".bgpic4").html("<img src=\"images/base_submit.png\" />");
                    break;
            }
            btnaubitstatus(4, 4);
        }
        if (btnstatusvalue(localStorage.int64_status, 5) == 1) {
            switch (btnstatusvalue(localStorage.int64_verify_status, 5)) {
                case 0:
                    $(".bgpic5").html("<img src=\"images/base_return.png\" />");
                    break;
                case 3:
                    $(".bgpic5").html("<img src=\"images/base_qualified.png\" />");
                    break;
                default:
                    $(".bgpic5").html("<img src=\"images/base_submit.png\" />");
                    break;
            }
            btnaubitstatus(5, 5);
        }
//      if (localStorage.int32_stu_worker == 2) {  去掉学生或worker身份判断
        if (btnstatusvalue(localStorage.int64_status, 7) == 1) {
            switch (btnstatusvalue(localStorage.int64_verify_status, 7)) {
                case 0:
                    $(".bgpic6").html("<img src=\"images/base_return.png\" />");
                    break;
                case 3:
                    $(".bgpic6").html("<img src=\"images/base_qualified.png\" />");
                    break;
                default:
                    $(".bgpic6").html("<img src=\"images/base_submit.png\" />");
                    break;
            }
            btnaubitstatus(6, 7);
        }
        if (localStorage.int32_precashstrategy == 1) {
//          if (localStorage.int32_apply_status == 3) {
//              $(".bgpic8").html("<img src=\"images/base_qualified.png\" />");
//          } else {
//              $(".bgpic8").html("<img src=\"images/base_submit.png\" />");
//          }
            switch (localStorage.int32_apply_status - 0) {
                case 0:
                case 1:
                case 2:
                    $(".bgpic8").html("<img src=\"images/base_submit.png\" />");
                    break;
                default:
                    $(".bgpic8").html("<img src=\"images/base_qualified.png\" />");
                    break;
            }           
        }
//      }
    }
}
//查询用户基本信息回调函数
function infoCallBack() {
    Loadcheckdetail(1, zmfIsOrNo);
}

//查询用户身份证回调
function zmfIsOrNo() {
    //大数据部芝麻分是否认证接口
    var url = urlLink + "/web/user_profile/zhima_check_auth";
    ajaxFn(url, null, zmfSCallBack, null, "GET");
}
//请求大数据部芝麻分是否认证接口成功回掉
function zmfSCallBack(_data) {
    if (_data.code == 0) {
//        1为没有认证
        if (_data.data.int32_state != 1) {
            $(".bgpic7").append('<img src="images/base_submit2.png">');
            localStorage.int64_zm_status = 1;
        } else {
            localStorage.int64_zm_status = 0;
        }
    } else {
        top_meassage(_data.msg);
        return false;
    }
}

function btnljrz() {
    btnOpenZMinfo();
}

//点击芝麻分认证函数
function btnOpenZMinfo() {
    if (localStorage.int64_zm_status == 1) {
        ShowMsg("您已经认证成功！");
        return false;
    } else {
    	// 用户身份都是int32_stu_worker == 2了
//      if (localStorage.int32_stu_worker == 2) {
            if (btnstatusvalue(localStorage.int64_status, 7) != 1) {
                ShowMsg("请先填写工作信息，再认证芝麻分");
                return false;
            } else {
                var url = urlLink + "/web/user_profile/zhima_auth_url";
                Loading();
                ajaxFn(url, null, psCallBack, null, "GET");
            }
//      } else {
//          ShowMsg("请先填写工作信息，再认证芝麻分");
//          return false;
//      }
    }
}
//获取params和sign回调函数
function psCallBack(_data) {
	LoadingOver();
    if (_data.code == 0) {
        var zmUrl = _data.data.string_url;
        window.location.href = zmUrl;
    } else {
        top_meassage(_data.msg);
        return false;
    }
}


function btnaubitstatus(id, index) {
    switch (btnstatusvalue(localStorage.int64_verify_status, index)) {
        case 0: //打回
            $(".bgpic" + id).html("<img src=\"images/base_return.png\" />");
            switch (id) {
                case 1:
                    $("#bottompic1").attr("src", "images/linkman_ico-back@3x.png");
                    break;
                case 2:
                    $("#bottompic2").attr("src", "images/call-them_ico-back@3x.png");
                    break;
                case 3:
                    $("#bottompic3").attr("src", "images/card-front_ico-back@3x.png");
                    break;
                case 4:
                    $("#bottompic4").attr("src", "images/card-verso_ico-back@3x.png");
                    break;
                case 5:
                    $("#bottompic5").attr("src", "images/card-hand_ico-back@3x.png");
                    break;
                case 6:
                    $("#bottompic6").attr("src", "images/job_ico-back@3x.png");
                    break;
            }
            break;
    }
}


/*vali*/
function changeserverpwd() {
    var upwd = $("#txt_serverpwd").val();
    if (upwd == "" || upwd == null || upwd == "undefined") {
        ShowMsg("请输入您的服务密码！");
        return false;
    }
}


/*call then*/
function callThen() {
    var uname = $("#txt_phoneno").val();
    var upwd = $("#txt_serverpwd").val();
    var vode = $("#txt_vcode").val();
    var cptype = $("#chapchav").val();

    var rax = /^[0-9]*$/;
    if (!rax.test(upwd)) {
        ShowMsg("服务密码格式不正确");
        return false;
    }

    if (cptype == 0) {
        if (uname == "" || uname == null || uname == "undefined") {
            ShowMsg("请输入您的手机号码！");
            return false;
        } else if (!regPhone.exec(uname)) {
            ShowMsg("请输入正确的手机号码！");
            return false;
        } else if (upwd == "" || upwd == null || upwd == "undefined") {
            ShowMsg("请输入您的服务密码！");
            return false;
        } else {
            sub_moblieaccount(uname, upwd, vode);
        }
    } else {
        if (uname == "" || uname == null || uname == "undefined") {
            ShowMsg("请输入您的手机号码！");
            return false;
        } else if (!regPhone.exec(uname)) {
            ShowMsg("请输入正确的手机号码！");
            return false;
        } else if (upwd == "" || upwd == null || upwd == "undefined") {
            ShowMsg("请输入您的服务密码！");
            return false;
        } else if (vode == "" || vode == null || vode == "undefined") {
            ShowMsg("请输入短信中的验证码！");
            return false;
        } else {
            sub_moblieaccount(uname, upwd, vode);
        }
    }

}

/*submit call then*/
function sub_moblieaccount(uname, upwd, vcode) {
    Loading();
//	$("#loadd_pageinfog").show();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/mobile/submit_mobile_account";
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
                            get_mobile_status();
                            break;
                        case -10004:
                        case -10003:
                            LoadingOver();
//                      	$("#loadd_pageinfog").hide();
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
//                      	$("#loadd_pageinfog").hide();
                            LoadingOver();
                            logout();
                            break;
                        default:
//                      	$("#loadd_pageinfog").hide();
                            LoadingOver();
                            top_meassage(_datajson.msg);
                            show_topmessage();
                            break;
                    }
//                  LoadingOver();
//                    $("#myprofile_main").show();
                }
            }
        }
        _xmlHttpRequest.send("phone_number=" + uname + "&password=" + upwd + "&verify_code=" + vcode);
    }
}


/*get moblie status*/

function get_mobile_status() {
    $("#loadd_pageinfog").show();
//	Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/mobile/get_mobile_status";
        var _method = "GET";
        _xmlHttpRequest.open(_method, _url, true);
        _xmlHttpRequest.withCredentials = true;
        //_xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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
                            localStorage.int64_status = _datajson.data.int64_profile_status;
                            localStorage.int32_retcode = _datajson.data.int32_retcode;
                            localStorage.int64_verify_status = _datajson.data.int64_verify_status;
                            //_datajson.data.string_msg
                            /*Success = 0,Error = -1,NeedCode = -2,PasswordError = -3,AccountEmpty = -4,NeedWait = -5*/
                            $.base64.utf8encode = true;
                            var stringmsg = $.base64.atob(_datajson.data.string_errmsg, true);
                            switch (_datajson.data.int32_retcode) {
                                case 0:
                                    $("#loadd_pageinfog").hide();
                                    localStorage.int32_auto_check_result = _datajson.data.int32_auto_check_result;
                                    localStorage.int64_real_id_verify_status = _datajson.data.int64_real_id_verify_status;
                                    $(".bgpic2").html("<img src=\"images/base_submit.png\" />");
                                    $("#bottompic2").attr("src", "images/call-them_ico@3x.png");
                                    divhide('phone_detail');
                                    get_all_status(null, null, null);
                                    break;
                                case -2:
                                    $("#loadd_pageinfog").hide();
                                    ShowMsg(stringmsg);
                                    $("#chapchav").val("1");
                                    $(".vcode_captcha").show();
                                    repeatTime("hq_message");
                                    break;
                                case -1:
                                case -3:
                                case -4:
                                    $("#loadd_pageinfog").hide();
                                    ShowMsg(stringmsg);
                                    break;
                                case -5:
                                    setTimeout(function () {
                                        get_mobile_status();
                                    }, 5000);
                                    break;
                            }
                            break;
                        case -10004:
                        case -10003:
                            $("#loadd_pageinfog").hide();
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
                            $("#loadd_pageinfog").hide();
                            logout();
                            break;
                        default:
                            $("#loadd_pageinfog").hide();
                            top_meassage(_datajson.msg);
                            show_topmessage();
                            break;
                    }
//                  LoadingOver();
                }
            }
        }
        _xmlHttpRequest.send(null);
    }
}

//北京移动通话详单提交
function bjCallThen() {
    var phoneNumber = $("#txt_bjphoneno").val();
    var webPwd = $("#net_pwd").val();
    var serverType = $("#server-type").val();
    var serverPwd = $("#serverpwd").val();
    if (webPwd != null && webPwd != '' && webPwd != 'undefined') {
        var url = urlLink + "/web/mobile/submit_mobile_account";
        if (serverType == 0) {
            var send = "phone_number=" + phoneNumber + "&password=" + webPwd + "&verify_code=" + null;
        } else {
            var send = "phone_number=" + phoneNumber + "&password=" + serverPwd + "&verify_code=" + null;
        }
        Loading();
        xmlHttpRequest(send, url, bjCallThenCallBack, "post");
    } else {
        ShowMsg("请输入网站密码");
    }
}

function bjCallThenCallBack(_datajson) {
    switch (_datajson.code) {
        case 0: //OK
            getMobileStatus();
            break;
        case -10004:
        case -10003:
            $("#loadd_pageinfog").hide();
            session_expired(_datajson.msg);
            break;
        case 404:
        case -10002:
            $("#loadd_pageinfog").hide();
            logout();
            break;
        default:
            $("#loadd_pageinfog").hide();
            top_meassage(_datajson.msg);
            show_topmessage();
            break;
    }
}

function getMobileStatus() {
    var url = urlLink + "/web/mobile/get_mobile_status";
    var send = null;
    xmlHttpRequest(send, url, getMobileStatusCB, "get");
}

function getMobileStatusCB(_datajson) {
    switch (_datajson.code) {
        case 0: //OK
            $.base64.utf8encode = true;
            var stringmsg = $.base64.atob(_datajson.data.string_errmsg, true);
            switch (_datajson.data.int32_retcode) {
                case 0:
                    $("#loadd_pageinfog").hide();
                    localStorage.int32_auto_check_result = _datajson.data.int32_auto_check_result;
                    localStorage.int64_real_id_verify_status = _datajson.data.int64_real_id_verify_status;
                    $(".bgpic2").html("<img src=\"images/base_submit.png\" />");
                    $("#bottompic2").attr("src", "images/call-them_ico@3x.png");
                    divhide('phone_detail_1');
                    get_all_status(null, null, null);
                    break;
                case -16:
                    $("#loadd_pageinfog").hide();
                    ShowMsg(stringmsg);
                    $("#server-type").val("1");
                    $(".sever-li").show();
                    break;
                case -1:
                case -3:
                case -4:
                    $("#loadd_pageinfog").hide();
                    ShowMsg(stringmsg);
                    break;
                case -5:
                    setTimeout(function () {
                        getMobileStatus();
                    }, 5000);
                    break;
                default:
                    $("#loadd_pageinfog").hide();
                    top_meassage(stringmsg);
                    show_topmessage();
                    break;
            }
            break;
        case -10004:
        case -10003:
            $("#loadd_pageinfog").hide();
            session_expired(_datajson.msg);
            break;
        case 404:
        case -10002:
            $("#loadd_pageinfog").hide();
            logout();
            break;
        default:
            $("#loadd_pageinfog").hide();
            top_meassage(_datajson.msg);
            show_topmessage();
            break;
    }
}
/*vali */

function changezyname_1() {
    var namey = $("#linkman_main").val();
    if (namey == "" || namey == null || namey == "undefined") {
        ShowMsg("请输入主要联系人姓名！");
        return false;
    } else {
        var regex = /^[\u4e00-\u9fa5]{2,10}$/;
        if (!regex.test(namey)) {
            ShowMsg("主要联系人姓名必须由2-10个汉字组成！");
            return false;
        }
    }
}

function changezyphone_1() {
    var phoney = $("#linkman_phone").val();
    if (phoney == "" || phoney == null || phoney == "undefined") {
        ShowMsg("请输入主要联系人的联系电话！");
        return false;
    } else if (!regPhone.exec(phoney)) {
        ShowMsg("请输入正确的手机号码！");
        return false;
    }
}


function changezyname_2() {
    var namee = $("#linkman_maine").val();
    if (namee == "" || namee == null || namee == "undefined") {
        ShowMsg("请输入次要联系人姓名！");
        return false;
    } else {
        var regex = /^[\u4e00-\u9fa5]{2,10}$/;
        if (!regex.test(namee)) {
            ShowMsg("次要联系人姓名必须由2-10个汉字组成！");
            return false;
        }
    }
}

function changezyphone_2() {
    var phonee = $("#linkman_phonee").val();
    if (phonee == "" || phonee == null || phonee == "undefined") {
        ShowMsg("请输入次要联系人的联系电话！");
        return false;
    } else if (!regPhone.exec(phonee)) {
        ShowMsg("请输入正确的手机号码！");
        return false;
    }
}


function changezyname_3() {
    var names = $("#linkman_mainsan").val();
    if (names == "" || names == null || names == "undefined") {
        ShowMsg("请输入其他联系人姓名！");
        return false;
    }
}

function changezyphone_3() {
    var phones = $("#linkman_phonesan").val();
    if (phones == "" || phones == null || phones == "undefined") {
        ShowMsg("请输入其他联系人的联系电话！");
        return false;
    } else if (!regPhone.exec(phones)) {
        ShowMsg("请输入正确的手机号码！");
        return false;
    }
}


function btnlinkmani() {
    var namey = $("#linkman_main").val();
    var phoney = $("#linkman_phone").val();
    var namee = $("#linkman_maine").val();
    var phonee = $("#linkman_phonee").val();
    var names = 'None'; // $("#linkman_mainsan").val();
    var phones = 'None'; // $("#linkman_phonesan").val();
    var gxy = $("#drp_mangxy").val();
    var gxe = $("#drp_mangxe").val();
    var gxs = 0; // $("#drp_mangxs").val();

    var regex = /^[\u4e00-\u9fa5]{2,10}$/;

    if (namey == "" || namey == null || namey == "undefined") {
        ShowMsg("请输入主要联系人姓名！");
        return false;
    } else if (!regex.test(namey)) {
        ShowMsg("主要联系人姓名必须由2-10个汉字组成！");
        return false;
    } else if (gxy == "0") {
        ShowMsg("请选择主要联系人与本人关系！");
        return false;
    } else if (phoney == "" || phoney == null || phoney == "undefined") {
        ShowMsg("请输入主要联系人的联系电话！");
        return false;
    } else if (!regPhone.exec(phoney)) {
        ShowMsg("请输入正确的手机号码！");
        return false;
    } else if (namee == "" || namee == null || namee == "undefined") {
        ShowMsg("请输入次要联系人姓名！");
        return false;
    } else if (!regex.test(namee)) {
        ShowMsg("次要联系人姓名必须由2-10个汉字组成！");
        return false;
    } else if (gxe == "0") {
        ShowMsg("请选择次要联系人与本人关系！");
        return false;
    } else if (phonee == "" || phonee == null || phonee == "undefined") {
        ShowMsg("请输入次要联系人的联系电话！");
        return false;
    } else if (!regPhone.exec(phonee)) {
        ShowMsg("请输入正确的手机号码！");
        return false;
    }
    //	else if (names == "" || names == null || names == "undefined") {
    //		ShowMsg("请输入其他联系人姓名！");
    //		return false;
    //	} else if (phones == "" || phones == null || phones == "undefined") {
    //		ShowMsg("请输入其他联系人的联系电话！");
    //		return false;
    //	} else if (!regPhone.exec(phones)) {
    //		ShowMsg("请输入正确的手机号码！");
    //		return false;
    //	}
    // || namee == names || namey == names
    else if (namey == namee) {
        ShowMsg("联系人姓名不能相同！");
        return false;
    }
    //	 || phonee == phones || phoney == phones
    else if (phoney == phonee) {
        ShowMsg("两个联系人电话不能相同！");
        return false;
    }
    // || gxe == gxs || gxy == gxs
    else if (gxy == gxe) {
        ShowMsg("两个联系人类型不能相同！");
        return false;
    } else {
        //
        sub_add_contact(gxy, namey, phoney, gxe, namee, phonee, gxs, names, phones);
    }
}


/*submit contact*/
//
function sub_add_contact(gxy, namey, phoney, gxe, namee, phonee, gxs, names, phones) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user_profile/add_contact";
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
                            localStorage.int64_status = _datajson.data.int64_profile_status;
                            localStorage.int64_verify_status = _datajson.data.int64_verify_status;
                            LoadingOver();
                            get_all_status(null, null, null);
                            $(".bgpic1").html("<img src=\"images/base_submit.png\" />");
                            $("#bottompic1").attr("src", "images/linkman_ico@3x.png");
                            divhide('linkman_detail');
                            break;
                        case -10004:
                        case -10003:
                            LoadingOver();
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
                            LoadingOver();
                            logout();
                            break;
                        default:
                            LoadingOver();
                            top_meassage(_datajson.msg);
                            show_topmessage();
                            break;
                    }
//                  LoadingOver();
//                    $("#myprofile_main").show();
                }
            }
        }
        _xmlHttpRequest.send("int32_type=" + gxy + "&string_name=" + namey + "&string_phone_number=" + phoney + "&int32_type_2=" + gxe + "&string_name_2=" + namee + "&string_phone_number_2=" + phonee + "&int32_type_3=" + gxs + "&string_name_3=" + names + "&string_phone_number_3=" + phones);
    }
}


/*vali*/
function changecompany() {
    var names = $("#txt_company").val();
    if (names == "" || names == null || names == "undefined") {
        ShowMsg("请输入完整的公司名称！");
        return false;
    }
}

function changecompanyphone() {
    var phones = $("#txt_companyphone").val();
    if (phones == "" || phones == null || phones == "undefined") {
        ShowMsg("请输入公司电话！");
        return false;
    } else if (!regPhone.exec(phones) && !regPhoneFax.exec(phones)) {
        ShowMsg("请正确填写电话号码！");
        return false;
    }
}

function changecompanyzw() {
    var zw = $("#txt_companyzw").val();
    if (zw == "" || zw == null || zw == "undefined") {
        ShowMsg("请输入您的职务！");
        return false;
    }
}


function changecompanyaddr() {
    var jobAddr = $("#txt_companyaddress").val();
    if (jobAddr == "" || jobAddr == null || jobAddr == "undefined") {
        ShowMsg("请输入完整的公司地址！");
        return false;
    }
}


function btnwsanjobinfo() {
    var names = $("#txt_company").val();
    var phones = $("#txt_companyphone").val();
    var zw = $("#txt_companyzw").find("option:selected").val();
    var hy = $("#txt_industry").find("option:selected").val();
    var jb = $("#txt_level").find("option:selected").val();

    var province = $("#province").val();
    var city = $("#city").val();
    var county = $("#county").val();

    var jobAddr = $("#txt_companyaddress").val();
    var regCharacter = /#/g;
    if (regCharacter.test(jobAddr)) {
        ShowMsg("不允许输入特殊字符，请重新输入！");
        return false;
    } else if (county == null || county == '' || county == 'undefined') {
        var addr = province + "#" + city + "##" + jobAddr + "#";
    } else {
        var addr = province + "#" + city + "#" + county + "#" + jobAddr + "#";
    }

    if (names == "" || names == null || names == "undefined") {
        ShowMsg("请输入完整的公司名称！");
        return false;
    } else if (phones == "" || phones == null || phones == "undefined") {
        ShowMsg("请输入公司电话！");
        return false;
    } else if (!regPhone.exec(phones) && !regPhoneFax.exec(phones)) {
        ShowMsg("请正确填写电话号码！");
        return false;
    } else if (zw == "" || zw == null || zw == "undefined") {
        ShowMsg("请输入您的职务！");
        return false;
    } else if (addr == "" || addr == null || addr == "undefined") {
        ShowMsg("请输入完整的公司地址！");
        return false;
    } else if (jobAddr == "" || jobAddr == null || jobAddr == "undefined") {
        ShowMsg("请输入完整的公司地址！");
        return false;
    } else {
        sub_add_workinfo(names, phones, zw, addr, hy, jb);
    }
}

/*submit job*/


function sub_add_workinfo(names, phones, zw, addr, hy, jb) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user_profile/workinfo";
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
                            localStorage.int64_status = _datajson.data.int64_profile_status;
                            localStorage.int64_verify_status = _datajson.data.int64_verify_status;
                            $(".bgpic6").html("<img src=\"images/base_submit.png\" />");
                            $("#bottompic6").attr("src", "images/job_ico@3x.png");
                            divhide('job_detail');
                            LoadingOver();
                            get_all_status(null, null, null);
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
//                    $("#myprofile_main").show();
                }
            }
        }
        _xmlHttpRequest.send("company=" + names + "&company_phone=" + phones + "&job=" + zw + "&company_address=" + addr + "&duty=" + jb + "&industry=" + hy);
    }
}

function Loadcheckdatadetail(type, index) {
    divhide('topmeassage' + index);
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user_profile/get_check_detail";
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
                            switch (_datajson.data.int32_check_type) {
                                case 8:
                                    //公司全名
                                    $("#txt_company").val(_datajson.data.struct_job_info.string_company_name);
                                    //公司电话
                                    $("#txt_companyphone").val(_datajson.data.struct_job_info.string_company_phone);
                                    //职业
                                    if (_datajson.data.struct_job_info.string_title != null && _datajson.data.struct_job_info.string_title != '' && _datajson.data.struct_job_info.string_title != 'undefined') {
                                        $("#txt_companyzw").val(_datajson.data.struct_job_info.string_title);
                                    }

                                    //行业
                                    if (_datajson.data.struct_job_info.string_company_industry != null && _datajson.data.struct_job_info.string_company_industry != '' && _datajson.data.struct_job_info.string_company_industry != 'undefined') {
                                        $("#txt_industry").val(_datajson.data.struct_job_info.string_company_industry);
                                    }


                                    //职务级别

                                    if (_datajson.data.struct_job_info.string_duty != null && _datajson.data.struct_job_info.string_duty != '' && _datajson.data.struct_job_info.string_duty != 'undefined') {
                                        $("#txt_level").val(_datajson.data.struct_job_info.string_duty);
                                    }

                                    //公司地址
                                    if (_datajson.data.struct_job_info.string_company_address != null && _datajson.data.struct_job_info.string_company_address != '' && _datajson.data.struct_job_info.string_company_address != 'undefined') {
                                        var allAddress = _datajson.data.struct_job_info.string_company_address;
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
                                        $("#txt_companyaddress").val(addr);
                                    } else {
                                        provincedchange();
                                    }


                                    $("#txt_companyaddress").val();
                                    if (btnstatusvalue(localStorage.int64_verify_status, 7) == 0) {
                                        if (_datajson.data.string_check_message != '' && _datajson.data.string_check_message != null && _datajson.data.string_check_message != 'undefined') {
                                            $.base64.utf8encode = true;
                                            var stringmsg = $.base64.atob(_datajson.data.string_check_message, true);
                                            $("#topmeassage" + index).find(".plaint_txt_first").html(stringmsg);
                                            divshow('topmeassage' + index);
                                        }
                                    }
                                    break;
                                case 2:
                                    if (_datajson.data.struct_contact_info != 'undefined' && _datajson.data.struct_contact_info != '' && _datajson.data.struct_contact_info != null) {
                                        $.each(_datajson.data.struct_contact_info, function (i, item) {
                                            switch (i) {
                                                case 0:
                                                    if (item.int32_type != '' && item.int32_type != null && item.int32_type != 'undefined') {
                                                        $("#drp_mangxy").val(item.int32_type);
                                                    }

                                                    $("#linkman_main").val(item.string_name);
                                                    $("#linkman_phone").val(item.string_phone_number);
                                                    break;
                                                case 1:
                                                    if (item.int32_type != '' && item.int32_type != null && item.int32_type != 'undefined') {
                                                        $("#drp_mangxe").val(item.int32_type);
                                                    }


                                                    $("#linkman_maine").val(item.string_name);
                                                    $("#linkman_phonee").val(item.string_phone_number);
                                                    break;
                                                //												case 2:
                                                //													$("#drp_mangxs").val(item.int32_type);
                                                //													$("#linkman_mainsan").val(item.string_name);
                                                //													$("#linkman_phonesan").val(item.string_phone_number);
                                                //													break;
                                            }
                                        });
                                    }
                                    if (btnstatusvalue(localStorage.int64_verify_status, index) == 0) {
                                        if (_datajson.data.string_check_message != '' && _datajson.data.string_check_message != null && _datajson.data.string_check_message != 'undefined') {
                                            $.base64.utf8encode = true;
                                            var stringmsg = $.base64.atob(_datajson.data.string_check_message, true);
                                            $("#topmeassage" + index).find(".plaint_txt_first").html(stringmsg);
                                            divshow('topmeassage' + index);
                                        }
                                    }
                                    break;
                                case 4:
                                case 5:
                                case 6:
                                    if (btnstatusvalue(localStorage.int64_verify_status, index) == 0) {
                                        if (_datajson.data.string_check_message != '' && _datajson.data.string_check_message != null && _datajson.data.string_check_message != 'undefined') {
                                            $.base64.utf8encode = true;
                                            var stringmsg = $.base64.atob(_datajson.data.string_check_message, true);
                                            $("#topmeassage" + index).find(".plaint_txt_first").html(stringmsg);
                                            divshow('topmeassage' + index);
                                        }
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
        _xmlHttpRequest.send("check_type=" + type);
    }
}


var tcontone = 0;

function everytimec() {

    var vstatu = 0;
//  var count = 5;
//  if (localStorage.int32_stu_worker == 1) {
//      count = 7;
//  }
    switch (localStorage.int32_apply_status) {
        case "3":
            //资料审核通过
            $("#btnallaubitinfo").html("资料已审核通过");
            break;
        case "2":
        //资料正在审核中
        case "1":
            $("#btnallaubitinfo").html("资料审核中");
            break;
        case "0":
            //资料等待提交
            // 预借款已提交
            if (localStorage.int32_precashstrategy == 1) {
//              for (var j = 1; j < count; j++) {
//                  if (btnstatusvalue(localStorage.int64_status, j) == 1) {
//                      vstatu = 1;
//                  } else {
//                      vstatu = 0;
//                      break;
//                  }
//              }

				// 判断联系人、通话详单、工作信息 是否已提交
				btnstatusvalue(localStorage.int64_status, 1) == 1 && btnstatusvalue(localStorage.int64_status, 6) == 1 && btnstatusvalue(localStorage.int64_status, 7) == 1 ? vstatu = 1 : vstatu = 0;
            }
            break;
        case "4":
            //资料被打回
            if (localStorage.int32_precashstrategy == 1) {
//	            for (var i = 1; i < count; i++) {
//	                if (btnstatusvalue(localStorage.int64_verify_status, i) > 0) {
//	                    vstatu = 1;
//	                } else {
//	                    vstatu = 0;
//	                    break;
//	                }
//	            }
//	            break;
			
				// 判断联系人、通话详单、工作信息 是否已提交
				btnstatusvalue(localStorage.int64_verify_status, 1) > 0 && btnstatusvalue(localStorage.int64_verify_status, 6) > 0 && btnstatusvalue(localStorage.int64_verify_status, 7) > 0 ? vstatu = 1 : vstatu = 0;	
			
	        }
    }
    switch (vstatu) {
        case 1:
            $("#btnallaubitinfo").attr("class", "write_submit_checked submit-auditing");

            $("#submit").bind("click", function () {
                tcontone++;
                sub_alldata();
            });
            break;
        default:
            $("#btnallaubitinfo").unbind();
            $("#btnallaubitinfo").attr("class", "write_submit_unable");
            break;
    }

}

function btntjsh() {
    tcontone++;
    sub_alldata();
}

/*sub all*/

function sub_alldata() {
    if (tcontone == 1) {
        Loading();
        var timeout = setTimeout(function () {
            LoadingOver();
            top_meassage("请求超时，请稍后再试");
            show_topmessage();
        }, 30000);
        _xmlHttpRequest = createXmlHttpRequest();
        if (_xmlHttpRequest != null) {
            var _url = urlLink + "/web/user_profile/submit_all_profiles";
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
                        tcontone = 1;
                        switch (_datajson.code) {
                            case 0: //OK
                                $("#wanshan").attr("src", "images/linkman_ico-back@3x.png");
                                History.pushState(null, null, "myIndex.html");
                                //if (is_luck_draw == 1 && localStorage.int32_apply_status == 0) {
                                //    $("#tipsadzm").hide();
                                //    $("#luck_draw_hint").show();
                                //} else {
                                    window.location.href = "myIndex.html";
                                //}

                                break;
                            case -10004:
                            case -10003:
                                session_expired(_datajson.msg);
                                tcontone = 0;
                                break;
                            case 404:
                            case -10002:
                                logout();
                                break;
                            default:
                                top_meassage(_datajson.msg);
                                show_topmessage();
                                tcontone = 0;
                                break;
                        }
                        LoadingOver();
                    }
                }
            }
            _xmlHttpRequest.send(null);
        }
    }
}


function init(id) {
    var u = new UploadPic();
    u.init({
        input: document.querySelector('.picfile' + id),
        callback: function (base64) {
            loadwsan_datapic(base64, id);
        },
        loading: function () {
            Loading();
        }
    });

}

/*sub pic load data*/
function loadwsan_datapic(pinsrc, index) {

    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlPicLink + "/upload/bytes";
        var _method = "POST";
        _xmlHttpRequest.open(_method, _url, true);
        _xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        _xmlHttpRequest.onreadystatechange = function () {
            if (_xmlHttpRequest.readyState == 4) {
                if (_xmlHttpRequest.status == 200) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    severResponsepic = _xmlHttpRequest.responseText;
                    var _datajsonpic = JSON.parse(severResponsepic);
                    switch (_datajsonpic.result_code) {
                        case 0: //OK
                            $(".filname" + index).val(_datajsonpic.filename);
                            document.querySelector(".cname" + index).src = pinsrc;
                            get_all_status(null, null, null);
                            LoadingOver();
                            break;
                        default:
                            if (_datajsonpic.error_message == "undefined") {
                                top_meassage('服务器忙，请稍后再试');
                                show_topmessage();
                            } else {
                                top_meassage(_datajsonpic.error_message);
                                show_topmessage();
                            }

                            LoadingOver();
                            break;
                    }
                }
            }
        }
        _xmlHttpRequest.send("bytes=" + pinsrc.split(",")[1] + "&type=png&encoder=urlbaes64");
    }
}


/*sub upload img*/
/*1：身份证正面, 2:身份证反面, 3:手持身份证, 4:银行征信, 5:银行流水, 6:其他图片, 7:联系人*/
function sub_upload_img(index) {
    var filname;
    isWeiXin() ? filname = $(".filname-" + index).val() : filname = $(".filname" + index).val();
//  var filname = $(".filname" + index).val();
    if (filname != "" && filname != null && filname != "undefined") {
        Loading();
        //超过1.5秒之后，右上角就显示“请求超时”
        var timeout = setTimeout(function () {
            LoadingOver();
            top_meassage("请求超时，请稍后再试");
            show_topmessage();
        }, 30000);
        //创建可扩展标记语言的传输请求
        _xmlHttpRequest = createXmlHttpRequest();
        if (_xmlHttpRequest != null) {
            //表示需要发送的地址
            var _url = urlLink + "/web/user_profile/upload_img";
            //post表示发送请求的方法，有get和post两种
            var _method = "POST";
            _xmlHttpRequest.open(_method, _url, true);
            _xmlHttpRequest.withCredentials = true;
            //XmlHttpRequest对象负责将用户信息以异步通信地发送到服务器端
            _xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //传输的状态，200表示已经成功了
            _xmlHttpRequest.onreadystatechange = function () {
                if (_xmlHttpRequest.readyState == 4) {
                    if (_xmlHttpRequest.status == 200) {
                        if (timeout) {
                            clearTimeout(timeout);
                            timeout = null;
                        }
                        //服务器返回的数据，就是这个responsetext，传回的信息
                        severResponse = _xmlHttpRequest.responseText;
                        //把传回的信息从json字符串，转换成json对象，并且命名为jsondata
                        var _datajson = JSON.parse(severResponse);
                        //jsondate的密码
                        switch (_datajson.code) {
                            //如果case到这个jsondata的code的值是0，那么这一次发送就是成功的
                            case 0: //OK
                                //调取本地资审核状态
                                localStorage.int64_verify_status = _datajson.data.int64_verify_status;
                                //调取本地资料提交状态 如果成功 就返回主页面 ，改变图片变成已提交
                                localStorage.int64_status = _datajson.data.int64_profile_status;
                                switch (index) {
                                    case 1:
                                        $(".bgpic3").html("<img src=\"images/base_submit.png\" />");
                                        $("#bottompic3").attr("src", "images/card-front_ico@3x.png");
                                        divhide('idcard_just_detail');
                                        break;
                                    case 2:
                                        $(".bgpic4").html("<img src=\"images/base_submit.png\" />");
                                        $("#bottompic4").attr("src", "images/card-verso_ico@3x.png");
                                        divhide('idcard_versa_detail');
                                        break;
                                    case 3:
                                        $(".bgpic5").html("<img src=\"images/base_submit.png\" />");
                                        $("#bottompic5").attr("src", "images/card-hand_ico@3x.png");
                                        divhide('idcard_schi_detail');
                                        break;
                                }
                                LoadingOver();
                                ShowMsg("提交成功！");
                                if (index == 1 || index == 2 || index == 3) {
                                    window.location.href = "check_status.html?v=" + Math.random();
                                }
                                break;
                            //这种就是不成功的情况
                            case -10004:
                            case -10003:
                                LoadingOver();
                                session_expired(_datajson.msg);
                                break;
                            //404也是不成功的情况
                            case 404:
                            case -10002:
                                LoadingOver();
                                logout();
                                break;
                            default:
                                LoadingOver();
                                top_meassage(_datajson.msg);
                                show_topmessage();
                                break;
                        }
//                      LoadingOver();
//                        $("#myprofile_main").show();
                    }
                }
            }
            _xmlHttpRequest.send("string_image_id=" + filname + "&int32_image_type=" + index);
        }
    } else {
        ShowMsg("请添加照片！");
        return false;
    }
}


function return_current_page(divhide, divshow, index) {
    switch (index) {
        case 1:
            Loadcheckdatadetail(2, 1);
            break;
        case 3:
            Loadcheckdatadetail(4, 3);
            break;
        case 4:
            Loadcheckdatadetail(5, 4);
            break;
        case 5:
            Loadcheckdatadetail(6, 5);
            break;
        case 6:
            Loadcheckdatadetail(8, 6);
            break;
    }
//    $("#" + divhide).hide();
    if (index == 2) {
        Loading();
        $.ajax({
            url: "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=" + localStorage.string_phone_number,
            dataType: 'jsonp',
            type: 'get',
            success: function (_data) {
                if (_data.carrier == "北京移动") {
                    $('#bj_phoneno').text(localStorage.string_phone_number);
                    $('#txt_bjphoneno').val(localStorage.string_phone_number);
                    $("#phone_detail_1").show();
                } else {
                    $("#" + divshow).show();
                }
                LoadingOver();
            }
        })
    } else {
        $("#" + divshow).show();
    }
}


function btnOpenDatainfo(type) {
    switch (localStorage.int32_apply_status - 0) {
        case 1:
            ShowMsg("资料正在等待审批，暂时无法修改");
            return false;
            break;
        case 2:
            ShowMsg("资料正在审核中，暂时无法修改");
            return false;
            break;
        case 5:
            ShowMsg("资料被拒绝，无法修改");
            return false;
            break;
        case 3:
            ShowMsg("资料已经审核通过，无法修改");
            return false;
            break;
        default :
            if (localStorage.int64_verify_status != null) {
                if ((btnstatusvalue(localStorage.int64_verify_status, type)) == 3) {
                    ShowMsg("该项信息已经审核通过，无法修改");
                    return false;
                } else {
                    switch (type) {
                        case 1:
                            qh_divlabel('myprofile_main', 'linkman_detail', 1, type);
                            break;
                        case 2:
                            qh_divlabel('myprofile_main', 'phone_detail', 6, type);
                            break;
                        case 3:
                            qh_divlabel('myprofile_main', 'idcard_just_detail', 3, type);
                            break;
                        case 4:
                            qh_divlabel('myprofile_main', 'idcard_versa_detail', 4, type);
                            break;
                        case 5:
                            qh_divlabel('myprofile_main', 'idcard_schi_detail', 5, type);
                            break;
                        case 6:
                            qh_divlabel('myprofile_main', 'job_detail', 7, type);
                            break;
                        case 8:
                        	if(localStorage.int32_apply_status == 4 && localStorage.int32_precashstrategy == 1){
                        		ShowMsg("该项信息已经审核通过，无法修改");
                        		return false
                        	}
                            window.location.href = 'loan_desire.html';
                            break;
                    }
                }
            }
            break;
    }


//    if (localStorage.int32_apply_status == 3) {
//        ShowMsg("资料已锁定，无法修改");
//        return false;
//    } else {
//        if (localStorage.int64_verify_status != null) {
//            switch (type) {
//                case 1:
//                    qh_divlabel('myprofile_main', 'linkman_detail', 1, type);
//                    break;
//                case 2:
//                    qh_divlabel('myprofile_main', 'phone_detail', 6, type);
//                    break;
//                case 3:
//                    qh_divlabel('myprofile_main', 'idcard_just_detail', 3, type);
//                    break;
//                case 4:
//                    qh_divlabel('myprofile_main', 'idcard_versa_detail', 4, type);
//                    break;
//                case 5:
//                    qh_divlabel('myprofile_main', 'idcard_schi_detail', 5, type);
//                    break;
//                case 6:
//                    qh_divlabel('myprofile_main', 'job_detail', 7, type);
//                    break;
//            }
//        }
//    }
}


function qh_divlabel(name1, name2, index, type) {
    switch (localStorage.int32_apply_status) {
        case "0":
        case "4":
//            if (type == 6) {
//                if (localStorage.int32_stu_worker == 2) {
//                    if ((btnstatusvalue(localStorage.int64_verify_status, index) == 3)) {
//                        ShowMsg("资料已锁定，无法修改");
//                        return false;
//                    } else if (btnstatusvalue(localStorage.int64_verify_status, index) == 2) {
//                        ShowMsg("资料已拒绝，无法修改");
//                        return false;
//                    } else if (btnstatusvalue(localStorage.int64_status, index) == 1 && type == 2) {
//                        ShowMsg("资料已锁定，无法修改");
//                        return false;
//                    } else {
//                        return_current_page(name1, name2, type);
//                    }
//                }
//            } else {

            if (type == 1) {
                if (localStorage.int32_stu_worker == 2) {
//                    $("#drp_mangxe").find("option").remove();
                    var optionH = '<option value="6">同事</option>';
                } else {
//                    $("#drp_mangxe").find("option").remove();
                    var optionH = '  <option value="1">父亲</option>' +
                        '<option value="2">母亲</option>' +
                        '<option value="4">亲戚</option>';
                }
//                $("#drp_mangxe").html(optionH);
            }

            if (btnstatusvalue(localStorage.int64_status, index) == 1 && type == 2) {
                if (localStorage.int32_apply_status == 4) {
                    ShowMsg("通话详单被打回");
                    return false;
                } else {
                    ShowMsg("通话详单已经提交，无需重复提交");
                    return false;
                }
            } else {
                return_current_page(name1, name2, type);
            }

//                if ((btnstatusvalue(localStorage.int64_verify_status, index) == 3)) {
//                    ShowMsg("资料已锁定，无法修改");
//                    return false;
//                } else if (btnstatusvalue(localStorage.int64_verify_status, index) == 2) {
//                    ShowMsg("资料已拒绝，无法修改");
//                    return false;
//                } else
//            }
            break;
        default:
            ShowMsg("资料已锁定，无法修改");
            return false;
            break;
    }

}