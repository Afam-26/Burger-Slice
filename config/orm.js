// Import MySQL connection.
var connection = require("../config/connection.js");


function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}
  
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
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

// Object for all our SQL statement functions.
var orm = {

    all: function(tableInput, cb) {
        var SQL_STATEMENT  = "SELECT * FROM " + tableInput + ";";
        connection.query(SQL_STATEMENT, (err, result)=> {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    create: function(table, cols, vals, cb) {
        var SQL_STATEMENT = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(SQL_STATEMENT);
    
        connection.query(SQL_STATEMENT, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },

      update: function(table, objColVals, condition, cb) {
        var SQL_STATEMENT = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(SQL_STATEMENT);
        connection.query(SQL_STATEMENT, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },  
      
      delete: function(tableName, columnName, columnValue, cb) {
        var queryString = `DELETE FROM ??
                           WHERE ??=?`;
    
        connection.query(queryString, [tableName, columnName, columnValue], function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
      ormDeleteAsyncExample: async function(tableName, columnName, columnValue) {
        let SQL_STATEMENT = `DELETE FROM ?? 
                             WHERE ?? = ?`;
    
        try {
            const [rows, fields] = await connection.promise().query(SQL_STATEMENT, [tableName, columnName, columnValue]);
            return rows;
        } catch (error) {
            console.log(error);
        }
      }
        
    
};

module.exports = orm;