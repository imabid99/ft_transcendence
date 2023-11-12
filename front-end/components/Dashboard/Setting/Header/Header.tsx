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
        <div className="flex items-center h-[100px] w-full  justify-center pt-[40px] z-0
        
        ">
                
            <div className='header__right flex  h-[90px] items-center justify-between   gap-[10px]  px-[30px] xl:px-[40px]  w-[1200px] 3xl:w-[2000px] 3xl:px-[55px] '>
            <div className='flex gap-[30px]'>
                        <div className='hidden 2xl:block'>
                            <p className="text-[18px] font-[500] text-[#AEBAC7]  2xl:max-3xl:text-[15px]">Welcome</p>
                            {name ? <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  ">{name}</p> : <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  "></p>}
                        </div>
                        <div className="flex  gap-[20px] items-center z-[0] searchShadow rounded-[20px] bg-white">
                            <div className="flex items-center gap-[10px] p-[32px] pr-0  ">
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27 27L21.0974 21.0868M24.3684 13.1842C24.3684 16.1504 23.1901 18.9952 21.0926 21.0926C18.9952 23.1901 16.1504 24.3684 13.1842 24.3684C10.218 24.3684 7.37323 23.1901 5.27578 21.0926C3.17833 18.9952 2 16.1504 2 13.1842C2 10.218 3.17833 7.37323 5.27578 5.27578C7.37323 3.17833 10.218 2 13.1842 2C16.1504 2 18.9952 3.17833 21.0926 5.27578C23.1901 7.37323 24.3684 10.218 24.3684 13.1842Z" stroke="#B4C0CB"/>
                                </svg> 
                            </div>
                            <input className="w-11/12 h-[90px] bg-[#FFF]  rounded-[10px] outline-none border-none text-[20px] text-gray-400 font-[500] font-[Poppins] pr-[20px] placeholder:font-[400] placeholder:text-gray-300 " type="text" placeholder="Search for friends to play" />
                        </div>
                    </div>


                    <div className='flex  gap-[20px] 3xl:gap-[60px]'>
                        <div className="z-[50] bg-[#FFF]  cursor-pointer w-[88px] h-[90px] notifShadow flex justify-center items-center rounded-[30px] " onClick={()=>{handelShaw(notifRef);handelNotifShaw(notifIconRef)}}>
                            <div className="notif relative after:animate-ping" ref={notifIconRef}>
                                <svg  width="34px" height="40px" viewBox="0 0 34 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9264 34.4558C13.9262 34.2443 20.0186 34.2443 21.0184 34.4558C21.8731 34.6532 22.7974 35.1145 22.7974 36.1217C22.7477 37.0805 22.1852 37.9305 21.408 38.4704C20.4002 39.256 19.2175 39.7535 17.9811 39.9328C17.2974 40.0214 16.6255 40.0234 15.9656 39.9328C14.7272 39.7535 13.5445 39.256 12.5388 38.4684C11.7596 37.9305 11.197 37.0805 11.1473 36.1217C11.1473 35.1145 12.0716 34.6532 12.9264 34.4558ZM17.0904 0C21.2507 0 25.5005 1.97404 28.0249 5.24933C29.6628 7.35833 30.4141 9.46531 30.4141 12.7406V13.5927C30.4141 16.1045 31.078 17.5851 32.539 19.2912C33.6462 20.5481 34 22.1616 34 23.912C34 25.6605 33.4255 27.3203 32.2747 28.6679C30.768 30.2833 28.6431 31.3147 26.4745 31.494C23.3319 31.7619 20.1873 31.9875 17.001 31.9875C13.8127 31.9875 10.6701 31.8525 7.52751 31.494C5.35691 31.3147 3.23204 30.2833 1.72733 28.6679C0.57644 27.3203 0 25.6605 0 23.912C0 22.1616 0.355802 20.5481 1.46098 19.2912C2.96767 17.5851 3.58784 16.1045 3.58784 13.5927V12.7406C3.58784 9.37668 4.42666 7.17704 6.15399 5.02372C8.72213 1.88339 12.8387 0 16.9115 0H17.0904Z" fill="#00539D"/>
                                </svg> 
                            </div>
                        </div>
                        <div className="z-[50] bg-[#FFF]  cursor-pointer w-[88px] h-[90px] notifShadow rounded-[30px] hidden lg:block 3xl:hidden">
                                <Link href="/Profile">
                            <div className='flex justify-center items-center    w-full h-full '>
                            <img className="w-[55px] h-[55px] rounded-full outline  outline-[5px] outline-[#ACDAAD] object-cover "
                                src={
                                    `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.avatar}`
                                } alt="" />
                            </div>
                                </Link>
                        </div >
                        <div className=" hidden 3xl:block" >
                            <div className='z-[51]   profileShadow flex gap-[15px]  items-center py-[13px] px-[18px] rounded-[20px]  relative  max-w-[270px] bg-white h-[90px]'>
                            <div className="relative after:animate-ping">
                                <div className="w-[55px] h-[55px] rounded-full">
                                <img className="w-[55px] h-[55px] rounded-full outline  outline-[5px] outline-[#ACDAAD] object-cover"
                                src={
                                    `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.avatar}`
                                } alt="" />
                                <span className="absolute top-[0px] right-[0px] w-[10px] h-[10px] rounded-full bg-[#2FCD48]
                                outline outline-[4px] outline-[#fff]
                                "></span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-[5px] justify-start h-full '>
                                <p className="font-[Poppins] text-[14px] font-[6500] text-[#AEBAC7] ">Enjoy your game,</p>
                                <p className="font-[Poppins] text-[16px] font-[600] text-[#00539D] ">{name}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}