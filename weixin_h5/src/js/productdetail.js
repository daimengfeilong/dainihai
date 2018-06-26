var item_array = '';
var straprice_array = '';


function preventDefault(e) {
	e.preventDefault();
};


function ProdDetails(pid) {
	Loading();
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlDetails = createXmlHttpRequest();
	if (_xmlDetails != null) {
		var _url = PordLink + "/item/get_commodity_detail?commodity_id=" + pid;
		var _method = "GET";
		_xmlDetails.open(_method, _url, true);
		_xmlDetails.withCredentials = false;
		_xmlDetails.onreadystatechange = function() {
			if (_xmlDetails.readyState == 4) {
				if (_xmlDetails.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlDetails.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK  
							$("#hid_itemid").val(pid);
							var skuhtml = "",
								strategyhtml = "";
							var coi = 0;
							$("#product_name").html(_datajson.commodity_detail.commodity_name);
							/*sku*/
							var valuestr = _datajson.commodity_detail.category;
							for (var countryObj in valuestr) {
								skuhtml += "<div class=\"prodd_sku_ul\">";
								for (var cityObj in valuestr[countryObj]) {
									skuhtml += "<div class=\"prodd_skuli_left\">";
									skuhtml += "<div>" + cityObj + "</div>";
									skuhtml += "</div>";
									skuhtml += "<div class=\"prodd_skuli_right\">";
									skuhtml += "<ul class=\"prodd_skuli_right_ul\">";
									coi = 0;
									for (var cityrObj in valuestr[countryObj][cityObj]) {
										for (var cityrtObj in valuestr[countryObj][cityObj][cityrObj]) {
											if (cityrtObj == "id") {
												if (coi == 0) {
													skuhtml += "<li alt=" + valuestr[countryObj][cityObj][cityrObj][cityrtObj] + " class=\"active\">";
												} else {
													skuhtml += "<li alt=" + valuestr[countryObj][cityObj][cityrObj][cityrtObj] + " >";
												}
											}
											if (cityrtObj == "short_message") {
												skuhtml += valuestr[countryObj][cityObj][cityrObj][cityrtObj];
												skuhtml += "</li>";
											}

											coi++;
										}
									}
									skuhtml += "</ul>";
									skuhtml += "</div>";
								}
								skuhtml += "</div>";
								skuhtml += "<div class=\"clear\"></div>";
							}
							$(".prodd_sku").html(skuhtml);
							/*strategy*/
							$.each(_datajson.commodity_detail.strategy, function(i, item) {
								if (i == 0) {
									$("#prod_strategyval").html(unescape(item.short_message));
									$("#hid_strategyid").val(item.strategy_id);
								}
								strategyhtml += "<li alt=\"" + item.strategy_id + "\">" + unescape(item.short_message) + "</li>";
							});
							$("#prod_strategy").html(strategyhtml);

							/*item_detail*/
							var itemval = _datajson.commodity_detail.item_detail;
							var skucount = 0;
							var strapricecount = 0;
							var fristname = '';
							var firststraprice = '';
							for (var itemcv in itemval) {
								//console.log(itemcv);
								//item_array = itemcv; 
								for (var itemcvt in itemval[itemcv]) {
									//console.log(itemcvt);
									if (skucount == 0) {
										fristname = itemcv + "" + itemcvt;
									}
									item_array += "{skuname:" + itemcv + "" + itemcvt;
									item_array += ",data:{";
									for (var itemcvs in itemval[itemcv][itemcvt]) {
										//console.log(itemval[itemcv][itemcvt][itemcvs]);
										item_array += itemcvs + ":'" + itemval[itemcv][itemcvt][itemcvs] + "',";
										if (strapricecount == 0 && itemcvs == 'price') {
											firststraprice = itemval[itemcv][itemcvt][itemcvs] + "" + $("#hid_strategyid").val();
										}
									}
									item_array = item_array.substring(0, item_array.length - 1);
									item_array += "}}|&tkfw&|";
									skucount++;
								}
							}
							//console.log(firststraprice);
							BtnSku(fristname);
							$("#hid_itemskuid").val(fristname);

							/*strategy price*/
							var straprice = _datajson.commodity_detail.installment;
							for (var strapc in straprice) {
								//console.log(strapc);
								for (var strapct in straprice[strapc]) {
									//console.log(strapct); 
									straprice_array += "{strapname:" + strapc + "" + strapct;
									straprice_array += ",";
									straprice_array += "val:'" + ((straprice[strapc][strapct])/100).toFixed(2) + "',";
									straprice_array = straprice_array.substring(0, straprice_array.length - 1);
									straprice_array += "}|&tkfw&|";
									strapricecount++;
								}
							}
							//console.log(straprice_array);
							BtnStraPrice(firststraprice);
							$("#hid_strapricekid").val(firststraprice);
							LoadingOver();
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
		_xmlDetails.send(null);
	}
	YC_LoadData();
}


function YC_LoadData() {
	setTimeout(function() {
		$(".prodd_sku").find(".prodd_sku_ul").find("ul").find("li").bind(touchstart, function() {
			$(this).parents("ul").find("li").removeClass("active");
			$(this).addClass("active");
			GetSelectSku();
		});

		$(".prod_seclect").bind(touchstart, function() {
			$(this).parents("ul").find("li").removeClass("active");
			$(this).addClass("active");
		});

		$(".prod_divsigle").bind(touchstart, function() {
			$("#prod_selectfenqibg").show();
			$("#prod_selectfenqi").show();
			$("body").css({
				"overflow-x": "hidden",
				"overflow-y": "hidden"
			});
			document.addEventListener('touchmove', preventDefault, false);
		});

		$("#prod_selectfenqibg").bind(touchstart, function() {
			$("#prod_selectfenqibg").hide();
			$("#prod_selectfenqi").hide();
			$("body").css({
				"overflow-x": "hidden",
				"overflow-y": "auto"
			});
			document.removeEventListener('touchmove', preventDefault, false);
		});

		$("#prod_strategy").find("li").bind(touchstart, function() {
			divhide('prod_selectfenqibg');
			divhide('prod_selectfenqi');
			var qalt = $(this).attr("alt");
			var qval = $(this).html();
			$("#hid_strategyid").val(qalt);
			$("#prod_strategyval").html(qval);
		});
	}, 500);
}

function GetSelectSku() {
	var skuitem = '';
	var $skui = $(".prodd_sku");
	var skulen = $skui.find(".prodd_sku_ul").length;
	for (var i = 0; i < skulen; i++) {
		var $lisku = $skui.find(".prodd_sku_ul").eq(i).find("ul").find("li");
		var lilen = $lisku.length;
		for (var j = 0; j < lilen; j++) {
			if ($lisku.eq(j).attr("class") == "active") {
				skuitem += $lisku.eq(j).attr("alt") + "";
			}
		}
	}
	//console.log(skuitem);
	if (skuitem != '') {
		BtnSku(skuitem);
	}
}

function BtnSku(val) {
	var itemarr = item_array.split("|&tkfw&|");
	for (var i = 0; i < itemarr.length - 1; i++) {
		var itema_json = itemarr[i];
		//console.log(itema_json);
		var obj = eval("(" + itema_json + ")");
		if (obj.skuname == val) {
			//console.log(itema_json);
			$("#hid_price").val((obj.data.price/100).toFixed(2));
			$("#lbl_xj").html((obj.data.price/100).toFixed(2));
			$("#lbl_yj").html((obj.data.origin_price/100).toFixed(2));
			$("#banner_box").html(PorductImg(obj.data.pic_big));
			YCJdPic();
			BtnStraPrice(obj.data.price + "" + $("#hid_strategyid").val());
		}
	}
}


function BtnStraPrice(strapriceval) {
	var itemarrsp = straprice_array.split("|&tkfw&|");
	for (var i = 0; i < itemarrsp.length - 1; i++) {
		var itemasp_json = itemarrsp[i];
		//console.log(itemasp_json);
		var obj = eval("(" + itemasp_json + ")");
		if (obj.strapname == strapriceval) {
			//console.log(itemasp_json);
			$("#yuegongprice").html(obj.val);
			$("#hid_yuegongprice").val(obj.val);
		}
	}
}

function PorductImg(imgsrc) {
	/*1926px*/
	var strhtml = "<ul id=\"imglist\" style=\"list-style: none; width: 100%; transition: 500ms; transform: translate3d(0px, 0px, 0px);\">";
	strhtml += "<li style=\"width: 100%; display: table-cell; vertical-align: top;\" ><img src = \"" + imgsrc + "\" style = \"min-height: 50px;\"></li> ";
	strhtml += "</ul>";
//	strhtml += "<ol id=\"imgli\">";
//	strhtml += "<li class=\"on\">";
//	strhtml += "</li> ";
//	strhtml += "</ol>";
	return strhtml;
}


function YCJdPic() {
	setTimeout(function() {
		$("#banner_box").show();
//		new Swipe(document.getElementById('banner_box'), {
//			speed: 500,
//			auto: 3000,
//			callback: function() {
//				var lis = $(this.element).next("ol").children();
//				lis.removeClass("on").eq(this.index).addClass("on");
//			}
//		});
	}, 500)
}



function Prod_Stock(pid) {
	var timeout = setTimeout(function() {
		LoadingOver();
		top_meassage("请求超时，请稍后再试");
		show_topmessage();
	}, 30000);
	var _xmlStock = createXmlHttpRequest();
	if (_xmlStock != null) {
		var _url = PordLink + "/item/get_item_inventory?item_id=" + pid;
		var _method = "GET";
		_xmlStock.open(_method, _url, true);
		_xmlStock.withCredentials = false;
		_xmlStock.onreadystatechange = function() {
			if (_xmlStock.readyState == 4) {
				if (_xmlStock.status == 200) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					severResponse = _xmlStock.responseText;
					var _datajson = JSON.parse(severResponse);
					switch (_datajson.code) {
						case 0: //OK  
							$("#lbl_prodstock").html(_datajson.inventory);
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
		_xmlStock.send(null);
	}
}