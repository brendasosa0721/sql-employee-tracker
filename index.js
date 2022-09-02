//Dependencies

const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
const fs = require("fs");

// Connecting sql database

const connection = require('./')

// Create array for roles
const roles = [];
const departments = [];
const employees = [];
const addDepartments = [];
const addEmployee = [];
const updateEmployee = [];

// Confirm selection
const compileTeamMembers = () => {
    inquirer.prompt([
      {
        type: "confirm",
        name: "compileTeamMembers",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "View Employees by Managers",
          "Add Employees",
          "Add Roles",
          "Add Departments",
          "Update Employee Role",
          "Update employee Manager",
          "Delete Employees",
          "Delete Departments",
          "Delete Roles",
          "View Department's Utilized Budget",
          "Exit",
        ],
      },
    ]).then((answers) => {
        if(answers.compileTeamMembers === true){
            question1();
        }else {
            return answers
        }
    });
};