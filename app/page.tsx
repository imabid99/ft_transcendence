'use client'
import Nav from '@/components/Nav/Nav'
import Home from '@/components/Home/Home'
import Team from '@/components/Team/Team'
import Pong from '@/components/Pong/Pong'
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import HomeDash from '@/components/Dashboard/Home/Home'

import { useState } from 'react'

export default function Page() {
  return (
    // <div className=" snap-proximity snap-y">
    //   <Nav />
    //   <Home />
    //   <Team />
    //   <Pong />
    //   <div className='bg-[#EAF5FF] h-[100vh]'>
    //     <div className='relative overflow-hidden h-[70%] max-w-[700px]'>
    //     </div>
    //   </div>
    //   <div className='bg-[#EAF5FF] h-[100vh]'>csdcdc</div>
    // </div>
    <div className='h-[100vh] w-[100vw] flex '>
      <Dashboard />
      {/* <div className='flex w-[calc(100%-150px)] bg-[#FAFDFF] justify-center ml-[150px] h-[100vh] overflow-y-scroll'> */}
        <HomeDash />
      {/* </div> */}
    </div>
  )
}
