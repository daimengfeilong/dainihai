function changexjfmoney() {
    var rax = /^[0-9]*[1-9][0-9]*$/;
    var xjfm = $("#xjftxtmoney").val();
    var xjfq = $("#xjfmoney").html();
    if (xjfm == "" || xjfm == null || xjfm == "undefined") {
        ShowMsg("请输入申领金额(元)！");
        return false;
    } else if (isNaN(xjfm)) {
        ShowMsg("申领金额只能为数字！");
        return false;
    } else if (parseInt(xjfm) < 1) {
        ShowMsg("申请金额必须大于0！");
        return false;
    } else if (!rax.test(xjfm)) {
        ShowMsg("申领金额只能为整数！");
        return false;
    } else if (parseInt(xjfm) > parseInt(xjfq)) {
        ShowMsg("没有足够的钱！");
        return false;
    }
    return true;
}

function changexjfno() {
    var xjfno = $("#xjftxtno").val();

    var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

    var phoneReg = /^1[3|4|5|7|8]\d{9}$/;

    if (xjfno == "" || xjfno == null || xjfno == "undefined") {
        ShowMsg("请输入您的支付宝账号！");
        return false;
    }
    if (!mailReg.test(xjfno) && !phoneReg.test(xjfno)) {
        ShowMsg("请输入正确的支付宝账号");
        return false;
    }
    return true;
}

function upApply() {
    BtnXJInviter();
}

function BtnXJInviter() {
    var xjfm = $("#xjftxtmoney").val();
    var xjfno = $("#xjftxtno").val();
    if (changexjfmoney() && changexjfno()) {
        subdemandamount(xjfm, xjfno);
    }
}


function get_inviteramount() {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    var _xmlHttpRequestl = createXmlHttpRequest();
    if (_xmlHttpRequestl != null) {
        var _url = urlLink + "/web/commodity/get_inviteramount";
        var _method = "POST";
        _xmlHttpRequestl.open(_method, _url, true);
        _xmlHttpRequestl.withCredentials = true;
        _xmlHttpRequestl.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        _xmlHttpRequestl.onreadystatechange = function () {
            if (_xmlHttpRequestl.readyState == 4) {
                if (_xmlHttpRequestl.status == 200) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    severResponse = _xmlHttpRequestl.responseText;
                    var _datajson = JSON.parse(severResponse);
                    switch (_datajson.code) {
                        case 0:
                            if (_datajson.data.int32_amount < 1) {
                                $("#btnxjfbutton").removeClass("btn_overall").addClass("my_overall");
                                $("#btnxjfbutton").unbind();
                                $("#xjfmoney").html("0");
                            } else {
                                $("#btnxjfbutton").removeClass("my_overall").addClass("btn_overall");
                                $("#xjfmoney").html(_datajson.data.int32_amount / 100);
                                $("#btnxjfbutton").unbind();
                                $("#btnxjfbutton").bind("click", function () {
//                                    BtnXJInviter();
                                });
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
        _xmlHttpRequestl.send(null);
    }
}


function subdemandamount(amount, payamount) {
//    console.log(1);
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    var _xmlHttpRequestp = createXmlHttpRequest();
    if (_xmlHttpRequestp != null) {
        var _url = urlLink + "/web/commodity/submit_demandamount";
        var _method = "POST";
        _xmlHttpRequestp.open(_method, _url, true);
        _xmlHttpRequestp.withCredentials = true;
        _xmlHttpRequestp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        _xmlHttpRequestp.onreadystatechange = function () {
            if (_xmlHttpRequestp.readyState == 4) {
                if (_xmlHttpRequestp.status == 200) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    severResponse = _xmlHttpRequestp.responseText;
                    var _datajson = JSON.parse(severResponse);
                    switch (_datajson.code) {
                        case 0:
                            $("#xjftxtmoney").val("");
                            $("#xjftxtno").val("");
                            ShowMsg('申请成功，请注意查收！')
                            get_inviteramount();
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
        _xmlHttpRequestp.send("amount=" + amount + "&paypal_account=" + payamount);
    }
}


function loadLogin_friend(uname, usession, uuin) {
    Loading();
    if (localStorage.khdsession != "" && localStorage.khdsession != null && localStorage.khdsession != 'undefined') {
        khd_login(uname, usession, uuin);
    }
}


function khd_login(uname, usession, uuin) {
    var timeout = setTimeout(function () {
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
        _xmlHttpRequestU.onreadystatechange = function () {
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


function ResterLogin() {
    var urlt = window.location.href;
    window.location.href = "login.html";
}