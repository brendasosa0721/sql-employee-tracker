require("dotenv").config()

//Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const fs = require("fs");
const Query = require("mysql2/typings/mysql/lib/protocol/sequences/Query");
const { allowedNodeEnvironmentFlags } = require("process");

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
const roles = [];
const departments = [];
const employees = [];




// Confirm selection
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
    ]).then((answers) => {
        if (answers.compileTeamMembers === "View All Employees") {
          allEmployees();
        } else if (answers.compileTeamMembers === "View All Departments") {
            allDeparments()
        } else if (answers.compileTeamMembers === "View All Roles" ) {
            allRoles ()
            
        } else if (answers.compileTeamMembers === "Add Employees") {
            addEmployees()
        } else if (answers.compileTeamMembers === "Add Roles") {
            addRoles()
        }else if(answers.compileTeamMembers === "Update Employee Role"){
            updateEmployeeRole()
        }

    });
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
const viewEmployees =() => {
    connection.query("SELECT * FROM department" , (err, data) => {
        if(err) throw err;
        console.table(data);
        compileTeamMembers();
    });
    
};

//View all roles

const viewRoles = () => {
    connection.query("SELECT * FROM role", (err, data) => {
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

// Add Department

// Update Employee Role

