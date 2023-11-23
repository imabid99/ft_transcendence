'use client';
import UserModal from '../../Home/userModal/userModal'
import { useContext } from 'react';
import { contextdata } from '@/app/contextApi';
import Link from 'next/link';

type HeaderProps = {
    modalRef?: any,
    handelShaw?: any,
    show?: boolean,
    notifRef?: any,
    notifIconRef?: any
}


export default function Header({show, modalRef,handelShaw,notifRef,notifIconRef}: HeaderProps) {
    const handelNotifShaw = (Ref: any) => {
        Ref.current.classList.remove('notif')
    }
    const {profiles, user}:any = useContext(contextdata);
    const myProfile = profiles?.find((profile:any) => profile.userId === user.id);
    const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
    return (
        <div className="flex items-center h-[100px] w-full  justify-center pt-[100px]
        
        ">
                <div className='header__right flex  h-[90px] items-center justify-between   gap-[10px]  px-[30px] lg:px-[20px] xl:px-0 w-[922px] 3xl:w-[1884px] '>
                    <div className='flex gap-[30px]  w-full'>
                        <div className='hidden 3xl:block'>
                            <p className="text-[18px] font-[500] text-[#AEBAC7]  2xl:max-3xl:text-[15px]">Welcome</p>
                            {name ? <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  ">{name}</p> : <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  "></p>}
                        </div>
                        <div className="flex  gap-[20px] items-center z-[0] sSha rounded-[20px] bg-white w-full 3xl:w-[780px] ">
                            <div className="flex items-center gap-[10px] p-[32px] pr-0  ">
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27 27L21.0974 21.0868M24.3684 13.1842C24.3684 16.1504 23.1901 18.9952 21.0926 21.0926C18.9952 23.1901 16.1504 24.3684 13.1842 24.3684C10.218 24.3684 7.37323 23.1901 5.27578 21.0926C3.17833 18.9952 2 16.1504 2 13.1842C2 10.218 3.17833 7.37323 5.27578 5.27578C7.37323 3.17833 10.218 2 13.1842 2C16.1504 2 18.9952 3.17833 21.0926 5.27578C23.1901 7.37323 24.3684 10.218 24.3684 13.1842Z" stroke="#B4C0CB"/>
                                </svg> 
                            </div>
                            <input className="w-full h-[90px] bg-[#FFF]  rounded-[10px] outline-none border-none text-[20px] text-gray-400 font-[500] font-[Poppins] pr-[20px] placeholder:font-[400] placeholder:text-gray-300 " type="text" placeholder="Search for friends to play" />
                        </div>
                    </div> 
                </div>
            </div>
    )
}