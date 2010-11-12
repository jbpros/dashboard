var foundations = require('foundations');

var WidgetInstanceParam = function() {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;
}

WidgetInstanceParam.prototype.__proto__ = foundations.Value.prototype;

module.exports = WidgetInstanceParam;