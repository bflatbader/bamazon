// PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// CONSTRUCTOR
function Item(item_id, product_name, department_name, price) {
    this.SKU = item_id;
    this.Product = product_name;
    this.Department = department_name;
    this.Price = price
}

// FUNCTIONS
function displayItemsForSale () {
    
    console.log(chalk.hex('#EC4E20')(" ITEMS FOR SALE"));

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // Call Item constrcutor and feed response from database into items array for better display
        var items = [];
        for (i in res) {
            item = new Item(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price);
            items.push(item);
            
            // Add item ID to array of known SKUs for validation
            allSKUs.push(res[i].item_id.toString());
        }

        // Output data in a table format
        console.table(items);

        // Call purchase function
        purchase();
    });
}

function purchase () {
    // Ask the user which item they'd like to purchase and the amount    
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the SKU of the item you would like to purchase:",
            name: "sku",
            // Ensure that the SKU exists in the database
            validate: function validateSKU(sku) {
                if (allSKUs.indexOf(sku) === -1) {
                    return chalk.red("Please enter a valid SKU");
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "Enter the number of units to purchase:",
            name: "units"
        }
    ])
}

// VARIABLES
var allSKUs = [];

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
    console.log(chalk.bold("\nWelcome to BAMAZON, customer #" + connection.threadId + "!\n"));

    displayItemsForSale();

    // Close connection
    connection.end();
});