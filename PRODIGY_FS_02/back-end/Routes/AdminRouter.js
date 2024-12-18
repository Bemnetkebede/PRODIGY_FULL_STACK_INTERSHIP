const express = require('express');
const cors = require('cors');
const dbConnection = require('../db/dbconfig.js');
const router = express.Router();
const app = express()
require('dotenv').config
app.use(cors()); 
app.use(express.json());



router.get('/AddCatagory', async (req, res) => {
    const sql = `SELECT * FROM category`;

    try {
        const [rows, fields] = await dbConnection.query(sql);
        
        if (rows.length === 0) {
            return res.status(404).json({ status: false, error: 'No categories found' });
        }
        
        return res.status(200).json({ status: true, Result: rows });
    } catch (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ status: false, error: 'Database query failed' });
    }
});



router.post('/AddCatagory', async (req, res) => {
    const { name } = req.body;  
    const sql = 'INSERT INTO category (`name`) VALUES (?)';
    
    try {
        const sql = 'INSERT INTO category (name) VALUES (?)';
        const [result] = await dbConnection.query(sql, [name]);
        console.log('Insert Result:', result);  
        return res.status(200).json({ status: true,message: "Inserted to Data Base", result });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ status: false, error: 'Database error' });
    }
});

router.post('/AddEmployee', async (req, res) => {
    const { name, email, salary, address, category } = req.body;

    try {
        console.log("Request Received:", req.body); // Debugging line

        // Using async/await for the query
        const [result] = await dbConnection.query(
            'INSERT INTO employee (name, email, salary, address, category) VALUES (?, ?, ?, ?, ?)',
            [name, email, salary, address, category]
        );

        console.log("Employee added successfully:", result);
        res.status(200).json({
            status: true,
            message: "Employee added successfully",
            employeeId: result.insertId
        });

    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({
            status: false,
            Error: "Failed to add employee to the database"
        });
    }
});


router.get('/test', (req, res) => { res.send('Server is running'); });



router.get('/AddEmployee', async (req, res) => {
    const sql = `SELECT * FROM employee`;
    try {
        const [rows, fields] = await dbConnection.query(sql);
        
        if (rows.length === 0) {
            return res.status(404).json({ status: false, error: 'No categories found' });
        }
        
        return res.status(200).json({ status: true, Result: rows });
    } catch (err) {
        console.error('Database query failed:', err);
        return res.status(500).json({ status: false, error: 'Database query failed' });
    }
});



module.exports = router;

