const mysql = require('mysql2')
require('dotenv').config();



const dbConnection = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    database :  process.env.DATABASE,
    password : process.env.PASSWORD
})

module.exports = dbConnection.promise()
