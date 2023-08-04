'use client'
import Nav from '@/components/landingPage/Nav/Nav'
import Home from '@/components/landingPage/Home/Home'
import Team from '@/components/landingPage/Team/Team'
import Pong from '@/components/landingPage/Pong/Pong'
import About from '@/components/landingPage/About/About'
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import HomeDash from '@/components/Dashboard/Home/Home'
import { useState } from 'react'

export default function Page() {
  return (
    // <div className=" w-full h-full no-scrollbar overflow-x-hidden">
    //   <Nav />
    //   <Home />
    //   <Team />
    //   <Pong />
    //   <About/>
    // </div>
    <div className='h-[100vh] w-[100vw] flex '>
      <HomeDash />
    </div>
  )
}
