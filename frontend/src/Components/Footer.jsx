import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

const Footer = () => {
  return (
    <div className='bg-neutral-900 text-neutral-200 pt-20'>
      <div className='flex justify-evenly'>
        <div className='w-[20%]'>
                <div className='flex justify-left'>
                    <img src={assets.logo} alt="" className='w-1/3 rounded-lg'/>
                </div>
                <p className='text-left'>Mesto gde tvoja frizura i brada dobijaju pažnju koju zaslužuju. Trudim se da pronađemo stil koji ti najbolje pristaje, uz prijatnu atmosferu i pažnju prema svakom detalju. Cilj mi je da svaki put izađeš zadovoljan i sa osmehom.</p>
        </div>
        <div className='w-[20%]'>
            <p className='text-2xl p-1'>Stranice</p>
            <Link to={''}><p className='p-1 text-neutral-400 hover:text-neutral-200 hover:translate-x-2  transition-all duration-200'>Početna</p></Link>
            <Link to={''}><p className='p-1 text-neutral-400 hover:text-neutral-200 hover:translate-x-2  transition-all duration-200'>Termini</p></Link>
            <Link to={''}><p className='p-1 text-neutral-400 hover:text-neutral-200 hover:translate-x-2  transition-all duration-200'>Kontakt</p></Link>
        </div>
        <div className='w-[20%]'>
            <Link to={'/termin'}><p className='text-2xl p-1 hover:text-neutral-500 hover:translate-x-2 transition-all duration-200'>Zakaži termin</p></Link>
            <ScrollLink to='usluge' smooth={true} duration={500} offset={-50} className='cursor-pointer' ><p className='p-1   text-neutral-400 hover:underline underline-offset-4 hover:text-neutral-200 hover:translate-x-2 transition-all duration-200'>Usluge</p></ScrollLink>
            <ScrollLink to='cenovnik' smooth={true} duration={500} offset={-50} className='cursor-pointer' ><p className='p-1 text-neutral-400 hover:underline underline-offset-4 hover:text-neutral-200 hover:translate-x-2 transition-all duration-200' >Cenovnik</p></ScrollLink>
            <ScrollLink to='frizure' smooth={true} duration={500} offset={-50} className='cursor-pointer' ><p className='p-1  text-neutral-400 hover:underline underline-offset-4 hover:text-neutral-200 hover:translate-x-2 transition-all duration-200' >Frizure</p></ScrollLink>
            <ScrollLink to='rad' smooth={true} duration={500} offset={-50} className='cursor-pointer' ><p className='p-1      text-neutral-400 hover:underline underline-offset-4 hover:text-neutral-200 hover:translate-x-2 transition-all duration-200' >Moj rad</p></ScrollLink>
  
        
        </div>
        <div className='w-[20%]'>
            <p className='text-2xl p-1'>Kontakt</p>
            <p className='p-1 text-neutral-400 '>+381 060 123 45 678</p>
            <p className='p-1 text-neutral-400 '>tolmac@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
