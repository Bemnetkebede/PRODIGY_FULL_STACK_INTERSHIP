const express = require('express');
const dbconnection = require('../db/dbConfige');
const router = express.Router();
const { authentication, requireAdmin } = require('../Middleware/authMiddleWare');
const { register, login, verifyOtp } = require('../userControler/userControler');
const { checkUser } = require('../userControler/userControler'); 


// #register (sign-up)
router.post('/register', register);

// #log-in
router.post('/login', login);

// #admin check
router.get('/admin-check', authentication, requireAdmin, (req, res) => {
    res.status(200).json({ msg: 'Welcome, admin!' });
});

// #check User
// // router.post('/checkUser ',authentication, checkuser);
router.post('/checkUser', checkUser); 

// #verify OTP
// router.post('/verifyOtp', async (req, res) => {
//     const { email, otp } = req.body;
//     console.log('Received email:', email); 
//     console.log('Received OTP:', otp);
//     const result = await verifyOtp(email, otp);
//     if (result.success) {
//         return res.status(200).json({ msg: 'OTP verified successfully. Proceed to login.' });
//     } else {
//         return res.status(400).json({ msg: result.message });
//     }
// });
router.post('/verifyOtp', async (req, res) => {
    const { email, otp } = req.body;

    console.log('Received email:', email); 
    console.log('Received OTP:', otp);

    if (!email || !otp) {
        return res.status(400).json({ msg: 'Email and OTP are required.' });
    }

    try {
        const [user] = await dbconnection.query('SELECT otp FROM signup WHERE email = ?', [email]);

        if (!user || user.length === 0) {
            return res.status(400).json({ msg: 'User not found or OTP expired.' });
        }

        // const { otp: storedOtp } = user[0].otp;
        const storedOtp = user[0].otp;

        if (storedOtp !== otp) {
            return res.status(400).json({ msg: 'Invalid OTP. Please try again.' });
        }

        // Clear the OTP after successful verification
        await dbconnection.query('UPDATE signup SET otp = NULL WHERE email = ?', [email]);

        return res.status(200).json({ success: true, msg: 'OTP verified successfully.' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ msg: 'Internal server error. Please try again later.' });
    }
});


module.exports = router;