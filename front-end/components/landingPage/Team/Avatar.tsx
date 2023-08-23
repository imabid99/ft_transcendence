import React from 'react'
import Image from 'next/image'
import { type } from 'os'

type AvatarProps = {  
  src: string,
  src1: string,
  userName: string
}
export default function Avatar({src,src1, userName}:AvatarProps) {
  return (
    <div className='flex items-center justify-center gap-[0px] cursor-pointer w-[650px]'>
          <div className='relative drop-shadow-4xl'>
          <Image
            src={src}
            alt=''
            width={400}
            height={400}
            className='max-w-[400px] max-h-[400px] object-cover  z-[2] transition-all duration-500 ease-in-out cursor-pointer'
          />
          <Image
            src={src1}
            alt=''
            width={400}
            height={400}
            className=' absolute top-0 left-0 max-w-[400px] max-h-[400px] object-cover overflow-hidden z-[2] transition-all duration-500 ease-in-out cursor-pointer hover:opacity-0'
          />
          </div>
        <p className='font-[Poppins] font-[700] text-[#00000] text-[60px] text-center'>
        {userName.split(' ')[0]} <br/> {userName.split(' ')[1]}
        {!userName.split(' ')[2] ? null : ` ${userName.split(' ')[2]}`}
        </p>
    </div>
  )
}
