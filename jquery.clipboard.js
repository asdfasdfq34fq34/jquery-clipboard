/**
 * Clipboard
 * A jQuery plugin for implementing "click to clipboard" functionality
 * 
 * Version 0.1
 * Author: Chris Patterson
 *
 * License: GPL 3 http://www.gnu.org/licenses/gpl-3.0.html
 * 
 * Inspired by:
 * ClipboardCopy (http://www.jeffothy.com/weblog/clipboard-copy/)
 * 
 **/
(function($){
  $.fn.clickToClipboard = function(options) {
    
  var defaults = {
   fadeoutLength: 600,
   fadeoutTimer: 1000,
   clipboardText: "Copied to Clipboard"
  };
  
  var options = $.extend(defaults, options);
    
	  return this.each(function() {
	    var hasFlash = $(document).flash.hasFlash(7);
			obj = $(this);
	    $('<div class="copied-to-clipboard" style="opacity: 0.999999; display: none;">' + options.clipboardText + '</div>').insertAfter(obj);
			if (hasFlash) {
			  obj.click(function(event) {
					$('.flashcopier').flash({ src: '_clipboard.swf', width: 0, height: 0, flashvars: {clipboard: obj.value} }, { update: false });
		      obj.next('.copied-to-clipboard').show();
		      setTimeout("obj.next('.copied-to-clipboard').fadeOut(options.fadeoutLength)", options.fadeoutTimer);
		      obj.blur();
				});
				$('<div class="flashcopier">').appendTo('body');
			} else if (window.clipboardData && sourceElement.createTextRange()) {
			  obj.focus(function(event) {
				  window.clipboardData.setData("Text",sourceElement.value);
		      obj.next('.copied-to-clipboard').show();
		      setTimeout("obj.next('.copied-to-clipboard').fadeOut(options.fadeoutLength);", options.fadeoutTimer);
		      obj.blur();
				});  
			}
   		this.blur(function(event){
		    setTimeout("this.next('.copied-to-clipboard').fadeOut(options.fadeoutLength);", options.fadeoutTimer);
		  });
	  });
  };
})(jQuery);
