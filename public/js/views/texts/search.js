jQuery(document).ready(function(){
	
	var search = new searchSigPage();
	search.init();
	
	jQuery('#search-btn')
	.mouseenter(function(){
		jQuery(this).addClass('btn-info');
	})
	.mouseleave(function(){
		jQuery(this).removeClass('btn-info');
	})
	.click(search,search.searchText);
});

searchSigPage = function () {
    'use strict';
};

searchSigPage.prototype = {
		
		signatureSetsFound : null,
		totalSignatureFound: 0,
		
		init: function(){
		},
		
		clearResultTable : function(){
			jQuery('#result-area > table tbody').empty();
		},
		
		callback :function(snapshot){
		
			/* Search through each band */
			if(snapshot.val()!=null){ 
				 /* If found in current band */
				var foundSignatureSet = snapshot.val(); 
				
			}
		},
		
		
		searchText:function(event){
			
			var obj = event.data;
			
			var textToBeSearch = jQuery('#search-area > textarea').val();
			obj.clearResultTable();
			
			var textMod = ccmf.Text.create();
			var dataMod = ccmf.Data.create();
			
			var searchTextShingles = textMod.removedStopWordShingles(textToBeSearch,9);
			var searchShinglesFing = textMod.shinglesFingerprintConv(searchTextShingles);
			var signature = [];
			signature[0] = searchShinglesFing;
			
			var minHashSignature = textMod.minHashSignaturesGen(signature); 
			
			obj.totalSignatureFound = 0;
			obj.signatureSetsFound = [];
			var searchResults = dataMod.conductLsh(minHashSignature,obj.callback);
		}
};