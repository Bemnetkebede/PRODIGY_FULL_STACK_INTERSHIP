const mysql = require('mysql2')
require('dotenv').config();



const dbconnection = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    database :  process.env.DATABASE,
    password : process.env.PASSWORD
})



module.exports = dbconnection.promise()