import React from 'react'
import Link from 'next/link'


export default function Nav() {
  return (
    <div className="nav  flex items-center justify-around  fixed w-full z-[100] h-[150px]
    bg-gradient-to-b from-[#064A85] to-transparent 2xl:max-4xl:gap-[150px]
    ">
      <h2 className='logo font-[600] text-white font-[Poppins] text-[28px] bg-white rounded-full shadow-[0px 0px 10px rgba(0, 0, 0, 0.25)] p-[12px]'>
        <img src="/logo.png" alt="" className=' w-[36px]' />
      </h2>
      <div className="nav-links flex items-center gap-[40px]  ">
          <Link className='font-[700] text-white font-[Poppins] hover:after:w-[100%]' href="#Home">
            Home
          </Link>
          <Link className='font-[700] text-white font-[Poppins] hover:after:w-[100%]' href="#Team">
            TEAM
          </Link>
          <Link className='font-[700] text-white font-[Poppins] hover:after:w-[100%]' href="#Pong">
            PONG
          </Link>
          <Link className='font-[700] text-white font-[Poppins] hover:after:w-[100%]' href="/">
            ABOUT
          </Link>
          <Link className='font-[700] text-white font-[Poppins] hover:after:w-[100%]' href="/">
            PLAY
          </Link>
          <button className='bg-gradient-to-r from-[#48C6EF] to-[#6F86D6] py-[10px] px-[35px] rounded-[5px] font-[Poppins] font-[500] text-white'>
            Login
          </button>
      </div>
    </div>
  )
}
