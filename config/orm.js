var connection = require('./connection.js');

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string into arr
  for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
          // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
          if (typeof value === "string" && value.indexOf(" ") >= 0) {
              value = "'" + value + "'";
          }
          // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
          // e.g. {sleepy: true} => ["sleepy=true"]
          arr.push(key + "=" + value);
      }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

const orm = {
  selectAll: function(table, cb) {
    var queryString = `SELECT * FROM ${table}`;
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(table, data, cb) {
    var queryString = 'INSTERT INTO ? SET ?';
    connection.query(queryString, table, objToSql(data), function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateOne: function(table, data, id, cb) {
    var queryString = 'UPDATE ? SET ? Where ?';
    connection.query(queryString, table, objToSql(data), id, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
}

module.exports = orm;