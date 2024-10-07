import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from './Title'
import { Link } from 'react-router-dom'

const Usluga = () => {
  return (
    <div id='usluge' className='pt-20 animated-section-left'>
        <div className='text-4xl text-center '>
            <p className='dancing-script-400 amber'>Moje usluge</p>
        </div>
        <div className='text-5xl text-center header'>
            <p className='font-bold'>Dugogodišnjeg rada</p>
        </div>
        <p className='text-lg font-medium text-neutral-400 text-center p-4 '></p>     
        <div className='lg:flex justify-center gap-16 px-4'>
            <div className='group shadow-xl rounded-md p-4 lg:w-[20%] text-center hover:scale-105 transition-all hover:bg-gradient-to-b from-[#b8905b] to-black'>
                <div className='flex justify-center'>
                    <img className='py-8 group-hover:hidden' src={assets.clippers} alt="" />
                    <img className='py-8 hidden group-hover:flex' src={assets.clippers_black} alt="" />
                </div>
                <p className='group-hover:text-[#BC9355] text-xl font-bold'>Šišanje</p>
                <p className='text-sm py-2 font-medium group-hover:text-[#c29d66]'>Uživajte u vrhunskom šišanju u našem barbershopu, gde svaki rez oslikava vašu jedinstvenu ličnost. Naši iskusni brijači će se pobrinuti da dobijete savršenu frizuru koja odgovara vašem stilu, a pritom se opustite u prijatnoj atmosferi.</p>
                <div className='flex justify-center py-4'>
                    <Link>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Više</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='group shadow-xl rounded-md p-4 lg:w-[20%] text-center hover:scale-105 transition-all hover:bg-gradient-to-b from-[#b8905b] to-black'>
                <div className='flex justify-center'>
                    <img className='py-8 group-hover:hidden' src={assets.scissors} alt="" />
                    <img className='py-8 hidden group-hover:flex' src={assets.scissors_black} alt="" />
                </div>
                <p className='group-hover:text-[#BC9355] text-xl font-bold'>Štucovanje</p>
                <p className='text-sm py-2 font-medium group-hover:text-[#c29d66]'>Povedite se trendovima uz naše profesionalno stučovanje! Naši brijači koriste najnovije tehnike kako bi vam pružili savršeno izdeformisano šišanje koje će osvežiti vaš izgled. Osetite razliku dok se opuštate u našem udobnom ambijentu.</p>
                <div className='flex justify-center py-4'>
                    <Link>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Više</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='group shadow-xl rounded-md p-4 lg:w-[20%] text-center hover:scale-105 transition-all hover:bg-gradient-to-b from-[#b8905b] to-black'>
                <div className='flex justify-center'>
                    <img className='py-8 group-hover:hidden' src={assets.razor} alt="" />
                    <img className='py-8 hidden group-hover:flex' src={assets.razor_black} alt="" />
                </div>
                <p className='group-hover:text-[#BC9355] text-xl font-bold'>Oblikovanje brade</p>
                <p className='text-sm py-2 font-medium group-hover:text-[#c29d66]'>U našem barbershopu oblikovanje brade postaje prava umetnost. Naši stručnjaci će pažljivo oblikovati vašu bradu prema vašim željama, pružajući vam besprekornu završnicu i savršenu definiciju. Osećajte se sigurno i samouvereno s novim stilom.</p>
                <div className='flex justify-center py-4'>
                    <Link>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Više</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>
                </div>
            </div>
            
      </div>
      <div className='lg:flex justify-center gap-16 pt-10 px-4'>
            <div className='group shadow-xl rounded-md p-4 lg:w-[20%] text-center hover:scale-105 transition-all hover:bg-gradient-to-b from-[#b8905b] to-black'>
                <div className='flex justify-center'>
                    <img className='py-8 group-hover:hidden' src={assets.hairfan} alt="" />
                    <img className='py-8 hidden group-hover:flex' src={assets.hairfan_black} alt="" />
                </div>
                <p className='group-hover:text-[#BC9355] text-xl font-bold'>Feniranje</p>
                <p className='text-sm py-2 font-medium group-hover:text-[#c29d66]'>Uživajte u savršenom feniranju koje će vašoj kosi dati dodatni sjaj i volumen. Naši brijači koriste profesionalne tehnike kako bi osigurali da vaša frizura bude besprekorna i dugotrajna.</p>
                <div className='flex justify-center py-4'>
                    <Link>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Više</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='group shadow-xl rounded-md p-4 lg:w-[20%] text-center hover:scale-105 transition-all hover:bg-gradient-to-b from-[#b8905b] to-black'>
                <div className='flex justify-center'>
                    <img className='py-8 group-hover:hidden' src={assets.barbertools} alt="" />
                    <img className='py-8 hidden group-hover:flex' src={assets.barbertools_black} alt="" />
                </div>
                <p className='group-hover:text-[#BC9355] text-xl font-bold'>Fazoniranje</p>
                <p className='text-sm py-2 font-medium group-hover:text-[#c29d66]'>Fazoniranje je ključni korak ka postizanju savršene frizure. Naši brijači su vešti u stvaranju modernih i klasičnih fazona koji će vam pomoći da istaknete svoj stil. Uživajte u procesu kreiranja frizure koja će vas osvežiti.</p>
                <div className='flex justify-center py-4'>
                    <Link>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Više</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>
                </div>
            </div>


            <div className='group shadow-xl rounded-md p-4 lg:w-[20%] text-center hover:scale-105 transition-all hover:bg-gradient-to-b from-[#b8905b] to-black'>
                <div className='flex justify-center'>
                    <img className='py-8 group-hover:hidden' src={assets.products} alt="" />
                    <img className='py-8 hidden group-hover:flex' src={assets.products_black} alt="" />
                </div>
                <p className='group-hover:text-[#BC9355] text-xl font-bold'>Proizvodi</p>
                <p className='text-sm py-2 font-medium group-hover:text-[#c29d66]'>U našem barbershopu nudimo pažljivo odabrane proizvode koji će vam pomoći da održite svoj stil i izgled između poseta. Savetujemo vas kako da najbolje iskoristite proizvode i negujete svoj izgled.</p>
                <div className='flex justify-center py-4'>
                    <Link>
                        <div className="group relative inline-block px-4 py-2 text-2xl font-bold text-gray-800">
                            <span className='duration-300 group-hover:text-[#b8905b]'>Više</span>
                            <div className="absolute border-l-2 border-b-2 border-[#b8905b] bottom-0 left-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                            <div className="absolute border-t-2 border-r-2 border-[#b8905b] top-0 right-0 h-4 w-4 group-hover:h-0 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </Link>
                </div>
            </div>
            
      </div>
    </div>
  )
}

export default Usluga
