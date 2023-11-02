'use client';
import UserModal from '../userModal/userModal'
import { useContext } from 'react';
import { contextdata } from '@/app/contextApi';

type HeaderProps = {
    modalRef: any,
    handelShaw: any,
    show: boolean,
    notifRef: any,
    notifIconRef: any
}


export default function Header({show, modalRef,handelShaw}: HeaderProps) {
    const handelNotifShaw = (Ref: any) => {
        Ref.current.classList.remove('notif')
    }
    const {profiles, user}:any = useContext(contextdata);
    const myProfile = profiles?.find((profile:any) => profile.userId === user.id);
    const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
    return (
        <div className="flex items-center h-[100px] w-full justify-evenly gap-[430px] 
        lg:max-3xl:gap-[100px] lg:max-2xl:gap-[10px] 
        ">
                <div className='header__left flex gap-[68px] 2xl:max-3xl:gap-[45px]
                '>
                    <div className='lg:max-2xl:hidden'>
                        <p className="text-[18px] font-[500] text-[#AEBAC7]  2xl:max-3xl:text-[15px]">Welcome</p>
                        {name ? <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  2xl:max-3xl:w-[150px]">{name}</p> : <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  2xl:max-3xl:w-[150px]"></p>}
                    </div>
                    <div className="flex gap-[20px] items-center z-[0] searchShadow rounded-[20px] ">
                        <div className="flex items-center gap-[10px] p-[32px] pr-0">
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27 27L21.0974 21.0868M24.3684 13.1842C24.3684 16.1504 23.1901 18.9952 21.0926 21.0926C18.9952 23.1901 16.1504 24.3684 13.1842 24.3684C10.218 24.3684 7.37323 23.1901 5.27578 21.0926C3.17833 18.9952 2 16.1504 2 13.1842C2 10.218 3.17833 7.37323 5.27578 5.27578C7.37323 3.17833 10.218 2 13.1842 2C16.1504 2 18.9952 3.17833 21.0926 5.27578C23.1901 7.37323 24.3684 10.218 24.3684 13.1842Z" stroke="#B4C0CB"/>
                            </svg> 
                        </div>
                        <input className="2xl:max-3xl:w-[500px] lg:max-xl:w-[450px] w-[530px] h-[90px] bg-[#FFF] rounded-[10px] outline-none border-none text-[20px] text-gray-400 font-[500] font-[Poppins] pr-[20px] placeholder:font-[400] placeholder:text-gray-300" type="text" placeholder="Search for friends to play" />
                    </div>
                </div>
                <div className='header__right flex gap-[30px]'>
                    <div className="z-[51] bg-[#FFF]  profileShadow flex gap-[15px]  items-center py-[13px] px-[18px] rounded-[20px]  relative" >
                        <div className="relative after:animate-ping">
                            <img className="w-[55px] h-[55px] rounded-full outline  outline-[5px] outline-[#ACDAAD] object-cover"
                            src={
                                `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.avatar}`
                            } alt="" />
                            <span className="absolute top-[0px] right-[0px] w-[10px] h-[10px] rounded-full bg-[#2FCD48]
                            outline outline-[4px] outline-[#fff]
                            "></span>
                        </div>
                        <div className='flex flex-col gap-[5px] justify-start h-full '>
                            <p className="font-[Poppins] text-[14px] font-[6500] text-[#AEBAC7]">Enjoy your game,</p>
                            {show ? <p className="font-[Poppins] text-[16px] font-[600] text-[#00539D]">{name}</p> : <p className="font-[Poppins] text-[16px] font-[600] text-[#00539D]"></p>}
                        </div>
                        <div className='cursor-pointer' onClick={()=>handelShaw(modalRef)}>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.492 12.841C6.41467 12.7657 6.084 12.4812 5.812 12.2163C4.10133 10.6628 1.30133 6.61016 0.446667 4.48904C0.309333 4.16691 0.0186667 3.35249 0 2.91736C0 2.50041 0.096 2.10294 0.290667 1.72366C0.562667 1.25085 0.990667 0.87157 1.496 0.663744C1.84667 0.529956 2.896 0.32213 2.91467 0.32213C4.06267 0.114304 5.928 0 7.98933 0C9.95333 0 11.7427 0.114304 12.908 0.284462C12.9267 0.303945 14.2307 0.511771 14.6773 0.739081C15.4933 1.15603 16 1.97045 16 2.84202V2.91736C15.98 3.48498 15.4733 4.67868 15.4547 4.67868C14.5987 6.6855 11.936 10.6446 10.1667 12.2358C10.1667 12.2358 9.712 12.6839 9.428 12.8787C9.02 13.1827 8.51467 13.3333 8.00933 13.3333C7.44533 13.3333 6.92 13.1632 6.492 12.841Z" fill="#00539D"/>
                            </svg> 
                        </div>
                        <UserModal modalRef={modalRef} name={name} username={myProfile?.username} avatar={myProfile?.avatar} cover={myProfile?.cover}/>
                    </div>
                </div>
            </div>
    )
}