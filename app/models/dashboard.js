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
};

Dashboard.prototype = {
  get title()                          { return this.properties["title"]; },
  set title(title)                     { this.properties["title"] = title; },

  get widgets()                        { return this.properties["widgets"]; },

  get widgetInstances()                { return this.properties["widgetInstances"]; },
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
  var files = fs.readdirSync(self.pathToWidgets());
  for (var i in files) {
    if (fs.statSync(self.pathToWidgets(true)+files[i]).isDirectory()) {
      var widgetImplementation = x.require(self.pathToWidgets(true)+files[i]+'/widget');
      self.properties["widgets"].push(widgetImplementation);
    }
  }
}

/** @protected */
Dashboard.prototype.pathToWidgets = function(trailingSlash) {
  var self = this;
  var widgetsPath = fs.realpathSync(self.widgetsPath);
  if (trailingSlash)
    widgetsPath += '/';
  return widgetsPath;
}

module.exports = Dashboard;
