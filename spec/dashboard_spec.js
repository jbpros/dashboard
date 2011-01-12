require('./support/spec_helper');
var Dashboard = require('dashboard');

describe('Dashboard', function() {
  it('has a title', function() {
    var title = "Some cool dashboard title";
    var dashboard = new Dashboard('/', title);
    expect(dashboard.title).toEqual(title);
  });

  it('has a default title', function() {
    var dashboard = new Dashboard('/');
    expect(dashboard.title).toBeDefined();
  });

  it('has widget instances', function() {
    var dashboard = new Dashboard('/');
    expect(dashboard.widgetInstances).toEqual([]);
  });
});
