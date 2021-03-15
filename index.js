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
    database: 'employeeDB',
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
                'View existing roles',
                'Update an employee role',
                'Remome an employee',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Find songs by artist':
                    artistSearch();
                    break;

                case 'Find all artists who appear more than once':
                    multiSearch();
                    break;

                case 'Find data within a specific range':
                    rangeSearch();
                    break;

                case 'Search for a specific song':
                    songSearch();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};