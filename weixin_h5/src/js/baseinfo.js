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
    var timeout = setTimeout(function () {
        linkurlerror();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user/login";
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
                        case 0: //OK,进入个人中心
                            //如果能够进入个人中心，那么这些数据将会被保存到localstorage
                            //后台通过了之后，发送一个0回来。表示通过，让后把这个账号和密码保存到localstorage里面，方便之后登陆的时候，自动登陆调取
                            //如果没有通过就返回-10004，那么表示不通过，msg就提醒注册失败
                            var obj_sub = _datajson.data;
                            if(typeof obj_sub.struct_idinfo == "undefined") obj_sub['struct_idinfo'] = '';
                            
                            localSave(obj_sub.string_phone_number, localStorage.code, obj_sub.tk_session, obj_sub.int64_uin, obj_sub.int64_status, obj_sub.int64_verify_status, obj_sub.int64_increase_check_status, obj_sub.int32_limit_amount, obj_sub.int32_is_set_pay_password, obj_sub.int32_market_score, obj_sub.int32_apply_status, obj_sub.int64_real_id_verify_status, obj_sub.int32_is_register, obj_sub.int32_stu_worker, obj_sub.int32_married, obj_sub.string_qq, obj_sub.string_invite_code, obj_sub.string_username, obj_sub.int32_remainday,obj_sub.struct_idinfo.string_id);
//							History.pushState(null, null, 'home.html');
//                          pwdSave(upwd);
                            if (localStorage.int32_is_register == 1) {
                                window.location.href = "accountactivate.html";
                            } else {
                                //if (returl != '' && returl != 'undefined' && returl != null) {
                                //    window.location.href = unescape(returl);
                                //} else {
                                    ajaxFn(urlLink + "/web/user/baofoo_query_bind", {query_mode: 0}, isBind, null, "post");
                                //}
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
        _xmlHttpRequest.send("username=" + uname + "&password=" + upwd + "&code=" + localStorage.code + "&openid=" + localStorage.openid);
    }
}

function isBind(data) {
    switch (data.code) {
        case 0:
            if (data.data.int32_bind_status == 1) {
                window.location.href = "index_bk.html";
            } else {
                window.location.href = "bindBankCard.html";
            }
            break;
        default:
            ShowMsg(data.msg);
            break;
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
        signup(uname, upwd, vcode, invcode);
    }

}
/*sbumit signup*/

function signup(uname, upwd, vcode, invcode) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user/register";
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
                        case 0: //OK,进入个人中心
                            var obj_sub = _datajson.data;
                            if(typeof obj_sub.struct_idinfo == "undefined") obj_sub['struct_idinfo'] = '';
                            
                            localSave(obj_sub.string_phone_number, localStorage.code, obj_sub.tk_session, obj_sub.int64_uin, obj_sub.int64_status, obj_sub.int64_verify_status, obj_sub.int64_increase_check_status, obj_sub.int32_limit_amount, obj_sub.int32_is_set_pay_password, obj_sub.int32_market_score, obj_sub.int32_apply_status, obj_sub.int64_real_id_verify_status, obj_sub.int32_is_register, obj_sub.int32_stu_worker, obj_sub.int32_married, obj_sub.string_qq, obj_sub.string_invite_code, obj_sub.string_username, obj_sub.int32_remainday,obj_sub.struct_idinfo.string_id);
                            /*Determine whether the user activated*/
                            History.pushState(null, null, 'home.html');
                            register();
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
        _xmlHttpRequest.send("username=" + uname + "&password=" + upwd + "&verify_code=" + vcode + "&invite_code=" + invcode + "&code=" + localStorage.code + "&openid=" + localStorage.openid);
    }
}

/*forget password*/
function forgetpwdclick() {
    var uname = $("#txt_phoneno").val();
    var vcode = $("#txt_vcode").val();
    var upwd = $("#txt_phonepwd").val();
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
        forget_password(uname, upwd, vcode);
    }
}
/*submit forgetpwd*/

function forget_password(uname, upwd, vcode) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user/forget_password";
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
                        case 0: //OK,进入个人中心
                            History.pushState(null, null, 'home.html');
                            divshow('filesubmit');
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
        _xmlHttpRequest.send("username=" + uname + "&new_pwd=" + upwd + "&verify_code=" + vcode);
    }
}

/*zidong login*/
function ZDLogin() {
    var uname = $("#txt_phoneno").val();
    var upwd = $("#txt_phonepwd").val();
    signin(uname, upwd);
}

/*sure activate*/
function activateclick() {
    var uname = $("#txt_phoneno").val();
    var vcode = $("#txt_vcode").val();
    var upwd = $("#txt_phonepwd").val();
    var invcode = $("#txt_invcode").val();
    if (vcode == "" || vcode == null || vcode == "undefined") {
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
        actived(uname, upwd, vcode, invcode);
    }
}

/*submit activated*/

function actived(uname, upwd, vcode, invcode) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user/account/active";
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
                        case 0: //OK,进入个人中心
                            localStorage.int32_is_register = 0;
                            History.pushState(null, null, 'home.html');
                            divshow('accountactivate');
                            break;
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
        _xmlHttpRequest.send("username=" + uname + "&password=" + upwd + "&verify_code=" + vcode + "&invite_code=" + invcode);
    }
}