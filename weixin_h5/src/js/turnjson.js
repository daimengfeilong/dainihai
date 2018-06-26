function changephone() {
    var uname = $("#txt_phoneno").val();
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入您的手机号码！");
        return false;
    } else if (!regPhone.exec(uname)) {
        ShowMsg("请输入正确的手机号码！");
        return false;
    }
}

function changepwd() {
    var upwd = $("#txt_phonepwd").val();
    if (upwd == "" || upwd == null || upwd == "undefined") {
        ShowMsg("请输入您的密码！");
        return false;
    } else if (!regPwd.exec(upwd)) {
        ShowMsg("密码由6-20个字母或数字组成！");
        return false;
    } else if (upwd.length < 6 || upwd.length > 20) {
        ShowMsg("密码由6-20个字母或数字组成！");
        return false;
    }
}

function changevcode() {
    var vode = $("#txt_vcode").val();
    if (vode == "" || vode == null || vode == "undefined") {
        ShowMsg("请输入短信中的验证码！");
        return false;
    }
}


/*user register*/
function btnvcode(msg_type) {
    var phone = $("#txt_phoneno").val();
    if (phone == "" || phone == null || phone == "undefined") {
        ShowMsg("请输入您的手机号码");
        return false;
    } else if (!regPhone.exec(phone)) {
        ShowMsg("请输入正确的手机号码");
        return false;
    } else {
        get_verify_code(phone, msg_type);
    }
}


/*home page*/
/*check user status*/
function checkuserstatus() {
    //资料等待提交
    $("#datadsubmit").hide();
//    divhide('datadsubmit');
    //资料正在审核中
    $("#dataaudit").hide();
//    divhide('dataaudit');
    //资料审核通过
    $("#datathrough").hide();
//    divhide('datathrough');
    //资料被打回
    $("#databackto").hide();
//    divhide('databackto');
    //资料已被拒绝
    $("#datarefused").hide();
//    divhide('datarefused');
    if (localStorage.int32_apply_status != null) {
        switch (localStorage.int32_apply_status) {
            case "0":
                //资料等待提交
                divshow('datadsubmit');
                break;
            case "1":
            /*Data are waiting for the audit*/
            case "2":
                //资料正在审核中
                divshow('dataaudit');
                break;
            case "3":
                //资料审核通过
//                localStorage.int32_limit_amount
                $("#liamount").html(500);
                divshow('datathrough');
                break;
            case "4":
                //资料被打回
                divshow('databackto');
                break;
            case "5":
                //资料已被拒绝
                divshow('datarefused');
                divshow('li_moreloan');
                break;
        }
    }
}

/*feedback*/
function changefeedcon() {
    var tcon = $("#txt_content").val();
    if (tcon == "" || tcon == null || tcon == "undefined") {
        ShowMsg("请留下您的宝贵意见，以便我们更快的发现问提 并解决问题！");
        return false;
    }
}

function changefeedly() {
    var tly = $("#txt_linkuyou").val();
    if (tly == "" || tly == null || tly == "undefined") {
        ShowMsg("请输入能联系到您的QQ号、手机号和邮箱等！");
        return false;
    }
}

function btnfeedback() {
    var tcon = $("#txt_content").val();
    var tly = $("#txt_linkuyou").val();
    if (tcon == "" || tcon == null || tcon == "undefined") {
        ShowMsg("请留下您的宝贵意见，以便我们更快的发现问提并解决问题！");
        return false;
    } else if (tly == "" || tly == null || tly == "undefined") {
        ShowMsg("请输入能联系到您的QQ号、手机号和邮箱等！");
        return false;
    } else if (!regPhone.exec(tly) && !regPhoneFax.exec(tly) && !regQQ.exec(tly) && !regEmail.exec(tly)) {
        ShowMsg("请输入正确的QQ号、手机号和邮箱等！");
        return false;
    } else {
        suggestions(tcon, tly);
    }
}


/*feedback*/

function suggestions(tcon, tly) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/more/suggestions";
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
                            ShowMsg("谢谢您的参与！");
                            setTimeout(function () {
                                window.location.href = "better.html"
                            }, 1000)
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
        _xmlHttpRequest.send("content=" + tcon + "&contact=" + tly);
    }
}

/*i wang to loan*/
function btnloanclick() {
    get_all_status(pCallBack, null, null);
}

