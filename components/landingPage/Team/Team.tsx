import React from 'react'
import Avatar from './Avatar'
export default function Team() {
  return (
    <div id="Team" className='snap-center  bg-[#EAF5FF] flex flex-col items-center justify-center w-full'>
          <h1 className='Team text-[#46AEF7] text-[150px] font-[Poppins] font-[700] 
         justify-self-start
        line-height-[225px]'
          >Team</h1>
        <div className='flex justify-center w-full  bg-[#EAF5FF] flex-wrap pt-[150px] max-w-[1500px] gap-[100px]'>
            <Avatar userName="Achraf Sabbar" src="/Team/achraf.png" src1="/Team/achrafB.png"/>
            <Avatar userName="Imad Abid"     src="/Team/imad.png" src1="/Team/imadB.png"/>
            <Avatar userName="Zakariae Ait Sliman" src="/Team/zakaria.png" src1="/Team/zakariaB.png"/>
            <Avatar userName="Saad Gmira" src="/Team/Saad.png" src1="/Team/SaadB.png"/>
        </div> 
    </div>
  )
}
