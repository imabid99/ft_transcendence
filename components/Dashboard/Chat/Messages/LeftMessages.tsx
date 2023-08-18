'use client';
import { createContext , useState , useEffect } from 'react';
import  axiosInstance  from '@/utils/axiosInstance';

type LeftMessagesProps = {
    message: {
        fromId :    number,
        toId  :     number,
        content :   String,
        createdAt:  String,
      }
}

export default function LeftMessages({message}: LeftMessagesProps) {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        if (!message) return;
        async function getSender() {
            try
            {
                const resp = await axiosInstance.get(`http://localhost:3000/api/user/profile/${message.fromId}`);
                setUser(resp.data);
            }
            catch (error)
            {
                console.log(error);
                return;
            }
        }
        getSender();
        return () => {
            setUser(null);
        }
    }, [message]);
    console.log(user);
    return (
        <div className="flex gap-[16px] items-start"> 
            <img src="/userProfile.jpg" alt="" className="rounded-full min-w-[44px] min-h-[44px]  max-w-[44px] max-h-[44px] self-center object-cover"/>
            <span className="flex flex-col gap-[6px]">
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500] self-start">{user?.username}</span>
                <span className="text-[#FFF] text-[16px] font-[Poppins] font-[500] bg-[#989898] px-[20px] py-[10px] rounded-bl-[30px] rounded-r-[30px] max-w-[400px] max-sm:max-lg:text-[14px] ">
                    {message.content}
                </span>
                <span className="text-[#AEAEAE] text-[15px] font-[Poppins] font-[500]">{message.createdAt.split('T')[1].split('.')[0].slice(0, 5)}</span>
            </span>
        </div>
    )
}