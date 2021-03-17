/// set up requirements first

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


/// set up connection to mysql

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'puss',
    database: 'companyDB',
});

connection.connect((err) => {
    if (err) throw err;
    init();
});
///init is the function that starts the application
const init = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add a department',
                'Add a role',
                'Add an employee',
                'View existing departments',
                'View existing roles',
                'View existing employees',
                'Update an employee role',
                'Remome an employee',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'View existing departments':
                    viewDepartment();
                    break;

                case 'View existing roles':
                    viewRole();
                    break;

                case 'View existing employees':
                    viewEmployee();
                    break;

                case 'Update an employee role':
                    updateEmployee();
                    break;

                case 'Remome an employee':
                    removeEmployee();
                    break;

                case 'Exit':
                    console.log("Thank you for using the Employee Tracker  !!")
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

/// add function to add a department

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "addDept",
        message: "Department Name: "
    })
        .then((res) => {
            connection.query("INSERT INTO department SET ?", {
                dept_name: res.addDept
            });
            console.log("Department has been added successfully");
            seeAllDept();
        });

};




/// add function to add a role

function addRole() {

};



/// add function to add an employee

function addEmployee() {

};




/// add function to view departments

function viewDepartment() {

};




/// add function to view roles

function viewRole() {

};




/// add function to view employees

function viewEmployee() {

};




/// add function to  update and employee's role

function updateEmployee() {

};



/// add function to delete/remove an employee

function removeEmployee() {

};



//// function to display all departments

function seeAllDept() {
    connection.query("SELECT * FROM department ORDER BY dept_name", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}
