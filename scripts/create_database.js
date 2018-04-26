var mysql = require('mysql');
var options = require("../server/database").database;
var con = mysql.createConnection(options);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password BINARY(60))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});