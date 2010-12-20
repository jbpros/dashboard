var WidgetInstance = require('widget_instance');
var Widget         = require('widget');
var fs             = require('fs');

var Dashboard = function(title) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;

  self.properties = {
    title:           title,
    widgetInstances: [],
    widgets:         []
  };
};

Dashboard.prototype = {
  get title()                          { return this.properties["title"]; },
  set title(title)                     { this.properties["title"] = title; },

  get widgetInstances()                { return this.properties["widgetInstances"]; },
  set widgetInstances(widgetInstances) { this.properties["widgetInstances"] = widgetInstances; },
  
  get widgets()                        { return this.properties["widgets"]; },
  set widgets(widgets)                 { this.properties["widgets"] = widgets; },

  //activateWidget: function(widgetId, callback) {
  //  var self = this;
  //  var widgetInstance = new WidgetInstance(widgetId);
  //  self.properties["widgetInstances"].push(widgetInstance);
  //  callback && callback(widgetInstance);
  //  return self;
  //},
  //
  //removeWidgetInstance: function(widgetInstance, callback) {
  //  var self = this;
  //  var index = self.properties["widgetInstances"].indexOf(widgetInstance);
  //  if (index != -1) {
  //    self.properties["widgetInstances"].splice(index, 1);
  //    callback && callback(true);
  //  } else {
  //    callback && callback(false);
  //  }
  //  return self;
  //},
  
  init: function() {
    var self = this;
    
    fs.readdir('widgets', function (err, files){
      if (err) throw err;
      for (i in files){
        fs.stat('widgets/'+files[i], function (err, stats) {
          if (err) throw err;
          if (stats.isDirectory()){
            self.widgets.push(new Widget('widgets/'+files[i]));
          }
        });
      }
    });
  }
};

module.exports = Dashboard;
