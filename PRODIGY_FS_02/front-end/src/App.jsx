import { BrowserRouter , Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashbord'
import Catagory from './components/Catagory';
import Employee from './components/Employee';
import Profile from './components/Profile';
import Logout from './components/Logout';
import AddCatagory from './components/AddCatagory';
import AddEmployee from './components/AddEmployee';
import Edit_employee from './components/Edit_employee';
import Home from './components/Home';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/AdminDashboard" element={<AdminDashboard />}>
          <Route path="Home" element={<Home />}/>
          <Route path="Catagory" element={<Catagory />} />
          <Route path="Employee" element={<Employee />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Logout" element={<Logout />} />
          <Route path="AddCatagory" element={<AddCatagory />} />
          <Route path="AddEmployee" element={<AddEmployee />} />
          <Route path="edit_employee/:id" element={<Edit_employee />} />
      </Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App