import Avatar from '../Avatar/Avatar'
import Link from 'next/link'
type ChannelProps = {
    avatar: string,
    channel: string,
    lastMessage: string | null | undefined,
    lastMessageTime: string | null | undefined,
    notification: number,
    active: boolean,
    link: string,
}


export default function Channel({avatar, channel, lastMessage, lastMessageTime, notification, active, link}: ChannelProps) {
    return (
        <Link href={`/Chat/${link}`} className="cursor-pointer w-full flex justify-between items-center " >
            <div className="flex items-center gap-[14px]">
                <Avatar url={avatar} status={active}/>
                <span>
                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] max-w-[200px] truncate lsm:max-lg:max-w-[152px]">
                        {channel}
                    </p>
                    <p className="text-[#C0C1C5] text-[16px] font-[Poppins] font-[300] max-w-[200px] truncate lg:max-xl:max-w-[150px] lsm:max-lg:max-w-[120px]">
                        {lastMessage}
                    </p>
                </span>
            </div>
            <div className="flex flex-col items-end gap-[13px]">
                {
                    !notification ?
                    (
                        <span>
                            <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6.67469L4.4 10.1213M9.16 4.60674L12.56 1.16016M6.44 6.67469L9.84 10.1213L18 1.16016" stroke="#30C7EC"  />
                            </svg> 
                        </span>
                    ):
                    (
                        <span className="flex justify-center items-center w-[20px] h-[20px] rounded-full bg-[#30C7EC] text-[#fff] text-[10px] font-[Poppins] font-[500]">
                            {
                                notification > 99 ? '99+' : notification
                            }
                        </span>
                    )


                }
                <p className="text-[#C0C1C5] text-[14] font-[Poppins] font-[300]">
                    {lastMessageTime}
                </p>
            </div>
        </Link>
)
}