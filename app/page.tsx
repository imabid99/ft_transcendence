'use client'
import Nav from '@/components/Nav/Nav'
import Home from '@/components/Home/Home'
import Team from '@/components/Team/Team'
import Pong from '@/components/Pong/Pong'
import About from '@/components/About/About'
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard'
import HomeDash from '@/components/Dashboard/Home/Home'
import { useState } from 'react'

export default function Page() {
  return (
    <div className=" w-full h-full no-scrollbar overflow-x-hidden">
      <Nav />
      <Home />
      <Team />
      <Pong />
      <About/>
    </div>
    // <div className='h-[100vh] w-[100vw] flex '>
    //   <HomeDash />
    // </div>
  )
}
