/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
require.paths.unshift('./domain');

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
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
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

//////////////////////// DDD-experimenting //////////////////////////

var DashboardFactory = require('factories/dashboard_factory');
var Widget           = require('entities/widget');

var dashboard = DashboardFactory.build("Hey guys!");
// console.log(dashboard);
// var pp = function(didSomething) { console.log(didSomething ? "Added!" : "Skipped") };
// var px = function(didSomething) { console.log(didSomething ? "Removed!" : "Skipped") };
// var wi = new WidgetInstance();
// console.log(
//   dashboard.
//     addWidgetInstance(new WidgetInstance()).
//     addWidgetInstance(new WidgetInstance()).
//     addWidgetInstance(new WidgetInstance()).
//     addWidgetInstance(wi, pp).
//     addWidgetInstance(wi, pp).
//     addWidgetInstance(wi, pp).
//     addWidgetInstance(wi, pp).
//     removeWidgetInstance(wi, px).
//     removeWidgetInstance(wi, px).
//     widgetInstances
// );

var widget = new Widget();
var widgetInstances = [];
var cacheResultingInstance = function(widgetInstance) {
  widgetInstances.push(widgetInstance);
};
dashboard.activateWidget(widget, cacheResultingInstance).
  activateWidget(widget, cacheResultingInstance).
  activateWidget(widget, cacheResultingInstance).
  activateWidget(widget, cacheResultingInstance).
  activateWidget(widget, cacheResultingInstance);
console.log(widgetInstances);

//ActivateWidgetInstanceService(widget, dashboard);

//WidgetInstanceFactory.build(widget, dashboard);
