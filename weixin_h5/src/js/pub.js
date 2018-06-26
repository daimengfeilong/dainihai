function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17); //得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return 0;
                } else {
                    return 1;
                }
            }
        }
    } else {
        return 1;
    }
}


/*bank vali 验证银行卡号格式*/
function luhmCheck(bankno) {
    if (bankno.length < 16 || bankno.length > 19) {
        return 0;
    }
    var num = /^\d*$/; //全数字
    if (!num.exec(bankno)) {
        return 0;
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
        return 0;
    }
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）

    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm) {
        return 1;
    } else {
        return 0;
    }
}


/*timeout*/
function linkurlerror() {
    LoadingOver();
    top_meassage("请求超时，请稍后再试");
    show_topmessage();
}


/*Enter the password is eyes change style 密码是否可见*/
function change_eye(e, txtid) {
    var img = $(e).attr("class");
    if (img.indexOf("_unable") > -1) {
        img = img.replace("_unable", "_checked");
        $(e).attr("class", img);
        $("#" + txtid).attr("type", "text");
    } else {
        img = img.replace("_checked", "_unable");
        $(e).attr("class", img);
        $("#" + txtid).attr("type", "password");
    }
}


/*Call them according to the current state change the style of the submit button*/
//function change_radio_status(e, btnid) {
//    //勾勾的状态
//    var img = $(e).attr("class");
//    //按钮的状态
//    var btncss = $("#" + btnid).attr("class");
//    //如果检测到时灰色勾勾
//    if (img.indexOf("_unable") > -1) {
//        //勾勾的状态就是 白色的勾勾
//        img = img.replace("_unable", "_checked");
//        //按钮的状态就是白色的按钮
//        btncss = btncss.replace("_unable", "_checked");
//        //勾勾状态替换成白色勾勾
//        $(e).attr("class", img);
//        //按钮转台替换成白色按钮
//        $("#" + btnid).attr("class", btncss);
//    } else {
//        img = img.replace("_checked", "_unable");
//        btncss = btncss.replace("_checked", "_unable");
//        $(e).attr("class", img);
//        $("#" + btnid).attr("class", btncss);
//    }
//}

//function change_radio_status(e, btnid, funname) {
//    var img = $(e).attr("class");
//    var btncss = $("#" + btnid).attr("class");
//    if (img.indexOf("_unable") > -1) {
//        img = img.replace("_unable", "_checked");
//        btncss = btncss.replace("_unable", "_checked");
//        $(e).attr("class", img);
//        $("#" + btnid).attr("class", btncss);
//        //白色按钮绑定了点击事件，当点击的时候 触发学信网账户提交的函数
//        $("#" + btnid).attr("onclick", funname);
//    } else {
//        img = img.replace("_checked", "_unable");
//        btncss = btncss.replace("_checked", "_unable");
//        $(e).attr("class", img);
//        $("#" + btnid).attr("class", btncss);
//        $("#" + btnid).removeAttr("onclick");
//    }
//}

function change_radio_status(e, btnid, funname) {
    if (funname == 15) {
        funname = 'bbussinsestype(2, ' +
            '"' +
            'wszl' +
            '"' +
            ')';
    }
    var img = $(e).attr("class");
    var btncss = $("#" + btnid).attr("class");
    if (img.indexOf("_unable") > -1) {
        img = img.replace("_unable", "_checked");
        btncss = btncss.replace("_unable", "_checked");
        $(e).attr("class", img);
        $("#" + btnid).attr("class", btncss);
        //白色按钮绑定了点击事件，当点击的时候 触发学信网账户提交的函数
        $("#" + btnid).attr("onclick", funname);
    } else {
        img = img.replace("_checked", "_unable");
        btncss = btncss.replace("_checked", "_unable");
        $(e).attr("class", img);
        $("#" + btnid).attr("class", btncss);
        //灰色的勾勾话，就移除灰色按钮的点击事件
        $("#" + btnid).removeAttr("onclick");
    }
}

function tiaotiao() {
    window.location.href = "liftLimit_Bind.html"
}


/*My data back to the current page one layer*/
function return_current_page(divhide, divshow) {
    $("#" + divhide).hide();
    $("#" + divshow).show();
}


