// PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// CONSTRUCTOR
function DepartmentSales(department_name, over_head_costs, product_sales, total_profit) {
    this.Department = department_name;
    this.Over_Head_Costs = over_head_costs;
    this.Product_Sales = product_sales;
    this.Total_Profit = total_profit;
}

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
                viewSalesbyDept();
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

// View Product Sales by Department
function viewSalesbyDept () {
    connection.query("SELECT department_name FROM departments", function(err, res) {
        if (err) throw err;

        var departments = [];
        for(i in res) {
            join = `SELECT departments.department_name, departments.over_head_costs, SUM(product_sales) as 'total_sales'
            FROM departments INNER JOIN products 
            ON departments.department_name = products.department_name
            WHERE departments.department_name = '${res[i].department_name}';         
            `

            connection.query(join, function(err, res2) {
                total_profit = res2[0].total_sales - res2[0].over_head_costs;
                salesInfo = new DepartmentSales(res2[0].department_name, res2[0].over_head_costs, res2[0].total_sales, total_profit);
                departments.push(salesInfo);
                console.table(salesInfo);
            });
        }
    });
}

// Create connection to SQL table
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(chalk.bold("\nWelcome to BAMAZON, supervisor!\n"));

    displayMenu();
});