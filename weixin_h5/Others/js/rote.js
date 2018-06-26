jQuery.fn.rotate = function(angle, whence) {
	var p = this.get(0);

	// we store the angle inside the image tag for persistence  
	if (!whence) {
		p.angle = ((p.angle == undefined ? 0 : p.angle) + angle) % 360;
	} else {
		p.angle = angle;
	}

	if (p.angle >= 0) {
		var rotation = Math.PI * p.angle / 180;
	} else {
		var rotation = Math.PI * (360 + p.angle) / 180;
	}
	var costheta = Math.round(Math.cos(rotation) * 1000) / 1000;
	var sintheta = Math.round(Math.sin(rotation) * 1000) / 1000;
	//alert(costheta+","+sintheta);  

	if (document.all && !window.opera) {
		var canvas = document.createElement('img');

		canvas.src = p.src;
		canvas.height = p.height;
		canvas.width = p.width;

		canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + costheta + ",M12=" + (-sintheta) + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')";
	} else {
		var canvas = document.createElement('canvas');
		if (!p.oImage) {
			canvas.oImage = new Image();
			canvas.oImage.src = p.src;
		} else {
			canvas.oImage = p.oImage;
		}
		console.log(canvas.oImage.src);
		canvas.style.width = canvas.width = Math.abs(costheta * canvas.oImage.width) + Math.abs(sintheta * canvas.oImage.height);
		canvas.style.height = canvas.height = Math.abs(costheta * canvas.oImage.height) + Math.abs(sintheta * canvas.oImage.width);

		var context = canvas.getContext('2d');
		context.save();
		if (rotation <= Math.PI / 2) {
			context.translate(sintheta * canvas.oImage.height, 0);
		} else if (rotation <= Math.PI) {
			context.translate(canvas.width, -costheta * canvas.oImage.height);
		} else if (rotation <= 1.5 * Math.PI) {
			context.translate(-costheta * canvas.oImage.width, canvas.height);
		} else {
			context.translate(0, -sintheta * canvas.oImage.width);
		}
		context.rotate(rotation);
		context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
		context.restore();
	}
	canvas.id = p.id;
	canvas.angle = p.angle;
	p.parentNode.replaceChild(canvas, p);
}

jQuery.fn.rotateRight = function(angle) {
	var rote = angle == undefined ? 90 : angle;
	var txt_rote = $("#txt_rote");
	var txt_roteval = parseInt(txt_rote.val());
	if (txt_roteval == 0) {
		txt_rote.val(rote);
	} else if (txt_roteval >= 270) {
		txt_rote.val("0");
	} else {
		txt_rote.val(txt_roteval + 90);
	}
	this.rotate(rote);
}

jQuery.fn.rotateLeft = function(angle) {
	var rote = angle == undefined ? -90 : -angle;
	var txt_rote = $("#txt_rote");
	var txt_roteval = parseInt(txt_rote.val()); 
	console.log(txt_roteval);
	if (txt_roteval == 0) {
		txt_rote.val(rote);
	} else if (-(txt_roteval) >= 270) {
		txt_rote.val("0");
	} else {
		txt_rote.val(txt_roteval- 90);
	}
	this.rotate(rote);
}