/*Learn letter certified switch menu display page*/
// 学信认证切换菜单
function change_page_qh(e, hidepahe, showpage, vtal) {
    $(".sec_nav").find("ul").find("li").removeClass("active");
    $(e).addClass("active");
    $("#chsitypev").val(vtal);
    return_current_page(hidepahe, showpage);
}


/*At the top of the tooltip*/


/*div show hide*/
function divshow(sid) {
    $("#" + sid).show();
}

function divhide(sid) {
    $("#" + sid).hide();
}

function divshow(sid, tid) {
    $("#" + sid).show();
    $("#" + tid).show();
}

function divhide(sid, tid) {
    $("#" + sid).hide();
    $("#" + tid).hide();
}

function thisBack(sid, tid) {
    $("#" + sid).hide();
    $("#" + tid).show();
}


/*Get verification code 验证码倒计时*/
var wait = 45;

function time(o, use) {
    if (wait == 0) {
        console.log(use);
        if (use == "bk") {
            $("#" + o).bind("click", function () {
                getCode();
            });
        } else if (use == "repay") {
            $("#" + o).bind("click", function () {
                //btnvcode(DXType);
                sendSmsCode();
            });
        } else {
            $("#" + o).bind("click", function () {
                //btnvcode(DXType);
                shareCode(DXType);
            });
        }
        $("#" + o).html("重新发送");
        $("#" + o).attr("class", "hq_vcode");
        wait = 45;
    } else {
        $("#" + o).unbind();
        $("#" + o).attr("class", "hq_vcode_gray");
        $("#" + o).html("重新发送(" + wait + ")");
        wait--;
        if (use == "bk" || use == "repay") {
            setTimeout(function () {
                time(o, use);
            }, 1000)
        } else {
            setTimeout(function () {
                time(o);
            }, 1000)
        }
    }
}

// 发送手机验证码
function get_verify_code(iphone, type) {
    DXType = type;
    Loading();
    $.post(urlLink + "/web/validation/send_msg", {
        phone_number: iphone,
        msg_type: type,
        type: "html5"
    }, function (result) {
        var datat = $.toJSON(result);
        var obj = jQuery.parseJSON(datat);
        switch (obj.code) {
            case 0: //OK
                top_meassage("验证码发送成功，请注意查看手机！");
                show_topmessage();
                time('hq_vcode');
                break;
            default:
                top_meassage(obj.msg);
                show_topmessage();
                break;
        }
        LoadingOver();
    });
    
    LoadingOver();
}

/*The local store*/
/*save*/
// 保存数据到本地存储
function localSave(string_phone_number, u, tk_session, int64_uin, int64_status, int64_verify_status, int64_increase_check_status, int32_limit_amount, int32_is_set_pay_password, int32_market_score, int32_apply_status, int64_real_id_verify_status, int32_is_register, int32_stu_worker, int32_married, string_qq, string_invite_code, string_username, int32_remainday, int32_idCardNum) {
    localStorage.string_phone_number = string_phone_number; //手机号
    localStorage.code = u; //微信号
    localStorage.tk_session = tk_session; //tk_session
    localStorage.int64_uin = int64_uin; //tk_uin
    localStorage.int64_status = int64_status; //commitStatus资料提交状态
    localStorage.int64_verify_status = int64_verify_status; //verifystatus资料审核状态;1 联系人(需要通过计算[0 被打回；3 审核通过；其他数字 已提交]);6 通话详单;3 身份证正面;4 身份证反面;5 手持身份证;7 工作信息
    localStorage.int64_increase_check_status = int64_increase_check_status; //用户提升额度的审核状态
    localStorage.int32_limit_amount = (int32_apply_status == 5 ? 0 : int32_limit_amount) / 100; //用户额度
    localStorage.int32_is_set_pay_password = int32_is_set_pay_password; //是否已经设置支付密码0，1
    localStorage.int32_market_score = int32_market_score; //积分
    localStorage.int32_apply_status = int32_apply_status; //拒绝、通过、打回 ；0 等待提交；2 资料正在审核中；3 资料审核通过；4 资料被打回；5 资料被拒绝
    localStorage.int64_real_id_verify_status = int64_real_id_verify_status; //实名认证状态
    localStorage.int32_is_register = int32_is_register; //是否激活1未激活
    localStorage.int32_married = int32_married; //已婚or未婚
    localStorage.int32_stu_worker = int32_stu_worker; //1：学生or2：工薪
    localStorage.string_qq = string_qq;
    localStorage.string_invite_code = string_invite_code;
    localStorage.string_username = string_username;
    localStorage.int32_remainday = int32_remainday; //进件日期
    localStorage.int32_idCardNum = int32_idCardNum;
}

