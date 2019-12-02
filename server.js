const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const functions = require("./functions.js");
const express = require("express");
const fs = require("fs");

const app = express();

var PORT = process.env.PORT || 3307;

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3307,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "employees_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start(functions);
});





const start = (functions) => {
    //fs.readFile("./functions.js", function () {if (err) throw err})
    test();
}







app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });