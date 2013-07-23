/**
 * Text Route
 */

module.exports = function(app){
	
	app.get('/texts',function(req,res){
		res.render('texts/index',{title:'Text Functionalities'});
	});
	
	app.get('/texts/compare',function(req,res){
		res.render('texts/compare',{title:'Compare Texts'});
	});
	
	app.get('/texts/register',function(req,res){
		res.render('texts/register',{title:'Register Texts'});
	});

	app.get('/texts/search',function(req,res){
		res.render('texts/search',{title:'Search Texts'});
	});

};