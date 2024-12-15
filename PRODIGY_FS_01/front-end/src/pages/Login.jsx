import { Link } from 'react-router-dom';
import  { useState } from 'react';
import axios from '../axiosCofig';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const Login = () => {
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [error , setError] = useState({
        email:'',
        password:'',
        form:''
    })
    const navigate = useNavigate();

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const resetErrors = () => {
        setError({
            email: '',
            password: '',
            form: '',
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        resetErrors();
        if (!email || !password) {
            setError((prevErrors) => ({
                ...prevErrors,
                // form: !email && !password ? 'Please provide all necessary info' : ' ',
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
            }));
            
        }
        
        
        try {
            const response = await axios.post('/login', {
                email: email,
                password: password,
            });
            console.log(response); 
            const { accessToken, role , username  } = response.data;
            console.log('Access Token:', accessToken);
            console.log('Role:', role);
            console.log('Username:', username);
            console.log('Email:', email);
            
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email); 
            

            // alert('Logged in successfully');
            if (role === 'admin') {
                window.location.href = 'http://localhost:4000';
                // navigate('/AdminDashboard'); 
            } else {
                navigate('/home'); 
            }
        }
        
        catch (error) {
            console.log(error)
            // setError((prevError)=>({
            //     ...prevError,
            //     form:'Invalid credentials.'
            // }))
            if (error.response && error.response.status === 401) {
                setError((prevError) => ({
                    ...prevError,
                    form: 'Invalid email or password. Please try again.',
                }));
            } else if (error.response && error.response.status === 500) {
                setError((prevError) => ({
                    ...prevError,
                    form: 'Server error. Please try again later.',
                }));
            } else {
                setError((prevError) => ({
                    ...prevError,
                    form: 'Something went wrong. Please try again.',
                }));
            }
        }
    }

    return (
    
    <>
        <div className='grid place-items-center '>
            <div className="border border-[#09585B] p-6 rounded-md space-y-2   grid place-items-center mt-[120px] ">
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-3xl mb-3 block text-center w-full max-w-xs font-bold">Sign in</h1>
                    <label htmlFor="email" className="block text-start w-full  max-w-xs mb-2">Email </label>
                    <div className="relative w-full max-w-xs">
                        <MailOutlineIcon className="absolute left-1 top-2/4 transform -translate-y-1/2 text-[#09585B] text-" /> 
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="xyz@gmail.com"
                            
                            className={`px-8 py-1 border-gray-300 rounded-md hover:border-[#2a5d5f] border-2 w-full mb-1 text-black ${
                                error.email ? 'bg-red-300 border-red-400' : 'bg-white'
                            }`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    
                    {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                    <label htmlFor="password" className="block text-start w-full  max-w-xs mb-2 mt-4">Password</label>
                    <div className="relative w-full max-w-xs">
                    <LockIcon className="absolute left-1 top-2/4 transform -translate-y-1/2 text-[#09585B] text-" /> 
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder='********' 
                        className={`px-8 py-1 border-gray-300 rounded-md focus:outline-none hover:border-[#09585B] border-2 mb-1 w-full max-w-xs text-black ${
                            error.password ? 'bg-red-300 border-red-400' : 'bg-white'
                        }`}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    </div>
                    {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                    {error.form && <p className='text-red-500 text-sm'>{error.form}</p>}

                    <div className=' text-[hsl(182,82%,20%)]  text-end w-full mr-2 my-2 hover:text-white'>Forget Password ?</div>
                    
                    <button type="submit" className="bg-[#09585B] px-[134px] rounded-lg border border-transparent hover:border-black  hover:text-black py-2  ">Sign In</button>
                    
                </form>
                {/* {error.form && <p className="text-red-500 text-sm mb-1">{error.form}</p>} */}
                
                <div className = "text-center">
                    {"Don't have an account?"}
                    <Link to="/Register" className="text-[hsl(182,82%,20%)] hover:text-white">
                    Sign Up </Link>
                </div>
                
            </div>
        </div>
    </>
    
)
}

export default Login
