import {Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import  SettingsPowerIcon from '@mui/icons-material/PowerSettingsNew';





const AdminDashbord = () => {
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.href = 'http://localhost:3000/Login';
    };
    return (
        <div className='flex h-[600px]'>
        <div className='bg-black text-white basis-1/4 p-6 '>
            <h1 className='text-3xl font-bold pb-8'>Admin Dashboard</h1>
            <ul className='space-y-5 ml-8'>
                <li className='hover:text-[#09585B]'>
                    <AdminPanelSettingsIcon  className='mx-3 '/><Link to='Home'>Dashboard</Link>
                </li>
                <li className='hover:text-[#09585B]'>
                    <GroupsIcon   className='mx-3 '/><Link to='Employee'>Manage Employee </Link>
                </li>
                <li className='hover:text-[#09585B]'>
                    <SpaceDashboardIcon  className='mx-3'/><Link to='Catagory'>Catagory</Link>
                </li>
                
                <li className='hover:text-[#09585B]'>
                    <SettingsPowerIcon  className='mx-3'/><Link to='Logout' onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </div>
        <div className='basis-3/4 bg-[#141414]'>
            
            <Outlet/>
            
            
        </div>
        </div>
    )
}

export default AdminDashbord