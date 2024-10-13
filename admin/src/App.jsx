import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import Dashboard from './Copmonents/Dashboard';
import Home from './Pages/Home';
import DodajKorisnika from './Pages/DodajKorisnika';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const {adminToken} = useContext(AdminContext)

 return adminToken ? (
  <div className='bg-blue-800'>
    <ToastContainer/>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/DodajKorisnika'} element={<DodajKorisnika/>}/>
    </Routes>
  </div>

 ) : (
  <>
    <Login />
    <ToastContainer/>
  </>
 )
}

export default App
