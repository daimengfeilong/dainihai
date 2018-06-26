/**
 * Created by Administrator on 17-2-28.
 */

//creditPN
$(function () {
	
    $("#creditPN").val(localStorage.string_phone_number);
    $(document).on("click", "#dialog1_close,#dialog1_closed", function () {
        $("#dialog1").hide();
    });
    Loadcheckdetail(1, null, null, null);
});

//去魔蝎认证
function nextStep() {
    var creditNum = $("#creditNo").val();//信用卡号
    var creditNo = creditNum.replace(/[ ]/g, "");
    creditNo = creditNo.trim();

    var phoneNum = $("#creditPN").val();//预留手机号

    var creditQuota = $("#creditQuota").val();//信用卡额度

    var creditDate = $("#creditDate").val();//信用卡还款日

    var correct = luhmCheck(creditNo);
    if (creditNo == "" || creditNo == null || creditNo == "undefined") {
        ShowMsg("请输入您的卡号");
        return false;
    } else if (phoneNum == "" || phoneNum == null || phoneNum == "undefined") {
        ShowMsg("请输入您的预留手机号");
        return false;
    } else if (creditQuota == "" || creditQuota == null || creditQuota == "undefined") {
        ShowMsg("请输入您的信用卡额度");
        return false;
    } else if (creditQuota.length < 3) {
        ShowMsg("请输入正确的信用卡额度");
        return false;
    } else if (creditDate == "" || creditDate == null || creditDate == "undefined") {
        ShowMsg("请选择您的信用卡还款日期");
        return false;
    } else if (correct == 0) {
        var formatBankCard = creditNum.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
        $("#bank_card_num").text(formatBankCard);
        $("#dialog1").show();
        return false;
    } else {
//        三要素认证
        var url = urlLink + "/web/bank_card/creditcard";
        var data = {
            cardid: creditNo,
            limit: creditQuota,
            repayment_day: creditDate,
            phone: phoneNum
        }
        ajaxFn(url, data, creditCardBack, null, "POST");
    }
//
//    var ddd='https://lhwap.dev.9fwealth.com/web/bank_card/creditcard?cardid=6227612145830440&limit=50000&repayment_day=7&deposit_bank=null&phone=18514253667'
}
//信用卡号确认无误
function creditCOk() {
    var creditNum = $("#creditNo").val();//信用卡号
    var creditNo = creditNum.replace(/[ ]/g, "");
    creditNo = creditNo.trim();

    var phoneNum = $("#creditPN").val();//预留手机号

    var creditQuota = $("#creditQuota").val();//信用卡额度

    var creditDate = $("#creditDate").val();//信用卡还款日

    var correct = luhmCheck(creditNo);
    //        三要素认证
    var url = urlLink + "/web/bank_card/creditcard";
    var data = {
        cardid: creditNo,
        limit: creditQuota,
        repayment_day: creditDate,
        phone: phoneNum
    }
    Loading();
    ajaxFn(url, data, creditCardBack, null, "POST");
}

//信用卡三要素认证回调函数
function creditCardBack(_data) {
    var creditNum = $("#creditNo").val();//信用卡号
    var creditNo = creditNum.replace(/[ ]/g, "");
    creditNo = creditNo.trim();
    switch (_data.code) {
        case 0:
            if (_data.data.int32_type == 1) {
//                获取信用卡所属银行和银行编码
                var binUrl = urlLink + "/web/bank_card/bin_creditcard";
                var binData = {
                    cardid: creditNo
                }
                Loading();
                ajaxFn(binUrl, binData, creditCardBinBack, null, "GET");
            } else {
                LoadingOver();
                top_meassage(_data.msg);
                show_topmessage();
            }
            break;
        case -10004:
            LoadingOver();
            logout();
            break;
        default :
            LoadingOver();
            top_meassage(_data.msg);
            show_topmessage();
            break;
    }
}

//信用卡卡bin回调
function creditCardBinBack(_data) {
    var creditNum = $("#creditNo").val();//信用卡号
    var creditNo = creditNum.replace(/[ ]/g, "");
    creditNo = creditNo.trim();
    var phoneNum = $("#creditPN").val();//预留手机号

    var correct = luhmCheck(creditNo);
    switch (_data.code) {
        case 0:
            if (_data.data.int32_type == 1) {
                var bankName = _data.data.string_bankname;
                var bankCode = _data.data.string_banktype;
                console.log(bankName, bankCode)
                mx(bankCode, creditNo, phoneNum, 1)
            } else {
                LoadingOver();
                top_meassage(_data.msg);
                show_topmessage();
            }
            break;
        case -10004:
            LoadingOver();
            logout();
            break;
        default :
            LoadingOver();
            top_meassage(_data.msg);
            show_topmessage();
            break;
    }
}

//调用魔蝎SDK
function mx(bankCode, creditNum, phoneNum, cardType) {
	get_all_status();
    var type = GetUrlParameter("source");
    var cardTypeString = '';
    if (cardType == 1) {
        cardTypeString = '&cardType=CREDITCARD';//信用卡
    } else {
        cardTypeString = '&cardType= DEBITCARD';//银行卡
    }

    var idCard = localStorage.antonym_ucardcode;
    if (idCard == null || idCard == '' || idCard == 'undefined') {
        idCard = localStorage.antonym_ucardcode;
    }

    var uin = localStorage.int64_uin - 0;
    //uin错误的处理
    if(!uin){
    	console.log("用户uin错误 ",uin);
    	ShowMsg("系统异常");
//  	window.location.href = "../login.html";
    	return
    }

    window.location.href = urlLink + '/build/index.html#/onlinebank/' +
        bankCode + '?' +
        'apiKey=' + mxApiKey +
        '&userId=szbyjr_' + uin +
        '&backUrl=' + urlLink + '/credit_card/wait_skip_credit.html' +
        cardTypeString +
        '&loginParams={"IDCARD":{"username":"' + idCard + '","password":""},"CARDNO":{"username":"' + creditNum + '","password":""},"CREDITCARDNO":{"username":"' + creditNum + '","password":""},"DEBITCARDNO":{"username":"' + creditNum + '","password":""},"MOBILE":{"username":"' + phoneNum + '","password":""}}' +
        '&loginOthersHide=YES' +
        '&themeColor=#0198ef';
}












