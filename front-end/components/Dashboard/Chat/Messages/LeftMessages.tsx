type LeftMessagesProps = {
    message: {
        fromId :    number,
        toId  :     number,
        content :   String,
        createdAt:  String,
    },
    sender: any,
}

export default function LeftMessages({message, sender}: LeftMessagesProps) {

    return (
        <div className="flex gap-[16px] items-start"> 
            <img src={
                `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${sender?.avatar}`
            } alt="" className="rounded-full min-w-[44px] min-h-[44px]  max-w-[44px] max-h-[44px] self-end mb-[29px] object-cover"/>
            <span className="flex flex-col gap-[6px]">
                <span className="text-[#869caf] text-[15px] font-[Poppins] font-[500] self-start max-w-[150px] truncate  ">{sender?.username}</span>
                <span className="w-fit text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#d6d6d6] px-[20px] py-[10px] rounded-tl-[20px] rounded-r-[20px] max-w-[400px] max-sm:max-lg:text-[14px] break-words lsm:max-sm:max-w-[210px] lsm:max-sm:text-[13px]">
                    {message.content}
                </span>
                <span className="text-[#869caf] text-[15px] font-[Poppins] font-[500]">{message.createdAt.split('T')[1].split('.')[0].slice(0, 5)}</span>
            </span>
        </div>
    )
}

