var foundations = require('foundations');

var WidgetInstance = function(widgetId) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;
  self.properties = {
    widgetId: widgetId
  };
}

WidgetInstance.prototype = {
  __proto__: foundations.Entity.prototype,

  get widgetId() { return self.properties["widgetId"]; }
};

module.exports = WidgetInstance;

