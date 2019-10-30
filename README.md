[![Generic badge](https://img.shields.io/badge/Portfolio-Red.svg)](https://bflatbader.github.io/)
[![Generic badge](https://img.shields.io/badge/LinkedIn-Blue.svg)](https://www.linkedin.com/in/bishop-bader/)

<p align="center">
    <img src="images/logo.jpg" alt="Logo"><br>
    <a href="#" target="blank">View Demo</a><br><br>
</p>

## Overview
A CLI app, that imitates an Amazon-like storefront, with a MySQL back-end. The customer app takes in orders from customers and depletes the stock as it does so. The manager and supervisor apps allow for product, inventory and department management.

## Languages/Technologies Used
- [Node](https://nodejs.org/en/docs/)
    - [mysql](https://www.npmjs.com/package/mysql)
    - [Inquirer](https://www.npmjs.com/package/inquirer)
    - [Chalk](https://www.npmjs.com/package/chalk)

## Getting Started

### Prerequisites
Have [Node](https://nodejs.org/en/download) installed and run via command line.

### Installation
1. Clone the repo: 
```sh
git clone https://github.com/bflatbader/bamazon.git
```
2. Install NPM packages:
```sh
npm install
```
## Usage

### bamazonCustomer.js
To begin, the user should run **bamazonCustomer.js** via command line.
```sh
node bamazonCustomer.js
```
A list of items for sale will be displayed. They should then enter the SKU of the product they would like to purchase, followed by the amount they would like to purchase.

The user will then be given a total purchase price and prompted if they would like to purchase something else. The user should then enter **Y** or **N**.

![purchase Example](/images/purchaseExample.jpg)

### bamazonManager.js
To begin, the user should run **bamazonManager.js** via command line.
```sh
node bamazonManager.js
```
#### Commands
App Command | Short Description
------------|-------------------
**View Products for Sale**      | View all available products for sale at Bamazon
**View Low Inventory** | Displays products with an inventory count lower than 5
**Add to Inventory**        | Add more of any item currently in the store 
**Add New Product**   | Add a completely new product to the store
**Exit**   | The application will exit

##### View Products for Sale

![viewProducts Example](/images/viewProductsExample.jpg)

##### View Low Inventory

![viewLowProducts Example](/images/viewLowExample.jpg)

##### Add to Inventory
The user will be prompted to enter the SKU of the item they would like to increase the inventory of. Once they enter that, they should enter the number of units to add.

![addToInv Example](/images/addtoInvExample.jpg)

##### Add New Product
First, the user will be prompted to enter the name of the new item. Then, they should select the department from the available list. Next, they will enter the price of the item and finally, they will enter the available quantity.

![addToInv Example](/images/addNewProdExample.jpg)

### bamazonSupervisor.js
To begin, the user should run **bamazonSupervisor.js** via command line.
```sh
node bamazonSupervisor.js
```

#### Commands
App Command | Short Description
------------|-------------------
**View Product Sales by Department**      | Adds all sales by department and calculates profit after subtracting the overhead costs
**Create New Department** | Add a completely new department to the store
**Exit**   | The application will exit

##### View Product Sales by Department

![prodSalesByDept Example](/images/prodSalesByDeptExample.jpg)

##### Create New Department
First, the user will be prompted to enter the name of the new department, then they should enter the overhead costs.

![addnewdept Example](/images/addNewDeptExample.jpg)