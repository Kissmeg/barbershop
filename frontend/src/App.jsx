import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Contact from "./Pages/Contact"
import Termin from "./Pages/Termin"
import About from "./Pages/About"
import Footer from "./Components/Footer"


function App() {
  return (
    <div className="">
      <Navbar />
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/contact'} element={<Contact />}/>
            <Route path={'/termin'} element={<Termin />}/>
            <Route path={'/about'} element={<About />}/>
        </Routes>
      <Footer />
    </div>
  )
}

export default App
