/* Required Modules*/
var ccmf = require('ccmf'),
	fs = require('fs');

/* Open the file */

fs.readFile('/Users/ethanlim/Downloads/reuters/reut2-000.sgm',function read(err,data){
	var content = data;
	process(content);
});

function process(content){
	var textContent = content.toString(),
		bodyTextArr = null,
		bodyIdx = 0,
		max = 0,
		pattern = /<DATE>(.*?)<\/DATE>/;
	
	bodyTextArr = textContent.match(/<\s*BODY[^>]*>([^<]*)<\s*\/\s*BODY\s*>/g);
	
	
	if(bodyTextArr!==null){
		for(bodyIdx=0,max=bodyTextArr.length;bodyIdx<max;bodyIdx++){
			console.log(bodyIdx);
			console.log(bodyTextArr[bodyIdx].replace(/(<([^>]+)>)/ig,""));
		}
	}else{
		console.log("No String Found");
	}
}