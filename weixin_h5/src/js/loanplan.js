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
function noorderdata() {
    //默认隐藏没有记录窗
    $(".maincontentsecond").hide();
    
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
                            	//有记录
                                localStorage.ordernumber = _datajson.data.string_order_number;
                                localStorage.contracturl = _datajson.data.string_contract_url.replace(/[ ]/g, "").replace(/\ +/g, "").replace(/[\r\n]/g, "");
                                datasigleinfo(localStorage.ordernumber,1);
                            } else {
                            	//无记录
                                $(".maincontentfrist").hide();
                                $(".maincontentsecond").show();
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
        _xmlHttpRequest.send(null);
    }
}

function datasigleinfo(orderno, timeNo) {
    if (orderno != '' && orderno != null && orderno != 'undefined') {
        Loading();
        var timeout = setTimeout(function () {
            LoadingOver();
            top_meassage("请求超时，请稍后再试");
            show_topmessage();
        }, 30000);
        _xmlHttpRequest = createXmlHttpRequest();
        if (_xmlHttpRequest != null) {
            var _url = urlLink + "/web/loan/get_order_details";
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
//                                alert(_datajson.data.int32_status + "____" + orderno);
                                localStorage.is_online_retailers = _datajson.data.int32_type;
                                if (timeNo != null && timeNo != 'undefined' && timeNo != '') {
                                    if (timeNo == 1) {
//                                        alert("1")
                                        timeNo++;
                                        datasigleinfo(orderno, timeNo);
                                        return false;
                                    } else if (timeNo == 2) {
//                                        alert("2")
                                        switch (_datajson.data.int32_status) {
                                            case 0:
                                                //正在放款
                                                $(".tiptxtzero").show();
                                                $(".look-cancel").show();
                                                $("#loan-credit").show();

                                                //if (is_luck_draw == 1 && !localStorage.lucky_draw) {
                                                //    $("#again_luck_draw").show();
                                                //    localStorage.lucky_draw = 1;
                                                //}
                                                break;
                                            case 1:
                                                //正在还款
                                                $(".tiptxtone").show();
                                                $(".look-cancel").show();
                                                break;
                                            case 2:
                                                //贷款已逾期
                                                $(".tiptxttwo").show();
                                                $(".look-cancel").show();
                                                break;
                                            case 3:
                                                //已结清
                                                $(".tiptxtthree").show();
                                                $(".look-cancel").show();
                                                break;
                                            case 4:
                                                //正在审核
                                                $(".tiptxtfour").show();
                                                //取消
                                                $(".close-cancel").show();

                                                $("#loan-auditing").show();

                                                break;
                                            case 5:
                                                //已放款
                                                $(".tiptxtfive").show();
                                                $(".look-cancel").show();
                                                break;
                                            case 6:
                                                //审核已通过
                                                $(".tiptxtsix").show();
                                                //签署合同
                                                $(".write-cancel").show();
                                                //取消
                                                $(".close-cancel").show();
                                                $("#loan-pass").show();
                                                break;
                                            case 9:
                                                //审核已通过
                                                $(".tiptxtsix").show();

                                                $("#loan_continue").show();
                                                break;
                                            case -3:
                                                //被拒绝
                                                $(".tiptxtfsan").show();
                                                $("#loan-refuse").show();
//                                        $(".tiptxtfusan_t").show();
                                                break;
                                            case -10:
                                                // 未支付VIP费用
                                                $("#unpaid").show();
                                                break;
                                        }
                                    }
                                } else {
//                                    alert("3")
                                    switch (_datajson.data.int32_status) {
                                        case 0:
                                            //正在放款
                                            $(".tiptxtzero").show();
                                            $(".look-cancel").show();
                                            $("#loan-credit").show();
                                            break;
                                        case 1:
                                            //正在还款
                                            $(".tiptxtone").show();
                                            $(".look-cancel").show();
                                            break;
                                        case 2:
                                            //贷款已逾期
                                            $(".tiptxttwo").show();
                                            $(".look-cancel").show();
                                            break;
                                        case 8:
                                        case 3:
                                            //已结清
                                            $(".tiptxtthree").show();
                                            $(".look-cancel").show();
                                            break;
                                        case 4:
                                            //正在审核
                                            $(".tiptxtfour").show();
                                            //取消
                                            $(".close-cancel").show();
                                            $("#loan-auditing").show();
                                            break;
                                        case 5:
                                            //已放款
                                            $(".tiptxtfive").show();
                                            $(".look-cancel").show();
                                            break;
                                        case 6:
                                            //审核已通过
                                            $(".tiptxtsix").show();
                                            //签署合同
                                            $(".write-cancel").show();
                                            //取消
                                            $(".close-cancel").show();
                                            $("#loan-pass").show();
                                            break;
                                        case -3:
                                            //被拒绝
                                            $(".tiptxtfsan").show();
                                            $("#loan-refuse").show();
//                                        $(".tiptxtfusan_t").show();
                                            break;
                                    }
                                }
                                localStorage.contracturl = _datajson.data.string_contract_url.replace(/[ ]/g, "").replace(/\ +/g, "").replace(/[\r\n]/g, "");
                                var repayamount = parseFloat(_datajson.data.int32_apply_amount) / 100;
                                var syamount = parseFloat(_datajson.data.int32_insurance_amount) / 100;
                                $(".yhmoneycount").html("￥" + repayamount.toFixed(2));
                                $("#slider-2").attr("max", repayamount);
                                $(".symoneycount").html("￥" + syamount.toFixed(2));
                                var hcount = parseFloat(repayamount) - parseFloat(syamount);
                                $("#slider-2").val(hcount);
                                $(".ui-slider-handle").attr("aria-valuemax", repayamount);
                                $(".ui-slider-handle").attr("aria-valuenow", hcount);
                                $(".ui-slider-handle").attr("aria-valuetext", hcount);
                                $(".ui-slider-handle").attr("title", hcount);
                                var len = 100;
                                if (syamount > 0) {
                                    len = parseFloat(parseFloat(hcount / repayamount) * 100);
                                }
                                $(".ui-slider-handle").css("left", len + "%");
                                $(".ui-slider-bg").css("width", len + "%");
                                $(".next_repay_time").html(_datajson.data.string_next_repay_time);
                                var htmlstr = "";
                                var payHintDate = _datajson.data.string_next_repay_time.substring(_datajson.data.string_next_repay_time.length - 2, _datajson.data.string_next_repay_time.length);
                                $(".pay-hint-date").html('每月' + payHintDate + '日');
                                $.each(_datajson.data.struct_apply_history, function (i, item) {
                                    htmlstr += "<div class=\"loan-dsb\">";
                                    htmlstr += "<ul>";
                                    htmlstr += "<li class=\"repay_left_amount\">" + item.string_desc + "</li>";
                                    htmlstr += "<li class=\"total_repay_amount\">" + (parseInt(item.int32_repay_amount) / 100) + "</li>";
                                    htmlstr += "<li class=\"last_time_repay\">" + item.string_repay_time + "</li>";
                                    //逾期
                                    if (item.int32_status == 2) {
                                        htmlstr += "<li style='color: #ea3232;' class=\"\">" + returnLoanStatus(item.int32_status) + "</li>";
                                        //还款中
                                    } else if (item.int32_status == 1) {
                                        htmlstr += "<li style='color: #6fbb2b;' class=\"\">" + returnLoanStatus(item.int32_status) + "</li>";
                                    } else {
                                        htmlstr += "<li style='color: #989898;' class=\"\">" + returnLoanStatus(item.int32_status) + "</li>";
                                    }

                                    htmlstr += "<div style=\"clear:both;\"></div>";
                                    htmlstr += "</ul>";
                                    htmlstr += "</div>";
                                });
                                $(".loan_detailinfo").html(htmlstr);
                                $(".maincontentfrist").show();
                                $(".maincontentsecond").hide();
                                $(".maincontentthree").hide();
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
                            case
                            -10006
                            :
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
            _xmlHttpRequest.send("string_order_number=" + orderno);
        }
    }
}


