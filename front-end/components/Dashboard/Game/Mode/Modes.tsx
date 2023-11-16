import Link from "next/link";

// type props  = {
//     name: string,
//     username: string,
//     avatar: string,
//     cover: string,
//     online: string
//     userId: string
// }

const Modes = () => {

    return (
    <>
        <div className="absolute top-0 left-0 w-full h-full  overflow-hidden">
            <video
                src="Europa Official Game Reveal Trailer.mp4"
                autoPlay={true}
                muted={true}
                loop={true}  
                className="h-full object-cover w-full"
                controls={false}
                disablePictureInPicture={false}
            />
        </div>
        <div className="w-[1370px] xl:h-[830px] rounded-[100px] backdrop-blur-[20px] backSh flex gap-[72px] flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full flex justify-center pt-[24px]">
                <img src="king.svg" alt="" />
            </div>
            <div className="flex gap-[20px] justify-center flex-col xl:flex-row items-center">
                <div className="flex gap-[20px] flex-col lg:flex-row items-center">
                <div className="w-[372px] min-h-[201px] rounded-[14px] aiSh relative overflow-hidden ">
                    <img
                    src="aiimg.svg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                    />
                    <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[400] text-[40px] z-10 top-[120px] hover-move w-full h-full font-['Fredoka']">
                    AI
                    </p>
                    <div className="dark-overlay" />
                </div>
                <div className="w-[372px] h-[201px] rounded-[14px] aiSh relative overflow-hidden">
                    <img
                    src="randomimg.svg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                    />
                    <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[400] text-[40px] z-10 top-[120px] hover-move w-full h-full font-['Fredoka']">
                    FRIEND
                    </p>
                    <div className="dark-overlay" />
                </div>
                </div>
                <div>
                <div className="w-[372px] h-[201px] rounded-[14px] aiSh relative overflow-hidden">
                    <img
                    src="aiimg.svg"
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover  z-0 blur-[0.5px]"
                    />
                    <p className="absolute  backdrop-blur-[0.5px] text-center text-white font-[400] text-[40px] z-10 top-[120px] hover-move w-full h-full font-['Fredoka']">
                    RANDOM
                    </p>
                <div className="dark-overlay" />
                </div>
            </div>
            </div>
            <div className="w-full  flex justify-center gap-[10px] pb-[40px] flex-col items-center md:flex-row">
                <button className="w-[240px] h-[77px] retB rounded-[14px] text-white text-[30px] font-[400] hover:bg-gray-400 font-['Fredoka']">
                    Back
                </button>
                <button className="w-[240px] h-[77px] backB rounded-[14px] text-white text-[30px] font-[400] hover:bg-gray-400 font-['Fredoka']">
                    Next
                </button>
            </div>
        </div>
    </>

);
};

export default Modes;