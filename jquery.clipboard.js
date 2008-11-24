/**
 * Clipboard
 * A jQuery plugin for implementing "click to clipboard" functionality
 * 
 * Version 0.5
 * Author: Chris Patterson
 *
 * License: GPL 3 http://www.gnu.org/licenses/gpl-3.0.html
 * 
 * Inspired by:
 * ClipboardCopy (http://www.jeffothy.com/weblog/clipboard-copy/)
 * Skitch (http://skitch.com)
 * 
 * NOTE: this plugin depends upon jquery.flash.js
 *
 * ASSUMPTION: All elements which will have "click to clipboard" associated will need an id attribute
 * Additionally, all elements which will be the target for insertion will need an id attribute
 *
 * [TODO]
 * - consolidate current duped insert / timeout functions for the hasFlash / noFlash conditionals
 * - allow customization of the element wrapping the clipboardText
 * - (Possible) look at adding better noFlash clipboard support. Currently, we only support IE,
 * as Opera / Mozilla were behaving wonkily in early testing of createTextRange support.
 **/
(function($){
	$.fn.clickToClipboard = function(options) {
		
	var defaults = {
		fadeoutLength: 600,
		fadeoutTimer: 1000,
		clipboardText: 'Copied to Clipboard',
		clipboardTextTarget: 'field', /* Allowed values: "field", "label", "form" */
		clipboardTextInsert: 'after' /* Allowed values: "before" "after" */
	};
	
	var options = $.extend(defaults, options);
	var target = [];
		
		return this.each(function(intIndex) {
	
			var hasFlash = $(document).flash.hasFlash(7);

			if (options.clipboardTextTarget == "form") {
				target[intIndex] = $("form:has(#" + this.id +")");
			} else if (options.clipboardTextTarget == "label") {
				target[intIndex] = $("label[for=" + this.id +"]");
			} else {
				target[intIndex] = $(this);
			}
			obj = $(this);

			var insertText = '<span class="copied-to-clipboard" style="opacity: 0.999999; display: none;">' + options.clipboardText + '</span>';
			(options.clipboardTextInsert == "before") ? $(insertText).insertBefore(target[intIndex]) : $(insertText).insertAfter(target[intIndex]);
			if (hasFlash) {
				obj.click(function(event) {
					$('.flashcopier').flash({ src: '_clipboard.swf', width: 0, height: 0, flashvars: {clipboard: obj.val()} }, { update: false });
					(options.clipboardTextInsert == "before") ? target[intIndex].prev('.copied-to-clipboard:first').show() :	target[intIndex].next('.copied-to-clipboard:first').show();		
					
					(options.clipboardTextInsert == "before") ? setTimeout("$('#" + target[intIndex].attr("id")+"').prev('.copied-to-clipboard:first').fadeOut(" + options.fadeoutLength + ")", options.fadeoutTimer) : setTimeout("$('#" + target[intIndex].attr("id")+"').next('.copied-to-clipboard:first').fadeOut(" + options.fadeoutLength + ")", options.fadeoutTimer);
					
					obj.blur();
				});
				if(!($('div.flashcopier').length > 0)) { $('<div class="flashcopier">').appendTo('body');}
			} else if (window.clipboardData && sourceElement.createTextRange()) {
				obj.focus(function(event) {
					window.clipboardData.setData("Text",sourceElement.value);

					(options.clipboardTextInsert == "before") ? target[intIndex].prev('.copied-to-clipboard:first').show() :	target[intIndex].next('.copied-to-clipboard:first').show();		
					
					(options.clipboardTextInsert == "before") ? setTimeout("$('#" + target[intIndex].attr("id")+"').prev('.copied-to-clipboard:first').fadeOut(" + options.fadeoutLength + ")", options.fadeoutTimer) : setTimeout("$('#" + target[intIndex].attr("id")+"').next('.copied-to-clipboard:first').fadeOut(" + options.fadeoutLength + ")", options.fadeoutTimer);
					
					obj.blur();
				});	 
			}
		});
	};

})(jQuery);
