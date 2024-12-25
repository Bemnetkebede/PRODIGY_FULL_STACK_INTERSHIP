import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
    const [adminTotal, setAdminTotal] = useState();
    const [employee , setEmployee] = useState()
    const [salary , setSalary] = useState()
    useEffect(() => {
        adminCount();
        employeeCount();
        total_salary();
    }, []);

    const adminCount = () => {
        axios.get('http://localhost:5500/api/admin_count')
            .then(result => {
                console.log(result.data); 
                if (result.data.Status) {
                    // Access `admin_count` if it's the correct key
                    setAdminTotal(result.data.Result[0].admin_count); 
                }
            })
            .catch(err => {
                console.error("Error fetching admin count:", err);
            });
    };
    const employeeCount = () => {
        axios.get('http://localhost:5500/api/employee_count')
            .then(result => {
                console.log(result.data); 
                if (result.data.Status) {
                    setEmployee(result.data.Result.employee_count); 
                }
            })
            .catch(err => {
                console.error("Error fetching admin count:", err);
            });
    };
    const total_salary = () => {
        axios.get('http://localhost:5500/api/total_salary')
        .then(result => {
            console.log('Full response:', result.data); // Log the entire response
            if (result.data.Status) {
                console.log('Total salary:', result.data.Result.total_salary); // Log the salary value
                setSalary(result.data.Result.total_salary); // Update state
            }
        })
        .catch(err => {
            console.error('Error fetching total salary:', err);
        });
    
    };

    return (
        <>
        <div className='grid place-items-center text-4xl font-bold text-[#09585B] mt-10'>Employee Managment</div>
        <div className='text-black flex justify-center gap-5 mt-[7%] '>
            <div className='text-white border border-[#09585B] px-16 py-4 rounded-md hover:bg-[#0f3536] hover:text-white'>
                <div className='font-bold text-xl mx-4'>
                    Admin
                </div>
                <hr className='mt-4 mb-3 border-[#09585B] w-32 ml-[-10px]'/>
                <div className='flex justify-around ml-[-25px] mb-3'>
                    <span> Total </span>
                    <span className=''>{adminTotal !== undefined ? adminTotal : ""}</span> 
                </div>

            </div>
            <div className='text-white border border-[#09585B] px-16 py-4 rounded-md hover:bg-[#0f3536] hover:text-white'>
                <div className='font-bold text-xl mx-4'>
                    Employee
                </div>
                <hr className='mt-4 mb-3 border-[#09585B] w-32 ml-[-10px]'/>
                <div className='flex justify-around ml-[-25px] mb-3'>
                    <span> Total </span>
                    <span className='text-'>{employee !== undefined ? employee : ""}</span> 
                </div>

            </div>
            <div className='text-white border border-[#09585B] px-16 py-4 rounded-md hover:bg-[#0f3536] hover:text-white'>
                <div className='font-bold text-xl mx-4'>
                    Salary
                </div>
                <hr className='mt-4 mb-3 border-[#09585B] w-32 ml-[-10px]'/>
                <div className='flex justify-around ml-[-25px] mb-3'>
                    <span> Total </span>
                    <span className='text-'>{salary !== undefined ? salary : ""}</span> 
                </div>

            </div>
        </div>
        </>
    );
};

export default Home;
