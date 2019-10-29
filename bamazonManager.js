// PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// CONSTRUCTOR
function Item(item_id, product_name, department_name, price, stock_quantity) {
    this.SKU = item_id;
    this.Product = product_name;
    this.Department = department_name;
    this.Price = price
    this.Quantity = stock_quantity;
}

// FUNCTIONS
// Menu for manager to select from
function displayMenu () {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(answers => {

        switch (answers.choice) {

            case "View Products for Sale":
                displayItemsForSale();
                break;

            case "View Low Inventory":
                displayLowStock();
                break;

            case "Add to Inventory":
                addToInventory();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

// Display all items for sale
function displayItemsForSale () {
    
    console.log(chalk.hex('#EC4E20')("\n ITEMS FOR SALE"));

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // Call Item constrcutor and feed response from database into items array for better display
        var items = [];
        for (i in res) {
            item = new Item(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
            items.push(item);
            
            // Add item ID to array of known SKUs for validation
            allSKUs.push(res[i].item_id.toString());
        }

        // Output data in a table format
        console.table(items);
        console.log("\n");

        displayMenu();
    });
}

// Display low stock items
function displayLowStock () {
    console.log(chalk.hex('#EC4E20')("\n LOW INVENTORY"));

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;

        // Call Item constrcutor and feed response from database into items array for better display
        var items = [];
        for (i in res) {
            item = new Item(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
            items.push(item);
            
            // Add item ID to array of known SKUs for validation
            allSKUs.push(res[i].item_id.toString());
        }

        // Output data in a table format
        console.table(items);
        console.log("\n");

        displayMenu();
    });
}

// Add more to inventory
function addToInventory () {
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the SKU of the item:",
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
            message: "Enter the number of units to add:",
            name: "units"
        }
    ]).then(answers => {
        // Get current stock quantity
        connection.query(
            "SELECT * FROM products WHERE ?", 
            [
                {
                    item_id: answers.sku
                }
            ],  
            function(err, stockResponse) { 
                // Determine the new quantity amount
                newQuantity = stockResponse[0].stock_quantity + parseFloat(answers.units);

                // Update database
                connection.query(
                "UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: newQuantity
                    },
                    {
                        item_id: answers.sku
                    }
                ],  
                function(err, res2) { 
                    // Display errors if there were any
                    if (err) throw err;

                    console.log(chalk.green("\nQuantity successfully updated. Thank you!\n"));

                    displayMenu();
                }); 
            });
    }); 
}

// VARIABLES
var allSKUs = [];

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
    console.log(chalk.bold("\nWelcome to BAMAZON, manager!\n"));

    displayMenu();
});