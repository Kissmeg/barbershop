import React from 'react'
import { assets } from '../assets/assets'

const Frizure = () => {
  return (
    <div id='frizure' className='animated-section-left'>
      <div className='flex justify-center gap-4 '>
        <div className='w-[20%]'>
            <div className='flex justify-center'>
                <img className='rounded-sm w-32 translate-y-5' src={assets.fade1} alt="" />
            </div>
            <div className='py-8 bg-neutral-200 rounded-md'>
                <p className='text-xl text-center font-bold'>KLASIČNO ŠIŠANJE</p>
                <p className='pt-4 text-center'>Klasično šišanje podrazumeva jednostavan i uredan stil koji nikada ne izlazi iz mode.</p>
            </div>
        </div>
        <div className='w-[20%]'>
            <div className='flex justify-center'>
                <img className='rounded-sm w-32 translate-y-5' src={assets.fade2} alt="" />
            </div>
            <div className='py-8 bg-neutral-200 rounded-md'>
                <p className='text-xl text-center font-bold'>FADE</p>
                <p className='pt-4 text-center'>Fade je frizura koja se odlikuje postepenim prelazom između kraće kose na stranama i duže kose na vrhu.
                </p>
            </div>
        </div>
        <div className='w-[20%]'>
            <div className='flex justify-center'>
                <img className='rounded-sm w-32 translate-y-5' src={assets.fade3} alt="" />
            </div>
            <div className='py-8 bg-neutral-200 rounded-md'>
                <p className='text-xl text-center font-bold'>BUZZCUT</p>
                <p className='pt-4 text-center'>Buzzcut je kratka frizura šišana mašinicom na uniformnu dužinu.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Frizure
