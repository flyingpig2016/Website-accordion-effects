window.onload = function () {
	var sm = $("#sm");
	var lis = sm.find("li");
	var totalW = sm.width();
	var imgW = 400;
	var len = lis.size();
	var otherW = Math.floor((totalW - imgW) / (len - 1));
	var shareW = Math.floor(totalW / len);
	lis.width(otherW);
	lis.eq(0).animate({
		width: imgW
	});

	var timer1, timer2;
	lis.on("mouseover", function () {
			clearInterval(timer1);
			clearInterval(timer2);
			timer1 = setInterval(() => {
				var currentW = $(this).width();
				if (currentW < 400) {
					var otherTotalW = 0;
					lis.each((index, item) => {
						if (item !== this) {
							var ow = $(item).width(),
								speed = 0;
							if (ow > otherW) {
								speed = Math.floor((ow - otherW) / 6);
								speed = speed > 0 ? speed : 1;
								var otw = ow - speed;
								$(item).width(otw)
							}
							//局部变量在 each 方法中实现累加 达到6张图片减小宽度的总和
							otherTotalW += ow - speed;
						}
					})
					var w = totalW - otherTotalW;
					if (w > imgW) w = imgW;
					$(this).css({
						width: w
					})
				} else {
					clearInterval(timer1);
					clearInterval(timer2);
				}
			}, 30)
		})
		.on("mouseout", function () {
			clearInterval(timer1);
			clearInterval(timer2);
			timer2 = setInterval(() => {
				var currentW = $(this).width();
				if (currentW > shareW) {
					var otherTotalW = 0;
					lis.each((index, item) => {
						if (item != this) {
							var ow = $(item).width(),
								speed = 0;
							if (ow < shareW) {
								speed = Math.floor((shareW - ow) / 6);
								speed = speed > 0 ? speed : 1;
								$(item).width(ow + speed);
							}
							otherTotalW += ow + speed;
						}
					});
					var w = totalW - otherTotalW;
					$(this).width(w)
				} else {
					clearInterval(timer1);
					clearInterval(timer2);
				}
			}, 30)
		})
}