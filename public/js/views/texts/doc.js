jQuery(document).ready(function(){
	
	var documentation = new documentationPage();
	
	documentation.init();
});

documentationPage = function () {
    'use strict';
};

documentationPage.prototype = {
	init 	: function(){
		var storedHash = window.location.hash;
		var documentationPage = this;
		window.setInterval(function () {
		    if (window.location.hash != storedHash) {
		        storedHash = window.location.hash;
		        documentationPage.updateSideNavBar(storedHash);
		    }
		}, 100);
	},
	
	updateSideNavBar : function(anchorHash){
		jQuery('#textDocumentationNav > ul > li').removeClass();
		jQuery('a[href=\''+anchorHash+'\']').parent().addClass('active');
	}
};