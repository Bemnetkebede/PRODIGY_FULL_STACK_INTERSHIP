import {Link } from "react-router-dom"
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:5500/api/AddEmployee')
            .then(result => {
                if (result.data.status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, []);
    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5500/api/delete_employee/${id}`);
            
            if (result.data.Status) {
                navigate('/AdminDashboard/Employee');
            } else {
                alert(result.data.Error);
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred while deleting the employee.");
        }
    };
    
    return (
        <div className="p-5 mt-3">
        <div className="flex justify-center mb-10">
            <h3 className="font-bold grid place-items-center text-4xl text-[#09585B]">Employee List</h3>
        </div>
        <div className="flex justify-end">
        <Link
            to="/AdminDashboard/AddEmployee"
            className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        >
            Add Employee
        </Link>
        </div>
        
        <div className="font-bold space-x-  ml-10 mt-5 bg-[#0f3536] pl-4 py-3 rounded-md border-2 border-black">
            <span className="mr-16">Name</span>
            <span className="mx-16">Email</span>
            <span className="mx-12">Salary</span>
            <span className="mx-10">Address</span>
            <span className="mx-8">Catagory</span>
            <span className="ml-16">Action</span>
        </div>
        
        <div className="mt-3 space-y-4 border border-[#09585B] py-2 rounded-md text-white ml-[35px] hover:bg-[#0f3536]">
        {employee.map((item, index) => (
                <div className="ml-3 flex justify-around items-center space-x-6 px-1"
                key={index}>
                    <span>{item.name}</span>
                    <span>{item.email}</span>
                    <span>{item.salary}</span>
                    <span>{item.address}</span>
                    <span>{item.category}</span>
                    <span className="space-x-2 "> 
                        <Link to={`/AdminDashboard/edit_employee/`+item.id} className="bg-green-700 px-3 rounded-md">Edit</Link>
                        <Link onClick={()=>handleDelete(item.id)} className="bg-red-500 px-3 rounded-md" >Delete</Link>
                    </span>
                    
                </div>
                
                ))}
                
        </div>
        </div>
    )
}

export default  Employee
