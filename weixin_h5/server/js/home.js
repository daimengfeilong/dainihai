$(function() {
	$.fn.fullpage({
		anchors: ['page1', 'page2', 'page3', 'page4'],
		menu: '#menu',
		afterRender: function() {
			$('.inner a').each(function() {
				var $rel = $(this).attr('rel');
				var $arr = $rel.split(',');
				$(this).animate({
					left: $arr[0] + 'px',
					top: $arr[1] + 'px'
				}, 500);
			});
		},
		afterLoad: function(anchorLink, index) {
			if (index == 1) {
				$("#menu").hide();
			}
			if (index == 2 || index == 3 || index == 4) {
				$("#menu").show();
				$('.inner').eq(index - 2).find('a').each(function() {
					var $rel = $(this).attr('rel');
					var $arr = $rel.split(',');
					$(this).animate({
						left: $arr[2] + 'px',
						top: $arr[3] + 'px'
					}, 500);
				});
			}
		},
		onLeave: function(index, direction) {
			if (index == 1) {
				$("#menu").hide();

			}
			if (index == 2 || index == 3 || index == 4) {
				$("#menu").show();
				$('.inner').eq(index - 2).find('a').each(function() {
					var $rel = $(this).attr('rel');
					var $arr = $rel.split(',');
					$(this).animate({
						left: $arr[0] + 'px',
						top: $arr[1] + 'px'
					}, 500);
				});
			}
		}
	});
	onlineserver();
	banner_active();
	SecondPage();
	tooptips();
	tooptip_active();
	ScreenWidth();
	btnFourPage();
});

function onlineserver() {
	$('.onlineserver').hover(function() {
		$(".onlineserver").css('right', '0');
	}, function() {
		$(".onlineserver").css('right', '-120px');
	});

}

function banner_active() {
	$(".banner_btn").hover(function() {
		$(this).addClass("banner_btnactive");

	}, function() {
		$(this).removeClass("banner_btnactive");
	});

}

function SecondPage() {
	$(".datalist").hover(function() {
		$(this).find(".datalists").hide();
		$(this).find(".datalisth").show();
	}, function() {
		$(this).find(".datalists").show();
		$(this).find(".datalisth").hide();
	});
}

function tooptips() {
	jQuery(document).ready(function() {
		// Tipso for Image
		jQuery('.img-tipso').tipso({
			useTitle: false,
			background: 'rgba(255,255,255,1)'
		});
	});
}

function tooptip_active() {
	$(".servertxt").hover(function() {
		$(this).addClass("servertxt_active");

	}, function() {
		$(this).removeClass("servertxt_active");
	});

}

