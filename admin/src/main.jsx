import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './Context/AdminContext.jsx'
import AppContextProvider from './Context/appContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider>
        <App/>
      </AppContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
