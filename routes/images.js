/**
 * Images Route
 */

module.exports = function(app){
	
	app.get('/images/doc',function(req,res){
		res.render('images/doc',{title:'Images API Documentation'});
	});
	
};