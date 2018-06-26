/*yz bind bank*/
function yzbindinfo() {
    var type = GetUrlParameter("source");
    var bankCnum = $("#txt_bankno").val();
    var bankno = bankCnum.replace(/[ ]/g, "");
    bankno = bankno.trim();
    var bankkhx = $("#txt_khbankno").val();
    var paypwd = $("#txt_paypwd").val();
    var provinces = $("#province").val();
    var city = $("#city").val();
    var country = $("#county").val();

    var regCharacter = /#/g;
    if (regCharacter.test(bankkhx)) {
        ShowMsg("不允许输入特殊字符，请重新输入！");
        return false;
    } else if (bankno == "" || bankno == null || bankno == "undefined") {
        ShowMsg("请输入您的银行卡号！");
        return false;
    } else {
        var correct = luhmCheck(bankno);
        if (provinces == "-1") {
            ShowMsg("请选择省份！");
            return false;
        } else if (bankkhx == null || bankkhx == '') {
            ShowMsg("请填写开户行支行！");
            return false;
        } else if (correct == 0) {
            var bankCardNum = $("#txt_bankno").val();
            if (bankCardNum != null && bankCardNum != 'undefined' || bankCardNum != '') {
                var formatBankCard = bankCardNum.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                $("#bank_card_num").text(formatBankCard);
            }
            $("#dialog1").show();
            return false;

//            $(document).on("click","#ensure_go",function(){
//                bindbankno(bankno, khh_no + "" + bankkhx, paypwd);
//            });

        } else {
            var khh_no = "";
            if (provinces != null) {
                khh_no = provinces + "#";
            }
            if (city != null) {
                khh_no += city + "#";
            }
            if (country != null) {
                khh_no += country + "#";
            } else {
                khh_no += " " + "#";
            }
            bindbankno(bankno, khh_no + "" + bankkhx, paypwd, type);
        }
    }
}

///如果银行卡有误并继续提交/

function dialogS() {
    var type = GetUrlParameter("source");
    var bankCnum = $("#txt_bankno").val();
    var bankno = bankCnum.replace(/[ ]/g, "");
    bankno = bankno.trim();
    var bankkhx = $("#txt_khbankno").val();
    var paypwd = $("#txt_paypwd").val();
    var provinces = $("#drp_provinces").val();
    var city = $("#drp_city").val();
    var country = $("#drp_county").val();

    var khh_no = "";
    if (provinces != null) {
        khh_no = provinces + "#";
    }
    if (city != null) {
        khh_no += city + "#";
    }
    if (country != null) {
        khh_no += country + "#";
    } else {
        khh_no += " " + "#";
    }
    bindbankno(bankno, khh_no + "" + bankkhx, paypwd, type);
}

/*bind bank info*/
function bindbankno(bankno, bankkhx, paypwd, type) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/bank_card/bind_card";
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
//                            History.pushState(null, null, "myIndex.html");
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
        }
        _xmlHttpRequest.send("card_id=" + bankno + "&card_kno=" + bankkhx + "&password=" + paypwd);
    }
}


