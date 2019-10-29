/* Create database and table */
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

DROP TABLE IF EXISTS departments;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
) AUTO_INCREMENT=10120;

CREATE TABLE departments(
    item_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (item_id)
) AUTO_INCREMENT=100;