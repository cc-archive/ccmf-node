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
	app.set('layout',__dirname+'/views/templates/layout')
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);											
	app.use(express.static('public'));		
	console.log("static folder "+ __dirname +"/public/ loaded");
});

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler({dumpExceptions:true,showStack:true}));
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

// 404 - Catch all unrouted request
app.use(function(req, res, next){
	  res.send(404, 'Resource does not exist.');
});

/* Create Server */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on http://127.0.0.1:' + app.get('port'));
});
