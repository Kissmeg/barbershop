
import React from 'react'
import Hero from '../Components/Hero'
import Usluga from '../Components/Usluga'
import Cenovnik from '../Components/Cenovnik'
import Frizure from '../Components/Frizure'
import Rad from '../Components/Rad'

import Salon from '../Components/Salon'
import RadnoVreme from '../Components/RadnoVreme'
import Stats from '../Components/Stats'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Salon/>
      <Stats/>
      <Usluga/>
      <div className='flex justify-center'>
        <hr className='w-3/4 m-4'/>
      </div>
      <Cenovnik/>
      <Rad />
      <RadnoVreme/>
      

    </div>
  )
}

export default Home
