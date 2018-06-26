
//参考http://www.nowamagic.net/javascript/js_GetBrowserSize.php
// 获取设备的事件尺寸
var dSize = function() {        //函数：获取尺寸
    var winWidth = 0;
    var winHeight = 0;
	
	// 获取窗口宽度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
		
   // 获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight; 
		
   // 通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
	
    return {w: winWidth, h: winHeight}
}


// 设置body手机属性
var setBody = function(e, bi_w, bi_h){
	var fontSize = 16;
	e = e || 'body';
	bi_w = bi_w || 720;
	bi_h = bi_h || 1024;
	
	
	var Ele = $(e),
		bi = bi_h/bi_w,
		d_bi = Ele.height()/Ele.width(),
		fh_Size = Ele.height()/bi_h*fontSize;
		fw_Size = Ele.width()/bi_w*fontSize;
	
	//alert(d_bi);
	//Ele.css('width', Ele.width());
	//Ele.css('height', Ele.height());
	if(d_bi <= bi)
	{
		Ele.css('font-size', fh_Size);
	}
	else{
		Ele.css('font-size', fw_Size);
	}
}







