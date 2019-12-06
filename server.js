const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const express = require("express");

require("dotenv").config();

//dotenv

const app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: "employees_DB"
});

// connect to the mysql server and sql database, launches menu function
connection.connect(function(err) {
  if (err) throw err;

  menu();
});

//the main menu of the app. User choice dictates which function will fire.
const menu = () => {
  console.log(
    `Welcome to the Employee Tracker app. First of all, let me make clear, we don't actually track your employees. That would be illegal. Wink.`
  );

  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "view employees",
          "view departments",
          "view roles",
          "add employee",
          "add department",
          "add roles",
          "update an employee role"
        ]
      }
    ])
    .then(function(res) {
      if (res.choice === "view employees") {
        viewEmployees();
      } else if (res.choice === "view departments") {
        viewDepartments();
      } else if (res.choice === "view roles") {
        viewRoles();
      } else if (res.choice === "add employee") {
        addEmployee();
      } else if (res.choice === "add department") {
        addDepartment();
      } else if (res.choice === "add roles") {
        addRoles();
      } else if (res.choice === "update an employee role") {
        updateEmployee();
      }
    });
};

//view employees
viewEmployees = () => {
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("test");
    console.log(res.length + " employees found!");
    console.table("All Employees:", res);
    next();
    //employeeSelect();
  });
};

//view current roles
viewRoles = () => {
  var query = "SELECT * FROM roles";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " roles found!");
    console.table("All Roles:", res);
    next();
    //roleSelect();
  });
};

//view current departments
viewDepartments = () => {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " departments found!");
    console.table("All Departments:", res);
    next();
    //departmentSelect();
  });
};

//add an employee
addEmployee = () => {
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the first name of the employee you want to add?"
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the last name of the employee?"
        },
        {
          type: "list",
          name: "role",
          message: "what role does this employee have?",
          //loops and displays all existing roles for selection
          choices: function() {
            let roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          }
        },
        {
          type: "number",
          name: "manager",
          message: "What is the id number of the manager?"
        }
      ])
      .then(function(answers) {
        //loops through the original response, this time comparing the title of the position with the selected title from the inquirer. When a match is found, grabs the role ID from the res object.
        let roleID;
        for (let j = 0; j < res.length; j++) {
          if (res[j].title == answers.role) {
            roleID = res[j].id;
          }
        }
        //adds the new employee to the employees table, display the new employee table, launches "next" function.
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: roleID,
            manager_id: answers.manager
          },
          function(err, res) {
            if (err) throw err;
            console.log("here are all the current employees: ");
            viewEmployees();
          }
        );
      });
  });
};

//a simple function that fires after every operation to see if the user would like to continue using the app or not. If the user wants to continue, launches the menu function. If not, ends connection.
const next = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "next",
        message: "What would you like to do next?",
        choices: ["Do something more", "Finish for now"]
      }
    ])
    .then(function(answer) {
      if (answer.next == "Do something more") {
        menu();
      } else {
        console.log("Thank you for using this application. Good bye!");
        connection.end();
      }
    });
};

addDepartment =()=> {
  inquirer
  .prompt([{
    type:"input",
    name:"newDep",
    message:"What is the name of the new department?"
  }]).then(function(res){
    connection.query(
      "INSERT INTO department SET ?",
      {
        dep_name: res.newDep
      },
      function(err, res) {
        if (err) throw err;
        console.log("here are all the current departments: ");
        viewDepartments();
      }
  )})
}












app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
