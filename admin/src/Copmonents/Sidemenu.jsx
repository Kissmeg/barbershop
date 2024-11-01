import React from 'react'
import {Link } from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidemenu = () => {
  return (
    <div className='text-white text-2xl font-medium'>
        <div className=' w-full pl-4 pt-20'>
            <div className='flex my-4'>
                <img className='w-6 m-2' src={assets.screen_black} alt="" />
                <Link to={'/'}><p className='hover:translate-x-2 text-neutral-950               hover:text-neutral-600 transition-all ease-in-out'>Overview</p></Link>
            </div>
            <div className='flex my-4'>
                <img className='w-6 m-2' src={assets.users_black} alt="" />
                <Link to={'/DodajKorisnika'}><p className='hover:translate-x-2 text-neutral-950 hover:text-neutral-600 transition-all ease-in-out'>Dodaj korisnike</p></Link>
            </div>
            <div className='flex my-4'>
                <img className='w-6 m-2' src={assets.calendar_black} alt="" />
                <Link to={'/SlobodanDan'}><p className='hover:translate-x-2 text-neutral-950 hover:text-neutral-600 transition-all ease-in-out'>Slobodan dan</p></Link>
            </div>
            <div className='flex my-4'>
                <img className='w-6 m-2' src={assets.users_black} alt="" />
                <Link to={'/SviTermini'}><p className='hover:translate-x-2 text-neutral-950 hover:text-neutral-600 transition-all ease-in-out'>Svi zakazani termini</p></Link>
            </div>
            <div className='flex my-4'>
                <img className='w-6 m-2' src={assets.users_black} alt="" />
                <Link to={'http://localhost:5173'}><p className='hover:translate-x-2 text-neutral-950 hover:text-neutral-600 transition-all ease-in-out'>Povratak na sajt</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Sidemenu
