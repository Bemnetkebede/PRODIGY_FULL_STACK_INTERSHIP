import {Link } from "react-router-dom"
import { useState , useEffect } from "react";
import axios from "axios";

const Catagory = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5500/api/AddCatagory')
            .then(result => {
                if (result.data.status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, []);
    return (
        <div className="text-white py-10 ">
            <div>
                <h3 className='font-bold grid place-items-center text-3xl text-[#09585B]'>Catagory List</h3>
            </div>
            <div className="text-right mr-32 mb-10 mt-10">
                <Link to='/AdminDashboard/AddCatagory' className="">
                    <button className="bg-[#09585B] text-whit rounded-md px-4 py-2 hover:text-white ">Add to Catagory</button>
                </Link>
            </div>
            <div className="border border-[#09585B] py-5 w-[350px]  ml-24 rounded-md ">
                <div className="text-bold space-x-20 font-bold text-2xl ml-14">
                    <span>Id</span> 
                    <span>Name</span>
                </div>
            {category.map((item, index) => (
                
                <div className="  text-white my-3 mx"
                key={index}>
                    <span className="mx-16 ">{index+1}</span>
                    <span>{item.name}</span>
                </div>
                ))}
                
            </div>
    
            
        </div>
    )
}

export default Catagory
