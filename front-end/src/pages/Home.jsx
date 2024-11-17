import user from '../assets/User2.png' 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        
        const storedUserName = localStorage.getItem('username');
        const storedUserEmail = localStorage.getItem('email');

        
        if (storedUserName && storedUserEmail) {
            setUserName(storedUserName);
            setUserEmail(storedUserEmail);
        } else {
            
            navigate('/login');  
        }
    }, [navigate]);  
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/login');  
    };

    return (
        <>
            <div>
            <div className="grid place-items-center">
                <div className="text-white border border-[#09585B] mt-[95px] p-7 max-w-sm w-full space-y-5 grid place-items-center rounded-md">
                    <div className="bg-white w-[130px] h-[130px] rounded-lg">
                        <img src={user} alt="user" />
                    </div>
                    <p className="text-3xl text-[#09585B]">Profile Information </p>
                    <div className='text-white'>
                        <div>NAME : {userName}</div>
                        <div>Email : {userEmail}</div>
                    </div>
                    <button
                        type="submit"
                        className="text-center bg-[#09585B] px-[110px] py-2 rounded-md hover:text-black hover:border-black "
                        onClick={handleLogout}
                    >
                            LOGOUT
                        </button>

                </div>
            </div>
        </div>
        </>
    )
}

export default Home