//function pwdSave(upwd) {
//  localStorage.login_pwd = upwd;
//}
//

/*clear*/
// 清除本地数据
function ClearlocalSave() {
    var lt1 = localStorage.sharefriend;
    var lt2 = localStorage.bycxtooptip;
    var sign_remind_status = localStorage.sign_remind_status;
    var sign_remind_date = localStorage.sign_remind_date;
    localStorage.clear();
    localStorage.sharefriend = lt1;
    localStorage.bycxtooptip = lt2;
    localStorage.sign_remind_status = sign_remind_status;
    localStorage.sign_remind_date = sign_remind_date;
}

/*Local store exists*/
function CheckLocalSave(u) {
    if (localStorage.tk_session != '' && localStorage.tk_session != null && localStorage.tk_session != 'undefined') {
        /*There is a direct into the heart of the individual*/
        window.location.href = "index_ds.html";
    } else {
        /*Whether does not exist, call for WeChat account binding function*/
        wx_login(u);
    }
}


/*login_register*/

function loadLogin_first() {
    if (localStorage.openid == 'undefined' || localStorage.openid == '' || localStorage.openid == null) {
        localStorage.openid = "";
    }
    if (localStorage.tk_session != 'undefined' && localStorage.tk_session != '' && localStorage.tk_session != null) {
        var returl = GetUrlParameter("returl");
        if (returl != '' && returl != 'undefined' && returl != null) {
            window.location.href = unescape(returl);
        } else {
            window.location.href = "index_bk.html";
        }
    } else {
        /*With WeChat ID login first, if no user login*/
        localStorage.code = "";
        var u = GetUrlParameter("code");
        if (u != '' && u != 'undefined' && u != null) {
            localStorage.code = u;
            wx_login(u, 0);
        }
    }

}
/*home_other*/

function loadLogin_second() {
    if (localStorage.tk_session == 'undefined' || localStorage.tk_session == '' || localStorage.tk_session == null) {
        /*With WeChat ID login first, if no user login*/
        localStorage.code = "";
        var u = GetUrlParameter("code");
        if (u != '' && u != 'undefined' && u != null) {
            localStorage.code = u;
            wx_login(u, 1);
        } else {
            var urlt = window.location.href;

//            History.pushState(null, null, 'login.html');
            if (urlt.indexOf("login.html") > -1) {
                window.location.href = "login.html";
            } else {
                window.location.href = "login.html?returl=" + escape(urlt);
            }
        }
    } else {
    }
}

function loadLogin_three() {
    var nowUrl = window.location.href;
    if (nowUrl.indexOf("loanplan.html") == -1) {
        var u = GetUrlParameter("code");
    }
    if (u != '' && u != 'undefined' && u != null) {
        localStorage.code = u;
        wx_login(u, 1);
    } else {
        loadLogin_second();
    }
}


