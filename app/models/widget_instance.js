var WidgetInstance = function(widgetId) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;

  if (typeof(widgetId) === 'undefined') {
    throw "WidgetInstance needs a WidgetId!"
  }

  self.properties = {
    widgetId: widgetId
  };
}

WidgetInstance.prototype = {
  get widgetId() { return this.properties["widgetId"]; }
};

module.exports = WidgetInstance;

