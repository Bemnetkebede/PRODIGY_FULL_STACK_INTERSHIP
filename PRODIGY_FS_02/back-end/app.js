const express = require('express');
const AdminRouter = require('./Routes/AdminRouter')
const app = express()
const cors = require('cors')
require('dotenv').config();

app.use(cors({ origin: 'http://localhost:4000' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api', AdminRouter);


app.listen(5500,()=>{console.log('server is running on 5500')})
