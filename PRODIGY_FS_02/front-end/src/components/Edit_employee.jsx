
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const Edit_employee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
        const [employee, setEmployee] = useState({
            name: "",
            email: "",
            salary: '',
            address: "",
            category: "",
        });
        const [category, setCategory] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
    
        // Fetch categories on component mount
        useEffect(() => {
            axios.get('http://localhost:5500/api/AddCatagory')
            .then(result=>{
                if(result.data.status){
                    setCategory(result.data.Result)
                }
                else{
                    alert(result.data.Error)
                }
                axios.get(`http://localhost:5500/api/employee/${id}`)
                .then(result => {
                    setEmployee({
                        name: result.data.Result[0].name,
                        email: result.data.Result[0].email,
                        address: result.data.Result[0].address,
                        salary: result.data.Result[0].salary,
                        category: result.data.Result[0].category,
                    });
                })
                .catch(err => console.log(err));


            })
        }, [id]);
            // Handle form submission
        const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); 

        axios.put(`http://localhost:5500/api/edit_employee/${id}`, employee)
            .then(() => {
                setLoading(false);
                alert("Employee updated successfully!");
                navigate('/AdminDashboard/Employee'); // Navigate after successful update
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                setError("Failed to update employee. Please try again.");
            });
    };

    return (
        <>
            <div className='grid place-items-center text-white'>
            <div className='pt-6 pb-8 max-w-sm w-full'>
                <div className='grid place-items-center'>
                    <div className='border border-[#09585B] pt-6 pb-8 px-3 max-w-sm w-full rounded-md'>
                        <form onSubmit={handleSubmit} className='space-y-5 '>
                        <div className='text-3xl font-bold grid place-items-center'>
                                Add Employee
                            </div>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="border border-gray-300 rounded-md px-2 py-1 w-full focus:border-[#09585B] focus:outline-none"
                                    value={employee.name}
                                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="border border-gray-300 rounded-md px-2 py-1 w-full focus:border-[#09585B] focus:outline-none"
                                    value={employee.email}
                                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="salary">Salary:</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    className="border border-gray-300 rounded-md px-2 py-1 w-full focus:border-[#09585B] focus:outline-none"
                                    value={employee.salary}
                                    onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="border border-gray-300 rounded-md px-2 py-1 w-full focus:border-[#09585B] focus:outline-none"
                                    value={employee.address}
                                    onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="category">Category:</label>
                                <select
                                    name="category"
                                    id="category"
                                    className="border border-gray-300 rounded-md px-2 py-1 w-full focus:border-[#09585B] focus:outline-none"
                                    value={employee.category}
                                    onChange={(e) => setEmployee({ ...employee, category: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {category.map((c) => (
                                        <option key={c.id} value={c.name}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {error && <div className="text-red-500">{error}</div>}
                            <button
                                type="submit"
                                className="bg-[#09585B] text-center px-[153px] py-1 rounded-md text-white hover:bg-[#074A4C]"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )}
    
export default Edit_employee
