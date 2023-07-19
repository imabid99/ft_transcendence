import React from 'react'
import Image from 'next/image'
export default function Home() {
  return (
    <div id="Home" className="snap-center flex items-center justify-center relative h-[110vh] w-full overflow-hidden">
    <Image
    src="/bg.png"
    alt=""
    width={1600}
    className='absolute top-0 left-0 h-full w-full z-[-1] object-cover filter brightness-50 blur-[8px]'
    height={0}
    />
    <div className='flex items-center justify-around overflow-hidden w-full'>
      <div className='relative text-white min-w-[600px] flex flex-col justify-center gap-[20px]'>
        <Image src="/head/Vector.png"alt="" width={1500} height={0} className='absolute top-[-800px] left-[-500px] object-cover z-[-1]' />
        <Image src="/head/Group15.png" alt="" width={1200} height={0} className='absolute top-0 left-0 object-cover z-[1]'/>
        <p className='font-[700] text-white font-[Poppins] text-[60px]' >Ping <span className='text-[#46AEF7]'>PONG</span> <br/>Let The Fun Begin.</p>
        <p className='font-[700] text-white font-[Poppins] text-[16px] line-height-[45px] mt-[20px] w-[480px] '>
          {`Whether you're a seasoned pro or a beginner, we have everything you need to improve your game and have fun on the table.`}
        </p>
        <button className='bg-gradient-to-r from-[#48C6EF] to-[#6F86D6] py-[10px] px-[35px] rounded-[5px] font-[Poppins] font-[500] text-white w-[203px] mt-[20px]'>
          PLAY NOW
        </button>
      </div>
      <Image src="/hero.png" alt="" width={700} height={0} className='mt-[400px] object-cover justify-self-end' />
    </div>
   <Image
      src="/wave.svg"
      alt=""
      width={0}
      height={0}
      className='absolute wave1 w-full mt-[-350px] bottom-0 z-[1]'
      />
    </div>
  )
}
