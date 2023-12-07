import Link from "next/link";

import {useState} from 'react';
// type props  = {
//     name: string,
//     username: string,
//     avatar: string,
//     cover: string,
//     online: string
//     userId: string
// }
type props  = {
    setShow: any,
    onMapChange: any
}

const Maps = ({setShow, onMapChange}:props) => {
    const [selected, setSelected] = useState('');
    const [videoSource, setVideoSource] = useState("");

    const handleClick = (map:string) => {
  setSelected(map);
  onMapChange(map);
}

    return (
        <>
        <div className="absolute top-0 left-0 w-full h-full  overflow-hidden">
            <video
                    src={videoSource}
                    autoPlay={true}
                    muted={true}
                    loop={true}  
                    className="h-full object-cover w-full"
                    controls={false}
                    disablePictureInPicture={false}
                    data-wf-ignore={true}
                />
        </div>
        <div className="w-full h-full  backdrop-blur-[10px] backSh flex gap-[15px] lg:gap-[72px] flex-col items-center justify-center">
            <div className="w-full flex justify-center pt-[2px] lg:pt-[24px]   ">
            <img src="king.svg" alt=""  className=" h-[155px] lg:h-[255px]"/>
            </div>
            <div className="flex gap-[20px] justify-center flex-col 2xl:flex-row items-center ">
            <div className="flex gap-[20px] flex-col lg:flex-row items-center">
                <div className={`w-[290px] lg:w-[372px] h-[150px] lg:h-[201px] rounded-[14px] aiSh relative overflow-hidden cursor-pointer ${selected === 'forest' ? 'border-4 border-white backdrop-blur-[20px] bg-black' : ''}`}     onClick={() => {
        handleClick('forest');
        setVideoSource('pexels-mathias-de-rivo-13680000 (720p).mp4');
    }}>
                <img
                    src="forest7.jpeg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                />
                <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[600] text-[40px] z-10 top-[40px] lg:top-[120px] hover-move w-full h-full font-['Fredoka']">
                    FOREST
                </p>
                <div className="dark-overlay" />
                </div>
                <div className={`w-[290px] lg:w-[372px] h-[150px] lg:h-[201px] rounded-[14px] aiSh relative overflow-hidden cursor-pointer ${selected === 'desert' ? 'border-4 border-white backdrop-blur-lg'  : ''}`}
            onClick={() => {
                handleClick('desert');
                setVideoSource('131220 (540p).mp4');
            }}>
                <img
                    src="desert1.jpeg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                />
                <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[600] text-[40px] z-10 top-[40px] lg:top-[120px] hover-move w-full h-full font-['Fredoka']">
                    DESERT
                </p>
                <div className="dark-overlay" />
                </div>
            </div>
            <div>
                <div className={`w-[290px] lg:w-[372px] h-[150px] lg:h-[201px] rounded-[14px] aiSh relative overflow-hidden cursor-pointer ${selected === 'snow' ? 'border-4 border-white backdrop-blur-lg' : ''}`}
            onClick={() => {
                handleClick('snow');
                setVideoSource('/pexels-bethe-observer-6906495 (2160p).mp4');
            }}>
                <img
                    src="snow7.jpeg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                />
                <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[600] text-[40px] z-10 top-[40px] lg:top-[120px] hover-move w-full h-full font-['Fredoka']">
                    SNOW
                </p>
                <div className="dark-overlay" />
                </div>
            </div>
            </div>
            <div className="w-full  flex justify-center gap-[10px] pb-[40px] flex-col items-center lg:flex-row">
            <button disabled={!selected} onClick={()=>setShow("map")} className={`w-[150px] h-[50px] lg:w-[240px] lg:h-[77px] backB rounded-[14px] text-white text-[20px] lg:text-[30px] font-[400] hover:bg-gray-400 font-['Fredoka'] ${!selected ? 'cursor-not-allowed text-[20px]' : ''}`}>
                {selected ? 'Next' : 'Choose Map'}
            </button>
            </div>
        </div>
    </>


);
};

export default Maps;



