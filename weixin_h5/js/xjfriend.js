function changexjfmoney(){var e=/^[0-9]*[1-9][0-9]*$/,t=$("#xjftxtmoney").val(),n=$("#xjfmoney").html();return""==t||null==t||"undefined"==t?(ShowMsg("请输入申领金额(元)！"),!1):isNaN(t)?(ShowMsg("申领金额只能为数字！"),!1):parseInt(t)<1?(ShowMsg("申请金额必须大于0！"),!1):e.test(t)?!(parseInt(t)>parseInt(n))||(ShowMsg("没有足够的钱！"),!1):(ShowMsg("申领金额只能为整数！"),!1)}function changexjfno(){var e=$("#xjftxtno").val(),t=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,n=/^1[3|4|5|7|8]\d{9}$/;return""==e||null==e||"undefined"==e?(ShowMsg("请输入您的支付宝账号！"),!1):!(!t.test(e)&&!n.test(e))||(ShowMsg("请输入正确的支付宝账号"),!1)}function upApply(){BtnXJInviter()}function BtnXJInviter(){var e=$("#xjftxtmoney").val(),t=$("#xjftxtno").val();changexjfmoney()&&changexjfno()&&subdemandamount(e,t)}function get_inviteramount(){Loading();var e=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4),t=createXmlHttpRequest();if(null!=t){var n=urlLink+"/web/commodity/get_inviteramount";t.open("POST",n,!0),t.withCredentials=!0,t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){e&&(clearTimeout(e),e=null),severResponse=t.responseText;var n=JSON.parse(severResponse);switch(n.code){case 0:n.data.int32_amount<1?($("#btnxjfbutton").removeClass("btn_overall").addClass("my_overall"),$("#btnxjfbutton").unbind(),$("#xjfmoney").html("0")):($("#btnxjfbutton").removeClass("my_overall").addClass("btn_overall"),$("#xjfmoney").html(n.data.int32_amount/100),$("#btnxjfbutton").unbind(),$("#btnxjfbutton").bind("click",function(){}));break;case-10004:case-10003:session_expired(n.msg);break;case 404:case-10002:logout();break;default:top_meassage(n.msg),show_topmessage()}LoadingOver()}},t.send(null)}}function subdemandamount(e,t){Loading();var n=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4),s=createXmlHttpRequest();if(null!=s){var a=urlLink+"/web/commodity/submit_demandamount";s.open("POST",a,!0),s.withCredentials=!0,s.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),s.onreadystatechange=function(){if(4==s.readyState&&200==s.status){n&&(clearTimeout(n),n=null),severResponse=s.responseText;var e=JSON.parse(severResponse);switch(e.code){case 0:$("#xjftxtmoney").val(""),$("#xjftxtno").val(""),ShowMsg("申请成功，请注意查收！"),get_inviteramount();break;case-10004:case-10003:session_expired(e.msg);break;case 404:case-10002:logout();break;default:top_meassage(e.msg),show_topmessage()}LoadingOver()}},s.send("amount="+e+"&paypal_account="+t)}}function loadLogin_friend(e,t,n){Loading(),""!=localStorage.khdsession&&null!=localStorage.khdsession&&"undefined"!=localStorage.khdsession&&khd_login(e,t,n)}function khd_login(e,t,n){var s=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4),a=createXmlHttpRequest();if(null!=a){var o=urlLink+"/web/user/login_s";a.open("POST",o,!0),a.withCredentials=!0,a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){s&&(clearTimeout(s),s=null),severResponse=a.responseText;var e=JSON.parse(severResponse);switch(e.code){case 0:var t=e.data;void 0===t.struct_idinfo&&(t.struct_idinfo=""),localSave(t.string_phone_number,localStorage.code,t.tk_session,t.int64_uin,t.int64_status,t.int64_verify_status,t.int64_increase_check_status,t.int32_limit_amount,t.int32_is_set_pay_password,t.int32_market_score,t.int32_apply_status,t.int64_real_id_verify_status,t.int32_is_register,t.int32_stu_worker,t.int32_married,t.string_qq,t.string_invite_code,t.string_username,t.int32_remainday,t.struct_idinfo.string_id);break;default:var t=e.data;""!=t.openid&&null!=t.openid&&"undefined"!=t.openid&&(localStorage.openid=t.openid),$("#top_title_sigle").html(e.msg),$("#filesubmit").show()}}},a.send("uin="+n+"&username="+e+"&session="+t)}}function ResterLogin(){window.location.href;window.location.href="login.html"}