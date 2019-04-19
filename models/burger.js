var orm = require('../config/orm.js');

var burgers = {
  selectAll: function(cb) {
    orm.selectAll('burgers', function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(burger, cb) {
    orm.insertOne('burgers', burger, function(res) {
      cb(res);
    });
  },
  updateOne: function(burger, id, cb) {
    orm.updateOne('burgers', burger, id, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burgers;


