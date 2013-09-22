/**
 *  Users Routes
 */

/**
 *  Insert require module
 */
var Firebase = require('firebase'),
	Crypto = require('crypto');

function escapeEmailAddress(email) {
	  if (!email) return false;
	  
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
		
		var md5sum = Crypto.createHash('md5');
		
		/* Form Submitted from Login Page*/
		var email = req.body.user.email,
		pw = req.body.user.pw;
		
		var rootRef = new Firebase(app.get('firebase ref'));
		var usersRef = rootRef.child('users');
		
		var emailEscaped = escapeEmailAddress(email);
		var userEmailRef = usersRef.child(emailEscaped);
		
		userEmailRef.once('value',function(snapshot){
			user = snapshot.val();
			
			if(email && user.password==md5sum.update(pw).digest('hex')){
				
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
		//Render the signup page
		res.render('users/signup',{
									title:"Sign Up"
								  }
		);
	});
	
	app.post('/users/signup',function(req,res){
			
		var md5sum = Crypto.createHash('md5');
		
		/* Obtain the form data */ 
		var firstName = req.body.user.first,
		lastName = req.body.user.last,
		email = req.body.user.email,
		pw = md5sum.update(req.body.user.pw).digest('hex');

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
		},
		function(error){

			if(error){
				
				
				
			}else{
				 req.session.user = new Object;
				 req.session.user['email'] = email;
				 req.session.user['first'] = firstName;
				 req.session.user['last'] = lastName;
				 
				 res.redirect('/');
			}
		});
	});
	
	/* Profile */
	app.get('/users/profile',function(req,res){
		
		var rootRef = new Firebase(app.get('firebase ref'));
		var usersRef = rootRef.child('users');
		var escapedEmail = escapeEmailAddress(res.locals.user.email);
		var author = usersRef.child(escapedEmail);
		
		author.once('value',function(snapshot){
			
			foundUser = snapshot.val();
			
			var userSignatureSet = foundUser.works;
			
			res.render('users/profile',{title:"Profile",signatures:userSignatureSet});
		});
		
	});
};