function pCallBack() {
    if (localStorage.int32_apply_status != null) {
        switch (localStorage.int32_apply_status) {
            case "0":
//                请完善资料
                /*Data are waiting to submit*/
                divshow('filenew');
                //提示选择产品
//                divshow('chooseProduct');
                break;
            case "1":
            /*Data are waiting for the audit*/
            case "2":
                /*Information is under review*/
//                资料审核中
                divshow('fileaubit');
                break;
            case "3":
                /*Literature review by*/
                KS_IsBankNo();
                break;
            case "4":
//                资料被打回
                /*The information is back*/
                divshow('fileback');
                break;
            case "5":
                /*Data has been rejected*/
                /*0 or null*/
                if (parseInt(localStorage.int32_remainday) <= 0) {
//                    资料拒绝冷却结束
                    divshow('filereject_lqjs');
                } else {
                    /*1-15*/
                    if (parseInt(localStorage.int32_remainday) >= 1 && parseInt(localStorage.int32_remainday) <= 60) {
//                    资料拒绝冷却中
                        divshow('filereject_lqz');
                        $(".remive_day").find('i').html(localStorage.int32_remainday);
                        $(".remive_day").find('span').html(localStorage.int32_remainday);
                    }
                }
                break;
        }
    }
}
//首页的快速提现和借款进度调用
//3 快速提现
//4 借款进度
function loanSchedule(type) {
    if (localStorage.int32_apply_status != null) {
        switch (localStorage.int32_apply_status) {
            case "0":
                //已绑信用卡，资料不全
                var isCreditCard = btnstatusvalue(localStorage.int64_status, 12);
                if (isCreditCard == 1) {
                    //TODO
                    if (type === 3) {
                        addFullScreenToast(fullG)
                    } else if (type === 4) {
                        addFullScreenToast(fullH)
                    }
                    return
                }

                var _url = window.location.pathname;
                if (/home.html/.test(_url)) {
                    if (type === 3) {
                        addFullScreenToast(fullD);
                    } else {
                        addFullScreenToast(fullE);
                    }
                } else {
                    if (type === 3) {
                        addFullScreenToast(fullB);
                    } else {
                        addFullScreenToast(fullC);
                    }
                }
                break;
            default :
                if (type == 3) {
                    btnloanclick();
                } else if (type == 4) {
                    winopenurl('loanplan.html');
                }
                break;
        }
    }
}

/*i wang to bank*/
function btnbankclick() {
    get_all_status(null, null, null);
    LoadingOver();
    if (localStorage.int32_apply_status == 3) {
        window.location.href = "brandcard.html";
    } else {
        var tgcount = parseInt($("#bankcountadata").val());
        if (tgcount >= 100) {
            window.location.href = "brandcard.html";
        } else {
            ShowMsg('请先完善您的账户资料');
        }
    }
}

