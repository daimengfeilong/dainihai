function validateIdCard(e){if(!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(e))return 1;if(18==e.length){for(var t=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2),a=new Array(1,0,10,9,8,7,6,5,4,3,2),n=0,o=0;o<17;o++)n+=e.substring(o,o+1)*t[o];var i=n%11,s=e.substring(17);return 2==i?"X"==s||"x"==s?0:1:s==a[i]?0:1}}function luhmCheck(e){if(e.length<16||e.length>19)return 0;if(!/^\d*$/.exec(e))return 0;if(-1=="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99".indexOf(e.substring(0,2)))return 0;for(var t=e.substr(e.length-1,1),a=e.substr(0,e.length-1),n=new Array,o=a.length-1;o>-1;o--)n.push(a.substr(o,1));for(var i=new Array,s=new Array,l=new Array,r=0;r<n.length;r++)(r+1)%2==1?2*parseInt(n[r])<9?i.push(2*parseInt(n[r])):s.push(2*parseInt(n[r])):l.push(n[r]);for(var c=new Array,d=new Array,u=0;u<s.length;u++)c.push(parseInt(s[u])%10),d.push(parseInt(s[u])/10);for(var _=0,g=0,h=0,m=0,w=0,p=0;p<i.length;p++)_+=parseInt(i[p]);for(var f=0;f<l.length;f++)g+=parseInt(l[f]);for(var v=0;v<c.length;v++)h+=parseInt(c[v]),m+=parseInt(d[v]);return w=parseInt(_)+parseInt(g)+parseInt(h)+parseInt(m),t==10-(parseInt(w)%10==0?10:parseInt(w)%10)?1:0}function linkurlerror(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()}function change_eye(e,t){var a=$(e).attr("class");a.indexOf("_unable")>-1?(a=a.replace("_unable","_checked"),$(e).attr("class",a),$("#"+t).attr("type","text")):(a=a.replace("_checked","_unable"),$(e).attr("class",a),$("#"+t).attr("type","password"))}function change_radio_status(e,t,a){15==a&&(a='bbussinsestype(2, "wszl")');var n=$(e).attr("class"),o=$("#"+t).attr("class");n.indexOf("_unable")>-1?(n=n.replace("_unable","_checked"),o=o.replace("_unable","_checked"),$(e).attr("class",n),$("#"+t).attr("class",o),$("#"+t).attr("onclick",a)):(n=n.replace("_checked","_unable"),o=o.replace("_checked","_unable"),$(e).attr("class",n),$("#"+t).attr("class",o),$("#"+t).removeAttr("onclick"))}function tiaotiao(){window.location.href="liftLimit_Bind.html"}function return_current_page(e,t){$("#"+e).hide(),$("#"+t).show()}function change_page_qh(e,t,a,n){$(".sec_nav").find("ul").find("li").removeClass("active"),$(e).addClass("active"),$("#chsitypev").val(n),return_current_page(t,a)}function divshow(e){$("#"+e).show()}function divhide(e){$("#"+e).hide()}function divshow(e,t){$("#"+e).show(),$("#"+t).show()}function divhide(e,t){$("#"+e).hide(),$("#"+t).hide()}function thisBack(e,t){$("#"+e).hide(),$("#"+t).show()}function time(e,t){0==wait?(console.log(t),"bk"==t?$("#"+e).bind("click",function(){getCode()}):"repay"==t?$("#"+e).bind("click",function(){sendSmsCode()}):$("#"+e).bind("click",function(){shareCode(DXType)}),$("#"+e).html("重新发送"),$("#"+e).attr("class","hq_vcode"),wait=45):($("#"+e).unbind(),$("#"+e).attr("class","hq_vcode_gray"),$("#"+e).html("重新发送("+wait+")"),wait--,"bk"==t||"repay"==t?setTimeout(function(){time(e,t)},1e3):setTimeout(function(){time(e)},1e3))}function get_verify_code(e,t){DXType=t,Loading(),$.post(urlLink+"/web/validation/send_msg",{phone_number:e,msg_type:t,type:"html5"},function(e){var t=$.toJSON(e),a=jQuery.parseJSON(t);switch(a.code){case 0:top_meassage("验证码发送成功，请注意查看手机！"),show_topmessage(),time("hq_vcode");break;default:top_meassage(a.msg),show_topmessage()}LoadingOver()}),LoadingOver()}function localSave(e,t,a,n,o,i,s,l,r,c,d,u,_,g,h,m,w,p,f,v){localStorage.string_phone_number=e,localStorage.code=t,localStorage.tk_session=a,localStorage.int64_uin=n,localStorage.int64_status=o,localStorage.int64_verify_status=i,localStorage.int64_increase_check_status=s,localStorage.int32_limit_amount=(5==d?0:l)/100,localStorage.int32_is_set_pay_password=r,localStorage.int32_market_score=c,localStorage.int32_apply_status=d,localStorage.int64_real_id_verify_status=u,localStorage.int32_is_register=_,localStorage.int32_married=h,localStorage.int32_stu_worker=g,localStorage.string_qq=m,localStorage.string_invite_code=w,localStorage.string_username=p,localStorage.int32_remainday=f,localStorage.int32_idCardNum=v}function ClearlocalSave(){var e=localStorage.sharefriend,t=localStorage.bycxtooptip,a=localStorage.sign_remind_status,n=localStorage.sign_remind_date;localStorage.clear(),localStorage.sharefriend=e,localStorage.bycxtooptip=t,localStorage.sign_remind_status=a,localStorage.sign_remind_date=n}function CheckLocalSave(e){""!=localStorage.tk_session&&null!=localStorage.tk_session&&"undefined"!=localStorage.tk_session?window.location.href="index_ds.html":wx_login(e)}function loadLogin_first(){if("undefined"!=localStorage.openid&&""!=localStorage.openid&&null!=localStorage.openid||(localStorage.openid=""),"undefined"!=localStorage.tk_session&&""!=localStorage.tk_session&&null!=localStorage.tk_session){var e=GetUrlParameter("returl");window.location.href=""!=e&&"undefined"!=e&&null!=e?unescape(e):"index_bk.html"}else{localStorage.code="";var t=GetUrlParameter("code");""!=t&&"undefined"!=t&&null!=t&&(localStorage.code=t,wx_login(t,0))}}function loadLogin_second(){if("undefined"==localStorage.tk_session||""==localStorage.tk_session||null==localStorage.tk_session){localStorage.code="";var e=GetUrlParameter("code");if(""!=e&&"undefined"!=e&&null!=e)localStorage.code=e,wx_login(e,1);else{var t=window.location.href;t.indexOf("login.html")>-1?window.location.href="login.html":window.location.href="login.html?returl="+escape(t)}}}function loadLogin_three(){if(-1==window.location.href.indexOf("loanplan.html"))var e=GetUrlParameter("code");""!=e&&"undefined"!=e&&null!=e?(localStorage.code=e,wx_login(e,1)):loadLogin_second()}function wx_login(e,t){var a=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4),n=createXmlHttpRequest();if(null!=n){var o=urlLink+"/web/user/login/web_chat";n.open("POST",o,!0),n.withCredentials=!0,n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){a&&(clearTimeout(a),a=null),severResponse=n.responseText;var e=JSON.parse(severResponse);switch(e.code){case 0:var o=e.data;void 0===o.struct_idinfo&&(o.struct_idinfo=""),localSave(o.string_phone_number,localStorage.code,o.tk_session,o.int64_uin,o.int64_status,o.int64_verify_status,o.int64_increase_check_status,o.int32_limit_amount,o.int32_is_set_pay_password,o.int32_market_score,o.int32_apply_status,o.int64_real_id_verify_status,o.int32_is_register,o.int32_stu_worker,o.int32_married,o.string_qq,o.string_invite_code,o.string_username,o.int32_remainday,o.struct_idinfo.string_id);var i=GetUrlParameter("returl");window.location.href=""!=i&&"undefined"!=i&&null!=i?unescape(i):"index_bk.html";break;default:var o=e.data;if(""!=o.openid&&null!=o.openid&&"undefined"!=o.openid&&(localStorage.openid=o.openid),1==t){var s=window.location.href;s.indexOf("login.html")>-1?window.location.href="login.html":window.location.href="login.html?returl="+escape(s)}}}},n.send("code="+e)}}function logout(){var e=localStorage.string_phone_number;ClearlocalSave(),window.location.href="login.html?phone="+e}function session_expired(e){var t='<div class="tooltip_main_center" >';t+='<div class="tooltip_main_node">',t+='<div class="tooltip_main_n_top">',t+='<div class="tooltip_main_nt_cn">',t+='<div class="top_title_sigle">'+e+"</div>",t+="</div>",t+="</div>",t+='<div class="tooltip_main_n_bottom">',t+='<a onclick="'+logout()+'">',t+="<div>重新登录</div>",t+="</a>",t+="</div>",t+="</div>",t+="</div>",document.append(t)}function btnstatusvalue(e,t){return(e&MASK[t])>>(t<<1)}function winopenurl(e){localStorage.ordernumber="",localStorage.loantailmoney="",window.location.href=e}function judgeProduct(e){var t=0,a=localStorage.int32_product_type;0!=localStorage.int32_apply_status&&(t=1),1==e?2==a?(window.location.href="credit_card/rules.html",localStorage.userBusinessType=e):1==t?addFullScreenToast(fullI):(window.location.href="credit_card/rules.html",localStorage.userBusinessType=e):4==e?4==a?(window.location.href="policy_holder.html",localStorage.userBusinessType=e):1==t?addFullScreenToast(fullI):(window.location.href="policy_holder.html",localStorage.userBusinessType=e):5==a?(window.location.href="vip.html",localStorage.userBusinessType=e):1==t?addFullScreenToast(fullI):(window.location.href="vip.html",localStorage.userBusinessType=e)}function winopen_two(e){window.location.href=e}function getRandom(e){return Math.floor(Math.random()*e+1)}function winopen_checkstatus(e,t){1!=t&&2!=t&&3!=t&&(t=1==btnstatusvalue(localStorage.int64_status,12)?1:2),10!=e?1==t?1==btnstatusvalue(localStorage.int64_status,12)&&1==btnstatusvalue(localStorage.int64_status,9)?window.location.href="../check_status.html?"+getRandom(e):window.location.href="../credit_learntruet_ds.html?source=1":2==t?1==btnstatusvalue(localStorage.int64_status,9)?window.location.href="check_status.html?"+getRandom(e):window.location.href="../learntruet_ds.html?source=2":1==btnstatusvalue(localStorage.int64_status,9)?window.location.href="check_status.html?"+getRandom(e):window.location.href="../learntruet_ds.html?source=3":window.location.href="liftLimit_BindOK.html"}function get_new_message(){var e=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4),t=createXmlHttpRequest();if(null!=t){var a=urlLink+"/web/message/get_new_message";t.open("POST",a,!0),t.withCredentials=!0,t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){e&&(clearTimeout(e),e=null),severResponse=t.responseText;var a=JSON.parse(severResponse);switch(a.code){case 0:1==btnstatusvalue(a.data.int32_read_point,0)&&($("#msg_hongdian").show(),window.location.href.indexOf("better.html")>-1&&$("#msg_txx").show()),window.location.href.indexOf("messagecenter.html")>-1?($(".msg_menul").find("li").removeClass("active"),1==btnstatusvalue(a.data.int32_read_point,2)?($("#mymsgmenuwd").show(),$("#mymsgmenuwd_box").addClass("active"),$("#new_active_cont").hide(),$("#mymsgmenuwd_cont").show(),$("#mynoticemenuwd_cont").hide()):1==btnstatusvalue(a.data.int32_read_point,3)?($("#mynoticemenuwd").show(),$("#mynoticemenuwd_box").addClass("active"),$("#new_active_cont").hide(),$("#mymsgmenuwd_cont").hide(),$("#mynoticemenuwd_cont").show()):($("#new_activity").addClass("active"),$("#new_active_cont").show(),$("#mymsgmenuwd_cont").hide(),$("#mynoticemenuwd_cont").hide())):($("#new_active_cont").hide(),$("#mymsgmenuwd_cont").show(),$("#mynoticemenuwd_cont").hide());break;case-10004:case-10003:session_expired(a.msg);break;case 404:case-10002:logout();break;default:top_meassage(a.msg),show_topmessage()}LoadingOver()}},t.send(null)}}var wait=45,MASK=[3,12,48,192,768,3072,12288,49152,3<<16,3<<18,3<<20,3<<22,3<<24];