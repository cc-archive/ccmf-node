/**
 * Videos Route
 */

module.exports = function(app){
	
	app.get('/videos/doc',function(req,res){
		res.render('videos/doc',{title:'Videos API Documentation'});
	});
	
};