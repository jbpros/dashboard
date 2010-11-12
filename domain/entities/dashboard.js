var foundations    = require('foundations');
var WidgetInstance = require('entities/widget_instance');
var Widget         = require('entities/widget');

var Dashboard = function(title) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;

  self.properties = {
    title:           title,
    widgetInstances: []
  };
};

Dashboard.prototype = {
  __proto__: foundations.Entity.prototype,

  get title()                          { return this.properties["title"]; },
  set title(title)                     { this.properties["title"] = title; },

  get widgetInstances()                { return this.properties["widgetInstances"]; },
  //set widgetInstances(widgetInstances) { this.properties["widgetInstances"] = widgetInstances; }

  activateWidget: function(widgetId, callback) {
    var self = this;
    var widgetInstance = new WidgetInstance(widgetId);
    self.properties["widgetInstances"].push(widgetInstance);
    callback && callback(widgetInstance);
    return self;
  },

  removeWidgetInstance: function(widgetInstance, callback) {
    var self = this;
    var index = self.properties["widgetInstances"].indexOf(widgetInstance);
    if (index != -1) {
      self.properties["widgetInstances"].splice(index, 1);
      callback && callback(true);
    } else {
      callback && callback(false);
    }
    return self;
  }
};

module.exports = Dashboard;