/*loan status*/
function returnLoanStatus(status) {
    switch (status) {
        case 0:
            return "受理中";
            break;
        case 1:
            return "还款中";
            break;
        case 2:
            return "逾期";
            break;
        case 3:
            return "已还";
            break;
        case 4:
            return "审核中";
            break;
        case 5:
            return "已受理成功";
            break;
        case 6:
            return "审核通过";
            break;
        case 7:
            return "---";
            break;
        case 8:
            return "已还";
            break;
        case -3:
            return "拒绝";
            break;
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
                            divhide('payzfpwd');
                            $("#__w_l_h_v_c_z_e_r_o_divid").hide();
                            Loading();
                            $(".top_name_div").find("p").html("确认分期合同");
//							console.log(localStorage.contracturl);
                            //$("#contracturlid").attr("src", localStorage.contracturl);
//                            History.pushState(null, null, "loanplan.html");
                            if (localStorage.contracturl == "" || localStorage.contracturl == undefined || localStorage.contracturl == null) {
                                top_meassage("合同过期，请取消后重新使用额度！");
                            } else {
//                                localStorage.contracturl
                                if (localStorage.is_online_retailers == 1) {
                                    if (urlLink == "https://lhwap.dt1.9fwealth.com") {
                                        window.location.href = "http://mall-test.boyacx.com/goods_list.html?phoneNum=" + localStorage.string_phone_number +
                                            "&loanNum=" + localStorage.ordernumber + "&appName=30500011" + "&source=html5" +
                                            "&loanMoney=" + localStorage.int32_used_limit;
                                    } else {
                                        window.location.href = "http://mall.boyacx.com/goods_list.html?phoneNum=" + localStorage.string_phone_number +
                                            "&loanNum=" + localStorage.ordernumber + "&appName=30500011" + "&source=html5" +
                                            "&loanMoney=" + localStorage.int32_used_limit;
                                    }

                                } else {
                                    window.location.href = localStorage.contracturl;
                                }

//                                "loanplan_ht.html"
                            }

                            LoadingOver();
                            //$(".maincontentfrist").hide();
                            //$(".maincontentsecond").hide();
                            //$(".maincontentthree").show();
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
                            divhide('payzfpwd');
                            divshow('errorpwd');
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

function winopen_ht() {
//    History.pushState(null, null, "loanplan_ht.html");
    window.location.href = localStorage.contracturl;
}

function RetryPwd() {
    $("#txt_paypwd").val("");
    $("#btnpayul").find("li").html("");
    divhide('errorpwd');
    divshow('payzfpwd');
}


function btnpaycancel() {
    divhide('payzfpwd');
    $("#txt_paypwd").val("");
    $("#btnpayul").find("li").html("");
    $("#__w_l_h_v_c_z_e_r_o_divid").hide();
}


function RetryYZMPwd() {
    $("#txt_phoneyzm").val("");
    $("#btnpayulo").find("li").html("");
    divhide('yzmerrorpwd');
    divshow('yzmpayzfpwd');
}


function btnyzmpaycancel() {
    divhide('yzmpayzfpwd');
    $("#txt_phoneyzm").val("");
    $("#btnpayulo").find("li").html("");
    $("#__w_l_h_v_c_z_e_r_o_divid").hide();
}


/*send msg*/

function send_msginfo() {
//    console.log(1);
    Loading();
    $.post(urlLink + "/web/validation/send_msg", {
        phone_number: localStorage.string_phone_number,
        msg_type: 3
    }, function (result) {
        var datat = $.toJSON(result);
        var obj = jQuery.parseJSON(datat);
        switch (obj.code) {
            case 0: //OK
                top_meassage("验证码发送成功，请注意查看手机！");
                show_topmessage();
                RetryYZMPwd();
                divshow('yzmpayzfpwd');
                break;
            default:
                top_meassage(obj.msg);
                show_topmessage();
                break;
        }
        LoadingOver();
    });
}


/*send sign contract*/

function send_signcontract() {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/loan/sign_contract";
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
                            btnyzmpaycancel();
                            divshow('loansuccess');
                            break;
                        case -10004:
                        case -10003:
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
                            logout();
                            break;
                        case -10018:
                            btnyzmpaycancel();
                            divshow('yzmerrorpwd');
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
        _xmlHttpRequest.send("string_order_number=" + localStorage.ordernumber + "&verify_code=" + $("#txt_phoneyzm").val());
    }
}


/*cancel contract*/

function btn_cancelcontract() {
    $("#cancelcontracty").hide();
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/loan/cancel_apply";
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
                            localStorage.ordernumber = '';
                            localStorage.int32_market_score = _datajson.data.int32_market_score;
//                            History.pushState(null, null, "myIndex.html");
                            window.location.href = "myIndex.html";
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
        _xmlHttpRequest.send("string_order_number=" + localStorage.ordernumber);
    }
}

