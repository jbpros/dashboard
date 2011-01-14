require('./support/spec_helper');
var WidgetInstance = require('widget_instance');

describe('WidgetInstance', function() {
  it('has a widgetId', function() {
    var id             = Math.ceil(Math.random() * 100000);
    var widgetInstance = new WidgetInstance(id);
    expect(widgetInstance.widgetId).toEqual(id);
  });

  it('needs a widgetId', function() {
    expect(function() {
      new WidgetInstance();
    }).toThrow("WidgetInstance needs a WidgetId!");
  });
});

