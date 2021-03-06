// all component files should contain one main function named after the file name for easy access
// all files should expose an init function, and scroll, resize, or load function if needed.

//  **************************
//  **
//  **  COMPONENT ARTICLE HOVER
//  **
//  **************************

// Offset article content based on cursor position

var aaffOnHover = function aaffOnHover(){
	
	var $articles;
	var interval;
	var $mouseHoverMedia = false;
	var $mouseHoverText = false;
	var offsetX;
	var offsetY;
	var initX = false;
	var initY = false;
	var prevOffsetX;
	var prevOffsetY;
	var init = function init(){
		
		if(aaffIsTouch)
			return false;
		
		$articles = $('article');
		
		$articles.off('mouseenter mouseleave');
		
		$articles.hover(onHover, function(e){
			e.stopPropagation();
			if($mouseHoverMedia)
				$mouseHoverMedia.attr('style','');
			if($mouseHoverText)
				$mouseHoverText.attr('style','');
			$(e.currentTarget).off('mousemove');
			if(interval)
			
				clearTimeout(interval);
			timeout = $mouseHoverMedia = initX = initY = offsetX = offsetY = prevOffsetX = prevOffsetY = $mouseHoverText = false;
		});
	};
	
	var stop = function stop(){
		$articles.off('mousemove mouseenter mouseleave');
		if(interval)
			clearTimeout(interval);
		timeout = $mouseHoverMedia = initX = initY = offsetX = offsetY = prevOffsetX = prevOffsetY = $mouseHoverText = false;
	};
	
	var onHover = function onHover(e){
		$(e.currentTarget).on('mousemove',onMouseMove);
		if(interval)
			clearInterval(interval);
		interval = setInterval(position3dFunction, 100);
	};
	
	
	var onMouseMove = function onMouseMove(e){
		if(!$mouseHoverMedia || !$mouseHoverText) {
			var $current = $(e.currentTarget);
			 $mouseHoverMedia = ($current.find('.media-wrapper'));
			 $mouseHoverText = ($current.find('.text'));
			position3dFunction();
		}
		offsetX = e.offsetX;
		offsetY = e.offsetY;
		if(!initY || !initX) {
			initY = offsetY;
			initX = offsetX;
		}
	};
	
	var position3dFunction = function position3dFunction(){
		
		if(prevOffsetX === offsetX && prevOffsetY === offsetY)
			return false;

		prevOffsetX = offsetX;
		prevOffsetY = offsetY;
			
		cx = $mouseHoverMedia.width() / 2;
		cy = $mouseHoverMedia.height() / 2;
		dx = offsetX - initX;
		dy = offsetY - initY;
//		d2x = offsetX - cx;
//		d2y = offsetY - cy;
		
		
		tiltx = Math.round( (dy / cy) * 100 ) / 100;
		tilty = Math.round( (dx / cx) * 100 ) / 100;

		 //radius = Math.sqrt(Math.pow(tilt2x,2) + Math.pow(tilt2y,2));
		 //degree = Math.tan(d2y/d2x);

		// var dTransform = 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)';
		// var dTransformText = 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + (degree*0.75) + 'deg)';

		var translateTransform = 'translateY(' + ( (tiltx) * 10) + 'px) translateX(' + ( (tilty) * 10) + 'px)';
		var translateTransformText = 'translateY(calc(-50% + ' + ( (tiltx) * 30) + 'px)) translateX(' + ( (tilty) * 30) + 'px)';

		$mouseHoverMedia.css({
			'transform':translateTransform,
			'-webkit-transform':translateTransform,
			'-moz-transform':translateTransform
		});
		$mouseHoverText.css({
			'transform':translateTransformText,
			'-webkit-transform': translateTransformText,
			'-moz-transform': translateTransformText
		});

	};
	
	return {
		init: init,
		stop: stop
	};
	
}();
