/**
 * Text Route
 */

module.exports = function(app){
		
	app.get('/texts/doc',function(req,res){
		res.render('texts/doc',{title:'Text API Documentation'});
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
	
	app.get('/texts/performance',function(req,res){
		res.render('texts/performance',{title:'Performance - Text Module'});
	});

};