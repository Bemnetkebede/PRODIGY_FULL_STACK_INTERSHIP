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
            <div className="my-4">
                
            {category.map((item, index) => (
                <div className="ml-8 space-x-5 "
                key={index}>
                    <span>{index+1}</span>
                    <span>{item.name}</span>
                </div>
                ))}
            </div>
            <hr className="w-[390px] ml-5 border-t-1 border-[#09585B]" />
            
        </div>
    )
}

export default Catagory
