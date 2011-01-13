var Widget = function(path) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }
  var self = this;
  
  self.properties = {
    path: path
  };
  self.init();
}

Widget.prototype = {
  get path()    { return this.properties["path"]; },
  
  init: function(){
    var self = this;
    //var widget = require('../../'+self.path+'/widget.js');
  },

  /** @abstract */
  version: function() {
    throw "Please implement #version";
  }
};

module.exports = Widget;
