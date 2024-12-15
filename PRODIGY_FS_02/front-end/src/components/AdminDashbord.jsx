import {Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import  SettingsPowerIcon from '@mui/icons-material/PowerSettingsNew';




const AdminDashbord = () => {
    return (
        <div className='flex h-[560px]'>
            
        
        <div className='bg-black text-white basis-1/4 p-6 '>
            <h1 className='text-3xl font-bold pb-3'>Admin Dashboard</h1>
            <ul className='space-y-5'>
                <li>
                    <AdminPanelSettingsIcon/><Link to=''>Dashboard</Link>
                </li>
                <li>
                    <GroupsIcon/><Link to='Employee'>Manage Employee </Link>
                </li>
                <li>
                    <SpaceDashboardIcon/><Link to='Catagory'>Catagory</Link>
                </li>
                <li>
                    <PersonIcon/><Link to='Profile'>Profile</Link>
                </li>
                <li>
                    <SettingsPowerIcon/><Link to='Logout'>Logout</Link>
                </li>
            </ul>
        </div>
        <div className='basis-3/4'>
            <div className='grid place-items-center text-2xl font-bold text-[#09585B] my-5 shadow-slate-800'>Employee Managment</div>
            <Outlet/>
        </div>
        </div>
    )
}

export default AdminDashbord