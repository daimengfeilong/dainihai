 $(function () {
    loadLogin_three();
    //loadval();
    var valtype = $("#limittypec").val();
    var limitmoney = $("#txt_loanmoney").val();
    var marketscore = localStorage.int32_market_score;

    if (valtype == "1" && (limitmoney != '' && limitmoney != null && limitmoney != 'undefined')) {
        limitmoney = parseInt(limitmoney) - parseInt(localStorage.int32_limit_amount);
        if (limitmoney <= 0) {
            $(".marketscoreval").html("0");
        } else {
            if (parseInt(limitmoney) > parseInt(marketscore)) {
                $(".marketscoreval").html(marketscore);
            } else {
                $(".marketscoreval").html(limitmoney);
            }
        }
    } else {
        $(".marketscoreval").html("0");
    }
    //$('#txt_loanmoney').bind('input propertychange', function () {
    //    btnOnInputVal();
    //});
    setTimeout(loadget_cashcard, 500);
    getScore();
    $("#txt_paypwd").val("");
    $("#btnpayul").on("click", function () {
        vtype = 1;
        var input2 = document.getElementById('txt_paypwd');
        KeyBoard(input2);
    });
    $("#btnpayulo").on("click", function () {
        vtype = 8;
        var input3 = document.getElementById('txt_phoneyzm');
        SKeyBoard(input3);
    });

    $(document).on("click", "#agreement-cl", function () {
        window.location.href = 'talk/fuyou_agreement.html';
    });
     $(document).on("click", "#agreement-weituo", function () {
         window.location.href = 'wap/entrustment.html';
     });
     $(document).on("click", "#agreement-queren", function () {
         window.location.href = 'wap/confirmation.html';
     });

    LoadingOver();
});

function getScore() {
    var url = urlLink + '/web/formalstrategyget/get';
    Loading();
    xmlHttpRequest(null, url, getScoreSuccess, 'GET');
}

function getScoreSuccess(_data) {

//  int32_state  1:有预借策略且首次提现 2:有预借策略且2次提现 3:无预借策略 4:其他
    switch (_data.code) {
        case 0:
            localStorage.int32_state = _data.data.int32_state;

            var lm = localStorage.int32_limit_amount;
                       
            // 快速提现页处理
            if(/rapiddeposit.html/.test(location.pathname)){

                $("#txt_loanmoney,#txmoneycount").attr("value", lm);
	            if (localStorage.int32_state == 1) {
	                var objS = _data.data.struct_strategy_inner;
	                var strhtml = "<option alt=\"" + objS.int32_installment_count + "_" + objS.int32_installment_days + "_" + objS.int32_interest + "_" + objS.int32_factorage + "_" + objS.int32_type + "\" value=\"" + _data.data.int32_strategy_id + "\">" + _data.data.string_name + _data.data.struct_strategy_inner.string_description + "</option>";
	                $("#drop_laonqx").html(strhtml).attr("disabled", "disabled");
	            	$("#drop-img").hide();
                    btnOnInputVal();
	            } else if (localStorage.int32_state == 2 || localStorage.int32_state == 3 || localStorage.int32_state == 5) {
					getload_gainstrategy()
	            } else {
	                ShowMsg(_data.msg);
	                return false
	            }
            }
            
            // 借款意愿页处理
            if(/loan_desire.html/.test(location.pathname)){
	            if(!(_data.data.int32_cash === -1) && !(_data.data.int32_strategy_id === -1)){
		            // 借款决策自动填写上次用户的金额
			        _data.data.int32_cash && $("#txt_loan").val(_data.data.int32_cash);
		            // 借款意愿的策略id
		            localStorage.int32_strategy_id = _data.data.int32_strategy_id;             	
	            }
	            
	            // 获取策略，回调函数在loan_desire.html
            	getload_gainstrategy(gainstrategyCB);
            }
            
            		        
            $(".limitscore").html(localStorage.int32_limit_amount);
            break;
        case -10002:
            window.location.href = "login.html";
            break;
        default :
            top_meassage(_datajson.msg);
            show_topmessage();
            break;
    }
    LoadingOver();
    // loadval();
}