/*If get WeChat account binding*/
// 微信登录
function wx_login(u, type) {
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    var _xmlHttpRequestU = createXmlHttpRequest();
    if (_xmlHttpRequestU != null) {
        var _url = urlLink + "/web/user/login/web_chat";
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
                            if (typeof obj_sub.struct_idinfo == "undefined") obj_sub['struct_idinfo'] = '';

                            /*Existence, automatic login, into the heart of the individual*/
                            localSave(obj_sub.string_phone_number, localStorage.code, obj_sub.tk_session, obj_sub.int64_uin, obj_sub.int64_status, obj_sub.int64_verify_status, obj_sub.int64_increase_check_status, obj_sub.int32_limit_amount, obj_sub.int32_is_set_pay_password, obj_sub.int32_market_score, obj_sub.int32_apply_status, obj_sub.int64_real_id_verify_status, obj_sub.int32_is_register, obj_sub.int32_stu_worker, obj_sub.int32_married, obj_sub.string_qq, obj_sub.string_invite_code, obj_sub.string_username, obj_sub.int32_remainday, obj_sub.struct_idinfo.string_id);
//                            alert("2_" + obj_sub.string_username)
//                            History.pushState(null, null, 'login.html');
                            var returl = GetUrlParameter("returl");
                            if (returl != '' && returl != 'undefined' && returl != null) {
                                window.location.href = unescape(returl);
                            } else {
                                window.location.href = "index_bk.html";
                            }
                            break;
                        default:
                            var obj_sub = _datajson.data;
                            if (obj_sub.openid != '' && obj_sub.openid != null && obj_sub.openid != 'undefined') {
                                localStorage.openid = obj_sub.openid;
                            }
                            /*Does not exist, please login*/
                            if (type == 1) {
                                var urlt = window.location.href;
//                                History.pushState(null, null, 'login.html');
                                if (urlt.indexOf("login.html") > -1) {
                                    window.location.href = "login.html";
                                } else {
                                    window.location.href = "login.html?returl=" + escape(urlt);
                                }
                            }
                            break;
                    }
                }
            }
        }
        _xmlHttpRequestU.send("code=" + u);
    }

}


/*logout 登出*/
function logout() {
    var phoneNumber = localStorage.string_phone_number;
    ClearlocalSave();
//    History.pushState(null, null, 'login.html?phone=' + phoneNumber);
    window.location.href = "login.html?phone=" + phoneNumber;
}


/*session expired 已过期请重新登录*/
function session_expired(msg) {
    var strhtml = "<div class=\"tooltip_main_center\" >";
    strhtml += "<div class=\"tooltip_main_node\">";
    strhtml += "<div class=\"tooltip_main_n_top\">";
    strhtml += "<div class=\"tooltip_main_nt_cn\">";
    strhtml += "<div class=\"top_title_sigle\">" + msg + "</div>";
    strhtml += "</div>";
    strhtml += "</div>";
    strhtml += "<div class=\"tooltip_main_n_bottom\">";
    strhtml += "<a onclick=\"" + logout() + "\">";
    strhtml += "<div>重新登录</div>";
    strhtml += "</a>";
    strhtml += "</div>";
    strhtml += "</div>";
    strhtml += "</div>";
    document.append(strhtml)
}


var MASK = [
    0x3,
    0x3 << 2,
    0x3 << 4,
    0x3 << 6,
    0x3 << 8,
    0x3 << 10,
    0x3 << 12,
    0x3 << 14,
    0x3 << 16,
    0x3 << 18,
    0x3 << 20,
    0x3 << 22,
    0x3 << 24
];

function btnstatusvalue(value, index) {
    return (value & MASK[index]) >> (index << 1);
}


function winopenurl(ulink) {
    localStorage.ordernumber = '';
    localStorage.loantailmoney = '';
//    History.pushState(null, null, "myIndex.html");
    window.location.href = ulink;
}
// 判断产品
function judgeProduct(type) {
//    type为1代表信用卡  这里的type是后台返回的int32_type
//    type为4代表投保人尊享分期
//    type为5代表VIP尊享分期
//    dataState为0代表资料未提交
//    dataState为1代表资料已提交
//    creditCOK的值代表用户的产品类型

    var dataState = 0;
    //var creditCOK = btnstatusvalue(localStorage.int64_status, 12);
    var creditCOK = localStorage.int32_product_type;
    if (localStorage.int32_apply_status != 0) {
        dataState = 1;
    }
    if (type == 1) {
//        信用卡
        if (creditCOK == 2) {
            window.location.href = "credit_card/rules.html";
            localStorage.userBusinessType = type;
        } else {
            if (dataState == 1) {
//                资料已提交审核
                addFullScreenToast(fullI)
            } else {
                window.location.href = "credit_card/rules.html";
                localStorage.userBusinessType = type;
            }
        }
    } else if (type == 4) {
        // 投保人专享分期
        if (creditCOK == 4 ) {
            window.location.href = "policy_holder.html";
            localStorage.userBusinessType = type;
        } else  {
            if (dataState == 1) {
//                资料已提交审核
                addFullScreenToast(fullI);
            } else {
//                资料未提交审核（弹窗f）
//                addFullScreenToast(fullF);
                window.location.href = "policy_holder.html";
                localStorage.userBusinessType = type;
            }
        }
    } else {
//        VIP尊享分期
        if (creditCOK == 5) {
            window.location.href = "vip.html";
            localStorage.userBusinessType = type;
        } else {
            if (dataState == 1) {
//                资料已提交审核
                addFullScreenToast(fullI)
            } else {
//                资料未提交审核（弹窗f）
//                addFullScreenToast(fullF);
                window.location.href = "vip.html";
                localStorage.userBusinessType = type;
            }
        }
    }

}


