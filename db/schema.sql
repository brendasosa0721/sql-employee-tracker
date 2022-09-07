
/* Creating database and tables*/
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- Department Table
DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
    
);

-- Role Table

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER ,
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL

);

-- -- Employee Table

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id) , -- Building role ID
    FOREIGN KEY (manager_id)  REFERENCES employee (id)-- Building manager ID
        
       
);