function loadget_cashcard() {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/bank_card/get_cash_card";
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
                            LoadingOver();
//                          console.log(1, _datajson.data)
                            $("#lbl_loancardno").val(_datajson.data.int_card_id);
                            $(".lbl_loancardno").html("****************" + _datajson.data.string_card_id.substring(_datajson.data.string_card_id.length - 4));
//                            getload_gainstrategy();
                            break;
                        case -10004:
                        case -10003:
                            LoadingOver();
                            session_expired(_datajson.msg);
                            break;
                        case 404:
                        case -10002:
                            ClearlocalSave();
                            LoadingOver();
                            window.location.href = "login.html";
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
        _xmlHttpRequest.send(null);
    }
}


function loadval() {
    if (localStorage.int32_market_score != '' && localStorage.int32_market_score != null && localStorage.int32_market_score != 'undefined') {
        $(".marketscore").html(localStorage.int32_market_score);
        if (parseInt(localStorage.int32_market_score) > 1000) {
            $(".marketscoreMax").html("1000");
        } else {
            $(".marketscoreMax").html(localStorage.int32_market_score);
        }
    }
//    if (localStorage.int32_limit_amount != '' && localStorage.int32_limit_amount != null && localStorage.int32_limit_amount != 'undefined') {
//        $(".limitscore").html(localStorage.int32_limit_amount);
//    }
    if ((localStorage.int32_market_score != '' && localStorage.int32_market_score != null && localStorage.int32_market_score != 'undefined') && (localStorage.int32_limit_amount != '' && localStorage.int32_limit_amount != null && localStorage.int32_limit_amount != 'undefined')) {
        if (parseInt(localStorage.int32_market_score) > 1000) {
            $(".limitamount").html(parseInt(localStorage.int32_limit_amount) + parseInt(1000));
            $("#txmoneycount").val(parseInt(localStorage.int32_limit_amount) + parseInt(1000));
        } else {
            $(".limitamount").html(parseInt(localStorage.int32_limit_amount) + parseInt(localStorage.int32_market_score));
            $("#txmoneycount").val(parseInt(localStorage.int32_limit_amount) + parseInt(localStorage.int32_market_score));
        }
    }
}

function btnshowtoplinmit() {
    var typeval = $("#limittypec").val();
    if (typeval == 1) {
//        $(".top_list_frist").hide();
//        $(".top_list_sencod").show();
        $(".marketscoreMax").html("0");
        $("#txmoneycount").val(parseInt(localStorage.int32_limit_amount));
        $("#limittypec").val("0");
        $(".yourintegral").html("您有<span class=\"marketscore\">" + $(".marketscore").html() + "</span>积分，点击开启兑换。");
        changCash();
    } else {
//        $(".top_list_frist").show();
//        $(".top_list_sencod").hide();
        if (parseInt(localStorage.int32_market_score) > 1000) {
            $(".marketscoreMax").html("1000");
        } else {
            $(".marketscoreMax").html(localStorage.int32_market_score);
        }
        $("#txmoneycount").val(parseInt(localStorage.int32_limit_amount) + parseInt(localStorage.int32_market_score));
        $("#limittypec").val("1");
        $(".yourintegral").html("您有<span class=\"marketscore\">" + $(".marketscore").html() + "</span>积分，本次消耗兑换<span class=\"marketscoreval\">0</span>积分。");
        changCash();
    }
}

function changCash() {
    var score = $(".limitscore").html();
    var amount = $(".marketscoreMax").html();
    var cash = parseInt(score) + parseInt(amount);
    $(".limitamount").html(cash);
    $("#txmoneycount").val(cash);
    btnOnInputVal();
}


function tradeIntegral() {
    $("#limittypec").val("1");
    $("#checkbox-10-2").attr("checked");
    $(".yourintegral").html("您有<span class=\"marketscore\">" + $(".marketscore").html() + "</span>积分，本次消耗兑换<span class=\"marketscoreval\">0</span>积分。");
    $(".rightcheckbox").html("<input type=\"checkbox\" id=\"checkbox-10-2\" checked /><label for=\"checkbox-10-2\" onclick=\"btnshowtoplinmit()\"></label>");
    $(".top_list_frist").show();
    $(".top_list_sencod").hide();
    loadval();
    btnOnInputVal();
}


