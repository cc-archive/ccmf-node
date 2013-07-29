/* Required Modules*/
var ccmf = require('ccmf'),
	fs = require('fs'),
	firebase = require('firebase');

/* Open the file */

fs.readFile('/Users/ethanlim/Downloads/reuters/reut2-000.sgm',function read(err,data){
	var content = data;
	process(content);
});

function process(content){
	var textContent = content.toString(),
		bodyTextArr = null,
		registeringText = '',
		bodyIdx = 0,
		max = 0,
	
	bodyTextArr  = textContent.match(/<\s*BODY[^>]*>([^<]*)<\s*\/\s*BODY\s*>/g);
	
	if(bodyTextArr!==null){
		for(bodyIdx=0,max=bodyTextArr.length;bodyIdx<max;bodyIdx++){
			registeringText = bodyTextArr[bodyIdx].replace(/(<([^>]+)>)/ig,"");
			
			var textMod = ccmf.ccmf.Text.create();
			var dataMod = ccmf.ccmf.Data.create();
			
			var registeringTextShingles = textMod.removedStopWordShingles(registeringText,9);
			
			var registerShinglesFing = textMod.shinglesFingerprintConv(registeringTextShingles);
			
			/* Extract the Signature */
			var signature = [];
			signature[0] = registerShinglesFing; 
			var minHashSignature = textMod.minHashSignaturesGen(signature);
			
			/* Register the Signature into the Registry*/
			dataMod.storeLsh(minHashSignature);
		}
		
	}else{
		console.log("No String Found");
	}
}