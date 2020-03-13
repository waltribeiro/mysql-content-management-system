const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require('console.table');
const PORT = process.env.PORT || 8080;

require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
})

// require('dotenv').config()
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "FRZ3qpy>&n4dda&%fjoMgfsnj#%",
//     database: "employeeSystemDB",
//     port: 3306
// });

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
        choices: ["Add Department", "View Department", "Add Role", "View Role", "Add Employee", "View Employee", "Exit"]
      }
    ]).then(function(menuAnswers) {
      if(menuAnswers.menuChoices === "Add Department") {
          addDept();
      } else if (menuAnswers.menuChoices === "View Department") {
          viewDept();
      } else if (menuAnswers.menuChoices === "Add Role") {
          addRole();
      } else if (menuAnswers.menuChoices === "View Role") {
          viewRole();
      } else if (menuAnswers.menuChoices === "Add Employee") {
          addEmployee();
      } else if (menuAnswers.menuChoices === "View Employee") {
          viewEmployee();
      } else {
        connection.end();
      }
    });
  }

// Add Department
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

// View Department
function viewDept() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) {
      throw err;
    }
    // console.table(data);
    askQuestions();
  })
}

// Add Role
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "Please enter the title of the role:"
    },
    {
      type: "input",
      name: "salary",
      message: "Please enter the salary of this role:"
    },
    {
      type: "input",
      name: "departmentId",
      message: "Please enter the department ID:"
    }
  ])
    .then(function (roleAnswers) {
      const roleName = roleAnswers.roleName;
      const salary = roleAnswers.salary;
      const deptId = roleAnswers.departmentId;

      connection.query(`INSERT INTO role(title, salary , department_id) VALUES('${roleName}', ${salary}, ${deptId})`,
        function (err, data) {
          if (err) {
            throw err;
          }
          console.log(`${roleName} was added successfully!`);
          //console.table(data);
          askQuestions();
        }
      )
    })
}

//View Role 
function viewRole() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) {
      throw err;
    }
    console.table(data);
    askQuestions();
  })
}

// Add Employee
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Please enter Employee's first name:"
    },
    {
      type: "input",
      name: "lastName",
      message: "Please enter Employee's last name:"
    },

  ])
    .then(function (employeeAnswers) {
      const firstName = employeeAnswers.firstName;
      const lastName = employeeAnswers.lastName;

      connection.query(`INSERT INTO employee(first_name, last_name) VALUES('${firstName}', '${lastName}')`,
        function (err, data) {
          if (err) {
            throw err;
          }
          console.log(`${firstName} was added successfully!`);
          //console.table(data);
          askQuestions();
        }
      )
    })
}

// View Employee
function viewEmployee() {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) {
      throw err;
    }
    // console.table(data);
    askQuestions();
  })
}
