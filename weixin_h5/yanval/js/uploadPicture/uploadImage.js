var rFilter = /^(image\/jpeg|image\/png)$/i;

function selectFileImage(fileObj) {
	var file = fileObj.files['0'];
	var Orientation = null;
	if (file) {
		console.log("正在上传,请稍后...");
		if (!rFilter.test(file.type)) {
			return;
		} else {
			if (navigator.userAgent.match(/iphone/i)) {
				console.log('iphone');
				EXIF.getData(file, function() {
					EXIF.getAllTags(this);
					Orientation = EXIF.getTag(this, 'Orientation');
				});

			} else if (navigator.userAgent.match(/Android/i)) {} else {
				EXIF.getData(file, function() {
					EXIF.getAllTags(this);
					Orientation = EXIF.getTag(this, 'Orientation');
				});
			}


			var oReader = new FileReader();
			oReader.onload = function(e) {
				var image = new Image();
				image.src = e.target.result;
				image.onload = function() {
					var expectWidth = this.naturalWidth;
					var expectHeight = this.naturalHeight;

					if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
						expectWidth = 800;
						expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
					} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
						expectHeight = 1200;
						expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
					}
					console.log(expectWidth + ',' + expectHeight);
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
					console.log(canvas.width + ',' + canvas.height);

					var base64 = null;
					var mpImg = new MegaPixImage(image);
					mpImg.render(canvas, {
						maxWidth: 800,
						maxHeight: 1200,
						quality: 0.8,
						orientation: Orientation
					});

					base64 = canvas.toDataURL("image/jpeg", 0.8);
					loadwsan_datapic(base64);
				};
			};
			oReader.readAsDataURL(file);
		}
	}
}