import React from 'react'

const Stats = () => {
  return (
    <div className='py-20 mt-20 bg-neutral-950 animated-section-left'>
        <div className=' lg:flex  justify-center gap-4 '>
            <div className='lg:w-[20%] py-8'>
                <p className='dancing-script-400 text-center text-[#bc9355] translate-y-4 text-4xl opacity-50'>Uradjenih frizura ove godine</p>
                <p className='font-bold text-neutral-200 text-4xl text-center'>200</p>
            </div>

            <div className='lg:w-[20%] py-8'>
                <p className='dancing-script-400 text-center text-[#bc9355] translate-y-4 text-4xl opacity-50'>Zadovoljnih musterija</p>
                <p className='font-bold text-neutral-200 text-4xl text-center'>1000</p>
            </div>

            <div className='lg:w-[20%] py-8'>
                <p className='dancing-script-400 text-center text-[#bc9355] translate-y-4 text-4xl opacity-50'>Godina iskustva</p>
                <p className='font-bold text-neutral-200 text-4xl text-center'>4</p>
            </div>
        
        </div>
        
        <div className='text-center'>
            
        </div>
    </div>
  )
}

export default Stats
