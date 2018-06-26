$(document).ready(function () {
    loadLogin_second();
    loadDatalist();
    //LoadingOver();
});

function loadDatalist() {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/loan/get_apply_history";
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
                            if (_datajson.data != '' && _datajson.data != null && _datajson.data != "undefined") {
                                var strhrml = "";
                                $.each(_datajson.data, function (i, item) {
//                                    if ( item.string_status == '已还') {
                                    strhrml += "<div class=\"lt-dsb\" onclick=\"winopenurlend('" + item.string_order_number + "')\">";
                                    strhrml += "<ul>";
                                    strhrml += "<li>" + parseInt(item.int32_total_amount) / 100 + "</li>";
                                    strhrml += "<li>" + item.string_apply_date + "</li>";
                                    strhrml += "<li>" + item.string_status + "</li>";
                                    strhrml += "<div style=\"clear:both;\"></div>";
                                    strhrml += "</ul>";
                                    strhrml += "<i class=\"arr-right\" > </i>";
                                    strhrml += "</div > ";
//                                    }
                                });
                                $(".hkdatalist").html(strhrml);
                                $(".maincontentfrist ").show();
                                $(".maincontentsecond ").hide();
                            } else {
                                $(".maincontentfrist ").hide();
                                $(".maincontentsecond ").show();
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


function winopenurl(orderno) {
    if (orderno != '' && winopenurl != null && winopenurl != 'undefined') {
//        History.pushState(null, null, "myIndex.html");
        localStorage.ordernumber = orderno;
        window.location.href = "loanplan.html";
    }
}

function winopenurlend(orderno) {
    if (orderno != '' && winopenurl != null && winopenurl != 'undefined') {
//        History.pushState(null, null, "myIndex.html");
        localStorage.ordernumber = orderno;
        window.location.href = "loanplan_end.html";
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
                winopen_checkstatus(588, type);
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


function btnaddbenkpay() {
    if (localStorage.int32_is_set_pay_password != null) {
        localStorage.urllintype = "bank";
        if (localStorage.int32_is_set_pay_password == 0) {
//            History.pushState(null, null, 'myIndex.html');
            window.location.href = 'paypwd.html';
        } else {
//            History.pushState(null, null, 'brandcard.html');
            window.location.href = 'add_bankcard.html';
        }

    }
}