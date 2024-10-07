import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { Context } from '../Context/Context'

const Salon = () => {
    
  return (
    <div id='salon' className='pt-20 animated-section-left '>
      <div className='text-4xl text-center '>
            <p className='dancing-script-400 amber'>Otkrijte</p>
        </div>
        <div className='text-5xl text-center'>
            <p className='font-bold'>Šta nudimo u našem salonu</p>
        </div>
        <p className='text-lg font-medium text-neutral-400 text-center p-4 '>Savršena kombinacija stila i nege – moderna šišanja, precizno oblikovanje brade i pažljivo tretiranje kose kako bi tvoj izgled uvek bio na vrhunskom nivou.</p>
        <div className='lg:flex justify-center gap-16 px-4'>
            <div className='shadow-xl rounded-md p-4 lg:w-[20%] text-center'>
                <div className='flex justify-center'>
                    <img className='py-8' src={assets.barbershop} alt="" />
                </div>
                <p className='text-xl font-bold'>Prijatna atmosfera</p>
                <p className='text-sm py-2 font-medium'>Uživajte u opuštenoj atmosferi našeg barbershopa, gde se svaki detalj pažljivo uklapa da biste se osećali kao kod kuće.</p>
                <div className='flex justify-center py-4'>
                    <ScrollLink to='location' smooth={true} duration={500} offset={-50} className='cursor-pointer'>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Naša adresa </span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </ScrollLink>
                </div>
            </div>

            <div className='shadow-xl rounded-md p-4 lg:w-[20%] text-center'>
                <div className='flex justify-center'>
                    <img className='py-8' src={assets.barbertools} alt="" />
                </div>
                <p className='text-xl font-bold'>Profesionalni proizvodi</p>
                <p className='text-sm py-2 font-medium'>Koristim samo najkvalitetnije proizvode na trzištu za negu i stil, kako bih vašoj frizuri pružio savršen i dugotrajan izgled. </p>
                <div className='flex justify-center py-4'>
                    <ScrollLink to='cenovnik' smooth={true} duration={500} offset={-50} className='cursor-pointer'>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Usluge i cene</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </ScrollLink>
                </div>
            </div>

            <div className='shadow-xl rounded-md p-4 lg:w-[20%] text-center'>
                <div className='flex justify-center'>
                    <img className='py-8' src={assets.barberchair} alt="" />
                </div>
                <p className='text-xl font-bold'>Stručnost i stil</p>
                <p className='text-sm py-2 font-medium'>Dođite i prepustite se veštini mog frizerskog umeća, gde se ponosim pažnjom prema svakom klijentu. U mom barbershopu, vaša frizura je moj prioritet.</p>
                <div className='flex justify-center py-4'>
                    <ScrollLink to='rad' smooth={true} duration={500} offset={-50} className='cursor-pointer'>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Moj rad</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </ScrollLink>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Salon
