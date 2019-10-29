// PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// FUNCTIONS
// Menu for supervisor to select from
function displayMenu () {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ]).then(answers => {

        switch (answers.choice) {

            case "View Product Sales by Department":
                // function
                break;

            case "Create New Department":
                createNewDepartment();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

function createNewDepartment () {
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the name of the department:",
            name: "name",
        },
        {
            type: "input",
            message: "Enter the over head costs:",
            name: "cost",
            validate: function validatePrice(cost) {
                reg = /^\d+$/;
                return reg.test(cost) || chalk.red("Please enter a valid quantity!");
            }
        },
    ]).then(answers => {
        insert = `INSERT INTO departments (department_name, over_head_costs) VALUES ("${answers.name}", "${answers.cost}")`
        connection.query(insert, function(err, res) { 
                // Display errors if there were any
                if (err) throw err;

                console.log(chalk.green("\n Department successfully added. Thank you!\n"));

                displayMenu();
            }); 
    });
}

// Create connection to SQL table
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "derD0m1922!",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(chalk.bold("\nWelcome to BAMAZON, supervisor!\n"));

    displayMenu();
});