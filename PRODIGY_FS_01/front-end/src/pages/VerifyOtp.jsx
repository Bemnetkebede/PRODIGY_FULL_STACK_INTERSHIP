import { useState } from 'react';
import axios from '../axiosCofig';
import Lock from '../assets/lock.png';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        const storedEmail = localStorage.getItem('email');
        console.log('Stored email:', storedEmail);
        console.log('Entered OTP:', otp); 
        
        if (!storedEmail) {
            setMessage('Email not found. Please log in again.');
            setError(true);
            return;
        }

        try {
            
            const response = await axios.post('/verifyOtp', {
                email: storedEmail.trim(),
                otp: otp.trim() 
            });

            if (response.data.success) {
                setMessage('OTP verified! Redirecting to login...');
                localStorage.removeItem('email')
                navigate('/login');
            } else {
                setMessage('Incorrect OTP. Please try again.');
                setError(true);
            }
            
        } catch (err) {
            setMessage(err.response?.data?.msg || 'Failed to verify OTP');
            setError(true);
        }
    };

    return (
        <div>
            <div className="grid place-items-center">
                <div className="text-white border border-[#374142] mt-[95px] p-7 max-w-sm w-full space-y-5 grid place-items-center rounded-md">
                    <div className="bg-white w-[130px] h-[130px] rounded-lg">
                        <img src={Lock} alt="lock" />
                    </div>
                    <p className="text-2xl">Enter 2-step verification code</p>
                    <form onSubmit={handleOtpSubmit} className="space-y-5 ml-2">
                        <input
                            type="text"
                            placeholder="******"
                            className="align-middle px-[63px] py-2 rounded-md text-black"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="text-center bg-[#09585B] px-[129px] py-2 rounded-md hover:text-black hover:border-black "
                        >
                            LOGIN
                        </button>
                    </form>
                    {message && (
                        <p className={`mt-4 ${error ? 'text-red-500' : 'text-green-500'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
