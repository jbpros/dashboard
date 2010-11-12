var Dashboard   = require('entities/dashboard');

var DashboardFactory = {
  build: function(title) {
    // invariants
    if (typeof(title) === 'undefined') {
      throw "Title required";
    }
    else if (title.length <= 2) {
      throw "Title should be at least 2 characters long";
    }
    return(new Dashboard(title));
  }
};

module.exports = DashboardFactory;