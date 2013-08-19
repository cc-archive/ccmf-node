/**
 *  Users Routes
 */

/**
 *  Insert require module
 */
var Firebase = require('firebase');

 

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
		//Render the Login Page
		res.render('users/login',{title:"Login"});
	});
	
	app.post('/users/login',function(req,res){
		/* Form Submitted from Login Page*/
		var email = req.body.user.email,
		pw = req.body.user.pw;
		
		var rootRef = new Firebase(app.get('firebase ref'));
		var usersRef = rootRef.child('users');
		
		var emailEscaped = escapeEmailAddress(email);
		var userEmailRef = usersRef.child(emailEscaped);
		
		userEmailRef.once('value',function(snapshot){
			user = snapshot.val();
			
			if(email && user.password==pw){
				
				 req.session.user = new Object;
				 req.session.user['email'] = email;
				 req.session.user['first'] = user.name.first;
				 req.session.user['last'] = user.name.last;
				 
				 res.redirect('/');
			}else{
				 res.render('./users/login',{title:"Login",user:req.body.user});
			}
		});
	});
	
	app.post('/users/logout',function(req,res){
		delete req.session.user;
		res.redirect('/');
	});
	
	/* Sign Up 	*/
	
	app.get('/users/signup',function(req,res){
		res.render('users/signup',{
									title:"Sign Up"
								  }
		);
	});
	
	app.post('/users/signup',function(req,res){
		
		var render = function(htmlVar) {
		    res.render('./users/signup', 
		    		{
		    			title	:"Sign Up",
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
		
		/* Data Structure for User*/
		newUser.set({
			name:{
				first:firstName,
				last:lastName
			},
			password:pw,
			work:null,
		});
		
		render({
			flash	:"Thank you for registering",
			user	:req.body.user
		});
	});
};
