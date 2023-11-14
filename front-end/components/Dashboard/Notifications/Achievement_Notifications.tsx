import Link from "next/link";

type props  = {
    name: string,
    avatar: string,
}

export default function AchievementsNotifications({name, avatar}: props) {
    return (
        <div className="flex justify-center">
        <div className="w-11/12 ">
            <div className="w-full sm:h-[106px] rounded-[20px] bg-[#F3F5F7] items-center justify-center flex">
            <div className="flex  w-11/12 justify-between items-center  py-[18px] flex-col sm:flex-row sm:gap-0 gap-[20px]">
                <div className="flex items-center gap-[16px] ">
                    <div className="h-[70px] w-[70px] rounded-full  relative">
                        <div className="absolute left-12">
                            <img src="achnot.svg" alt="" />
                        </div>
                        <img
                        src={avatar}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div className="flex gap-[3px] flex-col">
                        <p className="text-black font-[600]">{name}</p>
                        <p className="text-[#9DA0A6] text-[12px] font-[500]">Congratulations! You earned a new <span className="text-black text-[12px] font-[600]">Achievement!</span></p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}