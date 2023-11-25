type LeftMessagesProps = {
    message: {
        fromName :    String,
        content :   String,
        createdAt:  String,
        Avatar?:     String,
    },
}

export default function LeftMessagesGroup({message}: LeftMessagesProps) {

    return (
        <div className="flex gap-[16px] items-start"> 
            <img src={`
                http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${message?.Avatar}
            `} alt="" className="rounded-full min-w-[44px] min-h-[44px]  max-w-[44px] max-h-[44px] self-end mb-[29px] object-cover"/>
            <span className="flex flex-col gap-[6px]">
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-start">{message?.fromName}</span>
                <span className="text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#989898] px-[20px] py-[10px] rounded-tl-[30px] rounded-r-[30px] max-w-[400px] max-sm:max-lg:text-[14px] break-words">
                    {message.content}
                </span>
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500]">{message.createdAt.split('T')[1].split('.')[0].slice(0, 5)}</span>
            </span>
        </div>
    )
}