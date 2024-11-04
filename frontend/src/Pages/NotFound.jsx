import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const NotFound = () => {
    {toast.error('errro')}
  return (
    <div>
      <div className='pt-40 text-center h-[60vh]'>
        <p className='text-6xl text-[#bc9935]'>Stranicu koju tražite ne postoji.</p>
        <button className='pt-8'><Link to={'/'}><p className='text-4xl p-4 hover:bg-[#bc9935] rounded-lg animate-pulse hover:scale-105 transition-all ease-in-out'>Nazad ka početnoj</p></Link></button>
        
      </div>
    </div>
  )
}

export default NotFound
