const express = require('express');
var mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3001;

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "staralliance",
//   database: "mydb"
// });

// con.connect(function (err) {
//   if (err) throw err;
//   con.query("SELECT * FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));