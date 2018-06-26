$(document).ready(function () {
    loadLogin_three();
    LoadingOver();
    $("#vcode_captcha").click(function () {
        getcaptcha($("#txt_chsino").val());
    });
    $(".lt1").find("li").click(function () {
        $("#submitype").val($(this).find('.radionv').attr('alt'));
        $(".lt1").find("li").find(".radionv").attr("src", "images/user_detail/icon_xuanze.png");
        $(this).find('.radionv').attr('src', 'images/user_detail/icon_xuanze_press.png');
    });
    $("#txt_jduname").val("");


});

function btnprvoen() {
    var type = $("#submitype").val();
    switch (type) {
        //学信网的
        case '0':
            $(".learnt1").hide();
            $(".learnt5").show();
            break;
        //1是淘宝
        case '1':
            bbussinsestype(1, 'wszl');
            break;
        //2是京东
        case '2':
            bbussinsestype(2, 'wszl');
            break;
    }
}

function returnlastp(yid, eid) {
    $(".learnt" + yid).show();
    $(".learnt" + eid).hide();
}

//京东重发验证码倒计时
var jdWait = 45;
var clearJdWait;
function jdTime(id, jdWait) {
    if (jdWait == 0) {
        $("#" +
            id).bind("click", function () {
                btnjdinfo();
            });
        $("#" + id).html("重新发送");
    } else {
        $("#" + id).unbind();
        $("#" + id).html("重新发送(" + jdWait + ")");
        jdWait--;
        clearJdWait = setTimeout(function () {
                jdTime(id, jdWait);
            },
            1000)
    }
}


//京东账号判断
function changejdname() {
    var uname = $("#txt_jduname").val();
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入京东账号！");
        return false;
    }
}

//京东密码判断
function changejdpwd() {
    var upwd = $("#txt_jdpwd").val();
    if (upwd == "" || upwd == null || upwd == "undefined") {
        ShowMsg("请输入京东密码！");
        return false;
    }
}

//京东提交授权按钮的判断 。当点击的时候，如果账号密码都不为空，那么就跳到bussiness_auth; val=1的时候 是从信用卡进入，2的时候是现金分期进入
function btnjdinfo(val) {
    if (val == null || val == undefined || val == "") {
        val = GetUrlParameter("source")
    }
    var uname = $("#txt_jduname").val();
    var upwd = $("#txt_jdpwd").val();
    var verifyCode = $("#txt_jsyzm").val();
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入京东账号！");
        return false;
    } else if (upwd == "" || upwd == null || upwd == "undefined") {
        ShowMsg("请输入京东密码！");
        return false;
    } else {
        bussiness_auth(uname, upwd, 2, verifyCode, val);
    }
}

function changetbname() {
    var uname = $("#txt_tbuname").val();
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入淘宝账号！");
        return false;
    }
}

function changetbpwd() {
    var upwd = $("#txt_tbpwd").val();
    if (upwd == "" || upwd == null || upwd == "undefined") {
        ShowMsg("请输入淘宝密码！");
        return false;
    }
}

function changetbvcode() {
    var vcode = $("#txt_tbvcode").val();
    if (vcode == "" || vcode == null || vcode == "undefined") {
        ShowMsg("请输入验证码！");
        return false;
    }
}

function btntbinfo() {
    var uname = $("#txt_tbuname").val();
    var upwd = $("#txt_tbpwd").val();
    var type = $("#tbvcaptchaun").val();
    var vcode = $("#txt_tbvcode").val();
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入淘宝账号！");
        return false;
    } else if (upwd == "" || upwd == null || upwd == "undefined") {
        ShowMsg("请输入淘宝密码！");
        return false;
    } else {
        if (type == 1) {
            if (vcode == "" || vcode == null || vcode == "undefined") {
                ShowMsg("请输入验证码！");
                return false;
            } else {
                bussiness_auth(uname, upwd, 1, vcode, null);
            }
        } else {
            bussiness_auth(uname, upwd, 1, '', null);
        }
    }
}

function changechsiname() {
    var uname = $("#txt_chsino").val();
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入您的学信网账号！");
        return false;
    }
}

function changechsipwd() {
    var upwd = $("#txt_chsipwd").val();
    if (upwd == "" || upwd == null || upwd == "undefined") {
        ShowMsg("请输入您的学信网密码！");
        return false;
    }
}

