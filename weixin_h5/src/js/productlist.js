var pricetype = "incr";
var ctype = "sdfsd";
var pageindex = 1;
var pageSum = 0;
var pagesize = 12;
var pageCount = 0;
var flag = false;
var okstr = 0;
var zdtop = true;
var mheight = 0;
$(document).ready(function() {
	loadLogin_three();
	/*price star*/
	$(".price_type").bind(touchstart, function() {
		var typecative = $(this).find("i").attr("class");
		if (typecative.indexOf("_up") > -1) {
			$(this).find("i").attr("class", "prod_dtprice_down");
			Btn_ProdaPrive("desc");
		} else {
			$(this).find("i").attr("class", "prod_dtprice_up");
			Btn_ProdaPrive("incr");
		}
	});
	/*price end*/

	LoadProdutList();
	GetProductCategory();
	LoadingOver();
});

function Btn_ProdaPrive(ptype) {
	pricetype = ptype;
	pageindex = 1;
	pageSum = 0;
	pagesize = 12;
	pageCount = 0;
	flag = false;
	okstr = 0;
	document.body.scrollTop = "0";
	$(".prod_list").html("");
	LoadProdutList();
}


function LoadProdutList() {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlProdList = createXmlHttpRequest();
	if (_xmlProdList != null) {
		var _url = PordLink + "/item/get_commodity_list?start=" + pageSum + "&length=" + pagesize + "&price_order=" + pricetype + "&type=" + ctype;
		var _method = "GET";
		_xmlProdList.open(_method, _url, true);
		_xmlProdList.withCredentials = false;
		_xmlProdList.onreadystatechange = function() {
			if (_xmlProdList.readyState == 4) {
				if (_xmlProdList.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlProdList.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK  
							var strhtml = "";
							pageCount = _datajson.commodity_count;
							if (pageCount > 0) {
								$.each(_datajson.commodity_list, function(i, item) {
									strhtml += "<div class='prod_sigle' onclick=\"ProductDetail(" + item.commodity_id + ")\">";
									//strhtml += "<a href=\"productdetail.html?pid=" + item.commodity_id + "\" target=\"_blank\">"
									strhtml += "<div class='prod_sigle_first'>";
									strhtml += "<div class='prod_img'><img src='" + item.pic + "'>";
									strhtml += "<div class='prod_title'>";
									strhtml += "<div>" + item.name + "</div>";
									strhtml += "</div>";
									strhtml += "</div>";
									strhtml += "</div>";
									strhtml += "<div class='prod_sigle_sencod'>";
									strhtml += "<div class='prod_price_xs'><span>￥</span>" + (parseInt(item.price) / 100) + "<img src='images/icon_small_qi@2x.png' /></div>";
									strhtml += "<div class='prod_price_two'>";
									strhtml += "<label class='color_6'>总价<span>" + (parseInt(item.price) / 100) + "</span>元</label>";
									strhtml += "<label class='color_a'>原价<span>" + (parseInt(item.origin_price) / 100) + "</span>元</label>";
									strhtml += "</div>";
									strhtml += "</div>";
									//strhtml += "</a>";
									strhtml += "</div>";
								});
								if (okstr == '1') {
									$(".prod_list").html(strhtml);
								} else {
									$(".prod_list").append(strhtml);
								}
								if (pageCount >= (pageindex * pagesize)) {
									stop = true;
								} else {
									$(".prod_list").append("<div class='clear'></div><div class='prodl_over'><img src='images/icon_last_upload.png' />已经到最后了</div>");
								}
								pageSum = pageindex + pagesize;
							} else {
								$(".prod_list").append("<div class='clear'></div><div class='prodl_over'><img src='images/icon_last_upload.png' />暂无信息</div>");
							}
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
		_xmlProdList.send(null);
	}

	setTimeout(function() {
		/*active product list star*/
		$(".prod_sigle").bind(touchstart, function() {
			$(".prod_sigle").removeClass("active");
			$(this).addClass("active");
		});
		/*active product list end*/
	}, 500)
}

//窗口滚动
window.scrollTo(0, 0);
$(window).scroll(function() {
	totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
	mheight = $(window).scrollTop();
	if ($(document).height() - 10 <= totalheight) {
		if (stop == true) {
			stop = false;
			if (okstr == 0) {
				var tp = parseInt($(document).height()) - 370;
				pageindex = parseInt(pageindex) + 1;
				okstr = 0;
				LoadProdutList();
			}
		}
	} else {
		if ($(window).height() == totalheight) {
			zdtop = true;
			$("#pprodl_zdtop").remove()
		} else {
			if (zdtop) {
				zdtop = false;
				$(".prod_list").append("<div class='pprodl_zdtop' id='pprodl_zdtop'><a href='#htmlzdtop'><img src='images/btn_gototop.png'/></div><div class='clear'></div>");
			}
		}
	}
});


function preventDefault(e) {
	e.preventDefault();
};

function prodcate_divhide(name, name2, type) {
	if (type == 1) {
		$("." + name).fadeIn();
		$("." + name2).fadeIn();
		$("body").css({
			"overflow-x": "hidden",
			"overflow-y": "hidden"
		});
		document.addEventListener('touchmove', preventDefault, false);
	} else {
		$("." + name).fadeOut();
		$("." + name2).fadeOut();
		$("body").css({
			"overflow-x": "hidden",
			"overflow-y": "auto"
		});
		document.removeEventListener('touchmove', preventDefault, false);
	}
}


function Search_Prod() {
	var lilen = $(".pcate_ulist").find("li");
	var cateval = "";
	for (var i = 0; i < lilen.length; i++) {
		var classval = $(".pcate_ulist").find("li").find("i").eq(i).attr("class");
		if (classval.indexOf("pcheck_on") > -1) {
			var calt = $(".pcate_ulist").find("li").eq(i).attr("alt");
			if (calt == "all") {
				cateval = '';
				break;
			} else {
				cateval += calt + ",";
			}
		}
	}
	//console.log(cateval);
	if (cateval.indexOf(',') > -1) {
		cateval = cateval.substring(0, cateval.length - 1);
	}
	pricetype = "incr";
	ctype = cateval;
	pageindex = 1;
	pageSum = 0;
	pagesize = 12;
	pageCount = 0;
	flag = false;
	okstr = 0;
	document.body.scrollTop = "0";
	$(".prod_list").html("");
	LoadProdutList();
	prodcate_divhide('prod_catelist', 'prod_catelist_page', 0);
}


function GetProductCategory() {
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlCateGory = createXmlHttpRequest();
	if (_xmlCateGory != null) {
		var _url = PordLink + "/item/get_commodity_type";
		var _method = "GET";
		_xmlCateGory.open(_method, _url, true);
		_xmlCateGory.withCredentials = false;
		_xmlCateGory.onreadystatechange = function() {
			if (_xmlCateGory.readyState == 4) {
				if (_xmlCateGory.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlCateGory.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK
							var catehtml = "<li alt=\"all\">全部<i class=\"pcheck_off\"></i></li>";
							$.each(_datajson.data, function(item) {
								//console.log(_datajson.data[item]);
								catehtml += "<li alt=\"" + _datajson.data[item] + "\">" + _datajson.data[item] + "<i class=\"pcheck_off\"></i></li>";
							});
							$("#pcate_ulist").html(catehtml);
							break;
						default:
							top_meassage(_datajson.message);
							show_topmessage();
							break;
					}
					LoadingOver();
				}
			}
		}
		_xmlCateGory.send(null);
	}

	setTimeout(function() {
		/*select category star*/
		$(".pcate_ulist").find("li").bind(touchstart, function() {
			if ($(this).find("i").attr("class") == "pcheck_off") {
				$(this).find("i").attr("class", "pcheck_on");
			} else {
				$(this).find("i").attr("class", "pcheck_off");
			}
		});
		/*select category end*/
	}, 500)
}

var c_mheight = 0;

function ProductDetail(pid) {
	c_mheight = mheight;
	ProdDetails(pid);
	Prod_Stock(pid);
	ProdSHideDIv('productdetail', 'productlist');
	$("body").animate({
		scrollTop: "0px"
	});
}

function ProdSHideDIv(show, hide) {
	$("#" + hide).hide();
	$("#" + show).show();
	$("body").animate({
		scrollTop: c_mheight + 'px'
	});
}