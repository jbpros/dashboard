require('./support/spec_helper');
var WidgetInstance = require('widget_instance');

describe('WidgetInstance', function() {
  it('has a widgetId', function() {
    var widgetInstance = new WidgetInstance(4);
    expect(widgetInstance.widgetId).toEqual(4);
  });

  it('needs a widgetId', function() {
    expect(function() {
      new WidgetInstance();
    }).toThrow("WidgetInstance needs a WidgetId!");
  });
});

