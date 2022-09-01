
/* Creating database and tables*/
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- Department Table
DROP TABLE IF EXISTS deparment;
CREATE TABLE deparment (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
    
);

-- Role Table

DROP TABLE IF EXISTS role;
CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(50) NOT NULL,
salary DECIMAL,
deparment_id INT NOT NULL,
PRIMARY KEY(id),
INDEX idx_deparment (deparment_id),
CONSTRAINT fk_role_deparment FOREIGN KEY (deparment_id)
REFERENCES deparment(id)
ON UPDATE CASCADE
ON DELETE CASCADE

);

-- Employee Table

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
     CONSTRAINT fk_emplpoyee_role FOREIGN KEY (role_id) -- Building role ID
        REFERENCES role (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_emplpoyee_manager FOREIGN KEY (manager_id) -- Building manager ID
        REFERENCES employee (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);