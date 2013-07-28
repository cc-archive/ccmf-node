jQuery(document).ready(function(){
	
	var compare = new comparePage();
	compare.init();
	
	
	/* Attach Event Handlers */
	jQuery('#compare-btn')
	.mouseenter(function(){
		jQuery(this).addClass('btn-info');
	})
	.mouseleave(function(){
		jQuery(this).removeClass('btn-info');
	})
	.click(compare.twoText);
	
});

comparePage = function () {
    'use strict';
};

comparePage.prototype = {
	
	init 	: function(){
		jQuery('#result > span').text('Similarity : ');
	},
	
	twoText : function(event){
		'use strict';
		var rawTextA = jQuery('#a-tb').val();
		var rawTextB = jQuery('#b-tb').val();
		var textMod = ccmf.Text.create();
		var textAShingles = textMod.removedStopWordShingles(rawTextA,9);
		var textBShingles = textMod.removedStopWordShingles(rawTextB,9);
		var shinglesFingerprint1stText = textMod.shinglesFingerprintConv(textAShingles);
		var shinglesFingerprint2ndText = textMod.shinglesFingerprintConv(textBShingles);
		var percentageDiff = textMod.compareTwoSignaturesPractical(shinglesFingerprint1stText,shinglesFingerprint2ndText);
		jQuery('#result > span').text('Similarity : ' +percentageDiff.toFixed(1)+'%'); 
	}
	
};