function ScreenWidth() {
	var height = $(document).height();
	var width = $(document).width(); 
	if (width <= 1200) {
		$("#h_khd").attr("rel", "300,980,-186,-20");
		$("#h_shd").attr("rel", "1000,-3500,-186,288");
		$("#t_khd").attr("rel", "300,980,100,140");
		$("#t_shd").attr("rel", "1000,-3500,534,140");
	} else if (width >= 1280 && width <= 1366) {
		$("#h_khd").attr("rel", "300,980,-96,-20");
		$("#h_shd").attr("rel", "1000,-3500,-96,290");
		$("#t_khd").attr("rel", "300,980,200,140");
		$("#t_shd").attr("rel", "1000,-3500,704,140");
	} else if (width >= 1440 && width < 1600) {
		$("#h_khd").attr("rel", "300,980,-38,-30");
		$("#h_shd").attr("rel", "1000,-3500,-38,310");
		$("#t_khd").attr("rel", "300,980,250,140");
		$("#t_shd").attr("rel", "1000,-3500,754,140");
	} else if (width == 1600) {
		$("#h_khd").attr("rel", "300,980,0,-30");
		$("#h_shd").attr("rel", "1000,-3500,0,320");
		$("#t_khd").attr("rel", "300,980,350,140");
		$("#t_shd").attr("rel", "1000,-3500,854,140");
	} else if (width == 1680) {
		$("#h_khd").attr("rel", "300,980,0,30");
		$("#h_shd").attr("rel", "1000,-3500,0,400");
		$("#t_khd").attr("rel", "300,980,250,145");
		$("#t_shd").attr("rel", "1000,-3500,954,145");
	} else if (height < 770) {
		$("#h_khd").attr("rel", "300,980,0,-50");
		$("#h_shd").attr("rel", "1000,-3500,0,310");
		$("#t_khd").attr("rel", "300,980,326,40");
		$("#t_shd").attr("rel", "1000,-3500,990,40");
	} else if (height >= 770 && height <= 860) {
		$("#h_khd").attr("rel", "300,980,0,-15");
		$("#h_shd").attr("rel", "1000,-3500,0,331");
		$("#t_khd").attr("rel", "300,980,326,40");
		$("#t_shd").attr("rel", "1000,-3500,990,40");
	} else if (height == 3511) {
		$("#h_khd").attr("rel", "300,980,176,98");
		$("#h_shd").attr("rel", "1000,-3500,814,98");
		$("#t_khd").attr("rel", "300,980,176,98");
		$("#t_shd").attr("rel", "1000,-3500,814,98");
	} else if (height == 775) {
		$("#h_khd").attr("rel", "300,980,140,99");
		$("#h_shd").attr("rel", "1000,-3500,784,99");
		$("#t_khd").attr("rel", "300,980,140,99");
		$("#t_shd").attr("rel", "1000,-3500,784,99");
	}
}

function btnFourPage() {
	$(".us_left").hover(function() {
		$(".us_right").hide();
		$(".kf_khd").show();
		$(".tbnwebserver").show();
	}, function() {
		$(".us_right").show();
		$(".kf_khd").hide();
		$(".tbnwebserver").hide();
	});

	$(".us_right").hover(function() {
		$(".us_left").hide();
		$(".kf_shd").show();
		$(".tbnwebserver").show();
	}, function() {
		$(".us_left").show();
		$(".kf_shd").hide();
		$(".tbnwebserver").hide();
	});
}
/*banner swiper*/
$(function() {
	var li = $('#banner ul li')
	var i = 0;
	var time
		//定义执行的样式
	function anim() {
		li.eq(i).stop().animate({
			opacity: '1'
		}, 100).siblings().animate({
			opacity: '0'
		}, 10);
		$('#banner>ol>li').eq(i).addClass('foucs').siblings().removeClass('foucs');
	}
	window.onload = function() {
			anim()
			time = setInterval(autoPlay, 3000); //设置计时器赋予变量time		
			//自动生成圆点按钮
			var ol = $('#banner').append('<ol></ol>');
			//遍历添加li元素
			for (var x = 0; x < li.length; x++) {
				if (x == 0) {
					$('#banner>ol').append('<li class="foucs"></li>')
				} else {
					$('#banner>ol').append('<li></li>')
				}
			}
			//给予圆点点击事件，点击显示
			$('#banner>ol>li').click(function() {
				i = $(this).index();
				anim()
			})
		}
		//自动播放
	function autoPlay() {
		if (i < 3) {
			i++
			anim()
		} else {
			i = 0;
			anim()
		}
	}
	//鼠标经过停止播放
	$('#banner').mouseover(function() {
			clearInterval(time)
		})
		//鼠标离开自动播放
	$('#banner').mouseout(function() {
			time = setInterval(autoPlay, 6000); //设置计时器赋予变量time
		})
		/*	//增加左右按钮
		$('#banner').append('<a href="javascript:;" class="prev">&lt;</a>')
		$('#banner').append('<a href="javascript:;" class="next">></a>')
			//左按钮事件
		$('#banner .prev').click(function() {
				if (i < 1) {
					i = 2;
					anim()
				} else {
					i--
					anim();
				}
			})
			//右按钮事件
		$('#banner .next').click(function() {
			if (i < 2) {
				i++
				anim()
			} else {
				i = 0
				anim()
			}
		})*/
})