/*i wang to loan*/
function btnloanclick() {
    if (localStorage.int32_apply_status != null) {
        switch (localStorage.int32_apply_status) {
            case "0":
                /*Data are waiting to submit*/
                divshow('filenew');
                break;
            case "1":
            /*Data are waiting for the audit*/
            case "2":
                /*Information is under review*/
                divshow('fileaubit');
                break;
            case "3":
                /*Literature review by*/
                KS_IsBankNo();
                break;
            case "4":
                /*The information is back*/
                divshow('fileback');
                break;
            case "5":
                /*Data has been rejected*/
                /*0 or null*/
                if (localStorage.int32_remainday == '' || localStorage.int32_remainday == null) {
                    divshow('filereject_lqjs');
                } else if (parseInt(localStorage.int32_remainday) == 0) {
                    divshow('filereject_lqjs');
                } else {
                    /*1-15*/
                    if (parseInt(localStorage.int32_remainday) >= 1 && parseInt(localStorage.int32_remainday) <= 60) {
                        divshow('filereject_lqz');
                        $(".remive_day").find('span').html(localStorage.int32_remainday);
                    }
                }
                break;
        }
    }
}

function btnrealviery(type) {
    if (localStorage.int64_real_id_verify_status != null) {
//        History.pushState(null, null, "myIndex.html");
        switch (localStorage.int64_real_id_verify_status) {
            case "0":
                window.location.href = "autonym.html";
                break;
            case "1":
                if (localStorage.int32_stu_worker == 1) {
                    window.location.href = "learntruet.html";
                } else {
                    if (btnstatusvalue(localStorage.int64_status, 12) == 1) {
                        window.location.href = "credit_learntruet_ds.html?source=1";
                    } else {
                        window.location.href = "learntruet_ds.html?source=2";
                    }
                }
                break;
            default:
                winopen_checkstatus(128,type);
                break;
        }
    }
}


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


