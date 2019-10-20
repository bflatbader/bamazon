/* Create database and table */
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
) AUTO_INCREMENT=10120;

/* Insert mock data  */
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Switch Joycon", "Electronics", "66.99", 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Raspberry Pi 3+", "Electronics", "47.99", 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Weighted Blanket", "Home", "71.99", 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spongebob Season 1 DVD", "Movies & TV", "7.99", 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MOTU Season 1 DVD", "Movies & TV", "49.99", 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spongebob Season 1 DVD", "Movies & TV", "7.99", 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Suede Slippers", "Shoes", "26.59", 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knit Tie", "Clothing", "12.99", 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cuffed Beanie", "Clothing", "12.99", 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Phantom Prince", "Books", "21.25", 8);

/* Display data */
SELECT * FROM products;