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

router.get('/employee/:id', async (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    
    try {
        const [result] = await dbConnection.query(sql, [id]);

        return res.json({
            Status: true,
            Result: result
        });
    } catch (err) {
        return res.json({
            Status: false,
            Error: "Query Error: " + err
        });
    }
});



router.put('/edit_employee/:id', async (req, res) => {
    const id = req.params.id;

    const sql = `
        UPDATE employee 
        SET name = ?, email = ?, salary = ?, address = ?, category = ? 
        WHERE id = ?
    `;

    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category,
    ];

    try {
        // Using async/await for the query
        const [result] = await dbConnection.query(sql, [...values, id]);

        return res.json({
            Status: true,
            Result: result
        });
    } catch (err) {
        return res.json({
            Status: false,
            Error: "Query Error: " + err
        });
    }
});

router.delete('/delete_employee/:id', async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE id = ?";

    try {
        const [result] = await new Promise((resolve, reject) => {
            dbConnection.query(sql, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

// router.get('/admin_count', async (req, res) => {
//     const sql = "SELECT COUNT(*) AS admin_count FROM signup WHERE role = 'admin'";
//     try {
//         const [result] = await dbConnection.query(sql); 
//         return res.json({ Status: true, Result: result });
//     } catch (err) {
//         return res.json({ Status: false, Error: "Query Error: " + err });
//     }
// });

router.get('/admin_count', async (req, res) => {
    const sql = "SELECT COUNT(*) AS admin_count FROM signup WHERE role = 'admin'";
    try {
        const [result] = await dbConnection.query(sql);
        console.log("Admin Count:", result[0].admin_count); 
        return res.json({ Status: true, Result: result });
    } catch (err) {
        return res.json({ Status: false, Error: "Query Error: " + err });
    }
});

router.get('/employee_count', async (req, res) => {
    const sql = 'SELECT COUNT(*) AS employee_count FROM employee;';
    try {
        const [rows] = await dbConnection.query(sql); // Destructure the rows
        console.log("Employee count:", rows[0].employee_count);
        return res.json({ Status: true, Result: rows[0] });
    } catch (error) {
        console.error('Error fetching employee count:', error);
        return res.status(500).json({ Status: false, Error: 'Internal server error' });
    }
});

router.get('/total_salary', async (req, res) => {
    const sql = 'SELECT SUM(salary) AS total_salary FROM employee;';
    try {
        const [rows] = await dbConnection.query(sql); // Destructure the rows
        console.log("Total salary:", rows[0].total_salary);
        return res.json({ Status: true, Result: rows[0] });
    } catch (error) {
        console.error('Error fetching total salary:', error);
        return res.status(500).json({ Status: false, Error: 'Internal server error' });
    }
});






module.exports = router;

