import React from 'react'
import {Link } from 'react-router-dom'
const Sidemenu = () => {
  return (
    <div className='text-white text-2xl font-medium'>
        <div className='w-full pl-4 pt-20'>
            <div className='flex my-4'>
                <img src="" alt="" />
                <Link to={'/'}><p className='hover:translate-x-2 hover:text-neutral-200 transition-all ease-in-out'>HOME</p></Link>
            </div>
            <div className='flex my-4'>
                <img src="" alt="" />
                <Link to={'/DodajKorisnika'}><p className='hover:translate-x-2 hover:text-neutral-200 transition-all ease-in-out'>DODAJ KORISNIKE</p></Link>
            </div>
            <div className='flex my-4'>
                <img src="" alt="" />
                <Link to={'/DodajKorisnika'}><p className='hover:translate-x-2 hover:text-neutral-200 transition-all ease-in-out'>UZMI SLOBODAN DAN</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Sidemenu
