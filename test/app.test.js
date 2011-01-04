process.env.NODE_ENV = "test";
require.paths.unshift('./app/');

var assert    = require('assert')
  , app       = require('../app')
  , Dashboard = require('models/dashboard')
  , fs        = require('fs');

module.exports = {
  'GET /': function(){
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>The Dashboard</title>');
      }
    );
  },

  'Dashboard has a title': function() {
    title = "Some cool dashboard title";
    dashboard = new Dashboard(app.set('widgetsPath'), title);
    assert.eql(dashboard.title, title);
  },

  'Dashboard has a default title': function() {
    dashboard = new Dashboard(app.set('widgetsPath'));
    assert.isDefined(dashboard.title);
  },

  'Dashboard loads widgets from filesystem on instanciation': function() {
    dashboard = new Dashboard(app.set('widgetsPath'));
  },

  'Dashboard has widget instances': function() {
    dashboard = new Dashboard(app.set('widgetsPath'));
    assert.eql(dashboard.widgetInstances, []);
  }
};