//<!--首页产品获取-->
var productArray = [
    {
        id: 1,
        image: 'icon_xinyonka',
        title: '信用卡分期',
        subtitle: '(1000-50000元)',
        description: '凭信用卡分期，最高5万元',
        type: 1,
        state: 1,
        order: 1,
        is_hot: 1
    },
    {
        id: 3,
        image: 'icon_fenqi',
        title: '现金分期',
        subtitle: '(1000-5000元)',
        description: '最高可借10000元，分期还',
        type: 3,
        state: 1,
        order: 3,
        is_hot: 0
    }
];
var by = function(order){   // 数组排序函数
    return function(o, p){
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[order];
            b = p[order];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
};
function getProduct() {
    //productListErr();
    var url = urlLink + "/web/productlistget/get";
    xmlHttpRequest(null, url, getProductBack, 'GET');
}
//int32_is_hot  产品is hot
//int32_order   产品排序
//int32_productid   产品编号
//int32_state   产品状态
//int32_type    产品类型
//string_description    产品描述
//string_image  产品icon名称
//string_subtitle   产品副标题
//string_title  产品标题
function getProductBack(_data) {
    switch (_data.code) {
        case 0:
            $("#loan-cont").find('.home-l-c-wrap').remove();
            var html = '';
            var clickHtml = '';
            var hotHtml = '';
            var dataArray = _data.data.struct_product.sort(by("int32_order"));
            if (dataArray.length > 0) {
                for (var i = 0; i < dataArray.length; i++) {
                    //if (dataArray[i].int32_type == 1) {
                    //    clickHtml = '<div class="home-l-c " onclick="judgeProduct(1)">';
                    //} else if (dataArray[i].int32_type == 2) {
                    //    clickHtml = '<div class="home-l-c " onclick="judgeProduct(2)">';
                    //} else {
                        clickHtml = '<div class="home-l-c " onclick="judgeProduct('+dataArray[i].int32_type+')">';
                    //}
                    if (dataArray[i].int32_is_hot == 1) {
                        hotHtml = '<span class="dnh-hot">HOT</span>';
                    } else {
                        hotHtml = '';
                    }
                    html += ' <div class="home-l-c-wrap">' +
                        clickHtml +
                        hotHtml +
                        ' <i class="cont-p-1" style="background-image: url(' + 'images/' + '' + dataArray[i].string_image + '' + '.png' + ')"></i>' +
                        '<p class="l-c-t">' +
                        dataArray[i].string_title +
                        '<span class="l-c-t-h">' +
                        dataArray[i].string_subtitle +
                        '</span></p>' +
                        '<p class="l-c-c">' +
                        dataArray[i].string_description +
                        '</p>' +
                        '<a href="javascript:" class="jt-z"></a>' +
                        '</div>' +
                        '</div>';
                }
            } else {
                productListErr();
            }
            $("#loan-cont").append(html);
            break;
        case -10003:
            session_expired(_datajson.msg);
            break;
        case -10002:
            logout();
            break;
        default:
            top_meassage(_datajson.msg);
            show_topmessage();
            break;
    }
}

function productListErr() {
    var html = '';
    var clickHtml = '';
    var hotHtml = '';
    for (var i = 0; i < productArray.length; i++) {
        if (productArray[i].type == 1) {
            clickHtml = '<div class="home-l-c " onclick="judgeProduct(1)">';
        } else {
            clickHtml = '<div class="home-l-c " onclick="judgeProduct(2)">';
        }
        if (productArray[i].is_hot == 1) {
            hotHtml = '<span class="dnh-hot">HOT</span>';
        } else {
            hotHtml = '';
        }
        html += ' <div class="home-l-c-wrap">' +
            clickHtml +
            hotHtml +
            ' <i class="cont-p-1" style="background-image: url(' + 'images/' + '' + productArray[i].image + '' + '.png' + ')"></i>' +
            '<p class="l-c-t">' +
            productArray[i].title +
            '<span class="l-c-t-h">' +
            productArray[i].subtitle +
            '</span></p>' +
            '<p class="l-c-c">' +
            productArray[i].description +
            '</p>' +
            '<a href="javascript:" class="jt-z"></a>' +
            '</div>' +
            '</div>';
    }
    $("#loan-cont").append(html);
}

function creditB(type) {
    if (localStorage.int32_apply_status != null) {
        switch (localStorage.int32_apply_status) {
            case "0":
                btnrealviery(type);
                break;
            default :
                btnloanclick();
                break;
        }
    }
    
    // cao
    if(type === 3){
    	LoadingOver();
    }
}

//1 信用卡
function btnrealviery(type) {
    get_all_status(null, null, null);
    var isCreditCard = btnstatusvalue(localStorage.int64_status, 12);
    if (isCreditCard != 1) {
        var _url = window.location.pathname;
        if (/myIndex.html/.test(_url)) {
            addFullScreenToast(fullA);
            return
        }
    }

    if (localStorage.int64_real_id_verify_status != null) {
        switch (localStorage.int64_real_id_verify_status) {
            case "0":
                if (type == 1) {
                    window.location.href = "autonym.html?source=1";
                } else if (type == 2) {
                    window.location.href = "autonym.html?source=2";
                } else {
                    window.location.href = "autonym.html?source=3";
                }
                break;
            case "1":
                if (btnstatusvalue(localStorage.int64_status, 12) == 1) {
                    window.location.href = "credit_learntruet_ds.html?source=1";
                } else {
                    window.location.href = "learntruet_ds.html?source=2";
                }

                break;
            default:
                winopen_checkstatus(188, type);
                break;
        }
    }
}

// 用户信息完善程度
function dataPercent() {
    var sumcount = 0;
    if (localStorage.int64_status != null) {
        if (localStorage.int32_stu_worker == 1) {
            //学生
            for (var i = 0; i < 9; i++) {
                if (btnstatusvalue(localStorage.int64_status, i) == 1) {
                    switch (i) {
                        case 0:
                            sumcount = sumcount + 20;
                            break;
                        case 1:
                            sumcount = sumcount + 20;
                            break;
                        case 2:
                            sumcount = sumcount + 20;
                            break;
                        case 3:
                            sumcount = sumcount + 10;
                            break;
                        case 4:
                            sumcount = sumcount + 10;
                            break;
                        case 5:
                            sumcount = sumcount + 10;
                            break;
                        case 6:
                            sumcount = sumcount + 10;
                            break;
                        case 7:
                            if (localStorage.int32_stu_worker == 2) {
                                sumcount = sumcount + 10;
                            }
                            break;
                        case 8:
                            if (localStorage.int32_stu_worker == 1) {
                                //学生
                                sumcount = sumcount + 20;
                            }
                            break;
                    }
                } else {
                    sumcount = sumcount + 0;
                }
            }
        } else {
            //工薪
            if (btnstatusvalue(localStorage.int64_status, 0) == 0) {
                return sumcount = 0
            }
            for (var i = 0; i < 10; i++) {
                if (btnstatusvalue(localStorage.int64_status, i) == 1) {
                    switch (i) {
                        case 0:
                            //完善资料
                            sumcount = sumcount + 50;
                            break;
                        case 1:
                            //联系人
                            sumcount = sumcount + 10;
                            break;
//                      case 2:
////                            sumcount = sumcount + 10;
//                          break;
//                      case 3:
//                          //身份证正面 65601
//                          sumcount = sumcount + 10;
//                          break;
//                      case 4:
//                          //身份证反面 65857
//                          sumcount = sumcount + 10;
//                          break;
//                      case 5:
//                          //手持身份证 66881
//                          sumcount = sumcount + 10;
//                          break;
                        case 6:
                            //通话详单
                            sumcount = sumcount + 10;
                            break;
                        case 7:
                            //工作信息 83265
//                            if (localStorage.int32_stu_worker == 2) {
                            sumcount = sumcount + 10;
//                            }
                            break;
                        case 8:
                            //京东
//                            if (localStorage.int64_status == 65537) {
                            sumcount = sumcount + 10;
//                            } else {
//                                sumcount = sumcount + 10;
//                            }
                            break;
                        case 9:
                            //储蓄卡
                            sumcount = sumcount + 10;
                            break;
                    }
                } else {
                    sumcount = sumcount + 0;
                }
            }
        }

        //sumcount = sumcount / 100;
        $("#bankcountadata").val(sumcount);
        $("#dataparentbf").html(sumcount + "%");
    }
}


function btnaddbenkpay(type) {
    if (localStorage.int32_is_set_pay_password != null) {
        localStorage.urllintype = "bank";
        if (localStorage.int32_is_set_pay_password == 0) {
//            History.pushState(null, null, 'myIndex.html');
            window.location.href = 'paypwd.html?source=' + type;
        } else {
//            History.pushState(null, null, 'brandcard.html');
            window.location.href = 'add_bankcard.html?source=' + type;
        }

    }
}


/*To obtain a list strategy(loan) 获得借款策略列表*/
function gain_strategy() {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/bank_card/strategy_list";
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
                    console.log(111, _datajson)
                    switch (_datajson.code) {
                        case 0: //OK
                            var strhtml = "";
                            var defulthtml = "";
                            $.each(_datajson.data, function (i, item) {
                                if (item.int32_type == 1) {
                                    if (i == 0) {
                                        strhtml += "<li>";
                                    } else {
                                        strhtml += "<li>";
                                        //strhtml += "<li style=\"display: none;\">";
                                    }
                                    /*分几期_间隔_费率_利息_类型*/
                                    strhtml += "<p class=\"le-bar\" alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\">" + item.name + "</p>";
                                    strhtml += "</li>";
                                    //if (item.string_name == '12个月') {
                                    //    defulthtml += "<li>";
                                    //    defulthtml += "<p class=\"le-bar\" alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\">" + item.name + "</p>";
                                    //    defulthtml += "</li>";
                                    //}
                                }
                            });
                            $(".lt_bar_panul").html(strhtml);
                            addList(strhtml);
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


/*check_password*/
function check_password(pwd) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/payment/check_password";
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
                            //document.title = '我的银行卡';
                            setTimeout(function () {
                                //利用iframe的onload事件刷新页面
                                document.title = '银行卡绑定';
                                var iframe = document.createElement('iframe');
                                iframe.style.visibility = 'hidden';
                                iframe.style.width = '1px';
                                iframe.style.height = '1px';
                                iframe.onload = function () {
                                    setTimeout(function () {
                                        document.body.removeChild(iframe);
                                    }, 0);
                                };
                                document.body.appendChild(iframe);
                            }, 0);
                            $("#__w_l_h_v_c_z_e_r_o_divid").hide();
                            $(".maincontentfrist").hide();
                            $(".maincontentsecond").show();
                            break;
                        case -10004:
                        case -10003:
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
                            logout();
                            break;
                        case -10006:
                            divshow('errorpwd')
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
        _xmlHttpRequest.send("password=" + pwd);
    }
}

function RetryPwd() {
    $("#txt_paypwd").val("");
    $("#btnpayul").find("li").html("");
    divhide('errorpwd');
}


function retr_RetryPwd() {
    $("#txt_paypwd").val("");
    $("#btnpayul").find("li").html("");
    divhide('errorpwd');
    divshow('payzfpwd');
}


/*set_password*/
function set_password(pwd, type) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/payment/set_password";
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
                            localStorage.int32_is_set_pay_password = 1;
//                            History.pushState(null, null, 'brandcard.html');
                            switch (localStorage.urllintype) {
                                case 'kstx':
                                    window.location.href = "rapiddeposit.html";
                                    break;
                                default:
                                    window.location.href = "add_bankcard.html?keyboard=1&source=" + type;
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
        _xmlHttpRequest.send("password=" + pwd);
    }
}


