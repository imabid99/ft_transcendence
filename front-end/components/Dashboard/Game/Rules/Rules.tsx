import Link from "next/link";
import Maps from "../Map/Maps";
import {useState} from 'react';
import { useRouter } from "next/navigation";
type props  = {
    setShow: any,

}
const Rules = ({setShow}:props) => {

    return (
        <>

        <div className=" w-full h-full backdrop-blur-[100px] flex gap-[15px] lg:gap-[72px] flex-col items-center justify-center">
            <div className="w-full flex justify-center pt-[2px] lg:pt-[24px]">
            <img src="king.svg" alt="" className="h-[155px] lg:h-[255px]"/>
            </div>
            <div className="text-center flex gap-[30px] flex-col max-w-[1500px] z-50 px-[40px]">
                <p className="text-[#003A6B] lg:text-[30px] font-[500] font-['Fredoka'] text-[20px] "><span className="text-white text-[30px] font-[500]">Your Objective:</span> Be the first to achieve a stunning <span className="text-white text-[30px] font-[500]">5</span> Victory!</p>
                <p className="text-[#003A6B] lg:text-[30px] font-[500] font-['Fredoka'] text-[20px] "><span className="text-white text-[30px] font-[500]">Basic Controls:</span> Navigate your paddle using the up and down arrow keys, and serve the ball with the space button.</p>
                <p className="text-[#003A6B] lg:text-[30px] font-[500] font-['Fredoka'] text-[20px] "><span className="text-white text-[30px] font-[500]">Paddle Control:</span> Navigate your paddle with finesse using the left and right arrow keys.</p>
                <p className="text-[#003A6B] lg:text-[30px] font-[500] font-['Fredoka'] text-[20px] "><span className="text-white text-[30px] font-[500]">Mobile Mastery:</span> On mobile devices, tap the left side of the screen to gracefully glide your paddle to the left, or tap the right side elegantly steer it to the right, simply tap the screen to serve the ball.</p>
            </div>
            <div className="w-full  flex justify-center gap-[10px] pb-[40px] flex-col items-center md:flex-row">

            <button  onClick={()=>{setShow("map1")
            }} className={`w-[150px] h-[50px] lg:w-[240px] lg:h-[77px] backB rounded-[14px] text-white text-[20px] lg:text-[30px] font-[400] hover:bg-gray-400 font-['Fredoka'] `}>
            NEXT
            </button>
            </div>
        </div>
    </>

);
};

export default Rules;