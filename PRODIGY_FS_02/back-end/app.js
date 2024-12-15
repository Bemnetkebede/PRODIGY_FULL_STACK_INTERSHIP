const express = require('express');
const mysql = require('mysql2')
const AdminRouter = require('./Routes/AdminRouter')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
require('dotenv').config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api', AdminRouter); 

app.listen(5500,()=>{console.log('server is running on 5500')})