function winopen_two(ulink) {
//    History.pushState(null, null, 'myIndex.html');
    window.location.href = ulink;
}


function getRandom(n) {
    return Math.floor(Math.random() * n + 1)
}

function winopen_checkstatus(val,type) {
	if (type !=1 && type != 2 && type !=3) {
		if (btnstatusvalue(localStorage.int64_status, 12) == 1) {
			type = 1
		} else {
            type = 2
        }
	}
	
    if (val != 10) {
        if (type == 1) {
            if (btnstatusvalue(localStorage.int64_status, 12) == 1 && btnstatusvalue(localStorage.int64_status, 9) == 1) {
                window.location.href = "../check_status.html?" + getRandom(val);
            } else {
                window.location.href = "../credit_learntruet_ds.html?source=1";
            }
        } else if (type == 2) {
            if (btnstatusvalue(localStorage.int64_status, 9) == 1) {
                window.location.href = "check_status.html?" + getRandom(val);
            } else {
                window.location.href = "../learntruet_ds.html?source=2";
            }
        } else {
            if (btnstatusvalue(localStorage.int64_status, 9) == 1) {
                window.location.href = "check_status.html?" + getRandom(val);
            } else {
                window.location.href = "../learntruet_ds.html?source=3";
            }
        }
    } else {
        window.location.href = "liftLimit_BindOK.html";
    }
}


/*是否有未读消息*/
function get_new_message() {
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    var _xmlHttpRequestWD = createXmlHttpRequest();
    if (_xmlHttpRequestWD != null) {
        var _url = urlLink + "/web/message/get_new_message";
        var _method = "POST";
        _xmlHttpRequestWD.open(_method, _url, true);
        _xmlHttpRequestWD.withCredentials = true;
        _xmlHttpRequestWD.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        _xmlHttpRequestWD.onreadystatechange = function () {
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
                            ///int32_read_point
//                            console.log(_datajson.data.int32_read_point)
                            if (btnstatusvalue(_datajson.data.int32_read_point, 0) == 1) {
                                $("#msg_hongdian").show();
                                if (window.location.href.indexOf("better.html") > -1) {
                                    $("#msg_txx").show();
                                }
                            }
                            if (window.location.href.indexOf("messagecenter.html") > -1) {
                                $(".msg_menul").find("li").removeClass("active");
                                if (btnstatusvalue(_datajson.data.int32_read_point, 2) == 1) {
                                    $("#mymsgmenuwd").show();
                                    $("#mymsgmenuwd_box").addClass("active");
                                    $("#new_active_cont").hide();
                                    $("#mymsgmenuwd_cont").show();
                                    $("#mynoticemenuwd_cont").hide();
                                } else if (btnstatusvalue(_datajson.data.int32_read_point, 3) == 1) {
                                    $("#mynoticemenuwd").show();
                                    $("#mynoticemenuwd_box").addClass("active");
                                    $("#new_active_cont").hide();
                                    $("#mymsgmenuwd_cont").hide();
                                    $("#mynoticemenuwd_cont").show();
                                } else {
                                    $("#new_activity").addClass("active");
                                    $("#new_active_cont").show();
                                    $("#mymsgmenuwd_cont").hide();
                                    $("#mynoticemenuwd_cont").hide();
                                }
                            } else {
                                $("#new_active_cont").hide();
                                $("#mymsgmenuwd_cont").show();
                                $("#mynoticemenuwd_cont").hide();
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


