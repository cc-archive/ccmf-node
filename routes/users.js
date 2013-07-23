/**
 *  Users Routes
 */

module.exports = function(app){
	app.get('/users/:name',function(req,res){
		res.render('users/profile',{title:'User Profile'});
	});
};