/*basic_info*/
function IsBankNo() {
    Loading();
    var timeout = setTimeout(function () {
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
                            if (_datajson.data.bind == 0) {
                                nobanklist = 0;
                                $(".banklist").hide();
                            } else {
                                nobanklist = 1;
                                $(".banklist").show();
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

// 重置密码时填写资料
function yzbaseinfo() {
    var uname = $("#txt_uname").val();
    var ucardcode = $("#txt_cardcode").val();
//  var lxuname = $("#txt_lxuname").val();
//  var lxtel = $("#txt_lxtel").val();
    var bankno = $("#txt_bankno").val();
    if (nobanklist == 1) {
        if (bankno == "" || bankno == null || bankno == "undefined") {
            ShowMsg("请输入您绑定的储蓄卡号！");
            return false;
        }
        yzbaseinfoy(uname, ucardcode, bankno);
    } else {
        yzbaseinfoy(uname, ucardcode, bankno);
    }
}

function yzbaseinfoy(uname, ucardcode, bankno) {
    if (uname == "" || uname == null || uname == "undefined") {
        ShowMsg("请输入本人姓名！");
        return false;
    } else if (ucardcode == "" || ucardcode == null || ucardcode == "undefined") {
        ShowMsg("请输入本人身份证！");
        return false;
    } else {
        var correct = validateIdCard(ucardcode);
        if (correct == 1) {
            ShowMsg("请输入正确的身份证号码！");
            return false;
        }
        /*
         else if (lxuname == "" || lxuname == null || lxuname == "undefined") {
         ShowMsg("请输入联系人姓名！");
         return false;
         } else if (lxtel == "" || lxtel == null || lxtel == "undefined") {
         ShowMsg("请输入联系人手机号码！");
         return false;
         } else if (!regPhone.exec(lxtel)) {
         ShowMsg("请输入正确的手机号码！");
         return false;
         } */
        else {
            basic_info(uname, ucardcode, bankno);
        }
    }
}

/*submit basic_info*/

function basic_info(name, idcard, bankno) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/payment/basic_info";
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
                        case 0: //OK  进入下一步
                            //btnvcode(4);
                            shareCode(4);
                            $("#divcontfrist").hide();
                            $("#divcontsencod").show();
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
        _xmlHttpRequest.send("name=" + name + "&id_card=" + idcard + "&bank_card_id=" + bankno + "&contact_phone=" + "&contact_name=");
    }
}


/*yz pwd*/
function yzmpaypwd() {
    var vcode = $("#txt_vcode").val();
    var iphone = $("#txt_phoneno").val();
    if (vcode == "" || vcode == null || vcode == "undefined") {
        ShowMsg("请输入短信验证码！");
        return false;
    } else {
        yzm_resetvcode(iphone, vcode);
    }
}

/*submit yzm*/
function yzm_resetvcode(iphone, vcode) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/validation/check_msg";
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
                        case 0: //OK  下一步
                            $("#divcontfrist").hide();
                            $("#divcontsencod").hide();
                            $("#divcontthree").show();
                            vtype = 6;
                            var input2 = document.getElementById('txt_paypwd');
                            KeyBoard(input2);
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
        _xmlHttpRequest.send("phone_number=" + iphone + "&msg_type=4&verify_code=" + vcode);
    }
}

