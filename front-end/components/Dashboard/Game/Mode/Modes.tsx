import Link from "next/link";
import Maps from "../Map/Maps";
import {useState} from 'react';
type props  = {
    setShow: any,
    onModeChange: any

}
const Modes = ({setShow, onModeChange}:props) => {
    const [selected, setSelected] = useState('');
    const handleClick = (mode:string) => {
  setSelected(mode);
  onModeChange(mode);
  
}
    return (
        <>

        <div className="w-[100%] max-w-[1370px] xl:h-[830px] rounded-[100px] backdrop-blur-[10px] backSh flex gap-[72px] flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full flex justify-center pt-[24px]">
            <img src="king.svg" alt="" />
            </div>
            <div className="flex gap-[20px] justify-center flex-col xl:flex-row items-center">
            <div className="flex gap-[20px] flex-col lg:flex-row items-center">
                <div className={`w-[372px] min-h-[201px] rounded-[14px] aiSh relative overflow-hidden cursor-pointer ${selected === 'FRIEND' ? 'border-4 border-white backdrop-blur-[20px] bg-black' : ''}`} onClick={() => handleClick('FRIEND')}>
                <img
                    src="play2.jpeg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                />
                <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[600] text-[40px] z-10 top-[120px] hover-move w-full h-full font-['Fredoka']">
                    FRIEND
                </p>
                <div className="dark-overlay" />
                </div>
                <div className={`w-[372px] h-[201px] rounded-[14px] aiSh relative overflow-hidden cursor-pointer ${selected === 'RANDOM' ? 'border-4 border-white backdrop-blur-md'  : ''}`}
            onClick={() => handleClick('RANDOM')}>
                <img
                    src="playR.jpeg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                />
                <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[600] text-[40px] z-10 top-[120px] hover-move w-full h-full font-['Fredoka']">
                    RANDOM
                </p>
                <div className="dark-overlay" />
                </div>
            </div>
            <div>
                <div className={`w-[372px] h-[201px] rounded-[14px] aiSh relative overflow-hidden cursor-pointer ${selected === 'AI' ? 'border-4 border-white backdrop-blur-md' : ''}`}
            onClick={() => handleClick('AI')}>
                <img
                    src="playai1.jpeg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                />
                <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[600] text-[40px] z-10 top-[120px] hover-move w-full h-full font-['Fredoka']">
                    AI
                </p>
                <div className="dark-overlay" />
                </div>
            </div>
            </div>
            <div className="w-full  flex justify-center gap-[10px] pb-[40px] flex-col items-center md:flex-row">
            <button disabled={!selected} onClick={()=>setShow("map")} className={`w-[240px] h-[77px] backB rounded-[14px] text-white text-[30px] font-[400] hover:bg-gray-400 font-['Fredoka'] ${!selected ? 'cursor-not-allowed text-[20px]' : ''}`}>
                {selected ? 'Next' : 'Choose Mode'}
            </button>
            </div>
        </div>
    </>

);
};

export default Modes;