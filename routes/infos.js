/* Information Route */

module.exports = function(app){
	
	app.get('/infos/installation',function(req,res){
		  res.render('infos/installation', { title: 'Installation' });
	});
	
	app.get('/infos/searchs',function(req,res){
		  res.render('infos/searchs', { title: 'Search Result' });
	});
	
	app.get('/infos/about',function(req,res){
		  res.render('infos/about', { title: 'About' });
	});
};