;
var _currPage = 0, //当前页
	_pages = 0, //总页数
	nowYear = null, //当前年
	nowMonth = null, //当前月
	myScroll = null,
	canReload = false, //能否reload
	canNextPage = false; //能否加载下一页

$(function(){
	//阻止默认
	document.querySelector("#wrapper").addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	// iScroll
	myScroll = new IScroll('#wrapper', {
		mouseWheel: true,
		probeType : 2,
		vScrollbar: false,
//		momentum: false,
//		useTransition : false
	})
	
	myScroll.on("scroll", function(){
		var _scrollTop = this.y * (-1),
			_viewHeight = $("#wrapper").height(),
			_height = $(".points").outerHeight(),	
			_offset = -parseInt($(".loadMore").css("bottom"));
//		console.log(_offset);
//		console.log(_scrollTop + "=====" + _offset + "=====" + _viewHeight + "=====" + _height);
		if(_scrollTop + _viewHeight - _offset > _height){
			if(_currPage < _pages){
				$(".loadMore").show();		
				canNextPage = true;
			}
			if(_currPage == _pages){
				$(".loadMore").hide();	
			}
		}
		if(_scrollTop < -_offset && this.directionY == -1){
			canReload = true;
		}		
	})
	
	myScroll.on("scrollEnd", function(){
		//用户同时触发了reload和nextPage
		if(canReload && canNextPage){
			reloadScores();
			return
		}
		//刷新用户积分、积分记录
		if(canReload){
			userScore();
			reloadScores();
		}
		//加载下一页
		if(canNextPage){
			console.log("loadMore...");
			_currPage++;
			getScores(_currPage);
		}
	})
	
	//	获取用户积分
	userScore();

	// 获取积分记录
	getScores(_currPage);

});

// 获取用户积分
function userScore(){
	var scoreInfoUrl = urlLink + "/web/user_profile/score_info";
	xmlHttpRequest(null, scoreInfoUrl, getScoreInfo, "get");	
}
//回调
function getScoreInfo(data){
	$("#totalPoints").text(data.data.int32_cumulative);
	$("#availablePoints").text(data.data.int32_available);
}


// 刷新积分记录
function reloadScores(){
	console.log("reloading....");
	$(".pointsRecordDetail dl:not(:first)").remove();
	nowMonth = null;
	nowYear = null;
	_currPage = 0;
	_pages = 0;
	getScores(0);	
}

// 获取积分记录
function getScores(page){
	var page = page ? page : 0;
	var scoreDetailsUrl = urlLink + "/web/user_profile/score_details";
	var send = "?page=" + page;
	xmlHttpRequest(send, scoreDetailsUrl, getScoreDetails, "get");
}

function getScoreDetails(data, page){
	LoadingOver();
	
 	var _datajson = JSON.parse(severResponse);
    switch (_datajson.code) {
        case 0: //OK
			if(data.data.int32_total == 0){
				$(".noRecord").show();
				$("#wrapper").hide();
				return;
			}
			_pages = Math.floor(data.data.int32_total / 10);
			var _info = data.data.struct_score_info,
				nowDate = _info[0].string_date.split("-");
			nowYear = nowDate[0][2] + nowDate[0][3]; //当前年
			//循环遍历生成包含年月日的表，再除去相同年、月
			$.each(_info, function(i,elem){
				var _date = elem.string_date.split("-"),
					_yearArray = _date[0].split(""),
					_year = _yearArray[2] + _yearArray[3], //当前行 年
					_month = _date[1],  //当前行 月
					_day = _date[2],  //当前行 日
					_reason = elem.string_reason,
					_value = elem.string_value;
				var $tmp = $(".detailTmp:first").clone(true).removeClass("hide detailTmp").addClass("records");
				$tmp.find(".year").text(_year);
				$tmp.find(".month").text(_month);
				$tmp.find(".day").text(_day);
				$tmp.find(".reason").text(_reason);
				$tmp.find(".value").text(_value);
				if(_value[0] === "-"){
					$tmp.find(".value").css("color", "#fc335e"); //使用积分
				}
				$(".points").append($tmp);
			});
			//去除重复年、月
			$.each($(".records"), function(i, elem){
				var _year = $(elem).find(".year").text(),
					_month = $(elem).find(".month").text();
				if(_year == nowYear){
					var $nextElem = $(elem).next(".records");
					$(elem).find(".recordDetailRound").removeClass("roundBig").addClass("roundSmall").find("span").hide();
//					$(elem).find(".recordDetailRound").removeClass("roundSmall").addClass("roundBig");
					if(_month == nowMonth){
						/*if(canNextPage && i == 0){
							console.log("i == " + i);
							return
						}*/
//						console.log("_month == " + _month + "==  nowMonth ==" + nowMonth);
						$(elem).find("dt").hide();
						$(elem).css({
							"padding-top" : 0,
							"padding-bottom" : 0
						});
						$(elem).prev(".records").css("padding-bottom", "0");
					}else{
						nowMonth = _month;
					}
				}else{
					nowYear = _year;
					nowMonth = _month;
				}
			});
			addHeight();
			setTimeout(function(){
				canNextPage = false;
				canReload = false;
				myScroll.refresh();	
			}, 200);
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
}


// .points撑高度
function addHeight(){
	var _viewHeight = $("#wrapper").height(),
		_viewOuterH = $("#wrapper").outerHeight(),
		len = $(".points dl").length - 1,
		_height = 0;
	for(var i = len - 1; i > 0; i--){
		_height += $(".points dl").eq(i).outerHeight();
	}
	if(_height < _viewOuterH){
		$(".points").css({
			'height' : _viewHeight + 'px',
			'padding-bottom' : '10px'
		})
	}else{
		$(".points").css('height', '')
	}
}
