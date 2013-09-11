jQuery(document).ready(function(){
	
	var register = new registerPage();
	register.init();
	
	jQuery('#register-btn')
	.mouseenter(function(){
		jQuery(this).addClass('btn-info');
	})
	.mouseleave(function(){
		jQuery(this).removeClass('btn-info');
	})
	.click(register.registerText);
	
});

registerPage = function () {
    'use strict';
};

registerPage.prototype = {
				
		init: function(){
		},
		
		registerText:function(event){
			
			var textMod = ccmf.Text.create();
			var dataMod = ccmf.Data.create(); 
			
			var registerText = jQuery('#register-area > textarea').val();
			var registeringTextShingles = textMod.removedStopWordShingles(registerText,9);
			var registerShinglesFing = textMod.shinglesFingerprintConv(registeringTextShingles);
			
			/* Extract the Signature */
			var signature = [];
			signature[0] = registerShinglesFing; 
			var minHashSignature = textMod.minHashSignaturesGen(signature);
			
			/* Register the Signature into the Registry*/
			
			dataMod.storeLsh(minHashSignature,
							 function(error){
								if(error===null){
									jQuery('#result > span').text('Text Registered');
								}
								else{
									jQuery('#result > span').text('Register Failed');
								}
							}
							,
							{
							 author:
								{
									first:local_data.first,
									last:local_data.last,
									email:local_data.email
								}
						    }
			);
		}
};