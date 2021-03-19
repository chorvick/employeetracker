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

    // Your password  --- note this password is not used for anything else other than this laptops install of mysql
    /// which will be changed soon as i plan to reinstall it so don't bother trying to steal the password
    /// it will not work for anything else, i use unique long and complex passwords for everything online
    /// i used an easy password for this setup since i did not want to type something complex !! 
    /// just a word to any would be hackers out there ---- 
    password: 'puss',
    database: 'companyDB',
});

connection.connect((err) => {
    if (err) throw err;
    init();
});
///init is the function that starts the application  - it is called different places normally after accepting or displaying information
//// to the user so we can give them the start up choices again, there is an exit function which is the only way out of this application
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
                ///           'Remome an employee',              i hope to have time to add this function later and other functions
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
                    seeAllDept();
                    break;

                case 'View existing roles':
                    seeRoles();
                    break;

                case 'View existing employees':
                    viewEmployee();
                    break;

                case 'Update an employee role':
                    updateEmployee();
                    break;

                // case 'Remove an employee':
                //     removeEmployee();
                //     break;

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
    inquirer.prompt([
        {
            type: "input",
            name: "addRole",
            message: "Please enter the role ",
        },

        {
            type: "input",
            name: "addSalary",
            message: "Please enter salary ",
        },
        {
            type: "input",
            name: "addDeptid",
            message: "Please enter the department ID number ",
        }
    ])
        .then((res) => {
            connection.query("INSERT INTO role SET ?", {
                role: res.addRole,
                salary: res.addSalary,
                department_id: res.addDeptid



            });
            console.log("Role was added successfully ");
            seeRoles();
        });

};



/// add function to add an employee

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "addFirstname",
            message: "Please type the employee's first name ",
        },
        {
            type: "input",
            name: "addLastname",
            message: "Please type the employee's last name ",
        },
        {
            type: "input",
            name: "addRoleid",
            message: "Please enter the employee's role id number ",
        },
        {
            type: "input",
            name: "addManagerid",
            message: "Please enter the managers id for this employee ",
        }
    ])

        .then((res) => {
            connection.query("INSERT INTO employee SET ?", {
                first_name: res.addFirstname,
                last_name: res.addLastname,
                role_id: res.addRoleid,
                manager_id: res.addManagerid

            });
            console.log("Employee was added successfully !! ");
            viewEmployee();
        })

};



/// add function to view / list employees

function viewEmployee() {
    connection.query("SELECT * FROM employee ORDER BY last_name", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}




/// add function to  update and employee's role

function updateEmployee() {
    connection.query("SELECT employee_id, first_name, role, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.role_id ORDER BY last_name", (err, res) => {
        if (err) throw err;
        console.table(res);

        inquirer.prompt([
            {
                type: "input",
                name: "idUpdate",
                message: "Please enter the employee id number to update "
            },
            {
                type: "input",
                name: "newId",
                message: "Please enter the updated role id for this emplouyee "


            },
        ]).then((res) => {
            connection.query("UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: res.newId,
                    },
                    {
                        employee_id: res.idUpdate,
                    }
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log("The employees role has been updated successfully !!! ");
                    viewEmployee();


                }

            );

        });
    });

};



/// add function to delete/remove an employee

/// hopefully i will have time to add this functionality soon




//// function to display all departments

function seeAllDept() {
    connection.query("SELECT * FROM department ORDER BY dept_name", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

//// function to display all roles 

function seeRoles() {
    connection.query("SELECT * FROM role ORDER BY role", (err, res) => {
        if (err) throw err;
        console.table(res);
        init();

    });
}

///lets look up ways to color tables possibly using chalk or other node package