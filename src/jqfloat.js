/*
* jqFloat.js - jQuery plugin
* A Floating Effect with jQuery!
*
* Name:			jqFloat.js
* Author:		Kenny Ooi - http://www.inwebson.com
* Date:			December 6, 2012		
* Version:		1.1
* Example:		http://www.inwebson.com/demo/jqfloat/
*	
*/

(function($) {
	
	//plugin methods
	var methods = {
		
		init : function(options) { 
			return this.each(function() {
				$(this).data('jSetting', $.extend({}, $.fn.jqFloat.defaults, options));
				$(this).data('jDefined', true);
				var wrapper = $('<div/>').css({
					'width': $(this).outerWidth(true),
					'height': $(this).outerHeight(true),
					'z-index': $(this).css('zIndex'),
				});
				wrapper.css({
					'top': $(this).position().top,
					'left': $(this).position().left,
				});
			});
		},
		update : function(options) {
			$(this).data('jSetting', $.extend({}, $.fn.jqFloat.defaults, options));
		},
		play : function() { 	
			if(!$(this).data('jFloating')) {
				$(this).data('jFloating', true);
			}
			floating(this);
		},
		stop : function() {		
			this.data('jFloating', false);
		}
	}
	
	var floating = function(obj) {
		var setting = $(obj).data('jSetting');
		var newX = Math.floor(Math.random()*setting.width) - setting.width/2;
		var newY = Math.floor(Math.random()*setting.height) - setting.height/2 - setting.minHeight;
		var spd = Math.floor(Math.random()*setting.speed) + setting.speed/2;
		
		$(obj).stop().animate({
			'top': newY,
			'left': newX
		}, spd, function() {
			if ($(this).data('jFloating'))
				floating(this);
			else 
				$(this).animate({
					'top': 0,
					'left': 0
				}, spd/2);
		});
	}
	
	$.fn.jqFloat = function(method, options) {
		
		var element = $(this);
		
		if ( methods[method] ) {
			
			if(element.data('jDefined')) {
				//reset settings
				if (options && typeof options === 'object')
					methods.update.apply(this, Array.prototype.slice.call( arguments, 1 ));
			}
			else
				methods.init.apply(this, Array.prototype.slice.call( arguments, 1 ));
			
			methods[method].apply(this);
			
		} else if ( typeof method === 'object' || !method ) {
			if(element.data('jDefined')) {
				if(method)
					methods.update.apply(this, arguments);
			}		
			else 
				methods.init.apply(this, arguments);	

			methods.play.apply(this);
		} else 
			$.error( 'Method ' +  method + ' does not exist!' );
		
		return this;
	}
	
	$.fn.jqFloat.defaults = {
		width: 100,
		height: 100,
		speed: 1000,
		minHeight: 0
	}
	
})(jQuery);