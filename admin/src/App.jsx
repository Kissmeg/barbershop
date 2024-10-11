import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import Dashboard from './Copmonents/Dashboard';

const App = () => {
  const {adminToken} = useContext(AdminContext)

 return adminToken ? (
  <div>
    <ToastContainer/>
    <Dashboard/>
  </div>

 ) : (
  <>
    <Login />
    <ToastContainer/>
  </>
 )
}

export default App
