USE employee_db;




INSERT INTO department (name)
VALUES
	("Board Member"),
	("Operation"),
	("Finance"),
	("Sales"),
	("HR"),
	("Marketing"),
	("IT"),
	("Legal");


-- ROLE TABLE 
INSERT INTO roles (title, salary, department_id)
VALUES
	("CEO", 500000, 1),
	("CFO", 335000, 3),
	("CMO", 700000, 6),
	("CTO", 650000, 7),
	("COO", 875000, 2),
	("Legal Council", 200000, 8),
	("Account Manager", 170000, 3),
	("Sales Manager", 180000, 4),
	("Salesperson", 100000, 4),
	("Lead Engineer", 170000, 7),
	("HR Manager", 163000, 5),
	("Marketing Manager", 220000, 6),
	("Accountant", 125000, 3),
	("Legal Assistant", 800000, 8),
	("Junior Engineer", 85000, 7),
	("HR Admin", 97000, 5),
	("Social Media Admin", 15000, 6),
	("Secretary", 85000, 2);



-- EMPLOYEE TABLE 

INSERT INTO employee (first_name, last_name, role_id , manager_id)
VALUES
	("Paola", "Delgadillo", 1 , null),
	("Romeo", "Aguilar", 2, 1),
	("Paulette", "Aguilar", 3, 1),
	("Israel", "Aguilar", 4, 1),
	("Leandro", "Aguilar", 5, null),
	("Julieta", "Aguilar", 6, 3),
	("Darlyn", "Aguilar", 7, 3),
	("Nora", "Jimenez", 8, 2),
	("Oscar", "Delgaillo", 9, 4),
	("Karina", "Rodriguez", 10, 1),
	("John", "Goodrum", 11, null),
	("Edward", "Light", 12, 1),
	("Cedric", "Howell", 13,null),
	("Macdem", "Holland", 14, 5),
	("Will", "Doe", 15,7),
	("Zack", "Tomaya", 16,4),
	("Keith", "Hamilton", 17, null);
       

