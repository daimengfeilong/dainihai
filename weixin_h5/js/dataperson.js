function repeatTime(e){0==wait?($("#"+e).bind("click",function(){repeatMessage()}),$("#"+e).html("重新发送"),$("#"+e).attr("class","hq_message"),wait=45):($("#"+e).unbind(),$("#"+e).attr("class","hq_message_gray"),$("#"+e).html("重新发送("+wait+")"),wait--,setTimeout(function(){repeatTime(e)},1e3))}function repeatMessage(){var e=$("#txt_phoneno").val(),t=$("#txt_serverpwd").val(),a=$("#txt_vcode").val();return""==e||null==e||"undefined"==e?(ShowMsg("请输入您的手机号码"),!1):regPhone.exec(e)?void get_message_code(e,t,a):(ShowMsg("请输入正确的手机号码"),!1)}function get_message_code(e,t,a){Loading(),sub_moblieaccount(e,t,a)}function btnbycxttsk(){localStorage.bycxtooptip=-1,$("#tipsaddedu").hide()}function loaddatawsd(){if(null!=localStorage.int64_status){if(1==btnstatusvalue(localStorage.int64_status,1)){switch(btnstatusvalue(localStorage.int64_verify_status,1)){case 0:$(".bgpic1").html('<img src="images/base_return.png" />');break;case 3:$(".bgpic1").html('<img src="images/base_qualified.png" />');break;default:$(".bgpic1").html('<img src="images/base_submit.png" />')}btnaubitstatus(1,1)}if(1==btnstatusvalue(localStorage.int64_status,6)){switch(btnstatusvalue(localStorage.int64_verify_status,6)){case 0:$(".bgpic2").html('<img src="images/base_return.png" />');break;case 3:$(".bgpic2").html('<img src="images/base_qualified.png" />');break;default:$(".bgpic2").html('<img src="images/base_submit.png" />')}btnaubitstatus(2,6)}if(1==btnstatusvalue(localStorage.int64_status,3)){switch(btnstatusvalue(localStorage.int64_verify_status,3)){case 0:$(".bgpic3").html('<img src="images/base_return.png" />');break;case 3:$(".bgpic3").html('<img src="images/base_qualified.png" />');break;default:$(".bgpic3").html('<img src="images/base_submit.png" />')}btnaubitstatus(3,3)}if(1==btnstatusvalue(localStorage.int64_status,4)){switch(btnstatusvalue(localStorage.int64_verify_status,4)){case 0:$(".bgpic4").html('<img src="images/base_return.png" />');break;case 3:$(".bgpic4").html('<img src="images/base_qualified.png" />');break;default:$(".bgpic4").html('<img src="images/base_submit.png" />')}btnaubitstatus(4,4)}if(1==btnstatusvalue(localStorage.int64_status,5)){switch(btnstatusvalue(localStorage.int64_verify_status,5)){case 0:$(".bgpic5").html('<img src="images/base_return.png" />');break;case 3:$(".bgpic5").html('<img src="images/base_qualified.png" />');break;default:$(".bgpic5").html('<img src="images/base_submit.png" />')}btnaubitstatus(5,5)}if(1==btnstatusvalue(localStorage.int64_status,7)){switch(btnstatusvalue(localStorage.int64_verify_status,7)){case 0:$(".bgpic6").html('<img src="images/base_return.png" />');break;case 3:$(".bgpic6").html('<img src="images/base_qualified.png" />');break;default:$(".bgpic6").html('<img src="images/base_submit.png" />')}btnaubitstatus(6,7)}if(1==localStorage.int32_precashstrategy)switch(localStorage.int32_apply_status-0){case 0:case 1:case 2:$(".bgpic8").html('<img src="images/base_submit.png" />');break;default:$(".bgpic8").html('<img src="images/base_qualified.png" />')}}}function infoCallBack(){Loadcheckdetail(1,zmfIsOrNo)}function zmfIsOrNo(){var e=urlLink+"/web/user_profile/zhima_check_auth";ajaxFn(e,null,zmfSCallBack,null,"GET")}function zmfSCallBack(e){if(0!=e.code)return top_meassage(e.msg),!1;1!=e.data.int32_state?($(".bgpic7").append('<img src="images/base_submit2.png">'),localStorage.int64_zm_status=1):localStorage.int64_zm_status=0}function btnljrz(){btnOpenZMinfo()}function btnOpenZMinfo(){if(1==localStorage.int64_zm_status)return ShowMsg("您已经认证成功！"),!1;if(1!=btnstatusvalue(localStorage.int64_status,7))return ShowMsg("请先填写工作信息，再认证芝麻分"),!1;var e=urlLink+"/web/user_profile/zhima_auth_url";Loading(),ajaxFn(e,null,psCallBack,null,"GET")}function psCallBack(e){if(LoadingOver(),0!=e.code)return top_meassage(e.msg),!1;var t=e.data.string_url;window.location.href=t}function btnaubitstatus(e,t){switch(btnstatusvalue(localStorage.int64_verify_status,t)){case 0:switch($(".bgpic"+e).html('<img src="images/base_return.png" />'),e){case 1:$("#bottompic1").attr("src","images/linkman_ico-back@3x.png");break;case 2:$("#bottompic2").attr("src","images/call-them_ico-back@3x.png");break;case 3:$("#bottompic3").attr("src","images/card-front_ico-back@3x.png");break;case 4:$("#bottompic4").attr("src","images/card-verso_ico-back@3x.png");break;case 5:$("#bottompic5").attr("src","images/card-hand_ico-back@3x.png");break;case 6:$("#bottompic6").attr("src","images/job_ico-back@3x.png")}}}function changeserverpwd(){var e=$("#txt_serverpwd").val();if(""==e||null==e||"undefined"==e)return ShowMsg("请输入您的服务密码！"),!1}function callThen(){var e=$("#txt_phoneno").val(),t=$("#txt_serverpwd").val(),a=$("#txt_vcode").val(),s=$("#chapchav").val();if(!/^[0-9]*$/.test(t))return ShowMsg("服务密码格式不正确"),!1;if(0==s){if(""==e||null==e||"undefined"==e)return ShowMsg("请输入您的手机号码！"),!1;if(!regPhone.exec(e))return ShowMsg("请输入正确的手机号码！"),!1;if(""==t||null==t||"undefined"==t)return ShowMsg("请输入您的服务密码！"),!1;sub_moblieaccount(e,t,a)}else{if(""==e||null==e||"undefined"==e)return ShowMsg("请输入您的手机号码！"),!1;if(!regPhone.exec(e))return ShowMsg("请输入正确的手机号码！"),!1;if(""==t||null==t||"undefined"==t)return ShowMsg("请输入您的服务密码！"),!1;if(""==a||null==a||"undefined"==a)return ShowMsg("请输入短信中的验证码！"),!1;sub_moblieaccount(e,t,a)}}function sub_moblieaccount(e,t,a){Loading();var s=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var n=urlLink+"/web/mobile/submit_mobile_account";_xmlHttpRequest.open("POST",n,!0),_xmlHttpRequest.withCredentials=!0,_xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){s&&(clearTimeout(s),s=null),severResponse=_xmlHttpRequest.responseText;var e=JSON.parse(severResponse);switch(e.code){case 0:get_mobile_status();break;case-10004:case-10003:LoadingOver(),session_expired(e.msg);break;case 404:case-10002:LoadingOver(),logout();break;default:LoadingOver(),top_meassage(e.msg),show_topmessage()}}},_xmlHttpRequest.send("phone_number="+e+"&password="+t+"&verify_code="+a)}}function get_mobile_status(){$("#loadd_pageinfog").show();var e=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var t=urlLink+"/web/mobile/get_mobile_status";_xmlHttpRequest.open("GET",t,!0),_xmlHttpRequest.withCredentials=!0,_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){e&&(clearTimeout(e),e=null),severResponse=_xmlHttpRequest.responseText;var t=JSON.parse(severResponse);switch(t.code){case 0:localStorage.int64_status=t.data.int64_profile_status,localStorage.int32_retcode=t.data.int32_retcode,localStorage.int64_verify_status=t.data.int64_verify_status,$.base64.utf8encode=!0;var a=$.base64.atob(t.data.string_errmsg,!0);switch(t.data.int32_retcode){case 0:$("#loadd_pageinfog").hide(),localStorage.int32_auto_check_result=t.data.int32_auto_check_result,localStorage.int64_real_id_verify_status=t.data.int64_real_id_verify_status,$(".bgpic2").html('<img src="images/base_submit.png" />'),$("#bottompic2").attr("src","images/call-them_ico@3x.png"),divhide("phone_detail"),get_all_status(null,null,null);break;case-2:$("#loadd_pageinfog").hide(),ShowMsg(a),$("#chapchav").val("1"),$(".vcode_captcha").show(),repeatTime("hq_message");break;case-1:case-3:case-4:$("#loadd_pageinfog").hide(),ShowMsg(a);break;case-5:setTimeout(function(){get_mobile_status()},5e3)}break;case-10004:case-10003:$("#loadd_pageinfog").hide(),session_expired(t.msg);break;case 404:case-10002:$("#loadd_pageinfog").hide(),logout();break;default:$("#loadd_pageinfog").hide(),top_meassage(t.msg),show_topmessage()}}},_xmlHttpRequest.send(null)}}function bjCallThen(){var e=$("#txt_bjphoneno").val(),t=$("#net_pwd").val(),a=$("#server-type").val(),s=$("#serverpwd").val();if(null!=t&&""!=t&&"undefined"!=t){var n=urlLink+"/web/mobile/submit_mobile_account";if(0==a)var i="phone_number="+e+"&password="+t+"&verify_code=null";else var i="phone_number="+e+"&password="+s+"&verify_code=null";Loading(),xmlHttpRequest(i,n,bjCallThenCallBack,"post")}else ShowMsg("请输入网站密码")}function bjCallThenCallBack(e){switch(e.code){case 0:getMobileStatus();break;case-10004:case-10003:$("#loadd_pageinfog").hide(),session_expired(e.msg);break;case 404:case-10002:$("#loadd_pageinfog").hide(),logout();break;default:$("#loadd_pageinfog").hide(),top_meassage(e.msg),show_topmessage()}}function getMobileStatus(){var e=urlLink+"/web/mobile/get_mobile_status";xmlHttpRequest(null,e,getMobileStatusCB,"get")}function getMobileStatusCB(e){switch(e.code){case 0:$.base64.utf8encode=!0;var t=$.base64.atob(e.data.string_errmsg,!0);switch(e.data.int32_retcode){case 0:$("#loadd_pageinfog").hide(),localStorage.int32_auto_check_result=e.data.int32_auto_check_result,localStorage.int64_real_id_verify_status=e.data.int64_real_id_verify_status,$(".bgpic2").html('<img src="images/base_submit.png" />'),$("#bottompic2").attr("src","images/call-them_ico@3x.png"),divhide("phone_detail_1"),get_all_status(null,null,null);break;case-16:$("#loadd_pageinfog").hide(),ShowMsg(t),$("#server-type").val("1"),$(".sever-li").show();break;case-1:case-3:case-4:$("#loadd_pageinfog").hide(),ShowMsg(t);break;case-5:setTimeout(function(){getMobileStatus()},5e3);break;default:$("#loadd_pageinfog").hide(),top_meassage(t),show_topmessage()}break;case-10004:case-10003:$("#loadd_pageinfog").hide(),session_expired(e.msg);break;case 404:case-10002:$("#loadd_pageinfog").hide(),logout();break;default:$("#loadd_pageinfog").hide(),top_meassage(e.msg),show_topmessage()}}function changezyname_1(){var e=$("#linkman_main").val();return""==e||null==e||"undefined"==e?(ShowMsg("请输入主要联系人姓名！"),!1):/^[\u4e00-\u9fa5]{2,10}$/.test(e)?void 0:(ShowMsg("主要联系人姓名必须由2-10个汉字组成！"),!1)}function changezyphone_1(){var e=$("#linkman_phone").val();return""==e||null==e||"undefined"==e?(ShowMsg("请输入主要联系人的联系电话！"),!1):regPhone.exec(e)?void 0:(ShowMsg("请输入正确的手机号码！"),!1)}function changezyname_2(){var e=$("#linkman_maine").val();return""==e||null==e||"undefined"==e?(ShowMsg("请输入次要联系人姓名！"),!1):/^[\u4e00-\u9fa5]{2,10}$/.test(e)?void 0:(ShowMsg("次要联系人姓名必须由2-10个汉字组成！"),!1)}function changezyphone_2(){var e=$("#linkman_phonee").val();return""==e||null==e||"undefined"==e?(ShowMsg("请输入次要联系人的联系电话！"),!1):regPhone.exec(e)?void 0:(ShowMsg("请输入正确的手机号码！"),!1)}function changezyname_3(){var e=$("#linkman_mainsan").val();if(""==e||null==e||"undefined"==e)return ShowMsg("请输入其他联系人姓名！"),!1}function changezyphone_3(){var e=$("#linkman_phonesan").val();return""==e||null==e||"undefined"==e?(ShowMsg("请输入其他联系人的联系电话！"),!1):regPhone.exec(e)?void 0:(ShowMsg("请输入正确的手机号码！"),!1)}function btnlinkmani(){var e=$("#linkman_main").val(),t=$("#linkman_phone").val(),a=$("#linkman_maine").val(),s=$("#linkman_phonee").val(),n=$("#drp_mangxy").val(),i=$("#drp_mangxe").val(),o=/^[\u4e00-\u9fa5]{2,10}$/;return""==e||null==e||"undefined"==e?(ShowMsg("请输入主要联系人姓名！"),!1):o.test(e)?"0"==n?(ShowMsg("请选择主要联系人与本人关系！"),!1):""==t||null==t||"undefined"==t?(ShowMsg("请输入主要联系人的联系电话！"),!1):regPhone.exec(t)?""==a||null==a||"undefined"==a?(ShowMsg("请输入次要联系人姓名！"),!1):o.test(a)?"0"==i?(ShowMsg("请选择次要联系人与本人关系！"),!1):""==s||null==s||"undefined"==s?(ShowMsg("请输入次要联系人的联系电话！"),!1):regPhone.exec(s)?e==a?(ShowMsg("联系人姓名不能相同！"),!1):t==s?(ShowMsg("两个联系人电话不能相同！"),!1):n==i?(ShowMsg("两个联系人类型不能相同！"),!1):void sub_add_contact(n,e,t,i,a,s,0,"None","None"):(ShowMsg("请输入正确的手机号码！"),!1):(ShowMsg("次要联系人姓名必须由2-10个汉字组成！"),!1):(ShowMsg("请输入正确的手机号码！"),!1):(ShowMsg("主要联系人姓名必须由2-10个汉字组成！"),!1)}function sub_add_contact(e,t,a,s,n,i,o,l,r){Loading();var u=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var c=urlLink+"/web/user_profile/add_contact";_xmlHttpRequest.open("POST",c,!0),_xmlHttpRequest.withCredentials=!0,_xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){u&&(clearTimeout(u),u=null),severResponse=_xmlHttpRequest.responseText;var e=JSON.parse(severResponse);switch(e.code){case 0:localStorage.int64_status=e.data.int64_profile_status,localStorage.int64_verify_status=e.data.int64_verify_status,LoadingOver(),get_all_status(null,null,null),$(".bgpic1").html('<img src="images/base_submit.png" />'),$("#bottompic1").attr("src","images/linkman_ico@3x.png"),divhide("linkman_detail");break;case-10004:case-10003:LoadingOver(),session_expired(e.msg);break;case 404:case-10002:LoadingOver(),logout();break;default:LoadingOver(),top_meassage(e.msg),show_topmessage()}}},_xmlHttpRequest.send("int32_type="+e+"&string_name="+t+"&string_phone_number="+a+"&int32_type_2="+s+"&string_name_2="+n+"&string_phone_number_2="+i+"&int32_type_3="+o+"&string_name_3="+l+"&string_phone_number_3="+r)}}function changecompany(){var e=$("#txt_company").val();if(""==e||null==e||"undefined"==e)return ShowMsg("请输入完整的公司名称！"),!1}function changecompanyphone(){var e=$("#txt_companyphone").val();return""==e||null==e||"undefined"==e?(ShowMsg("请输入公司电话！"),!1):regPhone.exec(e)||regPhoneFax.exec(e)?void 0:(ShowMsg("请正确填写电话号码！"),!1)}function changecompanyzw(){var e=$("#txt_companyzw").val();if(""==e||null==e||"undefined"==e)return ShowMsg("请输入您的职务！"),!1}function changecompanyaddr(){var e=$("#txt_companyaddress").val();if(""==e||null==e||"undefined"==e)return ShowMsg("请输入完整的公司地址！"),!1}function btnwsanjobinfo(){var e=$("#txt_company").val(),t=$("#txt_companyphone").val(),a=$("#txt_companyzw").find("option:selected").val(),s=$("#txt_industry").find("option:selected").val(),n=$("#txt_level").find("option:selected").val(),i=$("#province").val(),o=$("#city").val(),l=$("#county").val(),r=$("#txt_companyaddress").val();if(/#/g.test(r))return ShowMsg("不允许输入特殊字符，请重新输入！"),!1;if(null==l||""==l||"undefined"==l)var u=i+"#"+o+"##"+r+"#";else var u=i+"#"+o+"#"+l+"#"+r+"#";return""==e||null==e||"undefined"==e?(ShowMsg("请输入完整的公司名称！"),!1):""==t||null==t||"undefined"==t?(ShowMsg("请输入公司电话！"),!1):regPhone.exec(t)||regPhoneFax.exec(t)?""==a||null==a||"undefined"==a?(ShowMsg("请输入您的职务！"),!1):""==u||null==u||"undefined"==u?(ShowMsg("请输入完整的公司地址！"),!1):""==r||null==r||"undefined"==r?(ShowMsg("请输入完整的公司地址！"),!1):void sub_add_workinfo(e,t,a,u,s,n):(ShowMsg("请正确填写电话号码！"),!1)}function sub_add_workinfo(e,t,a,s,n,i){Loading();var o=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var l=urlLink+"/web/user_profile/workinfo";_xmlHttpRequest.open("POST",l,!0),_xmlHttpRequest.withCredentials=!0,_xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){o&&(clearTimeout(o),o=null),severResponse=_xmlHttpRequest.responseText;var e=JSON.parse(severResponse);switch(e.code){case 0:localStorage.int64_status=e.data.int64_profile_status,localStorage.int64_verify_status=e.data.int64_verify_status,$(".bgpic6").html('<img src="images/base_submit.png" />'),$("#bottompic6").attr("src","images/job_ico@3x.png"),divhide("job_detail"),LoadingOver(),get_all_status(null,null,null);break;case-10004:case-10003:session_expired(e.msg);break;case 404:case-10002:logout();break;default:top_meassage(e.msg),show_topmessage()}LoadingOver()}},_xmlHttpRequest.send("company="+e+"&company_phone="+t+"&job="+a+"&company_address="+s+"&duty="+i+"&industry="+n)}}function Loadcheckdatadetail(e,t){divhide("topmeassage"+t),Loading();var a=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var s=urlLink+"/web/user_profile/get_check_detail";_xmlHttpRequest.open("POST",s,!0),_xmlHttpRequest.withCredentials=!0,_xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){a&&(clearTimeout(a),a=null),severResponse=_xmlHttpRequest.responseText;var e=JSON.parse(severResponse);switch(e.code){case 0:switch(e.data.int32_check_type){case 8:if($("#txt_company").val(e.data.struct_job_info.string_company_name),$("#txt_companyphone").val(e.data.struct_job_info.string_company_phone),null!=e.data.struct_job_info.string_title&&""!=e.data.struct_job_info.string_title&&"undefined"!=e.data.struct_job_info.string_title&&$("#txt_companyzw").val(e.data.struct_job_info.string_title),null!=e.data.struct_job_info.string_company_industry&&""!=e.data.struct_job_info.string_company_industry&&"undefined"!=e.data.struct_job_info.string_company_industry&&$("#txt_industry").val(e.data.struct_job_info.string_company_industry),null!=e.data.struct_job_info.string_duty&&""!=e.data.struct_job_info.string_duty&&"undefined"!=e.data.struct_job_info.string_duty&&$("#txt_level").val(e.data.struct_job_info.string_duty),null!=e.data.struct_job_info.string_company_address&&""!=e.data.struct_job_info.string_company_address&&"undefined"!=e.data.struct_job_info.string_company_address){var s=e.data.struct_job_info.string_company_address,n=s.split("#"),i=n[0],o=n[1],l=n[2],r=n[3];$("#province").val(i),provincedchange(),$("#city").val(o),cityChange(),$("#county").val(l),$("#txt_companyaddress").val(r)}else provincedchange();if($("#txt_companyaddress").val(),0==btnstatusvalue(localStorage.int64_verify_status,7)&&""!=e.data.string_check_message&&null!=e.data.string_check_message&&"undefined"!=e.data.string_check_message){$.base64.utf8encode=!0;var u=$.base64.atob(e.data.string_check_message,!0);$("#topmeassage"+t).find(".plaint_txt_first").html(u),divshow("topmeassage"+t)}break;case 2:if("undefined"!=e.data.struct_contact_info&&""!=e.data.struct_contact_info&&null!=e.data.struct_contact_info&&$.each(e.data.struct_contact_info,function(e,t){switch(e){case 0:""!=t.int32_type&&null!=t.int32_type&&"undefined"!=t.int32_type&&$("#drp_mangxy").val(t.int32_type),$("#linkman_main").val(t.string_name),$("#linkman_phone").val(t.string_phone_number);break;case 1:""!=t.int32_type&&null!=t.int32_type&&"undefined"!=t.int32_type&&$("#drp_mangxe").val(t.int32_type),$("#linkman_maine").val(t.string_name),$("#linkman_phonee").val(t.string_phone_number)}}),0==btnstatusvalue(localStorage.int64_verify_status,t)&&""!=e.data.string_check_message&&null!=e.data.string_check_message&&"undefined"!=e.data.string_check_message){$.base64.utf8encode=!0;var u=$.base64.atob(e.data.string_check_message,!0);$("#topmeassage"+t).find(".plaint_txt_first").html(u),divshow("topmeassage"+t)}break;case 4:case 5:case 6:if(0==btnstatusvalue(localStorage.int64_verify_status,t)&&""!=e.data.string_check_message&&null!=e.data.string_check_message&&"undefined"!=e.data.string_check_message){$.base64.utf8encode=!0;var u=$.base64.atob(e.data.string_check_message,!0);$("#topmeassage"+t).find(".plaint_txt_first").html(u),divshow("topmeassage"+t)}}break;case-10004:case-10003:session_expired(e.msg);break;case 404:case-10002:logout();break;default:top_meassage(e.msg),show_topmessage()}LoadingOver()}},_xmlHttpRequest.send("check_type="+e)}}function everytimec(){var e=0;switch(localStorage.int32_apply_status){case"3":$("#btnallaubitinfo").html("资料已审核通过");break;case"2":case"1":$("#btnallaubitinfo").html("资料审核中");break;case"0":1==localStorage.int32_precashstrategy&&(e=1==btnstatusvalue(localStorage.int64_status,1)&&1==btnstatusvalue(localStorage.int64_status,6)&&1==btnstatusvalue(localStorage.int64_status,7)?1:0);break;case"4":1==localStorage.int32_precashstrategy&&(e=btnstatusvalue(localStorage.int64_verify_status,1)>0&&btnstatusvalue(localStorage.int64_verify_status,6)>0&&btnstatusvalue(localStorage.int64_verify_status,7)>0?1:0)}switch(e){case 1:$("#btnallaubitinfo").attr("class","write_submit_checked submit-auditing"),$("#submit").bind("click",function(){tcontone++,sub_alldata()});break;default:$("#btnallaubitinfo").unbind(),$("#btnallaubitinfo").attr("class","write_submit_unable")}}function btntjsh(){tcontone++,sub_alldata()}function sub_alldata(){if(1==tcontone){Loading();var e=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var t=urlLink+"/web/user_profile/submit_all_profiles";_xmlHttpRequest.open("POST",t,!0),_xmlHttpRequest.withCredentials=!0,_xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){e&&(clearTimeout(e),e=null),severResponse=_xmlHttpRequest.responseText;var t=JSON.parse(severResponse);switch(tcontone=1,t.code){case 0:$("#wanshan").attr("src","images/linkman_ico-back@3x.png"),History.pushState(null,null,"myIndex.html"),window.location.href="myIndex.html";break;case-10004:case-10003:session_expired(t.msg),tcontone=0;break;case 404:case-10002:logout();break;default:top_meassage(t.msg),show_topmessage(),tcontone=0}LoadingOver()}},_xmlHttpRequest.send(null)}}}function init(e){(new UploadPic).init({input:document.querySelector(".picfile"+e),callback:function(t){loadwsan_datapic(t,e)},loading:function(){Loading()}})}function loadwsan_datapic(e,t){var a=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var s=urlPicLink+"/upload/bytes";_xmlHttpRequest.open("POST",s,!0),_xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){a&&(clearTimeout(a),a=null),severResponsepic=_xmlHttpRequest.responseText;var s=JSON.parse(severResponsepic);switch(s.result_code){case 0:$(".filname"+t).val(s.filename),document.querySelector(".cname"+t).src=e,get_all_status(null,null,null),LoadingOver();break;default:"undefined"==s.error_message?(top_meassage("服务器忙，请稍后再试"),show_topmessage()):(top_meassage(s.error_message),show_topmessage()),LoadingOver()}}},_xmlHttpRequest.send("bytes="+e.split(",")[1]+"&type=png&encoder=urlbaes64")}}function sub_upload_img(e){var t;if(""==(t=isWeiXin()?$(".filname-"+e).val():$(".filname"+e).val())||null==t||"undefined"==t)return ShowMsg("请添加照片！"),!1;Loading();var a=setTimeout(function(){LoadingOver(),top_meassage("请求超时，请稍后再试"),show_topmessage()},3e4);if(_xmlHttpRequest=createXmlHttpRequest(),null!=_xmlHttpRequest){var s=urlLink+"/web/user_profile/upload_img";_xmlHttpRequest.open("POST",s,!0),_xmlHttpRequest.withCredentials=!0,_xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),_xmlHttpRequest.onreadystatechange=function(){if(4==_xmlHttpRequest.readyState&&200==_xmlHttpRequest.status){a&&(clearTimeout(a),a=null),severResponse=_xmlHttpRequest.responseText;var t=JSON.parse(severResponse);switch(t.code){case 0:switch(localStorage.int64_verify_status=t.data.int64_verify_status,localStorage.int64_status=t.data.int64_profile_status,e){case 1:$(".bgpic3").html('<img src="images/base_submit.png" />'),$("#bottompic3").attr("src","images/card-front_ico@3x.png"),divhide("idcard_just_detail");break;case 2:$(".bgpic4").html('<img src="images/base_submit.png" />'),$("#bottompic4").attr("src","images/card-verso_ico@3x.png"),divhide("idcard_versa_detail");break;case 3:$(".bgpic5").html('<img src="images/base_submit.png" />'),$("#bottompic5").attr("src","images/card-hand_ico@3x.png"),divhide("idcard_schi_detail")}LoadingOver(),ShowMsg("提交成功！"),1!=e&&2!=e&&3!=e||(window.location.href="check_status.html?v="+Math.random());break;case-10004:case-10003:LoadingOver(),session_expired(t.msg);break;case 404:case-10002:LoadingOver(),logout();break;default:LoadingOver(),top_meassage(t.msg),show_topmessage()}}},_xmlHttpRequest.send("string_image_id="+t+"&int32_image_type="+e)}}function return_current_page(e,t,a){switch(a){case 1:Loadcheckdatadetail(2,1);break;case 3:Loadcheckdatadetail(4,3);break;case 4:Loadcheckdatadetail(5,4);break;case 5:Loadcheckdatadetail(6,5);break;case 6:Loadcheckdatadetail(8,6)}2==a?(Loading(),$.ajax({url:"https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel="+localStorage.string_phone_number,dataType:"jsonp",type:"get",success:function(e){"北京移动"==e.carrier?($("#bj_phoneno").text(localStorage.string_phone_number),$("#txt_bjphoneno").val(localStorage.string_phone_number),$("#phone_detail_1").show()):$("#"+t).show(),LoadingOver()}})):$("#"+t).show()}function btnOpenDatainfo(e){switch(localStorage.int32_apply_status-0){case 1:return ShowMsg("资料正在等待审批，暂时无法修改"),!1;case 2:return ShowMsg("资料正在审核中，暂时无法修改"),!1;case 5:return ShowMsg("资料被拒绝，无法修改"),!1;case 3:return ShowMsg("资料已经审核通过，无法修改"),!1;default:if(null!=localStorage.int64_verify_status){if(3==btnstatusvalue(localStorage.int64_verify_status,e))return ShowMsg("该项信息已经审核通过，无法修改"),!1;switch(e){case 1:qh_divlabel("myprofile_main","linkman_detail",1,e);break;case 2:qh_divlabel("myprofile_main","phone_detail",6,e);break;case 3:qh_divlabel("myprofile_main","idcard_just_detail",3,e);break;case 4:qh_divlabel("myprofile_main","idcard_versa_detail",4,e);break;case 5:qh_divlabel("myprofile_main","idcard_schi_detail",5,e);break;case 6:qh_divlabel("myprofile_main","job_detail",7,e);break;case 8:if(4==localStorage.int32_apply_status&&1==localStorage.int32_precashstrategy)return ShowMsg("该项信息已经审核通过，无法修改"),!1;window.location.href="loan_desire.html"}}}}function qh_divlabel(e,t,a,s){switch(localStorage.int32_apply_status){case"0":case"4":if(1==s)if(2==localStorage.int32_stu_worker);else;if(1==btnstatusvalue(localStorage.int64_status,a)&&2==s)return 4==localStorage.int32_apply_status?(ShowMsg("通话详单被打回"),!1):(ShowMsg("通话详单已经提交，无需重复提交"),!1);return_current_page(e,t,s);break;default:return ShowMsg("资料已锁定，无法修改"),!1}}$(document).ready(function(){0==localStorage.bycxtooptip?$("#tipsaddedu").show():$("#tipsaddedu").hide(),loadLogin_three(),divshow("loadd_pageinfog"),get_all_status(infoCallBack,null,null);var e="";1==localStorage.int32_stu_worker?(e+='<option value="0" selected="selected">请选择</option>',e+='<option value="1">父亲</option>',e+='<option value="2">母亲</option>',e+='<option value="4">亲戚</option>'):(e+='<option value="0" selected="selected">请选择</option>',e+='<option value="6">同事</option>'),setTimeout(function(){loaddatawsd()},500),0!=localStorage.int32_apply_status&&$("#wanshan").attr("src","images/progress3.png"),setInterval(function(){null!=localStorage.int32_limit_amount&&""!=localStorage.int32_limit_amount&&"undefined"!=localStorage.int32_limit_amount&&"NaN"!=localStorage.int32_limit_amount?$(".liamount").html(localStorage.int32_limit_amount):$(".liamount").html(2500),$("#txt_phoneno").val(localStorage.string_phone_number),$("#lbl_phoneno").html(localStorage.string_phone_number),$("#bj_phoneno").text(localStorage.string_phone_number),$("#txt_bjphoneno").val(localStorage.string_phone_number)},500),setInterval(everytimec,500),setTimeout(function(){divhide("loadd_pageinfog")},500),setTimeout(function(){init(1),init(2),init(3)},1e3),LoadingOver()});var wait=45,tcontone=0;