function changechsivcode() {
    var vcode = $("#txt_vcode").val();
    if (vcode == "" || vcode == null || vcode == "undefined") {
        ShowMsg("请输入验证码！");
        return false;
    }
}

function changechsivcodey() {
//	var vcodey = $("#txt_vcodey").val();
//	if (vcodey == "" || vcodey == null || vcodey == "undefined") {
//		ShowMsg("请输入学信网提供的验证码！");
//		return false;
//	}
}

function btnchisaccount() {
    var uname = $("#txt_chsino").val();
    var upwd = $("#txt_chsipwd").val();
    var vcode = $("#txt_vcode").val();
    var vcodey = $("#txt_vcodey").val();
    var type = $("#chsitypev").val();
    var cptype = $("#chapchav").val();
    if (type == 0) {
        if (cptype == 0) {
            if (uname == "" || uname == null || uname == "undefined") {
                ShowMsg("请输入您的学信网账号！");
                return false;
            } else if (upwd == "" || upwd == null || upwd == "undefined") {
                ShowMsg("请输入您的学信网密码！");
                return false;
            } else {
                submitchsiaccount(uname, upwd, vcode, vcodey);
            }
        } else {
            if (uname == "" || uname == null || uname == "undefined") {
                ShowMsg("请输入您的学信网账号！");
                return false;
            } else if (upwd == "" || upwd == null || upwd == "undefined") {
                ShowMsg("请输入您的学信网密码！");
                return false;
            } else if (vcode == "" || vcode == null || vcode == "undefined") {
                ShowMsg("请输入验证码！");
                return false;
            } else {
                submitchsiaccount(uname, upwd, vcode, vcodey);
            }
        }
    } else {
        if (vcodey == "" || vcodey == null || vcodey == "undefined") {
            ShowMsg("请输入学信网提供的验证码！");
            return false;
        } else {
            submitchsiaccount('', '', '', vcodey);
        }
    }
}


/*submit to submit_bussiness_type*/
function bbussinsestype(type, typename) {
    var result = -1;
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user_profile/submit_bussiness_type";
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
                            if (typename == "wszl") {
                                if (type == 1) {
                                    $(".learnt1").hide();
                                    $(".learnt3").show();
                                } else {
                                    $(".learnt1").hide();
                                    $(".learnt2").show();
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
        _xmlHttpRequest.send("submit_type=" + type);
    }
    return result;
}

//京东淘宝的资料提交后台
/*js、tb submit*/
function bussiness_auth(uname, upwd, type, verify_code, val) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user_profile/bussiness_auth";
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
                            console.log(1)
                            localStorage.int32_auto_check_result = _datajson.data.int32_auto_check_result;
                            localStorage.int64_real_id_verify_status = _datajson.data.int64_real_id_verify_status;
                            //发送成功并获取到东西后，把提交获取到的检查结果和身份验证状态存入本地localstorage
                            //然后输顺便跳转get_bussiness_status()   [获取商业的状态]
                            get_bussiness_status(val);
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
                }
            }
        }
        _xmlHttpRequest.send("account=" + uname + "&password=" + upwd + "&verify_code=" + verify_code + "&submit_type=" + type);
    }
}


