import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop.jsx'
import ContextProvider from './Context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextProvider>
      <ScrollToTop />
        <App />
    </ContextProvider>
  </BrowserRouter>,
)
