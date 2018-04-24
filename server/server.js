const express = require('express');
var mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3001;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "boman123",
  database: "mydb"
});
con.connect(function (err) {
  if (err) throw err

});

app.use('/', express.static("dist"));
app.use('/login', express.static("dist"));
app.use('/wishvacation', express.static("dist"));
app.use('/myvacations', express.static("dist"));
app.use('/admin', express.static("dist"));


//will serve index.html for every page refresh.

app.get('/api/users', (req, res) => {

  con.query("SELECT * FROM staff WHERE first_name LIKE 'S%'", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });

});
app.get('/api/applications', (req, res) => {
  con.query("SELECT * FROM applications", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.use('*', express.static("dist"));

app.listen(port, () => console.log(`Listening on port ${port}`));