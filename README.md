
## Installation and Setup Instructions

#### Back-end for Penjualan:  

This is backend for aplikasi penjualan.This server made using Node Js, Express Js, and Sequelize ORM

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

First install require depedencies :

`npm install`  

Second setting database in config/config.json make : 

`{
  "development": {
    "username": "root",
    "password": null,
    "database": "YOUR DATABASE NAME",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}`

Next lets ORM Sequelize do the rest by input following code : 

`npx sequelize-cli db:migrate`

Voila database ready!!

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

