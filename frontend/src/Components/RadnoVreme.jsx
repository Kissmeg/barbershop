import React from 'react'

const RadnoVreme = () => {
  return (
    <div className='py-20 bg-neutral-950' id='radnovr'>
        <div className='text-4xl text-center'>
        <p className='dancing-script-400 amber'>Radno vreme</p>
          </div>
          <div className='text-5xl text-center header'>
              <p className='font-bold text-white mb-4'>Salona</p>
          </div>
          <p className='text-lg font-medium text-neutral-400 text-center p-4'>
             
          </p>

        <div className='flex justify-center gap-4'>
            <div className='border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>UTO</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>SRE</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>ČET</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>PET</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
            <div className='border-2 text-center bg-neutral-800 border-[#bc9355] text-[#bc9355] p-8 rounded-lg hover:scale-110 transition-all ease-in-out'>
                <p className='text-2xl'>SUB</p>
                <p className='text-white'>8-18 ČASOVA</p>
            </div>
        </div>
        
        <div className='text-center'>
            <p className='text-4xl py-4 font-bold text-white'>NEDELJOM I PONEDELJKOM NE RADIM</p>
        </div>
    </div>
  )
}

export default RadnoVreme