function btnOnInputVal() {
    //var valtype = $("#limittypec").val();
    var limitmoney = $("#txt_loanmoney").val();
    //var marketscore = localStorage.int32_market_score;

    //if (limitmoney != '' && limitmoney != null && limitmoney != 'undefined') {
    //    //limitmoney = parseInt(limitmoney) - parseInt(localStorage.int32_limit_amount);
    //    if (limitmoney <= 0) {
    //        $(".marketscoreval").html("0");
    //    } else {
    //        if (parseInt(limitmoney) > parseInt(marketscore)) {
    //            $(".marketscoreval").html(marketscore);
    //        } else {
    //            $(".marketscoreval").html(limitmoney);
    //        }
    //    }
    //} else {
    //    $(".marketscoreval").html("0");
    //}
    winopenloanurl();
}


/*get load gainstrategy*/
var dItem = 0;
function getload_gainstrategy(cb) {
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
                            LoadingOver();
                            var strhtml = "";
                            //var int64_status = localStorage.int64_status;
                            var userBusinessType = localStorage.userBusinessType;
                            var productType = localStorage.int32_product_type;

                            if (userBusinessType != null || userBusinessType != undefined) {
                                if (userBusinessType == 1) {
                                    $.each(_datajson.data, function (i, item) {
                                        if (item.int32_type == 2) {
                                            strhtml += "<option alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\" value=\"" + item.int32_strategy_id + "\">" + item.name + "</option>";
                                        }
                                    });
                                    $("#drop_laonqx").html(strhtml);
                                } else if (userBusinessType == 5) {
                                    $.each(_datajson.data, function (i, item) {
                                        if (item.int32_type == 5) {
                                            strhtml += "<option alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\" value=\"" + item.int32_strategy_id + "\">" + item.name + "</option>";
                                            if (/rapiddeposit.html/.test(location.pathname)) {
                                                $("#drop_laonqx").html(strhtml);
                                            }
                                        }
                                    });
                                    $("#sel_period_vip").html(strhtml);
                                } else {
                                    $.each(_datajson.data, function (i, item) {
                                        if (item.int32_type == 4) {
                                            strhtml += "<option alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\" value=\"" + item.int32_strategy_id + "\">" + item.name + "</option>";
                                            if (/rapiddeposit.html/.test(location.pathname)) {
                                                $("#drop_laonqx").html(strhtml);
                                            }
                                        }
                                    });
                                    $("#sel_period_policyHolder").html(strhtml);
                                }
                            } else {
                                if (productType == 2) {
                                    $.each(_datajson.data, function (i, item) {
                                        if (item.int32_type == 2) {
                                            strhtml += "<option alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\" value=\"" + item.int32_strategy_id + "\">" + item.name + "</option>";
                                        }
                                    });
                                    $("#drop_laonqx").html(strhtml);
                                } else if (productType == 5) {
                                    $.each(_datajson.data, function (i, item) {
                                        if (item.int32_type == 5) {
                                            strhtml += "<option alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\" value=\"" + item.int32_strategy_id + "\">" + item.name + "</option>";
                                            if (/rapiddeposit.html/.test(location.pathname)) {
                                                $("#drop_laonqx").html(strhtml);
                                            }
                                        }
                                    });
                                    $("#sel_period_vip").html(strhtml);

                                } else {
                                    $.each(_datajson.data, function (i, item) {
                                        if (item.int32_type == 4) {
                                            strhtml += "<option alt=\"" + item.int32_installment_count + "_" + item.int32_installment_days + "_" + item.int32_interest + "_" + item.int32_factorage + "_" + item.int32_type + "\" value=\"" + item.int32_strategy_id + "\">" + item.name + "</option>";
                                            if (/rapiddeposit.html/.test(location.pathname)) {
                                                $("#drop_laonqx").html(strhtml);
                                            }
                                        }
                                    });
                                    $("#sel_period_policyHolder").html(strhtml);
                                }
                            }
                            btnOnInputVal();
                            // 列表渲染完成后回调
                            if(cb && typeof cb === "function") cb();
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
                }
            }
        }
        _xmlHttpRequest.send(null);
    }
}


