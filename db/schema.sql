
/* Creating database and tables*/
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- Department Table
DROP TABLE IF EXISTS deparment;
CREATE TABLE deparment (
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    
);

-- Role Table

DROP TABLE IF EXISTS role;
CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NULL,
salary DECIMAL NOT NULL,
deparment_id INTEGER ,
CONSTRAINT fk_department FOREIGN KEY (deparment_id) REFERENCES deparment(id) ON DELETE SET NULL

);

-- Employee Table

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER,
    manager_id INT,
    PRIMARY KEY (id)
     CONSTRAINT fk_employee_role FOREIGN KEY (role_id) REFERENCES role (id) -- Building role ID
       CONSTRAINT fk_employee_manager FOREIGN KEY (manager_id)  REFERENCES employee (id)-- Building manager ID
        
       
);