var foundations = require('foundations');

var WidgetInstanceData = function() {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;
}

WidgetInstanceData.prototype.__proto__ = foundations.Value.prototype;

module.exports = WidgetInstanceData;