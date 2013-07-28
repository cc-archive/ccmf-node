/**
 *  Users Routes
 */

module.exports = function(app){
	app.get('/users/login',function(req,res){
		res.render('users/login',{title:'Login'});
	});
};
