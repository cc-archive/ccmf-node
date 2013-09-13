/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// Configuration

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 80);
	app.set('env','development');
	app.set('views', __dirname + '/views');
	app.set('layout',__dirname + '/views/templates/layout');
	app.set('view engine', 'jade');
	app.set('firebase ref','https://ccmf.firebaseio.com/');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser('ccmf'));
	app.use(express.session({
				secret:'ccmf',
				maxAge:3600000
	}));
	app.use(function(req, res, next){
		//Initialise the local variable user for each view
	    res.locals.user = req.session.user;
	    next();
	});
	app.use(express.methodOverride());
	app.use(app.router);											
	app.use(express.static('public'));		
	console.log("Static Folder: "+ __dirname +"/public/ loaded");
	app.use(express.static(__dirname));		
	console.log("Static Folder: "+ __dirname +" loaded");
});

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler({
									dumpExceptions:true,
									showStack:true
								}));
}

// production only
if('production'==app.get('env')){
	app.use(express.errorHandler());
}

// Routing Table
require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/texts')(app);
require('./routes/images')(app);
require('./routes/videos')(app);
require('./routes/infos')(app);

// 404 - Catch all unrouted request
app.use(function(req, res, next){
	res.send(404, 'Resource does not exist.');
});

function loggedIn(req, res, next) {
    req.session.user!=null
        ? next()
        : res.redirect("/login?url="+req.url);
}

/* Create Server */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server listening on http://127.0.0.1:' + app.get('port'));
});