function loadncontract_query() {
//    History.pushState(null, null, "loanplan.html");
//    alert(localStorage.contracturl);
    window.location.href = localStorage.contracturl;
}


function btnwinopenurl() {
    localStorage.urllintype = 'jdcx';
//    History.pushState(null, null, "loanplan.html");
    window.location.href = "resetpaypwd.html";
}


function btnaddbenkpay() {
    if (localStorage.int32_is_set_pay_password != null) {
        localStorage.urllintype = "bank";
        if (localStorage.int32_is_set_pay_password == 0) {
            History.pushState(null, null, 'myIndex.html');
            window.location.href = 'paypwd.html';
        } else {
            History.pushState(null, null, 'brandcard.html');
            window.location.href = 'add_bankcard.html';
        }

    }
}


function datasigleinfo_ht(orderno) {
    if (orderno != '' && orderno != null && orderno != 'undefined') {
        Loading();
        var timeout = setTimeout(function () {
            LoadingOver();
            top_meassage("请求超时，请稍后再试");
            show_topmessage();
        }, 30000);
        _xmlHttpRequest = createXmlHttpRequest();
        if (_xmlHttpRequest != null) {
            var _url = urlLink + "/web/loan/get_order_details";
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
                                var repayamount = parseFloat(_datajson.data.int32_total_repay_amount) / 100;
                                //$("#jk_bankno").html(repayamount);
                                $("#jk_clue").html(_datajson.data.string_next_repay_time);
                                $("#jk_money").html(repayamount);
                                //$("#jk_remark").html(repayamount);
                                $(".maincontentsecond").hide();
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
            _xmlHttpRequest.send("string_order_number=" + orderno);
        }
    }
}