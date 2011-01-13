var helper      = require('./support/spec_helper');
var Widget      = require('widget');
var app         = helper.app;
var WidgetLogic = helper.WidgetLogic;

describe('Widget', function(){
  it("has a path", function(){
    var path = app.set("widgetsPath")+"/dummy";
    var widget = new Widget(path);
    expect(widget.path).toEqual(path);
  });

  describe('children class', function() {
    it("must implement #version()", function(){
      var path        = app.set("widgetsPath")+"/dummy";
      var widget      = new Widget(path);
      expect(widget.version).toThrow("Please implement #version");
    });
  }); 
});
