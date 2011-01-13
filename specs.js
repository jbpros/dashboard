var jasmine = require('jasmine-node');
var sys = require('sys');

/* for(var key in jasmine) {
  global[key] = jasmine[key];
}*/

var isVerbose = false;
var showColors = true;
process.argv.forEach(function(arg){
  switch(arg) {
  case '--color': showColors = true; break;
  case '--noColor': showColors = false; break;
  case '--verbose': isVerbose = true; break;
  }
});


jasmine.executeSpecsInFolder(__dirname + '/spec', function(runner, log){
  setTimeout(function() {
    process.exit(runner.results().failedCount);
  }, 1000);
}, isVerbose, showColors);
