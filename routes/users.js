/**
 *  Users Routes
 */

/**
 *  Insert require module
 */
var Firebase = require('firebase');

var title = "Sign Up"

function escapeEmailAddress(email) {
	  if (!email) return false
	  
	  var replaceDotWith = '::';
	  
	  // Replace '.' (not allowed in a Firebase key) with ','
	  email = email.toLowerCase();
	  email = email.replace(/\./g, replaceDotWith);
	  return email;
}

module.exports = function(app){
	
	/* Login 	*/
	
	app.get('/users/login',function(req,res){
		res.render('users/login',{title:title});
	});
	
	app.post('/users/login',function(req,res){
		
		var email = req.body.user.email,
		pw = req.body.user.pw;
		
		var rootRef = new Firebase(app.get('firebase ref'));
		var usersRef = rootRef.child('users');
		
		var emailEscaped = escapeEmailAddress(email);
		var userEmailRef = usersRef.child(emailEscaped);
		
		userEmailRef.once('value',function(snapshot){
			user = snapshot.val();
			
			if(user.password==pw){
				 res.cookie('ccmf.auth',email);
				 
				 res.redirect('/');
			}else{
				 res.render('./users/login',{title:title,user:req.body.user});
			}
		});
	});
	
	/* Logout */
	
	app.post('/users/logout',function(req,res){
		delete req.session.user_id;
		res.redirect('/');
	});
	
	/* Sign Up 	*/
	
	app.get('/users/signup',function(req,res){
		res.render('users/signup',{
									title:title 
								  }
		);
	});
	
	app.post('/users/signup',function(req,res){
		
		var render = function(htmlVar) {
		    res.render('./users/signup', 
		    		{
		    			title	:title,
						flash	:htmlVar.flash,
					    user	:htmlVar.user
		    		}		
		    );
		};
		
		/* Obtain the form data */ 
		var firstName = req.body.user.first,
		lastName = req.body.user.last,
		email = req.body.user.email,
		pw = req.body.user.pw;
		
		/* Save into Firebase */
		var rootRef = new Firebase(app.get('firebase ref'));
		var usersRef = rootRef.child('users');
		var newUser = usersRef.child(escapeEmailAddress(email));
		
		newUser.set({
			name:{
				first:firstName,
				last:lastName
			},
			password:pw
		});
		
		render({
			flash	:"Thank you for registering",
			user	:req.body.user
		});
	});
};
