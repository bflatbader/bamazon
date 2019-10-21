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
    ]) .then(answers => {
            // Query database for item matching that SKU
            connection.query(
                "SELECT * FROM products WHERE ?", 
                [
                    {
                        item_id: answers.sku
                    }
                ],  
                function(err, stockResponse) { 
                    // Display errors if there were any
                    if (err) throw err;
                    
                    // Check if there is sufficient stock to make a purchase
                    if (stockResponse[0].stock_quantity >= answers.units) {                      
                        // Determine how much stock will be left after purchase
                        stockRemaining = stockResponse[0].stock_quantity - answers.units;
                        
                        // Determine cost of purchase
                        totalCost = stockResponse[0].price * answers.units;

                        // Update database to make purchase
                        connection.query(
                            "UPDATE products SET ? WHERE ?", 
                            [
                                {
                                    stock_quantity: stockRemaining
                                },
                                {
                                    item_id: answers.sku
                                }
                            ],  
                            function(err, res2) { 
                                // Display errors if there were any
                                if (err) throw err;

                                console.log("\nTOTAL: $" + totalCost.toFixed(2));
                                console.log(chalk.green("Purchase successfully completed. Thank you!"));
                                connection.end();
                            }); 
                    } else {
                        console.log(chalk.red("Insufficient quantity!"));
                        connection.end();
                    }
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
    console.log(chalk.bold("\nWelcome to BAMAZON, customer #" + connection.threadId + "!\n"));

    displayItemsForSale();

    // Close connection
    // connection.end();
});