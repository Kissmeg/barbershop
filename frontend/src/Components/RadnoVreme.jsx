import React from 'react'
import { Link } from 'react-router-dom'

const RadnoVreme = () => {
  return (
    <div className='py-20 bg-neutral-950 animated-section-left' id='radnovr'>
        <div className='text-4xl text-center'>
        <p className='dancing-script-400 amber'>Radno vreme</p>
          </div>
          <div className='text-5xl text-center header'>
              <p className='font-bold text-white mb-4'>Salona</p>
          </div>
          <p className='text-lg font-medium text-neutral-400 text-center p-4'>
             
          </p>

        <div className='lg:flex justify-center gap-4'>
            <div className='m-4 border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>UTO</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='m-4 border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>SRE</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='m-4 border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>ČET</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='m-4 border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>PET</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='m-4 border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>SUB</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
        </div>
        
        <div className='flex justify-center'>
        <Link to={'/termin'}><p className='py-4 text-neutral-200 hover:border-[#bc9355] hover:bg-[#bc9355] hover:text-neutral-950 mt-8 p-4 rounded-xl text-3xl transition-all ease-in-out'>ZAKAŽI TERMIN</p></Link>
        </div>
        <p className='text-center text-neutral-200 italic font-light'>Napomena: ponedeljkom i nedeljom ne radim!</p>
    </div>
  )
}

export default RadnoVreme
