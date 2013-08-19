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
				var foundSignatureSet = snapshot.val(),
				keys = Object.keys(foundSignatureSet),
				key = null;
				
				searchSigPage.totalSignatureFound++;
				console.log('Found Signature! Total Signature Found: '+searchSigPage.totalSignatureFound); 
				
				for(key=0;key<keys.length;key++){
					if(searchSigPage.signatureSetsFound.indexOf(foundSignatureSet[keys[key]])==-1){

						searchSigPage.signatureSetsFound.push(foundSignatureSet[keys[key]]);
						
						signatureInfo = JSON.parse(foundSignatureSet[keys[key]]);
						
						searchSigPage.prototype.popTable(searchSigPage.totalSignatureFound,signatureInfo);
					}
				} 
				
			}
		},
		
		searchText:function(event){
			
			var obj = event.data;
			
			var textToBeSearch = jQuery('#search-area > textarea').val();
			obj.clearResultTable();
			console.log("Table Cleared");
			
			var textMod = ccmf.Text.create();
			var dataMod = ccmf.Data.create();
			
			var searchTextShingles = textMod.removedStopWordShingles(textToBeSearch,9);
			var searchShinglesFing = textMod.shinglesFingerprintConv(searchTextShingles);
			var signature = [];
			signature[0] = searchShinglesFing;
			
			var minHashSignature = textMod.minHashSignaturesGen(signature); 
			
			searchSigPage.totalSignatureFound = 0;
			searchSigPage.signatureSetsFound = [];
			dataMod.conductLsh(minHashSignature,obj.callback);
		},

		popTable: function(sigNo,signatureInfo){
			jQuery('#result-area > table tbody').append("<tr><td>"+sigNo+"<td>" + signatureInfo['sig'][0] + "...</td>" +
					"<td>"+signatureInfo['metadata']['author']['first']+' '+signatureInfo['metadata']['author']['last']+
					"<td>"+signatureInfo['metadata']['author']['email']+"</td>"+"</tr>");
		}
};