/*jd、tb  get status*/
function get_bussiness_status(val) {
    //if (val != 10) {
    //    winopen_checkstatus(208);
    //} else {
    //    winopen_checkstatus(10);
    //}
    $("#loadd_pageinfog").css("display", "block");
//	Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user_profile/get_bussiness_status";
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
                            /*Success = 0,Error = -1,NeedCode = -2,PasswordError = -3,AccountEmpty = -4,NeedWait = -5*/
                            $.base64.utf8encode = true;
                            var stringmsg = $.base64.atob(_datajson.data.string_msg, true);
                            switch (3, _datajson.data.int32_retcode) {
                                case 0:
                                    if (_datajson.data.int64_real_id_verify_status != "undefined" && _datajson.data.int64_real_id_verify_status != '' && _datajson.data.int64_real_id_verify_status != null) {
                                        localStorage.int64_real_id_verify_status = _datajson.data.int64_real_id_verify_status;
                                        localStorage.int32_auto_check_result = _datajson.data.int32_auto_check_result;
                                    }
                                    console.log(2, val, _datajson)
                                    //如果本地localstorage不为空值，那么datajson.data的值就等于它
//									History.pushState(null, null, "myIndex.html");
//									然后就跳转checkstatus页面
                                    if (val == 1) {
                                        window.location.href = "../credit_learntruet_ds.html";
                                    } else {
                                        window.location.href = "../learntruet_ds.html";
                                    }


                                    break;
                                case -2:
                                    ShowMsg(stringmsg);
                                    $("#tbvcaptchaun").val("1");
                                    $(".txt_jsyzm").show();
                                    clearInterval(clearJdWait)
                                    jdTime("jd-yzcode-repeat", 45);
                                    $("#loadd_pageinfog").css("display", "none");
                                    break;
                                case -1:
                                case -3:
                                case -4:
                                    ShowMsg(stringmsg);
                                    $("#loadd_pageinfog").css("display", "none");
                                    clearInterval(clearJdWait)
                                    jdTime("jd-yzcode-repeat", 45);
                                    break;
                                case -5:
                                    setTimeout(function () {
                                        get_bussiness_status(val);
                                    }, 5000);
                                    break;
                            }
                            break;
                        case -10004:
                        case -10003:
                            session_expired(_datajson.msg);
                            LoadingOver();
                            break;
                        case 404:
                        case -10002:
                            logout();
                            break;
                        default:
                            top_meassage(_datajson.msg);
                            show_topmessage();
                            $("#loadd_pageinfog").css("display", "none");
                            break;
                    }
                }
            }
        }
        _xmlHttpRequest.send(null);
    }
}


/*get captcha*/
function getcaptcha(uname) {
    $("#loadd_pageinfog").css("display", "block");
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/chsi/get_captcha";
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
                            $("#chapchav").val(1);
                            $("#vcode_captcha").attr("src", "data:image/png;base64," + _datajson.data.bytes_captcha);
                            $("#loadd_pageinfog").css("display", "none");
                            if (_datajson.data.int32_retcode < 0) {
                                $.base64.utf8encode = true;
                                var stringmsg = $.base64.atob(_datajson.data.string_err_msg, true);
//								ShowMsg(stringmsg);
                            }
                            break;
                        case -10004:
                        case -10003:
                            session_expired(_datajson.msg);
                            $("#loadd_pageinfog").css("display", "none");
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
                    $("#loadd_pageinfog").css("display", "none");
                }
            }
        }
        _xmlHttpRequest.send("chsi_username=" + uname);
    }
}


/*submit chsi*/
function submitchsiaccount(uname, upwd, vcode, vcodey) {
    $("#loadd_pageinfog").css("display", "block");
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/chsi/submit_chsi_account";
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
                            /*Success = 0,Error = -1,NeedCode = -2,PasswordError = -3,AccountEmpty = -4,NeedWait = -5*/
                            $.base64.utf8encode = true;
                            var stringmsg = $.base64.atob(_datajson.data.string_err_msg, true);
                            var capthcam = _datajson.data.bytes_captcha;
                            switch (_datajson.data.int32_retcode) {
                                case 0:
                                    if (_datajson.data.int64_real_id_verify_status != "undefined" && _datajson.data.int64_real_id_verify_status != '' && _datajson.data.int64_real_id_verify_status != null) {
                                        localStorage.int64_real_id_verify_status = _datajson.data.int64_real_id_verify_status;
                                        localStorage.int32_auto_check_result = _datajson.data.int32_auto_check_result;
                                    }
//									History.pushState(null, null, "myIndex.html");
                                    winopen_checkstatus(308,null);
                                    break;
                                default:
                                    $("#chapchav").val(0);
                                    if (capthcam != '') {
                                        $("#chapchav").val(1);
                                        $("#vcode_captcha").attr("src", "data:image/png;base64," + capthcam);
                                        $(".vcode_captcha").show();
                                    }
                                    if (_datajson.data.string_err_msg != '') {
                                        ShowMsg(stringmsg);
                                    }
                                    $("#loadd_pageinfog").css("display", "none");
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
                            $("#loadd_pageinfog").css("display", "none");
                            break;
                    }
                }
            }
        }
        _xmlHttpRequest.send("chsi_username=" + uname + "&chsi_password=" + upwd + "&verify_code=" + vcodey + "&string_captcha=" + vcode);
    }
}