/*reset_password*/

function reset_password(pwd, vcode) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/payment/reset_password";
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
                        case 0: //OK   重置完成后返回输入支付密码页
//                            history.replaceState(null, null, "resetpaypwd.html");
                            switch (localStorage.urllintype) {
                                case 'jdcx':
                                    window.location.href = "loanplan.html";
                                    break;
                                case 'kstx':
                                    window.location.href = "rapiddeposit.html";
                                    break;
                                case 'bank':
                                    if (localStorage.userBusinessType == 2) {
                                        // 储蓄卡
                                        window.location.href = "learntruet_ds.html?source=2";
                                    } else {
                                        // 信用卡
                                        window.location.href = "credit_learntruet_ds.html?source=1";
                                    }
                                    break;
                                default:
//                                  window.location.href = "brandcard.html";
                                    window.location.href = "raster.html";
                                    break;
//                                    add_bankcard.html?keyboard=1
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
        _xmlHttpRequest.send("password=" + pwd + "&verify_code=" + vcode);
    }
}


function Loadcheckdetail(type, callBack, tk_uin, tk_session) {
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
                                case 1:
//                                    console.log(_datajson.data)
                                    localStorage.antonym_uname = _datajson.data.struct_basic_profile.string_name;
                                    localStorage.antonym_ucardcode = _datajson.data.struct_basic_profile.string_id_number;
                                    localStorage.antonym_addr = _datajson.data.struct_basic_profile.string_family_address;
                                    localStorage.data_work_address = _datajson.data.struct_basic_profile.string_work_address;
                                    localStorage.string_education = _datajson.data.struct_basic_profile.string_degree;

                                    if (_datajson.data.struct_basic_profile.string_email != null && _datajson.data.struct_basic_profile.string_email != 'undefined' && _datajson.data.struct_basic_profile.string_email != '') {
                                        var iOf = _datajson.data.struct_basic_profile.string_email.indexOf('@');
                                        localStorage.qq = _datajson.data.struct_basic_profile.string_email.substr(0, iOf);
                                    }

                                    if (callBack != 'undefined' && callBack != "" && callBack != null) {
                                        console.log("cb")
                                        callBack();
                                    }

                                    /*localStorage.data_title = _datajson.data.struct_basic_profile.string_title;
                                     localStorage.data_company_phone = _datajson.data.struct_basic_profile.string_company_phone;
                                     localStorage.data_commpany = _datajson.data.struct_basic_profile.string_company*/
                                    break;
                                case 2:
                                    $.each(_datajson.data.struct_contact_info, function (i, item) {
                                        switch (i) {
                                            case 0:
                                                localStorage.int32_type = item.int32_type;
                                                localStorage.string_name = item.string_name;
                                                localStorage.string_phone_number = item.string_phone_number;
                                                break;
                                            case 1:
                                                localStorage.int32_typey = item.int32_type;
                                                localStorage.string_namey = item.string_name;
                                                localStorage.string_phone_numbery = item.string_phone_number;
                                                break;
                                            case 2:
                                                localStorage.int32_typee = item.int32_type;
                                                localStorage.string_namee = item.string_name;
                                                localStorage.string_phone_numbere = item.string_phone_number;
                                                break;
                                        }
                                    });
                                    break;
                                case 3:
                                    break;
                                case 4:
                                    break;
                            }
                            break;
                        case
                        -10004
                        :
                        case
                        -10003
                        :
                            session_expired(_datajson.msg);
                            break;
                        case
                        404
                        :
                        case
                        -10002
                        :
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
        if (tk_session != null && tk_session != "" && tk_session != 'undefined' && tk_uin != null && tk_uin != "" && tk_uin != 'undefined') {
            _xmlHttpRequest.send("check_type=" + type + "&tk_uin=" + tk_uin + "&tk_session=" + tk_session);
        } else {
            _xmlHttpRequest.send("check_type=" + type);
        }

    }
}


