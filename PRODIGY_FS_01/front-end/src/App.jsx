
import {  Route, Routes,  } from 'react-router-dom';
import Register from './pages/Register';
import Home from "./pages/Home";
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminPage";
import VerifyOtp from "./pages/VerifyOtp";
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/register" element={< Register/>}></Route>
      <Route path="login" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/adminDashboard" element={<AdminDashboard/>}></Route>
      <Route path="/verifyOtp" element={<VerifyOtp/>}></Route>

    </Routes>
      
    </>
  )
}

export default App
