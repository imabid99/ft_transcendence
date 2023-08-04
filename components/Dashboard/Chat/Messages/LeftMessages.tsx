import { type } from "os"

type LeftMessagesProps = {
    message: {
        message_id: number,
        message_from: number,
        message_to: number,
        content: string,
        created_at: string,
    }
}

export default function LeftMessages({message}: LeftMessagesProps) {
    return (
        <div className="flex gap-[16px] items-start"> 
            <img src="/userProfile.jpg" alt="" className="rounded-full min-w-[44px] min-h-[44px]  max-w-[44px] max-h-[44px] self-center object-cover"/>
            <span className="flex flex-col gap-[6px]">
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-start">{message.message_from}</span>
                <span className="text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#005F64] px-[20px] py-[10px] rounded-bl-[30px] rounded-r-[30px] max-w-[400px] max-sm:max-lg:text-[14px] ">
                    {message.content}
                </span>
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500]">{message.created_at.split(' ')[4]}</span>
            </span>
        </div>
    )
}