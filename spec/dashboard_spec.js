var fs        = require('fs');
var helper    = require('./support/spec_helper');
var x         = require('x');
var Dashboard = require('dashboard');

describe('Dashboard', function() {

  beforeEach(function() {
    this.widgetsPath       = "/path/to/widgets";
    this.spyOnRealpathSync = spyOn(fs, 'realpathSync').andReturn(this.widgetsPath);
    this.spyOnReaddirSync  = spyOn(fs, 'readdirSync');
  });

  it('has a title', function() {
    var title = "Some cool dashboard title";
    var dashboard = new Dashboard(this.widgetsPath, title);
    expect(dashboard.title).toEqual(title);
  });

  it('has a default title', function() {
    var dashboard = new Dashboard(this.widgetsPath);
    expect(dashboard.title).toBeDefined();
  });

  it('has all available widgets', function() {
    var files = [
      'dir1',
      'file1',
      'dir2'
    ];
    var fileStats = [
      jasmine.createSpyWithStubs('dir1Stat', {isDirectory: true}),
      jasmine.createSpyWithStubs('file1Stat', {isDirectory: false}),
      jasmine.createSpyWithStubs('dir2Stat', {isDirectory: true})
    ];
    var widgets = [
      jasmine.createSpyWithStubs('widget1', {version: "1.0"}),
      jasmine.createSpyWithStubs('widget2', {version: "0.9"})
    ];

    // spies & stubs:
    this.spyOnReaddirSync.andReturn(files);
    spyOn(fs, 'statSync').andReturnSeveral(fileStats);
    spyOn(x, 'require').andReturnSeveral(widgets);

    var dashboard = new Dashboard(this.widgetsPath);

    // message expectations:
    expect(fs.readdirSync).toHaveBeenCalledWith(this.widgetsPath);
    for (var i = 0; i < 3; i++) {
      expect(fs.statSync).toHaveBeenCalledWith(this.widgetsPath+'/'+files[i]);
      expect(fileStats[i].isDirectory).toHaveBeenCalled();
    }
    expect(x.require).toHaveBeenCalledWith(this.widgetsPath+'/'+files[0]+'/widget');
    expect(x.require).toHaveBeenCalledWith(this.widgetsPath+'/'+files[2]+'/widget');
    expect(x.require).not.toHaveBeenCalledWith(this.widgetsPath+'/'+files[1]+'/widget');
    expect(dashboard.widgets).toBeDefined();
    expect(dashboard.widgets.length).toBe(2);
    expect(dashboard.widgets).toEqual(widgets);
  });

  it('has widget instances', function() {
    var dashboard = new Dashboard(this.widgetsPath);
    expect(dashboard.widgetInstances).toEqual([]);
  });
});
