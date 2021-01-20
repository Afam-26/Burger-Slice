// Import MySQL connection.
var connection = require("../config/connection.js");



// Object for all our SQL statement functions.
var orm = {

  selectAll: function(cb) {
        var SQL_STATEMENT  = "SELECT * FROM burgers";
        connection.query(SQL_STATEMENT, (err, result)=> {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(burger_name, cb) {
        var SQL_STATEMENT = "INSERT INTO burgers (burger_name) VALUE(?);";    
    
        connection.query(SQL_STATEMENT, [burger_name], (err, result)=> {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
    },

    updateOne: function(devoured, id, cb) {
        var SQL_STATEMENT = "UPDATE burgers SET devoured = ? WHERE id = ?;";    
       
        connection.query(SQL_STATEMENT, [devoured, id], (err, result)=> {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },   
          
    
};

module.exports = orm;