/*get user status*/

function get_all_status(callBackFun, tk_uin, tk_session) {
    Loading();

    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {

        var _url = urlLink + "/web/user/get_all_status";
//        if (tk_session != null && tk_session != "" && tk_session != 'undefined' && tk_uin != null && tk_uin != "" && tk_uin != 'undefined') {
//            _url = urlLink + "/web/user/get_all_status?tk_uin=" + tk_uin + "&tk_session=" + tk_session;
//        }
        var _method = "GET";
        _xmlHttpRequest.open(_method, _url, true);
        _xmlHttpRequest.withCredentials = true;
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
                            localStorage.int64_real_id_verify_status = _datajson.data.int64_real_id_verify_status;
                            localStorage.int64_status = _datajson.data.int64_profile_status;
                            localStorage.int32_product_type = _datajson.data.int32_product_type;
                            localStorage.int32_apply_status = _datajson.data.int32_apply_status;
                            localStorage.int64_verify_status = _datajson.data.int64_profile_check_status;
                            localStorage.int32_limit_amount = parseInt(_datajson.data.int32_current_limit) / 100;
                            localStorage.int32_market_score = _datajson.data.int32_market_score;
                            localStorage.int32_remainday = _datajson.data.int32_remainday;
                            localStorage.int64_increase_status = _datajson.data.int64_increase_status;
                            localStorage.int32_job = _datajson.data.int32_job;
                            localStorage.int64_increase_check_status = _datajson.data.int64_increase_check_status;
                            localStorage.int64_uin = _datajson.data.int64_uin;
                            localStorage.string_phone_number = _datajson.data.string_phone_no;
                            localStorage.int32_market_score = _datajson.data.int32_market_score;
                            localStorage.int32_married = _datajson.data.int32_married;
                            localStorage.string_username = _datajson.data.string_name;
                            localStorage.string_invite_code = _datajson.data.string_invite_code;
                            localStorage.int64_increase_status = _datajson.data.int64_increase_status;
                            localStorage.int64_increase_check_status = _datajson.data.int64_increase_check_status;
                            localStorage.int32_is_set_pay_password = _datajson.data.int32_is_set_payment_password;
                            localStorage.shar_staus = _datajson.data.share_status;
                            localStorage.invite_code_status = _datajson.data.invite_code_status;
                            localStorage.int32_precashstrategy = _datajson.data.int32_precashstrategy;
                            localStorage.int32_used_limit = _datajson.data.int32_used_limit / 100;
                            localStorage.string_work_address = _datajson.data.string_work_address; // 工作地址
                            if (callBackFun != 'undefined' && callBackFun != "" && callBackFun != null) {
                                console.log("cb all-status");
                                callBackFun();
                            }
                            LoadingOver();
                            break;
                        case -10004:
                        case -10003:
                            LoadingOver();
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
                        case -10005:
                            LoadingOver();
                            logout();
                            break;
                        default:
                            LoadingOver();
                            top_meassage(_datajson.msg);
                            show_topmessage();
                            break;
                    }
                }

            }
        };
        _xmlHttpRequest.send(null);
    }
}

