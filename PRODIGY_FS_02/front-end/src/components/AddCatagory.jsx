import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddCatagory = () => {
    const [category ,setCatagory] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5500/api/AddCatagory', { name: category })
    .then(result => {
        console.log(result.data);
        if (result.data.status) {
            navigate('/AdminDashboard/Catagory');
        }
        else{
            alert("Failed to insert category");
        }
    })
    .catch(err => console.log(err));
};  
    return (
        <div>
            <div className="grid place-items-center">
                <div className="text-white border border-black mt-[80px] pt-5 pb-8 max-w-sm w-full  grid place-items-center rounded-md">
                <p className="text-3xl text-black font-bold text-center  ">Add Catagory</p>
                    <div className="">
                        <p className="text-xl text-[#09585B] font-bold  ml-3 mb-2 pt-4">Catagory</p>
                        <form onSubmit={handleSubmit}   className="space-y-5 ml-2">
                            <input
                                type="text"
                                placeholder=""
                                className="align-middle  py-2 px-[70px] rounded-md text-black border-2 border-black"
                                onChange = {(e)=>setCatagory(e.target.value)}
                            />
                            <button
                                type="submit"
                                className=" bg-[#09585B] px-28 py-3  rounded-md hover:text-black hover:border-black flex justify-center items-center"
                            >
                                <span className="mr-2">Add</span>
                                <span>Catagory</span>
                            </button>
                        </form>
                        
                    </div>
                    
                </div>
                
            </div>

        </div>
    )
}

export default AddCatagory