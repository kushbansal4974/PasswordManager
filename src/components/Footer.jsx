import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center p-5 gap-8'>
        <div className='logo font-bold text-white text-2xl'>
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            
            </div>
      <div className='flex gap-2'>
        Created <img width={20} src="/icons/heart.png" alt="" /> by PassOP
      </div>
    </div>
  )
}

export default Footer