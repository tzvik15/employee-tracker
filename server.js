const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
//const {start} = require("./functions.js");
const express = require("express");
const fs = require("fs");


//dotenv 

const app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  menu();
});



//the main menu of the app. User choice dictates which function will fire.
const menu=()=> {
   console.log(`Welcome to the Employee Tracker app. First of all, let me make clear, we don't actually track your employees. That would be illegal. Wink.`)

   inquirer
   .prompt([{
       type: "list",
       message: "What would you like to do?",
       name: "choice",
       choices: ["view employees","view departments", "view roles", "add employee", "add department", "add roles", "update an employee role"]
   }]).then(function(res) {
       if (res.choice === "view employees") {
           viewEmployees();
       } else if (res.choice === "view departments" ) {
           viewDepartments();
       } else if (res.choice === "view roles" ) {
           viewRoles();
       } else if (res.choice === "add employee" ) {
           addEmployee();
       } else if (res.choice === "add department" ) {
           addDepartment();
       } else if (res.choice === "add roles" ) {
           addRoles();
       } else if (res.choice === "update an employee role" ) {
           updateEmployee();
       }
   })
}


//view employees
viewEmployees =()=>{
  let query = "SELECT * FROM employee";
  connection.query(query, function(err,res){
    if (err) throw err;
    console.log("test");
    console.log(res.length + " employees found!");
    console.table("All Employees:" , res);
    menu();
    //employeeSelect();
  })
}

//view current roles
viewRoles =()=> {
  var query = "SELECT * FROM roles";
  connection.query(query, function(err, res) {
  if (err) throw err;
  console.log(res.length + " roles found!");
  console.table("All Roles:" , res); 
  menu();
  //roleSelect();
})}

//view current departments
viewDepartments =()=> {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
  if (err) throw err;
  console.log(res.length + " departments found!");
  console.table("All Departments:", res);
  menu();
  //departmentSelect();
})}








//start();


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  //module.exports = connection;