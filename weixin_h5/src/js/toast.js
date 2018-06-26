"use strict";

/*
//勿删,全屏弹窗模板ES6
var $fullScreen = `
  <div class="tooltip_main_center hide_mian_div" id="fullToast">
    <div class="tooltip-box">
        <img src="images/tooltip_node_h.png">

        <div class="tooltip-cont-box">
            <div class="cont-img-box">
                <img src="images/zm_rz.png">
            </div>
            <p class="cont-p1"></p>

            <p class="cont-p2"></p>
        </div>
        <div class="tooltip-bottom-box">
            <ul>
                <li>
                    <a href="javascript:void(0)" class="cancel-l"></a>
                </li>
                <li>
                    <a href="javascript:void(0)" class="btn-r"></a>
                </li>
            </ul>
        </div>
    </div>
  </div>
` 
*/

//转码后
var $fullScreen = "\n  <div class=\"tooltip_main_center hide_mian_div\" id=\"fullToast\">\n    <div class=\"tooltip-box\">\n        <img src=\"images/tooltip_node_h.png\">\n\n        <div class=\"tooltip-cont-box\">\n            <div class=\"cont-img-box\">\n                <img src=\"images/zm_rz.png\">\n            </div>\n            <p class=\"cont-p1\"></p>\n\n            <p class=\"cont-p2\"></p>\n        </div>\n        <div class=\"tooltip-bottom-box\">\n            <ul>\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"cancel-l\"></a>\n                </li>\n                <li>\n                    <a href=\"javascript:void(0)\" class=\"btn-r\"></a>\n                </li>\n            </ul>\n        </div>\n    </div>\n  </div>\n";


$(function(){
	$("body").prepend($fullScreen)
})

//弹窗A
var fullA = {
	title: "请先选择分期产品",
	content: "选择完分期产品后才能填写资料哦",
	btn: [
		{
			txt: "稍后再说",
			method: "javascript:divhide('fullToast')"
		},
		{
			txt: "选择产品",
			method: "home.html"
		}
	]		
}

//弹窗B
var fullB = {
	title: "请先选择分期产品",
	content: "选择完分期产品后才能使用额度哦",
	btn: [
		{
			txt: "稍后再说",
			method: "javascript:divhide('fullToast')"
		},
		{
			txt: "选择产品",
			method: "home.html"
		}
	]		
}

//弹窗C
var fullC = {
	title: "请先选择分期产品",
	content: "选择完分期产品后才能查看分期进度哦",
	btn: [
		{
			txt: "稍后再说",
			method: "javascript:divhide('fullToast')"
		},
		{
			txt: "选择产品",
			method: "home.html"
		}
	]		
}

//弹窗D
var fullD = {
	title: "请先选择分期产品",
	content: "选择完分期产品后才能使用额度哦",
	btn: [
		{
			txt: "知道了",
			method: "javascript:divhide('fullToast')"
		}
	]		
}

//弹窗E
var fullE = {
	title: "请先选择分期产品",
	content: "选择完分期产品后才能查看分期进度哦",
	btn: [
		{
			txt: "知道了",
			method: "javascript:divhide('fullToast')"
		}
	]		
}

//弹窗F
var fullF = {
	title: "信用卡分期已经生效",
	content: "您的信用卡分期资料已经生效，无法申请其他分期，请继续完善资料",
	btn: [
		{
			txt: "取消",
			method: "javascript:divhide('fullToast')"
		},
		{
			txt: "完善资料",
			method: "javascript:btnrealviery()"
		}
	]		
}

//弹窗G
var fullG = {
	title: "信用卡分期已经生效",
	content: "您的信用卡分期资料已经生效，完善资料后才能使用额度",
	btn: [
		{
			txt: "取消",
			method: "javascript:divhide('fullToast')"
		},
		{
			txt: "完善资料",
			method: "javascript:btnrealviery()"
		}
	]		
}

//弹窗H
var fullH = {
	title: "信用卡分期已经生效",
	content: "您的信用卡分期资料已经生效，完善资料后才能查看分期进度",
	btn: [
		{
			txt: "取消",
			method: "javascript:divhide('fullToast')"
		},
		{
			txt: "完善资料",
			method: "javascript:btnrealviery()"
		}
	]		
}

//弹窗I
var fullI = {
	title: "其他分期产品已经生效",
	content: "您有一笔分期资料已经提交审核，无法申请其他分期产品",
	btn: [
		{
			txt: "知道了",
			method: "javascript:divhide('fullToast')"
		}
	]		
}

//faceid确认完成弹窗
var fullFaceId = {
	title: "是否已完成认证？",
	content: "",
	btn: [
		{
			txt: "继续完成",
			method: "javascript:divhide('fullToast')"
		},
		{
			txt: "已完成",
			method: "javascript:loopGetFaceRes()"
		}
	]		
}


function addFullScreenToast(obj){	
	$("#fullToast")
	.find(".cont-p1")
	.text(obj.title)
	.next(".cont-p2")
	.text(obj.content);
	
	if(obj.btn.length === 2){
		$("#fullToast").find(".tooltip-bottom-box li a")
		.eq(0)
		.attr("href", obj.btn[0].method)
		.text(obj.btn[0].txt)
		.end()
		.eq(1)
		.attr("href", obj.btn[1].method)
		.text(obj.btn[1].txt)
	}else{
		$("#fullToast").find(".tooltip-bottom-box li a")
		.eq(1)
		.attr("href", obj.btn[0].method)
		.text(obj.btn[0].txt)
		.end()
		.eq(0)
		.parent("li")
		.hide()
	}
	
	$("#fullToast").show()
}








