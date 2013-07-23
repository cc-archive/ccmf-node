/**
 * Text Route
 */

module.exports = function(app){
	
	app.get('/texts',function(req,res){
		res.render('texts/index',{title:'Text Functionalities'});
	});
	
	app.get('/texts/compare',function(req,res){
		res.render('texts/compare',{title:'Compare Two Textual Contents'});
	});
};