//判断分享升额度和邀请码是否弹出
function bombBox(shareStatus, inviteCodeStatus, uin, applyStatus) {
    //分享升额度弹框是否弹出判断值 0:弹出 / 1:不弹
    var shareStatus = shareStatus;
    //邀请码时候弹出判断值
    var inviteCodeStatus = inviteCodeStatus;
    //用户ID
    var uin = uin;
    //判断身份信息审核状态  3：通过 其他为不通过
    var applyStatus = applyStatus;

    var firstShareCookie = $.cookie('first_share');
    var firstInviteCookie = $.cookie('first_invite');

    if (parseInt(applyStatus) == 3) {
        //分享
        if (firstShareCookie != '' && firstShareCookie != 'undefined' && firstShareCookie != null) {
            $("#myshare").hide();
        } else {
            $("#myshare").show();
            $.cookie('first_share', 1, {expires: 365000});
        }
    } else {
        //邀请
        if (firstInviteCookie != '' && firstInviteCookie != 'undefined' && firstInviteCookie != null) {
            $("#tipsinvite").hide();
        } else {
            $("#tipsinvite").show();
            $.cookie('first_invite', 1, {expires: 365000});
        }
    }
}

//分享：flag= 0  邀请码：flag= 1
//function modifyStatus(uin, flag) {
//    $.ajax({
//        url: urlLink + "/web/user/modify_status",
//        type: "post",
//        data: {
//            uin: uin,
//            flag: flag
//        },
//        success: function () {
//            console.log("成功");
//        },
//        error: function () {
//            console.log("失败");
//        }
//    });
//}


