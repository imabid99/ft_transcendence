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

export default function RightMessages({message}: LeftMessagesProps) {
    return (
        <div className="flex  gap-[16px] items-end flex-row-reverse"> 
            <img src="/userProfile.jpg" alt="" className="rounded-full min-w-[44px] min-h-[44px]  max-w-[44px] max-h-[44px]   self-center object-cover"/>
            <span className="flex flex-col gap-[6px]">
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end">You</span>
                <span className="text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#005F64] px-[20px] py-[10px] rounded-br-[30px] rounded-l-[30px] max-w-[400px] max-sm:max-lg:text-[14px] ">
                    {message.content}
                </span>
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end">{message.created_at.split(' ')[4]}</span>
            </span>
        </div>
    )
}