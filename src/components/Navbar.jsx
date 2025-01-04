import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className='mx-auto max-w-4xl flex justify-between px-4 h-14 items-center'>

        <div className='logo font-bold text-white text-2xl'>
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            
            </div>
        <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/">About</a>
                <a className='hover:font-bold' href="/">Contact</a>
            </li>
        </ul>
        <button className='text-white bg-green-700 my-5 rounded-full px-2 flex gap-2 justify-center items-center ring-1 ring-white'>
          <img className='invert p-1 w-10' src="/icons/github.svg" alt="" />
          <span className='font-bold'>GitHub</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
