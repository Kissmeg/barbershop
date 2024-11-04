import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Contact from "./Pages/Contact"
import Termin from "./Pages/Termin"
import About from "./Pages/About"
import Footer from "./Components/Footer"

import Sisanje from "./Pages/Sisanje"
import Stucovanje from "./Pages/Stucovanje"
import Brada from "./Pages/Brada"
import Feniranje from "./Pages/Feniranje"
import Fazoniranje from "./Pages/Fazoniranje"
import NotFound from "./Pages/NotFound"



function App() {
  return (
    <div className="">
      <Navbar />
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/contact'} element={<Contact />}/>
            <Route path={'/termin'} element={<Termin />}/>
            <Route path={'/about'} element={<About />}/>
            <Route path={'/sisanje'} element={<Sisanje />}/>
            <Route path={'/stucovanje'} element={<Stucovanje />}/>
            <Route path={'/brada'} element={<Brada />}/>
            <Route path={'/feniranje'} element={<Feniranje />}/>
            <Route path={'/fazoniranje'} element={<Fazoniranje />}/>
            <Route path={'*'} element={<NotFound />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
