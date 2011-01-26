var fs        = require('fs');
var helper    = require('./support/spec_helper');
var Store     = require('store');

describe('Table', function(){
  
  it('has a table name', function(){
    var table_name = "Test_table";
    var table      = new Store(table_name);
    expect(table.table_name).toEqual(table_name);
  });
  
  it('throws an error when table name is not defined', function(){
    expect(function() {
      new Store();
    }).toThrow("Table must have a name");
  });
  
  it('has a collection of data', function(){
    var table_name = "Test_table";
    var table      = new Store(table_name);
    expect(table.collection).toBeDefined();
  });
});