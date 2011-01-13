var app    = require('../../app');
var zombie = require('zombie');

jasmine.createSpyWithStubs = function(name, stubs) {
  var spy = jasmine.createSpy(name);
  for (var stubMethod in stubs) {
    spy[stubMethod] = function() {};
    spyOn(spy, stubMethod).andReturn(stubs[stubMethod]);
  }
  return (spy);
};

jasmine.Spy.prototype.andReturnSeveral = function(values) {
  this.plan = function() {
    if (typeof(this.count) === 'undefined')
      this.count = 0;
    return values[this.count++];
  };
  return this;
};

module.exports = {
  app: app,

  testAssetPath: function(id) {
    return(__dirname + '/../../test/assets/'+id);
  },
  
  stub: function(obj, methodName, returnValue) {
    obj[methodName] = function() {};
    return(spyOn(obj, methodName)).andReturn(returnValue);
  }

  // visitAppPage: function(path, options, callback) {
  //   var server = NodegrityServer(config);
  //   zombie.visit("http://localhost:"+config['port']+path, options, function(err, browser) {
  //     callback(err, browser);
  //   });
  //   config['port']++;
  // }
};
