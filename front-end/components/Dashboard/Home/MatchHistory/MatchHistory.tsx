type props  = {
    winnerAvatar: string,
    winnerName: string,
    winnerScore: string,
    loserAvatar: string
    loserName: string
    loserScore: string
}

const MatchHistory = ({ winnerAvatar, winnerName, winnerScore, loserAvatar, loserName, loserScore }:props) => {
    return (
    <div className="3xl:w-[90%] md:w-11/12 lg:w-[96%] w-[89%] h-[100px] bg-[#f7fbfde9] flex items-center justify-center rounded-[17px]">
        <div className="flex items-center w-[100%] justify-around">
            <div className="flex items-center gap-[8px]">
                <div className="flex items-center justify-center flex-col">
                    <p className="text-[#03335C] text-[8px] font-[600] md:text-[16px] 3xl:text-[8px] ">{winnerName}</p>
                    <p className="text-[#00539D] text-[12px] font-[700] md:text-[16px] 3xl:text-[12px] md:font-[500] 3xl:font-[700]">{winnerScore}</p>
                </div>
                <div className="py-4 md:pl-[20px] 3xl:pl-0">
                    <div className="rounded-full w-[46px] h-[46px] border-2 border-[#B1ECCA] lg:h-[60px] lg:w-[60px] 3xl:w-[46px] 3xl:h-[46px]">
                        <img src={winnerAvatar} alt="" className="object-cover rounded-full w-full h-full"/>
                    </div>
                </div>
                </div>
                <div className="max-w-[30px] max-h-[30px]">
                <img src="removal-2.png" alt="" />
            </div>
            <div className="flex items-center gap-[8px]">
                <div className="md:pr-[20px] 3xl:pr-0">
                    <div className="rounded-full w-[46px] h-[46px] border-2 border-[#ECBAB5] lg:h-[60px] lg:w-[60px] 3xl:w-[46px] 3xl:h-[46px]">
                        <img src={loserAvatar} alt="" className="object-cover rounded-full w-full h-full"/>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col">
                    <p className="text-[#03335C] text-[8px] font-[600] md:text-[16px] 3xl:text-[8px]">{loserName}</p>
                    <p className="text-[#00539D] text-[12px] font-[700] md:text-[16px] 3xl:text-[12px] md:font-[500] 3xl:font-[700]">{loserScore}</p>
                </div>
                </div>
        </div>
    </div>
    );
};

export default MatchHistory;