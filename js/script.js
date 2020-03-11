const mysql = require("mysql");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 8080;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CodingClass!",
    database: "employees"
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
    })
  }
app.listen(PORT, function() {
console.log("Listening on port " + PORT);

});


// function which prompts the user for what action they should take


function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "list",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid === "POST") {
        postAuction();
      }
      else if(answer.postOrBid === "BID") {
        bidAuction();
      } else{
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
    connection.query("INSERT INTO department(name) VALUES(?)", [departmentName],
    function(err) {
      if(err) {
        throw err;
      }
    }); console.log(`${departmentName} was added successfully!`);
  })
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

/*
  
  // function to handle posting new items up for auction
  function postAuction() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item you would like to submit?"
        },
        {
          name: "category",
          type: "input",
          message: "What category would you like to place your auction in?"
        },
        {
          name: "startingBid",
          type: "input",
          message: "What would you like your starting bid to be?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO auctions SET ?",
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid || 0,
            highest_bid: answer.startingBid || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your auction was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
  
  function bidAuction() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM auctions", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].item_name);
              }
              return choiceArray;
            },
            message: "What auction would you like to place a bid in?"
          },
          {
            name: "bid",
            type: "input",
            message: "How much would you like to bid?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
  
          // determine if bid was high enough
          if (chosenItem.highest_bid < parseInt(answer.bid)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE auctions SET ? WHERE ?",
              [
                {
                  highest_bid: answer.bid
                },
                {
                  id: chosenItem.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Bid placed successfully!");
                start();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Your bid was too low. Try again...");
            start();
          }
        });
    });
  }
  
*/
