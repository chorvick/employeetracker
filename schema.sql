-- our schema will go here to create a company database that will have three tables ---
-- a table for departmet, role and, employee --
DROP DATABASE IF EXISTS companyDB;
CREATE DATABASE companyDB;
---drop and/or delete if it exists if not create a new database called company
USE companyDB;
-----use 3 tables first is the department ----- 
CREATE TABLE department(
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30)
);
-----  second table is the role 
CREATE TABLE role(
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (6,0),
  department_id INT NOT NULL,
  );
---- third table will be employee 
CREATE TABLE employee(
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  );