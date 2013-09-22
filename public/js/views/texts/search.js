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
		
		obj : this,
		
		init: function(){
		},
		
		clearResultTable : function(){
			jQuery('#result-area > table tbody').empty();
		},
		
		callback :function(results){
			
			if(results.count!=0){
			
				var resultSets = results['sets'],
					metadata = null,
					author = null,
					set = null;
				
				for(var result=0;result<results.count;result++){
					
					set = JSON.parse(resultSets[result]);
					
					metadata = set['metadata'];
					author = metadata['author'];
					
					searchSigPage.prototype.addNewSigToTable(result, set['sig'],author['first'],author['last'], author['email']);
				}
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
			
			dataMod.conductLsh(minHashSignature,obj.callback);
		},

		addNewSigToTable: function(sigNo,signature,author_first,author_last,author_email){
			jQuery('#result-area > table tbody').append(
					"<tr><td>"+sigNo+"</td>"+
					"<td>"+signature.toString().substring(0,30)+ "...</td>" +
					"<td>"+author_first+' '+author_last+"</td>"+
					"<td>"+author_email+"</td></tr>");
		}
};