function changelaonmoney() {
    var lmval = $("#txt_loanmoney").val();
    var txcount = $("#txmoneycount").val();
    if (lmval == "" || lmval == null || lmval == "undefined") {
        ShowMsg("请输入分期额度！");
        return false;
    } else if (parseInt(lmval) < 1000) {
        ShowMsg("分期额度不能小于1000！");
        return false;
    } else if (parseInt(lmval) > parseInt(txcount)) {
        ShowMsg("分期额度不能高于可使用额度！");
        return false;
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
                            LoadingOver();
                            divhide('payzfpwd');
                            $("#__w_l_h_v_c_z_e_r_o_divid").hide();
                            btn_sureinfo();
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
                        case -10006:
                            LoadingOver();
                            divhide('payzfpwd');
                            divshow('errorpwd');
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
        _xmlHttpRequest.send("password=" + pwd);
    }
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


function btn_sureinfo() {
	//判断是否勾选同意协议
	if(!$("#checkbox_a1").prop("checked")){
		top_meassage("请勾选《用户服务协议》");
		return
	} else if (!$("#checkbox_a2").prop("checked")) {
        top_meassage("请勾选保险");
        return
    }
    var lmval = $("#txt_loanmoney").val();
    var yushu = lmval * 1 % 100;
    var laonqsid = $("#drop_laonqx").val();
    var loancardid = $("#lbl_loancardno").val();
//	var loanremark = $("#txt_loanpatent").val();
    var loanremark = $("#recent-select").val();
    var paypwd = $("#txt_paypwd").val();
    var txcount = $("#txmoneycount").val();
    var creditOk = btnstatusvalue(localStorage.int64_status, 12);
    if (lmval == "" || lmval == null || lmval == "undefined") {
        ShowMsg("请输入分期额度！");
        return false;
    } else if (parseInt(lmval) < 1000 && creditOk != 2) {
        ShowMsg("分期额度不能小于1000！");
        return false;
    } else if (parseInt(lmval) < 500 && creditOk == 2) {
        ShowMsg("分期额度不能小于500！");
        return false;
    } else if (parseInt(lmval) > 50000 && creditOk == 1) {
        ShowMsg("分期额度不能大于50000！");
        return false;
    } else if (parseInt(lmval) > 5000 && creditOk == 2) {
        ShowMsg("分期额度不能大于5000！");
        return false;
    } else if (parseInt(lmval) > 10000 && creditOk == 3) {
        ShowMsg("分期额度不能大于10000！");
        return false;
    } else if (parseInt(lmval) > parseInt(txcount)) {
        ShowMsg("分期额度不能高于可使用额度！");
        return false;
    } else if (yushu != 0) {
        ShowMsg("分期额度必须是100的倍数！");
        return false;
    } else if (loanremark != "F1199") {
        ShowMsg("分期用途请选择个人日常消费！");
        return false;
    } else if (paypwd == '' || paypwd == null || paypwd == 'undefined') {
        //$("#tixian_hint").show();
        //$(".btn-r").click(function () {
        //    $("#tixian_hint").hide();
        //
        //});
        setTimeout(function () {
            divshow('payzfpwd');
            pswClick();
        }, 500);
        return false;
    } else {
        btnsub_appkycash(lmval, laonqsid, loancardid, loanremark, paypwd);
    }
}

function pswClick() {
    vtype = 1;
    var input2 = document.getElementById('txt_paypwd');
    KeyBoard(input2);
}

function btnsub_appkycash(lmval, laonqsid, loancardid, loanremark, paypwd) {
//  $("#loadd_pageinfog").show();
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 70000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/loan/apply_cash";
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
                            if (_datajson.data.int32_status == 4) {
                                divshow('abuitinfosuccess');
                                LoadingOver();
                            } else {
                                var retcode =  _datajson.data.int32_retcode;
                                localStorage.int32_retcode = retcode;
                                localStorage.ordernumber = _datajson.data.string_order_number;

                                if (retcode == -10) {
                                    window.location.href = "wap/vip_pay.html?sum=" + lmval;
                                } else {
                                    if (_datajson.data.string_contract_url == null || _datajson.data.string_contract_url == '' || _datajson.data.string_contract_url == undefined) {
                                        top_meassage(_datajson.data.string_err_msg);
                                        LoadingOver();
                                        $("#topmeassage").show();
                                    } else {
                                        localStorage.contracturl = _datajson.data.string_contract_url.replace(/[ ]/g, "").replace(/\ +/g, "").replace(/[\r\n]/g, "");
                                        //localStorage.int32_market_score = _datajson.data.int32_market_score;
                                        //$("#contracturlid").attr("src", localStorage.contracturl);
//                                    History.pushState(null, null, "myIndex.html");
//								window.location.href = "loanplan_ht.html";
                                        window.location.href = localStorage.contracturl;
                                    }
                                }

                                LoadingOver();
                                //$(".maincontentfrist").hide();
                                //$(".maincontentsecond").show();
                            }
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
        _xmlHttpRequest.send("int32_amount=" + lmval + "&int32_strategy_id=" + laonqsid + "&int32_card_id=" + loancardid + "&string_reason=" + loanremark + "&string_pay_password=" + paypwd);
    }
}


