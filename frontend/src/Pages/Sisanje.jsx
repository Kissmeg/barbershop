import React from 'react'
import { assets, galeryRad } from '../assets/assets'
import { Link } from 'react-router-dom'

const Sisanje = () => {
  return (
    <div className=''>
      <div className='pt-40'>
        <div className='flex justify-center'>
          <div className='flex-col text-center'>
          <p className='text-4xl dancing-script-400 p-4 text-[#bc9935]'>Zavirite u naš svet šišanja</p>
          <h2 className='text-5xl px-4 -translate-y-4'>Šišanje</h2>
          </div>
        </div>
        <div className='lg:flex justify-center'>
          <div className='flex justify-center'>
            <img src={assets.galeryRad1} className='w-[75%] lg:w-1/2 rounded-xl m-4 shadow-xl mb-20' alt="" />
          </div>
          
          <div className=' lg:w-[25%] p-4 pt-12'>
            <p className='p-8 text-justify border-2 border-[#bc9935] rounded-lg shadow-lg'>U našem barbershopu verujemo da je šišanje mnogo više od same frizure – to je umetnost koja oblikuje vaš stil i samopouzdanje. Koriste se najnovije tehnike i alati kako bi vam pružili friz    uru koja odražava vašu ličnost i prati najnovije trendove. Uđite i uživajte u profesionalnom šišanju koje podrazumeva kvalitet, preciznost i stil prilagođen samo vama.</p>
            <div className='flex justify-center pt-4'>
              <Link to={'/termin'}>
                 <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                   <span className='duration-300 group-hover:text-[#b8905b]'>Zakažite šišanje </span>
                   <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                   <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sisanje
