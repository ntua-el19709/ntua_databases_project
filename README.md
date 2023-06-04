# Databases Project NTUA 2022-2023

---

The semester project of the course "Databases" of NTUA - 2022-2023.<br>Team: 54<br>Members: el19709, el20608

## Required Tools

---

The project runs with Node.js and MySQL Database server

## Before Starting the App

---

From directory `/databases` you need to run the script `schema.sql` to initialize the database. The script creates the tables, and inserts the data of the Top Operator in table 'users':

```markdown
user_id: 1
username: topoperator
password: password
user_fullname: TOP OPERATOR
date_of_birth: 2000-01-01
approved: true
```

This data can be edited upon the first log in of the top operator.

## Required Dependencies

---

To install all required dependencies (and build the project), run:<br>
`npm run installAll`

## Start

---

To launch the application run:<br>
`npm start`

## Sample Data

---

If you want, you can run the script `dbdata.sql` found in `/database` directory, to fill the database with sample data.
