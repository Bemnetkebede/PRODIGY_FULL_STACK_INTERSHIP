require('dotenv').config();
const dbconnection = require('../db/dbConfige');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  sendOtpEmail  = require('../otpService');


function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}
async function register(req, res) {
    const { username, email, password, confirmation , role = 'user' } = req.body;
    
    
    if (!email || !username || !password || !confirmation) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    } 
    if (confirmation !== password) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }
    
    try {
        const [user] = await dbconnection.query(`SELECT email FROM signup WHERE email = ?`, [email]);
        
        
        if (user.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        // if (confirmation !== password) {
        //     return res.status(400).json({ msg: 'Passwords do not match' });
        // }

        const otp = generateOtp();
        await sendOtpEmail(email, otp);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await dbconnection.query(`INSERT INTO signup (username, email, password ,otp , role) VALUES (?, ?, ?,?,?)`, [username, email, hashedPassword , otp , role]);
        return res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all required information' });
    }

    try {
        const [user] = await dbconnection.query(`SELECT username, user_id, role, password FROM signup WHERE email = ?`, [email]);

        if (user.length === 0 ) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        const { username, user_id, role, password: hashedPassword } = user[0];
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid Credentials. please try again.' });
        }
        const accessToken = jwt.sign(
            { username, user_id, role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }  
        );

        const refreshToken = jwt.sign(
            { username, user_id, role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' } 
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({ msg: 'Login successful', accessToken, role , username });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
}

async function checkUser(req, res) {
    console.log(req.body); 
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Email is required' });
    }

    try {
        const [result] = await dbconnection.query(`SELECT email FROM signup WHERE email = ?`, [email]);
        
        // Check if the user exists
        const exists = result.length > 0;
        return res.json({ exists });
    } catch (error) {
        console.error('Error checking user existence:', error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
}




async function verifyOtp(email, otp) {
    try {
        
        const [otpRecord] = await dbconnection.query(
            'SELECT otp, expires_at, user_id FROM otp_verification WHERE email = ? ORDER BY otp_id DESC LIMIT 1',
            [email]
        );

        // Check if OTP record exists
        if (!otpRecord || otpRecord.length === 0) {
            return { success: false, message: 'OTP not found or expired.' };
        }

        const { otp: storedOtp, expires_at: expiresAt, user_id } = otpRecord[0];

        
        if (new Date() > new Date(expiresAt)) {
            await dbconnection.query('DELETE FROM otp_verification WHERE email = ?', [email]);
            return { success: false, message: 'OTP has expired.' };
        }

        // Check if provided OTP matches the stored OTP
        if (storedOtp !== otp) {
            return { success: false, message: 'Invalid OTP.' };
        }

        // OTP is valid, delete it from the database
        await dbconnection.query('DELETE FROM otp_verification WHERE email = ?', [email]);

        // Optional: You can delete it from the user's signup table too, if needed
        // await dbconnection.query('UPDATE signup SET otp = NULL WHERE email = ?', [email]);

        return { success: true, message: 'OTP verified successfully.', user_id };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { success: false, message: 'Something went wrong' };
    }
}


module.exports = { register, login, checkUser, verifyOtp };


