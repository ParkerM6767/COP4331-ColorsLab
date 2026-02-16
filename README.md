# COP4331-ColorsLab

A simple CRUD application with basic authentication and protected pages using LAMP stack architecture for COP4331.

## Technologies used

- MySQL Server
- Apache Web Server
- PHP
- Bootstrap Framework

## Installation

1. Install and set up [Apache Server](https://httpd.apache.org/) on your dedicated machine.

2. Install [MySQL Server](https://dev.mysql.com/downloads/mysql/) 

3. Install [PHP](https://www.php.net/)

4. Run the following commands in your terminal

```bash
mysql -u root -p
```

In mySQL command line:

```sql
-- Create Database
CREATE DATABASE COP4331;
USE COP4331;
```

```sql
--// Create Users Table

CREATE TABLE `COP4331`.`Users`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
`LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
`Login` VARCHAR(50) NOT NULL DEFAULT '' ,
`Password` VARCHAR(50) NOT NULL DEFAULT '' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
```


```sql
-- Create Colors Table

CREATE TABLE `COP4331`.`Colors`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`Name` VARCHAR(50) NOT NULL DEFAULT '' ,
`UserID` INT NOT NULL DEFAULT '0' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
```


5. ```git clone``` the repo into the root folder

6. Create a file named `db_config.ini` outside of the root folder
7. Copy this in the `db_config.ini` file:


```ini
DB_NAME="COP4331" # Or another database name you chose before
DB_USER="<Your username>"
DB_PASSWORD="<Your Password>"
```

8. Restart Apache Webserver & PHP

9. Access the login page at `http://<YOURHOSTNAME>/index.html`

