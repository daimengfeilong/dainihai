;
var myScroll = null,
	_currPage = 0,
	_pages = 0;
$(function(){
	//阻止默认
	document.querySelector("#wrapper").addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	var _type = getType();
	if(_type){
		inviteClick(_type);		 
	}else{
		inviteClick(2);
	}
	
	// iScroll
	myScroll = new IScroll('#wrapper', {
		mouseWheel: true,
		probeType : 1,
		vScrollbar: false
	});
	myScroll.on("scrollEnd", function(){
		var _scrollTop = this.y * (-1),
			_viewHeight = $(".inviteDetail").height(),
			_height = $(".inviteContent").outerHeight(),	
			_offset = 1.08 * 100;	
		if(_scrollTop + _viewHeight > _height - _offset){
			if(_currPage < _pages){
				_currPage++;
				var type = getType();
				getRecords(type, _currPage);
			}
		}
	});
	
});
// 类型：奖励2 邀请1
function getType(){
	var _search = window.location.search,
		_type = _search.split("=")[1];
	return _type ? _type : 2;
}
// 初始
function inviteClick(type){
	if(type == 2){
		$("header li:eq(0)").addClass("curr").next("li").removeClass("curr");
		$(".border li:eq(1)").addClass("currBorder").prev().removeClass("currBorder");
		$(".rewardRecords").removeClass("hide").next(".inviteRecords").addClass("hide");
		$(".inviteRecords dl:not(:first)").remove();
		history.replaceState({}, "我的邀请", "myInvite.html?type=2");
		if($(".rewardRecords dl").length == 1){
			getRecords(type);
		}
	}else if(type == 1){
		$("header li:eq(1)").addClass("curr").prev("li").removeClass("curr");
		$(".border li:eq(0)").addClass("currBorder").next().removeClass("currBorder");
		$(".inviteRecords").removeClass("hide").prev(".rewardRecords").addClass("hide");
		$(".rewardRecords dl:not(:first)").remove();
		history.replaceState({}, "我的邀请", "myInvite.html?type=1");
		if($(".inviteRecords dl").length == 1){
			getRecords(type);
		}
	}
	_currPage = 0;
	setTimeout(function(){
		myScroll.scrollTo(0, 0);
		myScroll.refresh();
	}, 200);
	
}
// 获取记录
function getRecords(type, page){
	Loading();
	if(!page){
		page = 0;
	}
	var rewardRecordUrl = urlLink + "/web/user_profile/reward_record",
		send = "?type=" + type + "&page=" + page;
	xmlHttpRequest(send, rewardRecordUrl, getRewardRecord, "get");
	function getRewardRecord(data){
	    var _datajson = JSON.parse(severResponse),
	    	_total = _datajson.data.int32_total,
			_data = _datajson.data.struct_invite_info;

	    switch (_datajson.code) {
	        case 0: //OK
	        	if(_total == 0){
	        		_pages = 0;
	        		$(".rewardRecords").addClass("hide");
	        		if(type == 1){
	            		$(".inviteNone").removeClass("hide").find("p").text("您还没有邀请记录哦~");
	        		}else if(type == 2){
	            		$(".inviteNone").removeClass("hide").find("p").text("您还没有奖励记录哦~");
	        		}
	        	}else if(_total > 0){
	        		$(".inviteNone").addClass("hide");
	        		_pages = Math.floor(_total / 10);
					$.each(_data, function(i,elem){
						var $rRecord = $(".rewardRecords dl:first").clone(true).removeClass("hide");
						$rRecord.find("#phone").text(elem.string_phone);
						$rRecord.find("#time").text(elem.string_date);
						$rRecord.find("#reward").text(elem.string_value);
						if(type == 1){
							$rRecord.find("#unit").text("积分");
							$(".inviteRecords").append($rRecord);
						}else if(type == 2){
							$(".rewardRecords").append($rRecord);
						}
					});
					setTimeout(function(){
						myScroll.refresh();
					}, 200);					
				}						
	        	LoadingOver();
	            break;
	        case -10004:
	        case -10003:
	        	LoadingOver();
	            session_expired(_datajson.msg);
	            break;
	        case 404:
	        case -10002:
	        	LoadingOver();
	            logout();
	            break;
	        default:
	        	LoadingOver();
	            top_meassage(_datajson.msg);
	            show_topmessage();
	            break;
		}
	}
}












