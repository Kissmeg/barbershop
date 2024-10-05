import React from 'react'

const Location = () => {
  return (
    <div className=''>
        
      <div className='bg-neutral-700'>
        <div className='flex justify-center'>
            <iframe className='w-[800px] h-[400px] p-4' title='Google Location' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d842.454267920781!2d20.1451069!3d45.5941117!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b2d97ff910d7f%3A0x1e0086208185dd58!2zTmplZ2_FoWV2YSAyNtCQLCBOb3ZpIEJlxI1lag!5e1!3m2!1sen!2srs!4v1727991159229!5m2!1sen!2srs"></iframe>      
        </div>
        <p className='flex-col text-2xl text-center text-neutral-400'>Zakazivanje termina:</p>
        <p className='flex-col text-3xl text-center text-neutral-200'>+381 060 123 45 678</p>
      </div>
    </div>
  )
}

export default Location