/*send msg*/

function send_msginfo() {
    Loading();
    $.post(urlLink + "/web/validation/send_msg", {
        phone_number: localStorage.string_phone_number,
        msg_type: 3
    }, function (result) {
        var datat = $.toJSON(result);
        var obj = jQuery.parseJSON(datat);
        switch (obj.code) {
            case 0: //OK
                LoadingOver();
                top_meassage("验证码发送成功，请注意查看手机！");
                show_topmessage();
                RetryYZMPwd();
                divshow('yzmpayzfpwd');
                break;
            default:
                LoadingOver();
                top_meassage(obj.msg);
                show_topmessage();
                break;
        }
//      LoadingOver();
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
                            LoadingOver();
                            btnyzmpaycancel();
                            divshow('loansuccess');
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
                        case -10018:
                            LoadingOver();
                            btnyzmpaycancel();
                            divshow('yzmerrorpwd');
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
                            window.location.href = "loanplan.html";
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


function btnwinopenurl() {
    localStorage.urllintype = 'kstx';
//    History.pushState(null, null, "rapiddeposit.html");
    window.location.href = "resetpaypwd.html";
}

function dropLaonqx() {
    winopenloanurl();
}

function winopenloanurl() {
//    var lmval = $("#txt_loanmoney").val();
//    var txcount = $("#txmoneycount").val();
    var creditOK = btnstatusvalue(localStorage.int64_status, 12);
    var lmval = $("#txt_loanmoney").val();
    lmval = lmval.replace(/[^\d]/g, '');
    //var minLimit = 1000;
    //if (creditOK == 2) {
    //    minLimit = 500;
    //}
    console.log(lmval);
//    var yushu = lmval * 1 % 100;
    if (lmval == '' || lmval == null || lmval == 'undefined') {
        $("#monthlyRepayment").val("--");
        //信用卡储蓄卡金额提示
        //if (creditOK == 1) {
        //	top_meassage("请输入正确的分期额度(1000-50000)");
        //} else if (creditOK == 2) {
        //	top_meassage("请输入正确的分期额度(500-5000)");
        //} else {
        //    top_meassage("请输入正确的分期额度(1000-10000)");
        //}

    } else {
        $("#topmeassage").hide();
        var strspt = $("#drop_laonqx").find("option:selected").attr("alt").split("_");
        /*分几期_间隔_费率_利息_类型*/
        var m = strspt[0];
        var jg = strspt[1];
        var fl = strspt[2];
        var f = strspt[3];
        var type = strspt[4];
        var repayAmount = 0;
        var monthAmount = 0;
        var count = m * jg;
        var loanAmount = parseFloat(lmval) * 100;
        var aditinal = loanAmount == 0 ? 0 : (200 * m);
        if (type == 0) { /*day*/
            var rate = parseFloat((fl + f) * count) / 10000 + 1;
            repayAmount = parseFloat((parseFloat(loanAmount) * rate) + aditinal) / 100;
        } else { /*month*/
            var p = parseFloat(loanAmount);
            var n = parseFloat(count);
            var feil = parseFloat(fl) / 10000;
            var lx = parseFloat(f) / 10000;
            var tmp = Math.pow(1 + feil, n);
            var pay_f = Math.round(p * lx);
            var A = Math.round(p * (feil * tmp) / (tmp - 1) * n);
            var F = parseFloat(pay_f) * n;
            repayAmount = parseFloat(A + F + aditinal) / 100;
        }
        monthAmount = parseFloat(repayAmount / m);
	    //每月应还 mothAmout 取整
	    monthAmount = Math.ceil(monthAmount);

	    //每月应还 * 期数
	    repayAmount = monthAmount * m;

		if (type == 2) {
			monthAmount = Math.ceil(monthAmount.toFixed(2) - 2);
		}
        //else if (type == 3) {
        //    monthAmount = Math.ceil(monthAmount.toFixed(2) - 2);
        //}
        $("#monthlyRepayment").val("￥" + monthAmount.toFixed(2));

    }
}

function closetrialbox() {
    $("#trial_popup_box").hide();
}


























