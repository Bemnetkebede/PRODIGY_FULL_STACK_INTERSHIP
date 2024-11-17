import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from '../axiosCofig';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState({
        username: '',
        email: '',
        password: '',
        confirmation: '',
    });
    const navigate = useNavigate();

    const handleUserChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleConfirmationChange = (e) => setConfirmation(e.target.value);

    const resetError = () => {
        setError({
            username: '',
            email: '',
            password: '',
            confirmation: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetError();

        if (!username || !email || !password || !confirmation) {
            setError((prevErrors) => ({
                ...prevErrors,
                username: !username ? 'User name is required' : '',
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
                confirmation: !confirmation ? 'Please re-type the password' : '',
            }));
            return;
        }

        if (password !== confirmation) {
            setError((prevErrors) => ({
                ...prevErrors,
                confirmation: 'Passwords do not match',
            }));
            return;
        }

        try {
            // const token = localStorage.getItem('accessToken');
            const userCheckResponse = await axios.post(
                '/checkUser',
                { email },
                // {
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //     },
                // }
            );

            if (userCheckResponse.data.exists) {
                setError((prevErrors) => ({
                    ...prevErrors,
                    email: 'Email is already registered',
                }));
                return;
            }

            await axios.post('/register', {
                username,
                email,
                password,
                confirmation,
            });
            localStorage.setItem('email', email);
            navigate('/verifyOtp');
        } catch (error) {
            console.error(error);
            setError((prevErrors) => ({
                ...prevErrors,
                general: error.response?.data?.message || 'An error occurred. Please try again.',
            }));
        }
    };
    
    return (
    <>
        <div className='grid place-items-center '>
            <div className="border border-[#09585B] p-5 rounded-md space-y-3 grid place-items-center mt-10 ">
                <h1 className="text-3xl mb-3 block text-center w-full max-w-xs font-bold">Sign Up</h1>
                <form  onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block text-start w-full  max-w-xs mb-2 " >User Name</label>
                    <div className="relative w-full max-w-xs">
                        <PersonIcon className="absolute left-1 top-2/4 transform -translate-y-1/2 text-[#09585B] text-" /> 
                    <input 
                        type="text" 
                        name="username"
                        id="username"
                        placeholder="Enter your name" 
                        className={`px-8 py-1 border-gray-300 rounded-md hover:border-[#2a5d5f] border-2 w-full max-w-xs text-black ${
                            error.username ? 'bg-red-300 border-red-400' : 'bg-white'
                        }`}
                        value={username}
                        onChange={handleUserChange}
                    />
                    </div>
                    {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
                    
                    

                    <label htmlFor="email" className="block text-start w-full  max-w-xs mt-3 mb-2">Email</label>
                    <div className="relative w-full max-w-xs">
                        <MailOutlineIcon className="absolute left-1 top-2/4 transform -translate-y-1/2 text-[#09585B] text-" /> 
                    <input 
                        type="email" 
                        name="email" 
                        id="email" placeholder="xyz@gmail.com"
                        className={`px-8 py-1 border-gray-300 rounded-md hover:border-[#2a5d5f] border-2 w-full max-w-xs text-black ${
                            error.email ? 'bg-red-300 border-red-400' : 'bg-white'
                        }`}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    </div>
                    {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

                    <label htmlFor="password" className="block text-start w-full  max-w-xs mt-3 mb-2">Password</label>
                    <div className="relative w-full max-w-xs">
                        <LockIcon className="absolute left-1 top-2/4 transform -translate-y-1/2 text-[#09585B] text-" /> 
                    <input 
                        type="password" 
                        name="password"
                        id="password" placeholder='******' 
                        className={`px-8 py-1 border-gray-300 rounded-md hover:border-[#2a5d5f] border-2 w-full max-w-xs text-black ${
                            error.password ? 'bg-red-300 border-red-400' : 'bg-white'
                        }`}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    </div>
                    {error.password && <p className="text-red-500 text-sm ">{error.password}</p>}

                    <label htmlFor="confirmation" className="block text-start w-full  max-w-xs mt-3 mb-2">Confirm Password</label>
                    <div className="relative w-full max-w-xs">
                        <LockOpenTwoToneIcon className="absolute left-1 top-2/4 transform -translate-y-1/2 text-[#09585B] text-" /> 
                    <input 
                        type="password" 
                        name="confirmation" 
                        id="confirmation" placeholder='******' 
                        className={`px-8 py-1 border-gray-300 rounded-md hover:border-[#2a5d5f] border-2 w-full max-w-xs text-black ${
                            error.confirmation ? 'bg-red-300 border-red-400' : 'bg-white'
                        }`}
                        value={confirmation}
                        onChange={handleConfirmationChange}
                    />
                    </div>
                    {error.confirmation && <p className="text-red-500 text-sm ">{error.confirmation}</p>}
                    <div></div>

                    <button type="submit" className="bg-[#09585B] px-[134px] rounded-lg border border-transparent hover:border-black  hover:text-black py-2  mt-6">Sign In</button>
                </form>
                <p className='text-center'>
                        Already have an account?
                        <Link to="/Login" className='text-[hsl(182,82%,20%)] hover:text-white'> Sign In</Link>
                </p>
                
            </div>   
        </div>
    </>
);
}; 
export default Register;

