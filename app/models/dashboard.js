var x              = require('x');
var WidgetInstance = require('widget_instance');
var Widget         = require('widget');
var fs             = require('fs');

var Dashboard = function(widgetsPath, title) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;

  if (typeof(widgetsPath) === 'undefined') {
    throw "Widgets path required!";
  }
  self.widgetsPath = widgetsPath;
  
  self.properties = {
    title:           title || "My Project",
    widgetInstances: [],
    widgets:         []
  };

  self.init();
  //if (typeof(callback) !== 'undefined') { callback(); }
};

Dashboard.prototype = {
  get title()                          { return this.properties["title"]; },
  set title(title)                     { this.properties["title"] = title; },

  get widgets()                        { return this.properties["widgets"]; },

  get widgetInstances()                { return this.properties["widgetInstances"]; },
  // set widgetInstances(widgetInstances) { this.properties["widgetInstances"] = widgetInstances; },
};

/** @protected */
Dashboard.prototype.init = function() {
  var self = this;
  self.loadWidgets();
}

/** @protected */
Dashboard.prototype.loadWidgets = function() {
  var self = this;
  self.properties["widgets"] = [];
  var files = fs.readdirSync(self.pathToWidgets(true));
  for (var i in files) {
    if (fs.statSync(self.pathToWidgets()+files[i]).isDirectory()) {
      var widgetImplementation = x.require(self.pathToWidgets()+files[i]);
      self.properties["widgets"].push(widgetImplementation);
    }
  }
}

/** @protected */
Dashboard.prototype.pathToWidgets = function(noTrailingSlash) {
  var self = this;
  return noTrailingSlash ? self.widgetsPath : self.widgetsPath+'/';
}

module.exports = Dashboard;
