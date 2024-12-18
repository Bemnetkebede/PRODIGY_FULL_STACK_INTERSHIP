import {Link } from "react-router-dom"
import { useState , useEffect } from "react";
import axios from "axios";


const Employee = () => {
    const [employee, setEmployee] = useState([]);
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
    return (
        <div className="p-5 mt-3">
        <div className="flex justify-center mb-10">
            <h3 className="font-bold grid place-items-center text-2xl">Employee List</h3>
        </div>
        <Link
            to="/AdminDashboard/AddEmployee"
            className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Add Employee
        </Link>
        <div className="mt-3">
        {employee.map((item, index) => (
                <div className="ml-8 space-x-3 "
                key={index}>
                    <span>{item.name}</span>
                    <span>{item.email}</span>
                    <span>{item.salary}</span>
                    <span>{item.address}</span>
                    <span>{item.category}</span>
                </div>
                ))}
        </div>
        </div>
    )
}

export default Employee
