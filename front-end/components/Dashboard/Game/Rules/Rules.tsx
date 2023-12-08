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
                <p className="text-[#003A6B] lg:text-[30px] font-[500] font-['Fredoka'] text-[16px] "><span className="text-white lg:text-[30px] font-[500] text-[16px]">Your Objective:</span> Be the first to achieve <span className="text-white lg:text-[30px] font-[500] text-[16px]">5 Pts</span> !</p>
                <p className="text-[#003A6B] lg:text-[30px] font-[500] font-['Fredoka'] text-[16px] "><span className="text-white lg:text-[30px] font-[500] text-[16px]">Basic Controls:</span> Navigate your paddle using the left and right arrow keys, and serve the ball with the space button.</p>
                <p className="text-[#003A6B] lg:text-[30px] font-[500] font-['Fredoka'] text-[16px] "><span className="text-white lg:text-[30px] font-[500] text-[16px]">Mobile Controls:</span> On mobile devices, tap the left or the right side of the screen to move the paddle, and simply tap the screen to serve the ball.</p>
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