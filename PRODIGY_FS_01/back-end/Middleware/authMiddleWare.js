const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// Authentication Middleware
function authentication(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Authentication token is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { username, user_id, role } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { username, user_id, role };  
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ msg: 'Authentication token is invalid or expired.' });
    }
}

// Authorization Middleware
function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
}

// Export both functions
module.exports = { authentication, requireAdmin };