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

type ChannelProps = {
    avatar: string,
    channel: string,
    lastMessage: string | null | undefined,
    lastMessageTime: string | null | undefined,
    notification: number,
    active: boolean,
    link: string,
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

export default function Header() {

    const {profiles, user,setMediaDashbord,dashboardRef}:any = useContext(contextdata);
    const myProfile = profiles?.find((profile:any) => profile.userId === user.id);
    const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
    const [users, setUsers] = useState<any>([]);
	const [showBody, setShowBody] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [closeSearch, setCloseSearch] = useState<boolean>(true);

	const handleSearch = (e: any) => {
        setCloseSearch(false)
        setShowBody(true)
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
        z-20
        ">
                
            <div className='header__right flex  h-[90px] items-center justify-between   gap-[10px]  px-[30px] xl:px-[40px]  w-[1200px] 3xl:w-[2000px] 3xl:px-[55px] '>
            <div className="hidden lsm:max-sm:block cursor-pointer" onClick={() => {
                        setMediaDashbord(true)
                        dashboardRef.current?.classList.add("!left-0")
                    }}>
                        <svg width="30" height="28" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 14C17.8852 14.0002 18.2556 14.1486 18.5344 14.4144C18.8132 14.6802 18.979 15.0431 18.9975 15.4279C19.016 15.8127 18.8858 16.1898 18.6338 16.4812C18.3818 16.7726 18.0274 16.9558 17.644 16.993L17.5 17H1.5C1.11478 16.9998 0.744405 16.8514 0.465613 16.5856C0.186821 16.3198 0.020988 15.9569 0.00247574 15.5721C-0.0160365 15.1873 0.114192 14.8102 0.366175 14.5188C0.618159 14.2274 0.972581 14.0442 1.356 14.007L1.5 14H17.5ZM17.5 7C17.8978 7 18.2794 7.15804 18.5607 7.43934C18.842 7.72064 19 8.10218 19 8.5C19 8.89782 18.842 9.27936 18.5607 9.56066C18.2794 9.84196 17.8978 10 17.5 10H1.5C1.10218 10 0.720644 9.84196 0.43934 9.56066C0.158035 9.27936 0 8.89782 0 8.5C0 8.10218 0.158035 7.72064 0.43934 7.43934C0.720644 7.15804 1.10218 7 1.5 7H17.5ZM17.5 0C17.8978 0 18.2794 0.158035 18.5607 0.43934C18.842 0.720644 19 1.10218 19 1.5C19 1.89782 18.842 2.27936 18.5607 2.56066C18.2794 2.84196 17.8978 3 17.5 3H1.5C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H17.5Z" fill="#034B8A"/>
                        </svg> 
            </div>
            <div className='flex gap-[30px]   w-9/12 xl:w-11/12'>
                        <div className='hidden 2xl:block'>
                            <p className="text-[18px] font-[500] text-[#AEBAC7]  2xl:max-3xl:text-[15px]">Welcome</p>
                            {name ? <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  ">{name}</p> : <p className="text-[25px] font-[700] 2xl:max-3xl:text-[20px]  "></p>}
                        </div>
                        <div className="flex relative gap-[20px] items-center   searchShadow rounded-[20px]  w-full xl:w-7/12 bg-white">
                            <div className="flex items-center gap-[10px] p-[32px] pr-0  ">
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
                                        <div className=" z-[900] absolute top-[100px] w-full rounded-[15px] h-[280px] bg-[#FFF] py-[25px] px-[25px] flex flex-col gap-[20px] overflow-y-scroll no-scrollbar p-inf">
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
                                                            key={user.lastName}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
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