'use client';
import UserModal from '../../Home/userModal/userModal'
import { useContext, useRef, useState } from 'react';
import { contextdata } from '@/app/contextApi';
import Link from 'next/link';
import Avatar from '../../Chat/Avatar/Avatar';

type HeaderProps = {
    modalRef?: any,
    handelShaw?: any,
    show?: boolean,
    notifRef?: any,
    notifIconRef?: any
}


function UserComponent({avatar, channel, lastMessage, lastMessageTime, notification, active, link}: ChannelProps) {
    return (
        <Link href={`${link}`} className="cursor-pointer w-full flex justify-between items-center hover:bg-[#f3f3f3f5] p-[15px] rounded-[10px]" >
            <div className="flex items-center gap-[14px]">
                <Avatar url={avatar} status={active}/>
                <span>
                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] max-screenscreenscreenscreen truncate lsm:max-lg:max-w-[152px]">
                        {channel}
                    </p>
                    <p className="text-[#C0C1C5] text-[16px] font-[Poppins] font-[300] max-w-[200px] truncate lg:max-xl:max-w-[150px] lsm:max-lg:max-w-[120px]">
                        {lastMessage}
                    </p>
                </span>
            </div>
            <div className="flex flex-col items-end gap-[13px]">
                <p className="text-[#C0C1C5] text-[14] font-[Poppins] font-[300]">
                    {lastMessageTime}
                </p>
            </div>
        </Link>
)
}
export default function Header({show, modalRef,handelShaw,notifRef,notifIconRef}: HeaderProps) {
    const handelNotifShaw = (Ref: any) => {
        Ref.current.classList.remove('notif')
    }
    const {profiles, user}:any = useContext(contextdata);
    const myProfile = profiles?.find((profile:any) => profile.userId === user.id);
    const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
    const [users, setUsers] = useState<any>([]);
	const [showBody, setShowBody] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [closeSearch, setCloseSearch] = useState<boolean>(true);

	const handleSearch = (e: any) => {
        setCloseSearch(false)
        setShowBody(true)
        console.log("hereee : ", users)
		const value = e.target.value;
		const result = profiles.filter((profile: any) => {
			if (profile.userId === user.id) return false;
			return profile.firstName.toLowerCase().includes(value.toLowerCase()) || profile.lastName.toLowerCase().includes(value.toLowerCase())|| profile.username.toLowerCase().includes(value.toLowerCase());
		});
		setUsers(result);
	}
    const clearInputValue = () => {
        setShowBody(false)
		if (inputRef.current) {
		inputRef.current.value = '';
		}
	};
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
                                {/* <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27 27L21.0974 21.0868M24.3684 13.1842C24.3684 16.1504 23.1901 18.9952 21.0926 21.0926C18.9952 23.1901 16.1504 24.3684 13.1842 24.3684C10.218 24.3684 7.37323 23.1901 5.27578 21.0926C3.17833 18.9952 2 16.1504 2 13.1842C2 10.218 3.17833 7.37323 5.27578 5.27578C7.37323 3.17833 10.218 2 13.1842 2C16.1504 2 18.9952 3.17833 21.0926 5.27578C23.1901 7.37323 24.3684 10.218 24.3684 13.1842Z" stroke="#B4C0CB"/>
                                </svg>  */}
                                {
                                    closeSearch ? (
                                        <span onClick={() => { setCloseSearch(false); inputRef.current?.focus(); }} className="cursor-pointer">
                                            <svg
                                                width="29"
                                                height="29"
                                                viewBox="0 0 21 20"
                                                fill="none"
                                                strokeWidth={2}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z"
                                                    stroke="#898f9496"
                                                />
                                                <path
                                                    d="M19.7193 18.9984L15.1953 14.6484"
                                                    stroke="#898f9496"
                                                />
                                            </svg>
                                        </span>
                                    ) : (
                                        <span className="cursor-pointer" onClick={() => { setCloseSearch(true); setShowBody(false);clearInputValue()}} >
                                            <svg width="29" height="29" viewBox="0 0 17 18" fill="#898f9496" xmlns="http://www.w3.org/2000/svg" className="
                                        hover:fill-black
                                        ">
                                                <path d="M15 2L2 16M2 2L15 16" stroke="#D2D6D8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    )
                                }
                            </div>
                            <input ref={inputRef} onChange={handleSearch} className="w-full h-[90px] bg-[#FFF]  rounded-[10px] outline-none border-none text-[20px] text-gray-400 font-[500] font-[Poppins] pr-[20px] placeholder:font-[400] placeholder:text-gray-300 " type="text" placeholder="Search for friends to play" />
                            {
                                    showBody && (
                                        <div className=" z-[50] absolute top-[100px] w-full rounded-[15px] h-[280px] bg-[#FFF] py-[25px] px-[25px] flex flex-col gap-[20px] overflow-y-scroll no-scrollbar p-inf">
                                            {
                                                users?.map((user: any) => {
                                                    return(
                                                        <UserComponent
                                                            avatar={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${user.avatar}`}
                                                            channel={`${user.firstName} ${user.lastName}`}
                                                            lastMessage={''}
                                                            lastMessageTime={''}
                                                            notification={0}
                                                            active={false}
                                                            link={`/Profile/users/${user.userId}`}
                                                            key={user.userId}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                        </div>
                    </div> 
                </div>
            </div>
    )
}