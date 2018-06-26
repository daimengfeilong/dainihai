function prevent_default(e) {
	e.preventDefault();
}

function disable_scroll() {
	$(document).on('touchmove', prevent_default);
}

function enable_scroll() {
	$(document).unbind('touchmove', prevent_default)
}


function movej() {
	var x;
	$('.banklist_first').on('touchstart', function(e) {
//        $(this).find()
//        if(){
//
//        }


			//$(e.currentTarget).addClass('open')
			x = e.originalEvent.targetTouches[0].pageX // anchor point
		}).on('touchmove', function(e) {
			var change = e.originalEvent.targetTouches[0].pageX - x
			e.currentTarget.style.right = '0px';
			change = Math.min(Math.max(-230, change), 230) // restrict to -100px left, 0px right

			if (change < 0) {
				e.currentTarget.style.left = change + 'px';
				disable_scroll();
			} else {
				e.currentTarget.style.left = '0px';
			}
		}).on('touchend', function(e) {
			var left = parseInt(e.currentTarget.style.left)
			var new_left;
			if (left < -35) {
				new_left = '-230px'
			} else {
				new_left = '0px'
			}

			$(e.currentTarget).animate({
				left: new_left
			}, 200);
			enable_scroll();
		});

	$(".banklist_first").click(function() {
		if ($(this).offset().left < 1) {
			$(this).animate({
				left: '0px'
			}, 200);
		} else {
			$(this).animate({
				left: '-175px'
			}, 200);
		}
	})
}