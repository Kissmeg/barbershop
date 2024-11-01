import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Feniranje = () => {
  return (
    <div className=''>
      <div className='pt-40'>
        <div className='flex justify-center'>
          <div className='flex-col text-center'>
          <p className='text-4xl dancing-script-400 p-4 text-[#bc9935]'>Zavirite u naš svet šišanja</p>
          <h2 className='text-5xl px-4 -translate-y-4'>Feniranje</h2>
          </div>
        </div>
        <div className='lg:flex justify-center'>
          <div className='flex justify-center'>
            <img src={assets.galeryRad1} className='w-[75%] lg:w-1/2 rounded-xl m-4 shadow-xl mb-20' alt="" />
          </div>
          
          <div className=' lg:w-[25%] p-4 pt-12'>
          <p className="p-8 text-justify border-2 border-[#bc9935] rounded-lg shadow-lg">
            Feniranje je tehnika oblikovanja kose koja donosi volumen i sjaj, stvarajući elegantan i doteran izgled. Bez obzira na tip kose, feniranje pruža savršeno uokvirenje lica, ističući prirodnu lepotu. Naši frizeri koriste savremene alate i proizvode kako bi postigli optimalne rezultate, prilagođavajući stil svakom klijentu.
          </p>

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

export default Feniranje
