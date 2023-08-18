import { type } from "os"

type LeftMessagesProps = {
    message: {
        fromId :    number,
        toId  :     number,
        content :   String,
        createdAt:  String,
      }
}
export default function RightMessages({message}: LeftMessagesProps) {
    return (
        <div className="flex  gap-[16px] items-end flex-row-reverse "> 
            <img src="/userProfile.jpg" alt="" className="rounded-full min-w-[44px] min-h-[44px]  max-w-[44px] max-h-[44px]   self-center object-cover"/>
            <span className="flex flex-col gap-[6px]">
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end">You</span>
                <p className="text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#005F64] px-[20px] py-[10px] rounded-br-[30px] rounded-l-[30px] max-w-[400px] break-words">
                    {message.content}
                </p>
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-end">{
                message.createdAt === new Date().toISOString() ? "NOW" : message.createdAt.split('T')[1].split('.')[0].slice(0, 5)
                }</span>
            </span>
        </div>
    )
}