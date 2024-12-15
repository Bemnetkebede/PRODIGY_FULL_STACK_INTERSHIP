import { BrowserRouter , Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashbord'
import Catagory from './components/Catagory';
import Employee from './components/Employee';
import Profile from './components/Profile';
import Logout from './components/Logout'
import AddCatagory from './components/AddCatagory';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/AdminDashboard" element={<AdminDashboard />}>
          <Route path="Catagory" element={<Catagory />} />
          <Route path="Employee" element={<Employee />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Logout" element={<Logout />} />
          <Route path="AddCatagory" element={<AddCatagory />} />
      </Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App