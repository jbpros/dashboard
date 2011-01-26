var nStore = require('nstore').extend(require('nstore/query')());;

var Table = function(table_name){
  if (!(this instanceof arguments.callee)) {
      return new arguments.callee(arguments);
  }  
  var self = this;
  
  self.table_name = table_name;
  
  self.init(table_name);
};

Table.prototype.init = function(table_name){
  var self = this;
  if(table_name === undefined){ throw "Table must have a name" };
  self.collection = nStore.new('data/'+table_name+'.db', function () {
    console.log(table_name+" table created.")
  });
};

Table.prototype.save = function(key, value){
  var self = this;
  
  self.collection.save(key, value, function(err){
    if(err){ throw err; }
    console.log(key+" key added to "+self.table_name);
  })
};

Table.prototype.get = function(key, callback){
  var self = this;
  
  self.collection.get(key, function(err, doc, key){
    if(err){ throw err; }
    callback(doc);
  })
};

Table.prototype.remove = function(key, callback){
  var self = this;
  
  self.collection.remove(key, function(err, doc){
    if(err){ throw err; }
    callback(doc);
  })
};

Table.prototype.all = function(callback){
  var self = this;
  
  self.collection.all(function(err, results){
    if(err){ throw err; }
    callback(results);
  })
};

Table.prototype.find = function(condition, callback){
  var self = this;
  
  self.collection.find(condition, function(err, results){
    if(err){ throw err; }
    callback(results);
  })
};

module.exports = Table;