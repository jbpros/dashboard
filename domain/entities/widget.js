var foundations = require('foundations');

var Widget = function(id) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;
  self.properties = {
    id: id
  }
}

Widget.prototype = {
  __proto__: foundations.Entity.prototype,

  get id() { return self.properties["id"]; }
};

module.exports = Widget;