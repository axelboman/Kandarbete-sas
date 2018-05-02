var mysql = require('mysql');
var options = require("../server/database").database;
var bcrypt = require('bcrypt');
var con = mysql.createConnection(options);
var myArray = ['Stockholm', 'Oslo', 'Copenhagen'];   

bcrypt.hash('staralliance', 10, function (err, hash) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "update users set password = ? where emp_no NOT LIKE '1002'";
    con.query(sql, [hash], function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
});
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "delete from users where emp_no not like '1002'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password BINARY(60))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });