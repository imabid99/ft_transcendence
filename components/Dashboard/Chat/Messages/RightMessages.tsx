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
            <img src="https://via.placeholder.com/50" alt="" className="rounded-full w-[44px] h-[44px]  self-center"/>
            <span className="flex flex-col gap-[6px]">
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end">You</span>
                <span className="text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#005F64] px-[20px] py-[10px] rounded-br-[30px] rounded-l-[30px] max-w-[400px]">{message.content}</span>
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end">{message.created_at.split('T')[1].split('.')[0].substring(0, 5) }</span>
            </span>
        </div>
    )
}