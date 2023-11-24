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


export default function Header() {

    const {profiles, user}:any = useContext(contextdata);
    const myProfile = profiles?.find((profile:any) => profile.userId === user.id);
    const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
    return (
        <div className="flex items-center h-[100px] w-full  justify-center pt-[100px] z-0
        
        ">
                
            <div className='header__right flex  h-[90px] items-center justify-between   gap-[10px]  px-[30px] xl:px-[40px]  w-[1200px] 3xl:w-[2000px] 3xl:px-[55px] '>
            <div className='flex gap-[30px]  w-9/12 xl:w-11/12'>
                        <div className='hidden 2xl:block'>
                            <p className="text-[18px] font-[500] text-[#AEBAC7]  2xl:max-3xl:text-[15px]">Welcome</p>
                            {name ? <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  ">{name}</p> : <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  "></p>}
                        </div>
                        <div className="flex  gap-[20px] items-center z-[0] searchShadow rounded-[20px]  w-full xl:w-7/12 bg-white">
                            <div className="flex items-center gap-[10px] p-[32px] pr-0  ">
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27 27L21.0974 21.0868M24.3684 13.1842C24.3684 16.1504 23.1901 18.9952 21.0926 21.0926C18.9952 23.1901 16.1504 24.3684 13.1842 24.3684C10.218 24.3684 7.37323 23.1901 5.27578 21.0926C3.17833 18.9952 2 16.1504 2 13.1842C2 10.218 3.17833 7.37323 5.27578 5.27578C7.37323 3.17833 10.218 2 13.1842 2C16.1504 2 18.9952 3.17833 21.0926 5.27578C23.1901 7.37323 24.3684 10.218 24.3684 13.1842Z" stroke="#B4C0CB"/>
                                </svg> 
                            </div>
                            <input className="w-full h-[90px] bg-[#FFF]  rounded-[10px] outline-none border-none text-[20px] text-gray-400 font-[500] font-[Poppins] pr-[20px] placeholder:font-[400] placeholder:text-gray-300 " type="text" placeholder="Search for friends to play" />
                        </div>
                    </div>


                    <div className='flex  gap-[20px] 3xl:gap-[60px]'>
                        <div className="z-[50] bg-[#FFF]  cursor-pointer w-[88px] h-[90px] notifShadow rounded-[30px]">
                                <Link href="/Profile">
                            <div className='flex justify-center items-center    w-full h-full '>
                            <img className="w-[55px] h-[55px] rounded-full outline  outline-[5px] outline-[#ACDAAD] object-cover "
                                src={
                                    `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.avatar}`
                                } alt="" />
                            </div>
                                </Link>
                        </div >
                    </div>
                    
                </div>
            </div>
    )
}