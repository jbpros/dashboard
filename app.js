/**
 * Module dependencies.
 */

var express = require('express');
var app = express.createServer();
require.paths.unshift('./app/models');

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.set('widgetsPath', './widgets');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('test', function(){
  app.set('widgetsPath', './test/assets/widgets');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.set('widgetsPath', './widgets');
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index.jade', {
    locals: {
        title: 'The Dashboard'
    }
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}

var Dashboard = require('dashboard');
var Widget    = require('widget');
var dashboard = new Dashboard(app.set('widgetsPath'));

module.exports = app;