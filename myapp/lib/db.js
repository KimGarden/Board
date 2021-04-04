var mysql = require("mysql");

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "asd123",
    database: "board",
    dateStrings: "date",
});

db.connect();

module.exports = db;