/*bank card list*/
function get_bankcard_list() {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/bank_card/get_list";
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
                    var strhrml = "";
                    switch (_datajson.code) {
                        case 0: //OK
                            if (_datajson.data == '') {
                                $("#fristpage").hide();
                                $("#sencodpage").show();
                            } else {
                                $.each(_datajson.data, function (i, item) {
                                    var bankLog = "";
                                    var backName = "";
                                    var cardId = "";
                                    var cardType = "";
                                    var titleType = "";
                                    if (item.card_type == 10) {
//                                        信用卡
                                        bankLog = "<img src='images/logo_bank_credit.png'  />";
                                        backName = item.bank_name;
                                        cardId = item.string_card_id.substring(item.string_card_id.length - 4, item.string_card_id.length);
                                        cardType = "信用卡";
                                    } else {
//                                        储蓄卡
                                        bankLog = "<img src=\"images/" + bankpictype(item.bank_type) + "\" />";
                                        backName = banknametype(item.bank_type);
                                        cardId = item.string_card_id.substring(item.string_card_id.length - 4, item.string_card_id.length);
                                        cardType = "储蓄卡";
                                        switch (item.card_type) {
                                            case 1:
                                                titleType = "<img src=\"images/bank_borrow.png\" />";
                                                break;
                                            case 2:
                                                titleType = "<img src=\"images/bank_repay.png\" />";
                                                break;
                                            case 3:
                                                titleType += "<img src=\"images/bank_repay.png\" />";
                                                titleType += "<img src=\"images/bank_borrow.png\" />";
                                                break;
                                        }
                                    }
                                    strhrml += "<div class=\"banklist\">";
                                    strhrml += "<div class=\"banklist_first\">";
                                    strhrml += "<div class=\"banklist_img\">" + bankLog + "</div>";
                                    strhrml += "<div class=\"banklist_ztxt\">";
                                    strhrml += "<div>" + backName + "</div>";
                                    strhrml += "<div class=\"L-float\">尾号" + cardId + "</div>";
                                    strhrml += "<div class=\"L-float\">" + cardType + "</div>";
                                    strhrml += "</div>";
                                    strhrml += "<div class=\"banklist_kaimg\">" + titleType + "</div>";
                                    strhrml += "</div>";
                                    strhrml += "</div>";
                                });
                                $(".main_banklist").html(strhrml);
                                $("#fristpage").show();
                                $("#sencodpage").hide();
                                $('#add-bank-card').hide();
//                                setTimeout(movej, 1000);
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

function banknametype(type) {
    switch (type) {
        case 1:
            return "中国建设银行"
        case 2:
            return "中国银行"
        case 3:
            return "中国民生银行"
        case 4:
            return "招商银行"
        case 5:
            return "广发银行"
        case 6:
            return "兴业银行"
        case 7:
            return "中国工商银行"
        case 8:
            return "中国光大银行"
        case 9:
            return "中国邮政"
        case 10:
            return "农业银行"
        default:
            return "----"
    }
}

function bankpictype(type) {
    switch (type) {
        case 1:
            return "logo_bank_ccb.png";
        case 2:
            return "logo_bank_bc.png";
        case 3:
            return "logo_bank_cmbc.png";
        case 4:
            return "logo_bank_cmb.png";
        case 5:
            return "logo_bank_cgb.png";
        case 6:
            return "logo_bank_cib.png";
        case 7:
            return "logo_bank_icbc.png";
        case 8:
            return "logo_bank_ceb.png";
        case 9:
            return "logo_bank_psbc.png";
        case 10:
            return "logo_bank_abc.png";
        default:
            return ""
    }
}


/*set_repaycard type*/

function set_repaycard(cardid, type) {
    Loading();
    var timeout = setTimeout(function () {
        LoadingOver();
        top_meassage("请求超时，请稍后再试");
        show_topmessage();
    }, 30000);
    _xmlHttpRequest = createXmlHttpRequest();
    if (_xmlHttpRequest != null) {
        var _url = urlLink + "/web/bank_card/set_repay_card"; //huankuan
        if (type == 1) {
            _url = urlLink + "/web/bank_card/set_cash_card"; //jiekuan
        }
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
                            get_bankcard_list();
                            ShowMsg('修改成功！');
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
        _xmlHttpRequest.send("card_id=" + cardid);
    }
}


/*deleted bank card*/
function delete_card(cardid, type) {
    if (type == 0) {
        Loading();
        var timeout = setTimeout(function () {
            LoadingOver();
            top_meassage("请求超时，请稍后再试");
            show_topmessage();
        }, 30000);
        _xmlHttpRequest = createXmlHttpRequest();
        if (_xmlHttpRequest != null) {
            var _url = urlLink + "/web/bank_card/delete_card";
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
                                get_bankcard_list();
                                ShowMsg('删除成功！');
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
            _xmlHttpRequest.send("card_id=" + cardid);
        }
    } else {
        ShowMsg('不能删除处于还款卡或者分期卡状态的银行卡~');
        return false;
    }
}


function btnwinopenurl() {
    localStorage.urllintype = 'bank';
//    History.pushState(null, null, "brandcard.html");
    window.location.href = "resetpaypwd.html";
}


function SelectProvinces(val) {
    $.ajax({
        url: "province_data.xml",
        dataType: 'xml',
        type: 'GET',
        timeout: 2000,
        error: function (xml) {
            //alert(xml.responseText);
        },
        success: function (xml) {
            var provinceshtml = ""; //<option value=\"-1\">请选择省份</option>
            if (val != "") {
                $(xml).find("province").each(function (i) {
                    var p = $(this).attr("name");
                    if (p == val) {
                        SelectCity(this);
                    }

                });
            } else {
                $(xml).find("province").each(function (i) {
                    var p = $(this).attr("name");
                    provinceshtml += "<option value=\"" + p + "\">" + p + "</option>";
                    if (i == 0) {
                        SelectCity(this);
                    }

                });
                $("#drp_provinces").html(provinceshtml);
            }
        }
    });
}


function SelectCity(obj) {
    $.ajax({
        url: "province_data.xml",
        dataType: 'xml',
        type: 'GET',
        timeout: 2000,
        error: function (xml) {
            //alert(xml.responseText);
        },
        success: function (xml) {
            var cityhtml = ""; //<option value=\"-1\">请选择省份</option>
            $(obj).find("city").each(function (i) {
                var c = $(this).attr("name");
                cityhtml += "<option value=\"" + c + "\">" + c + "</option>";
                if (i == 0) {
                    SelectCountry(this)
                }
            });
            $("#drp_city").html(cityhtml);
        }
    });
}


function SelectCountry(obj) {
    $.ajax({
        url: "province_data.xml",
        dataType: 'xml',
        type: 'GET',
        timeout: 2000,
        error: function (xml) {
            //alert(xml.responseText);
        },
        success: function (xml) {
            var countryhtml = ""; //<option value=\"-1\">请选择省份</option>
            $(obj).find("district").each(function (i) {
                var co = $(this).attr("name");
                countryhtml += "<option value=\"" + co + "\">" + co + "</option>";
            });
            $("#drp_county").html(countryhtml);
        }
    });
}


function SelectCountry_drp(pval, cval) {
    $.ajax({
        url: "province_data.xml",
        dataType: 'xml',
        type: 'GET',
        timeout: 2000,
        error: function (xml) {
            //alert(xml.responseText);
        },
        success: function (xml) {
            var cityhtml = ""; //<option value=\"-1\">请选择省份</option>
            $(xml).find("province").each(function (i) {
                var p = $(this).attr("name");
                if (p == pval) {
                    $(this).find("city").each(function (i) {
                        var c = $(this).attr("name");
                        if (c == cval) {
                            SelectCountry(this)
                        }
                    });
                }
            });
        }
    });
}