/*basic_info*/
function KS_IsBankNo() {
    Loading();

    var timeout = setTimeout(function () {
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
                            if (_datajson.data.bind == 0) {
                                divshow('nobankcard');
                            } else {
                                if (localStorage.int32_is_set_pay_password == 0) {
                                    localStorage.urllintype = "kstx";
//                                    History.pushState(null, null, 'myIndex.html');
                                    window.location.href = 'paypwd.html';
                                } else {
                                    checkno_loanorder();
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
        _xmlHttpRequest.send(null);
    }
}


/*check no order*/
function checkno_loanorder() {
    Loading();
    var timeout = setTimeout(function () {
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
                            if (_datajson.data.string_order_number != '' && _datajson.data.string_order_number != null && _datajson.data.string_order_number != 'undefined') {
                                divshow('udoneloan');
                            } else {
                                if (whichPage("rules")) {
                                    window.location.href = "../rapiddeposit.html";
                                } else {
                                    window.location.href = "rapiddeposit.html";
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
        _xmlHttpRequest.send(null);
    }
}


/**/
/*check_password*/
function Cancel_checkpassword(paypwd) {
    divhide('payzfpwd');
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/payment/check_password";
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
                            BtnCancelUser(paypwd);
                            break;
                        case -10004:
                        case -10003:
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
                            logout();
                            break;
                        case -10006:
                            divshow('errorpwd')
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
        _xmlHttpRequest.send("password=" + paypwd);
    }
}
/*cancel users*/

function BtnCancelUser(paypwd) {
    divhide('nullifyusers');
    divhide('payzfpwd');
    $("#txt_paypwd").val("");
    $("#btnpayul").find("li").html("");
    $("#__w_l_h_v_c_z_e_r_o_divid").hide();
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user/login/unregister";
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
                            /*logout();*/
                            var tk_session = localStorage.tk_session;
                            ClearlocalSave();
                            localStorage.tk_session = tk_session;
                            localStorage.int32_is_set_pay_password = 0;
                            get_all_status(null, null, null);
                            ShowMsg('已成功注销用户');
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
        _xmlHttpRequest.send("password=" + paypwd);
    }
}


function btnpaycancel() {
    divhide('payzfpwd');
    $("#txt_paypwd").val("");
    $("#btnpayul").find("li").html("");
    $("#__w_l_h_v_c_z_e_r_o_divid").hide();
}


function AddJMarkSCore() {
    if (localStorage.yzcdscore != '' && localStorage.yzcdscore != 'undefined' && localStorage.yzcdscore != null) {
        if (parseInt(localStorage.yzcdscore) > 0) {
            Loading();
            var timeout = setTimeout(function () {
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
                _xmlHttpRequesty.onreadystatechange = function () {
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
                                    ShowMsg("您已成功领取" + localStorage.yzcdscore + "积分!");
                                    localStorage.yzcdscore = '';
                                    LoadingOver();
                                    return false;
                                    break;
                                case -10004:
                                case -10003:
                                    session_expired(_datajson.msg);
                                    break;
                                case 404:
                                case -10002:
                                    logout();
                                    break;
                                case -10050:
                                    localStorage.yzcdscore = '';
                                    top_meassage(_datajson.msg);
                                    show_topmessage();
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
                _xmlHttpRequesty.send("score=" + localStorage.yzcdscore + "&int32_activity_type=1");
            }
        }
    }
}


function GetBannerList() {
    $("#loadd_pageinfog").show();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/user/get_banner_list";
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
                            var strhtml = "",
                                fristhtml = "",
                                sencondhtml = "";
                            $.each(_datajson.data.bannerList, function (i, item) {
                                fristhtml += "<li style=\"width: 100%; display: table-cell; vertical-align: middle;\" >";
                                if (item.int32_type == 0) {
                                    fristhtml += "<img src = \"" + item.string_pic_address + "\" style = \"min-height: 50px;\">";
                                } else {
                                    fristhtml += "<a href=" + item.string_url + ">";
                                    fristhtml += "<img src = \"" + item.string_pic_address + "\" style = \"min-height: 50px;vertical-align: middle;\">";
                                    fristhtml += "</a>";
                                }

                                fristhtml += "</li>";
                                if (i == 0) {
                                    sencondhtml += "<li class=\"on\"></li>";
                                } else {
                                    sencondhtml += "<li class=\"\"></li>";
                                }
                            });

                            $("#imglist").append(fristhtml);
                            $("#imgli").append(sencondhtml);

                            $("#banner_box").find("img").each(function (i, e) {
                                var imgSrc = $(e).attr("src");
                                $(e).load(function () {

                                }).error(function () {
                                    $(e).attr("src", "images/icon_bg.png");
                                });
                            });

                            setTimeout(function () {
                                new Swipe(document.getElementById('banner_box'), {
                                    speed: 500,
                                    auto: 3000,
                                    callback: function () {
                                        var lis = $(this.element).next("ol").children();
                                        lis.removeClass("on").eq(this.index).addClass("on");
                                    }
                                });
                            }, 500);
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

//判断当前页是否是目标页
function whichPage(tar) {
    var path = window.location.pathname,
        reg = new RegExp(tar);
    if (reg.test(path)) {
        return true
    }
    return false
}






