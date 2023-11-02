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
    <div className="3xl:w-[90%] md:w-11/12 lg:w-[96%] w-[89%] h-[70px] bg-[#f5fbff] flex items-center justify-center rounded-[17px]">
        <div className="flex items-center w-[100%] justify-around">
            <div className="flex items-center gap-[8px]">
                <div className="flex items-center justify-center flex-col">
                    <p className="text-[#03335C] text-[8px] font-[600]">{winnerName}</p>
                    <p className="text-[#00539D] text-[12px] font-[700]">{winnerScore}</p>
                </div>
                <div className="">
                    <div className="rounded-full w-[46px] h-[46px] border-2 border-[#B1ECCA]">
                        <img src={winnerAvatar} alt="" className="object-cover rounded-full w-full h-full"/>
                    </div>
                </div>
                </div>
                <div className="max-w-[30px] max-h-[30px]">
                <img src="removal-2.png" alt="" />
            </div>
            <div className="flex items-center gap-[8px]">
                <div className="">
                    <div className="rounded-full w-[46px] h-[46px] border-2 border-[#ECBAB5]">
                        <img src={loserAvatar} alt="" className="object-cover rounded-full w-full h-full"/>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col">
                    <p className="text-[#03335C] text-[8px] font-[600]">{loserName}</p>
                    <p className="text-[#00539D] text-[12px] font-[700]">{loserScore}</p>
                </div>
                </div>
        </div>
    </div>
    );
};

export default MatchHistory;