const mysql = require("mysql");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "FRZ3qpy>&n4",
    database: "employeeSystemDB",
    port: 3306
});

connection.connect(function(err) {
    if(err) {
        console.error("error connecting: " + err.stack);
        return
    }
    console.log("connected as id " + connection.threadId);

    askQuestions();

  });

  function askQuestions() {
    inquirer.prompt([
      {
        name: "menuChoices",
        type: "list",
        message: "Please select from the options in the menu",
        choices: ["Add Department", "View Department", "Add Role", "View Roles", "Add Employee", "View Employees", "Exit"]
      }
    ]).then(function(menuAnswers) {
      if(menuAnswers.menuChoices === "Add Department") {
          addDept();
      } else if (menuAnswers.menuChoices === "View Department") {
          viewDept();
      } else if (menuAnswers.menuChoices === "Add Role") {
          addRole();
      } else if (menuAnswers.menuChoices === "View Roles") {
          viewRoles();
      } else if (menuAnswers.menuChoices === "Add Employee") {
          addEmployee();
      } else if (menuAnswers.menuChoices === "View Employees") {
          viewEmployees();
      } else {
        connection.end();
      }
    });
  }

  function addDept() {
    inquirer.prompt([
      {
        name: "deptName",
        type: "input",
        message: "Please enter the department name:"
      }
    ]).then(function(deptAnswers) {
      const departmentName = deptAnswers.deptName;

      connection.query("INSERT INTO department(name) VALUES(?)", [departmentName], function(err, data) {
        if (err) {
          throw err;
        }
        console.log(`${departmentName} was added successfully!`)

        askQuestions();
      })
    });

  }
