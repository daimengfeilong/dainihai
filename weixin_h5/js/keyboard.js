!function(t){var e=function(t,e,l){function a(t){t.preventDefault();var l=t||window.event,a=l.element||l.target,d=a.textContent||a.innerText;if("td"===a.tagName.toLocaleLowerCase()&&"删除"!==d){if(n.input){var o=$("#txt_paypwd").val().length;switch(vtype){case 0:o<6&&($("#btnpayul").find("li").eq(o).html("●"),n.input.value+=d);break;case 1:case 2:if(o<6&&($("#btnpayul").find("li").eq(o).html("●"),n.input.value+=d,5==o)){var r=$("#txt_paypwd").val();check_password(r)}break;case 5:if(o<6&&($("#btnpayul").find("li").eq(o).html("●"),n.input.value+=d,5==o)){var s=$("#o_paypwd"),p=$("#txt_paypwd");""==s.val()?($(".titlent").html("请再次输入支付密码"),s.val($("#txt_paypwd").val()),p.val(""),$("#btnpayul").find("li").html("")):s.val()==p.val()?0==localStorage.int32_is_set_pay_password?set_password(s.val(),e):check_password(s.val()):($(".titlent").html("两次输入不一致，请重新输入"),s.val(""),p.val(""),$("#btnpayul").find("li").html(""))}break;case 6:if(o<6&&($("#btnpayul").find("li").eq(o).html("●"),n.input.value+=d,5==o)){var s=$("#o_paypwd"),p=$("#txt_paypwd");""==s.val()?($(".titlent").html("请再次输入支付密码"),s.val($("#txt_paypwd").val()),p.val(""),$("#btnpayul").find("li").html("")):s.val()==p.val()?1==localStorage.int32_is_set_pay_password&&reset_password(s.val(),$("#txt_vcode").val()):($(".titlent").html("两次输入不一致，请重新设置"),s.val(""),p.val(""),$("#btnpayul").find("li").html(""))}break;case 9:if(o<6&&($("#btnpayul").find("li").eq(o).html("●"),n.input.value+=d,5==o)){var r=$("#txt_paypwd").val();Cancel_checkpassword(r)}}}}else if("div"===a.tagName.toLocaleLowerCase()&&"完成"===d)i.removeChild(n.el);else if("td"===a.tagName.toLocaleLowerCase()&&"删除"===d){var h=n.input.value;if(h){var v=h.substr(0,h.length-1);n.input.value=v;var o=$("#txt_paypwd").val().length;$("#btnpayul").find("li").eq(o).html("")}}}var i=document.getElementsByTagName("body")[0],d=l&&l.divId||"__w_l_h_v_c_z_e_r_o_divid";document.getElementById(d)&&i.removeChild(document.getElementById(d)),this.input=t,this.el=document.createElement("div");var n=this,o=l&&l.zIndex||9999,r=l&&l.width||"100%",s=l&&l.height||"auto",p=(l&&l.fontSize,l&&l.backgroundColor||"#fff"),h=l&&l.table_id||"table_0909099",v="undefined"!=typeof orientation;this.el.id=d,this.el.style.position="fixed",this.el.style.left=0,this.el.style.right=0,this.el.style.bottom=0,this.el.style.zIndex=o,this.el.style.fontSize="0.35rem",this.el.style.width=r,this.el.style.height=s,this.el.style.backgroundColor=p;var c='<style type="text/css">';c+="#"+h+"{text-align:center;width:100%;height:auto;border-top:1px solid #CECDCE;background-color:#FFF;}",c+="#"+h+" td{width:33%;border:1px solid #ddd;border-right:0;border-top:0;}",v||(c+="#"+h+" td:hover{background-color:#1FB9FF;color:#FFF;}"),c+="#"+h+" tr{line-height:0.8rem;}",c+="</style>";var u='<table id="'+h+'" border="0" cellspacing="0" cellpadding="0">';u+="<tr><td>1</td><td>2</td><td>3</td></tr>",u+="<tr><td>4</td><td>5</td><td>6</td></tr>",u+="<tr><td>7</td><td>8</td><td>9</td></tr>",u+='<tr><td style="background-color:#D3D9DF;"></td><td>0</td>',u+='<td style="background-color:#D3D9DF;">删除</td></tr>',u+="</table>",this.el.innerHTML=c+u,v?this.el.ontouchstart=a:this.el.onclick=a,i.appendChild(this.el)};t.KeyBoard=e}(window);