$(document).ready(function(){
	$(".prodd_skuli_right_ul").find("li").bind(touchstart,function(){	
		$(".prodd_skuli_right_ul").find("li").removeClass("active");
		$(this).addClass("active");
		var zval=$(this).attr("alt");
		$(".fapiao_div").hide();
		$(".fapiao_div"+zval).show();
	});
});


function ReturnPage(name1,name2)
{
	$("."+name1).hide();
	$("."+name2).show();
}
