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
        <div className="text-black">
            <div>
                <h3 className='font-bold grid place-items-center text-2xl'>Catagory List</h3>
            </div>
            <div className="text-right mr-32 mb-10 ">
                <Link to='/AdminDashboard/AddCatagory' className="">
                    <button className="bg-[#09585B] text-whit rounded-md px-4 py-2 hover:text-white ">Add to Catagory</button>
                </Link>
            </div>
            <div className="my-4 ">
                <div className="text-bold space-x-10 ml-10 font-bold text-xl">
                    <span>Id</span> 
                    <span>Name</span>
                </div>
                <hr className="w-[390px]  border-t-1 border-[#09585B] my-1 ml-6" />
            {category.map((item, index) => (
                
                <div className="  text-black "
                key={index}>
                    <span className="mx-10">{index+1}</span>
                    <span>{item.name}</span>
                    <hr className="w-[390px]  border-t-1 border-[#09585B] my-1 ml-6" />
                </div>
                ))}
                
            </div>
    
            
        </div>
    )
}

export default Catagory
