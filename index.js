require("dotenv").config()

//Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const fs = require("fs");
const { exit } = require("process");
// const Query = require("mysql2/typings/mysql/lib/protocol/sequences/Query");
// const { allowedNodeEnvironmentFlags } = require("process");

// Connecting sql database

const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // Make sure to add password
    password: process.env.DB_PW,
    database: "employee_db",
  },
  console.log(`Connected to the  employee_db database.`)
);
connection.connect(err => {
    if(err) throw err
    compileTeamMembers () 
})


// Create array for roles
// const roles = [];
// const departments = [];
// const employees = [];




// Confirm selection- After selection node index.js this options will come up
const compileTeamMembers = () => {
    inquirer.prompt([
      {
        type: "list",
        name: "compileTeamMembers",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
        //   "View Employees by Managers",
          "Add Employees",
          "Add Roles",
          "Add Departments",
          "Update Employee Role",
        //   "Update employee Manager",
        //   "Delete Employees",
        //   "Delete Departments",
        //   "Delete Roles",
        //   "View Department's Utilized Budget",
          "Exit",
        ],
      },
    ]).then(answers => {
      const nextAnswer = answers;
      if (nextAnswer.compileTeamMembers === "View All Employees") {
        // Connecting the database from seeds into this function
        allEmployees();
      }
      if (nextAnswer.compileTeamMembers === "View All Departments") {
        // Connecting the database from seeds into this function
        allDepartments();
      }
      if (nextAnswer.compileTeamMembers === "View All Roles") {
        // Connecting the database from seeds into this function
        allRoles();
      }
      if (nextAnswer.compileTeamMembers === "Add Employees") {
        // Connecting the database from seeds into this function
        addEmployees();
      }
      if (nextAnswer.compileTeamMembers === "Add Roles") {
        addRoles();
      }
      if (nextAnswer.compileTeamMembers === "Add Deparments") {
        addDept();
      }
      if (nextAnswer.compileTeamMembers === "Update Employee Role") {
        updateEmployee();
      }
      if (nextAnswer.compileTeamMembers === "Exit") {
        process.exit(); // Adding the process.exit would allow us to exit the application
      } 
    })
};

// View all employees
const allEmployees = () => {
   connection.query("SELECT * FROM employee", (err, data) => {
     if (err) throw err;
     console.table(data);
     compileTeamMembers();
   });
    
};

//View all deparments
const allDepartments =() => {
    connection.query("SELECT * FROM department" , (err, data ) => {
        if(err) throw err;
        console.table(data);
        compileTeamMembers();
        
    });
    
};

//View all roles

const allRoles = () => {
    connection.query("SELECT * FROM roles", (err, data) => {
        if(err) throw err;
        console.table(data);
        compileTeamMembers();
    })
};

//Add Employee
const addEmployees = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the first name of the employee?",
        },
        {
            type:"input",
            name:"last_name",
            message: "What is the last name of the employee"
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role id?",
          choices: [
            { name: "CEO", value: 1 },
            { name: "CFO", value: 2 },
            { name: "CMO", value: 3 },
            { name: "CTO", value: 4 },
            { name: "COO", value: 5 },
            { name: "Legal Council", value: 6 },
            { name: "Account Manager", value: 7 },
            { name: "Sales Manager", value: 8 },
            { name: "Salesperson", value: 9 },
            { name: "Lead Engineer", value: 10 },
            { name: "HR Manager", value: 11 },
            { name: "Marketing Manager", value: 12 },
            { name: "Accountant", value: 13 },
            { name: "Legal Assistant", value: 14 },
            { name: "Junior Engineer", value: 15 },
            { name: "HR Admin", value: 16 },
            { name: "Social Media Admin", value: 17 },
            { name: "Secretary", value: 18 },
          ],
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO employee SET ?",
          [answers],
          (err, data) => {
            if (err) throw err;
            console.table(data);
            compileTeamMembers();
          }
        );
      });
};

//Add Roles

const addRoles = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of this role?",
        validate: (name) => {
          if (name) {
            return true;
          } else {
            console.log("Please enter a role name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
        validate: (salary) => {
          if (isNaN(salary)) {
            console.log("Please enter a salary for this role");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.title, answer.salary];
      const sql = `SELECT * FROM departments`;
      db.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
        const departments = rows.map(({ name, id }) => ({
          name: name,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "What department does this role belong to?",
              choices: departments,
            },
          ])
          .then((departmentAnswer) => {
            const department = departmentAnswer.department;
            params.push(department);
            const sql = `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`;
            db.query(sql, params, (err) => {
              if (err) {
                throw err;
              }
              console.log("Role added!");
              return viewRoles();
            });
          });
      });
    });
};
// Add Department
const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.firstName, answer.lastName];
      const sql = `SELECT * FROM roles`;
      db.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
        const roles = rows.map(({ title, id }) => ({ name: title, value: id }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the role of this employee?",
              choices: roles,
            },
          ])
          .then((roleAnswer) => {
            const role = roleAnswer.role;
            params.push(role);
            const sql = `SELECT * FROM employees`;
            db.query(sql, (err, rows) => {
              if (err) {
                throw err;
              }
              const managers = rows.map(({ first_name, last_name, id }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
              }));
              managers.push({ name: "No manager", value: null });
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is this employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerAnswer) => {
                  const manager = managerAnswer.manager;
                  params.push(manager);
                  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;
                  db.query(sql, params, (err) => {
                    if (err) {
                      throw err;
                    }
                    console.log("Employee added!");
                    return viewEmployees();
                  });
                });
            });
          });
      });
    });
};

// Update employee
const updateEmpl = () => {
  const sql = `SELECT first_name, last_name, id FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    const employees = rows.map(({ first_name, last_name, id }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Please select which employee you would like to update",
          choices: employees,
        },
      ])
      .then((employeeAnswer) => {
        const employee = employeeAnswer.employee;
        const params = [employee];
        const sql = `SELECT first_name, last_name, id FROM employees`;
        db.query(sql, (err, rows) => {
          if (err) {
            throw err;
          }
          const managers = rows.map(({ first_name, last_name, id }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));
          managers.push({ name: "No manager", value: null });
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "Who is this employee's new manager?",
                choices: managers,
              },
            ])
            .then((managerAnswer) => {
              const manager = managerAnswer.manager;
              params.unshift(manager);
              const sql = `UPDATE employees
                        SET manager_id = ?
                        WHERE id = ?`;
              db.query(sql, params, (err) => {
                if (err) {
                  throw err;
                }
                console.log("Employee updated!");
                return viewEmployees();
              });
            });
        });
      });
  });
};