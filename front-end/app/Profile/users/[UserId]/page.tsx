'use client';
import { use, useContext, useEffect, useState } from 'react';
import { contextdata } from '@/app/contextApi';
import axiosInstance from '@/utils/axiosInstance';
import {useParams} from 'next/navigation';
import Loading from '@/app/loading';
// import ImageGrid from '../../../../../components/Dashboard/Profile/Achievements/images';
import ImageGrid from '../../../../components/Dashboard/Profile/Achievements/images';
import NotUser from '../../NotUser';
const images = [
    [
        { src: '/Air.svg', alt: 'Airwa Image' },
        { src: '/hlock.svg', alt: 'Horrorwh Image'},
    ],
    [
        { src: '/Grand copy.svg', alt: 'Kingwk Image'},
        { src: '/Grand.svg', alt: 'GWG Image'},
        { src: '/Luck.svg', alt: 'BWB Image', className: 'lg:block hidden'},
    ],
    [
        { src: '/Unb.svg', alt: 'UNBWB Image'},
        { src: '/iron.svg', alt: 'Ironwr Image'},
    ],
    [
        { src: '/Luck.svg', alt: 'Luck Image', className: 'pb-[30px] block lg:hidden'},
    ],
];

export default function Page() {

    const {UserId} = useParams();
    const [profile, setProfile] = useState<any>(null);
    const name = `${profile?.firstName} ${profile?.lastName}`;
    const [isUser, setIsUser] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const {notifSocket, myFriends,profiles} :any= useContext(contextdata);
    const  [isClicked, setIsClicked] = useState<boolean>(false);
    const  [isFriend, setIsFriend] = useState<boolean>(false);


    const sendRequest = async () => {
        try{
            const res = await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/friendship/request/${UserId}`);
            // console.log("res is", res);
        }
        catch(err){
            console.log(err);
        }
    }
    const checkFriendship = async () => {
        try{
            const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/friendship/show/${UserId}`);
            console.log("res is", res);
            if(res.data)
            {
                setIsFriend(true);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    
    useEffect(() => {
        const getProfile = async () => {
            try{
                const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/profile/${UserId}`);
                setProfile(res.data);
                setLoading(false);
            }
            catch(err){
                console.log("user not found")
                setIsUser(false);
                console.log(err);
            }
        }
        checkFriendship();
        getProfile();
        return () => {
            setProfile(null);
        }
        }, [profiles,myFriends])
        if(!isUser)
        {   
            return <NotUser />
        }
        if(loading)
        {
            return <Loading />
        }
    const avatarUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${profile?.avatar}`;
    const coverUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${profile?.cover}`;
    return (
        <div className="flex items-center flex-col 3xl:flex-row gap-[40px] w-[100%] 3xl:justify-center">
            <div className=" flex max-w-[922px] w-11/12 xl:h-[823px] rounded-[42px] sh-d bg-white">
            <div className="mx-auto w-11/12 mt-[34px]">
                <div className="relative w-12/12 h-[185px] rounded-[25px] overflow-hidden">
                        <picture>
                        <img
                            src={coverUrl}
                            alt=""
                            className="object-cover object-top w-full h-full"
                        />
                        </picture>
                </div>
                <div className="w-12/12 h-[200px] sm:h-[120px]">
                <div className="relative ">
                    <div className="absolute  w-[150px]  h-[150px] rounded-full left-[43px] -top-[52px] border-[5px] border-white">
                        <picture>
                        <img
                        className="rounded-full w-full h-full object-cover"
                        src={avatarUrl}
                        alt=""
                        />
                        </picture>
                    </div>
                </div>
                <div className="pt-[100px] gap-[15px] sm:pt-0 flex flex-col sm:flex-row pl-[40px] sm:items-center sm:pl-[200px] sm:justify-between">
                    <div className="pt-[10px]">
                        {
                            profile ?
                            (
                                <>
                                    <p className="text-[25px] font-[600] text-[#020025]">{name}</p>
                                    <p className="text-[15px] text-[#6E869B] font-[600]">{profile?.username}</p>
                                </>

                            )

                            :
                            (
                                <div className="container">
                                <div className="post">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                </div>

                                </div>
                            )
                        }
                    </div>
                    <div className=" flex items-center gap-[5px]">
                        <div className="button-container2">
                    <button className="w-[91px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.7015 7.02355L4.0215 6.96847C4.0835 6.95745 4.1575 6.94143 4.243 6.91939C5.3 6.65399 6 5.86281 6 5.00752C6 3.93842 4.912 3.00451 3.5 3.00451C2.088 3.00451 1 3.93842 1 5.00752C1 5.61744 1.351 6.19831 1.9655 6.58489L1.9835 6.59491L2.5 6.88033V8.26391L3.7015 7.02355ZM4.1925 7.95495L2.359 9.84779C2.28971 9.91938 2.20066 9.96862 2.10325 9.98921C2.00585 10.0098 1.90453 10.0008 1.81226 9.96336C1.71999 9.92592 1.64099 9.86176 1.58536 9.77908C1.52973 9.6964 1.5 9.59897 1.5 9.49927V7.47122C1.47766 7.45913 1.45565 7.44644 1.434 7.43316C0.5645 6.88634 0 6.00352 0 5.00752C0 3.34803 1.567 2.00301 3.5 2.00301C5.433 2.00301 7 3.34803 7 5.00752C7 6.37257 5.9395 7.5253 4.487 7.89085C4.38965 7.91584 4.29142 7.93722 4.1925 7.95495ZM3.468 1.50226C4.073 0.604408 5.205 0 6.5 0C8.433 0 10 1.34502 10 3.00451C10 4.00051 9.435 4.88333 8.566 5.43016C8.54435 5.44343 8.52234 5.45612 8.5 5.46821V7.49626C8.5 7.59596 8.47027 7.69339 8.41464 7.77607C8.35901 7.85875 8.28001 7.92292 8.18774 7.96035C8.09547 7.99779 7.99415 8.00679 7.89675 7.9862C7.79934 7.96561 7.71029 7.91637 7.641 7.84478L6.7735 6.94944L7.295 6.04909L7.5 6.2609V4.87733L8.0165 4.5919L8.0345 4.58188C8.6495 4.1953 9 3.61443 9 3.00451C9 1.93541 7.912 1.0015 6.5 1.0015C5.86 1.0015 5.287 1.19329 4.8515 1.50226H3.468Z" fill="white"/>
                    </svg>
                        <p className="text-[#fff] text-[8px] font-[500] ">Message</p>
                    </button>
                        </div>
                    <div className="button-container2">
                    {/* <button onClick={handleClick} disabled={isClicked} className="w-[30px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]" > */}
                    <button onClick={sendRequest} disabled={isFriend} className={`w-[30px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]  ${!isClicked ? 'bg-[#5085AB]' : 'bg-[#D0D0D0] cursor-not-allowed '}`} >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 6.58694C5.7834 6.58694 7.5 6.93914 7.5 8.29934C7.5 9.65955 5.77239 10 3.75 10C1.7166 10 0 9.64727 0 8.2876C0 6.9274 1.72711 6.58694 3.75 6.58694ZM8.49949 2.63158C8.7476 2.63158 8.94897 2.84708 8.94897 3.11138V3.73045H9.55051C9.79812 3.73045 10 3.94595 10 4.21025C10 4.47455 9.79812 4.69005 9.55051 4.69005H8.94897V5.30968C8.94897 5.57398 8.7476 5.78947 8.49949 5.78947C8.25188 5.78947 8.05 5.57398 8.05 5.30968V4.69005H7.44949C7.20137 4.69005 7 4.47455 7 4.21025C7 3.94595 7.20137 3.73045 7.44949 3.73045H8.05V3.11138C8.05 2.84708 8.25188 2.63158 8.49949 2.63158ZM3.75 0C5.12729 0 6.23132 1.17717 6.23132 2.64571C6.23132 4.11424 5.12729 5.29141 3.75 5.29141C2.37271 5.29141 1.26868 4.11424 1.26868 2.64571C1.26868 1.17717 2.37271 0 3.75 0Z" fill="white"/>
                    </svg>
                    </button>
                    </div>
                    <div className="button-container">
                    <button
                        className="w-[30px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]"
                    >
                        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.75 6.58694C5.7834 6.58694 7.5 6.93914 7.5 8.29934C7.5 9.65955 5.77239 10 3.75 10C1.7166 10 0 9.64728 0 8.2876C0 6.9274 1.72711 6.58694 3.75 6.58694ZM3.75 0C5.12729 0 6.23132 1.17717 6.23132 2.64571C6.23132 4.11424 5.12729 5.29141 3.75 5.29141C2.37271 5.29141 1.26868 4.11424 1.26868 2.64571C1.26868 1.17717 2.37271 0 3.75 0Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3.70588C8.77292 3.70586 8.54982 3.76559 8.35313 3.87908C8.15644 3.99256 7.99307 4.15581 7.87944 4.35241C7.7658 4.54902 7.7059 4.77207 7.70575 4.99915C7.7056 5.22624 7.76521 5.44936 7.87859 5.64612L9.64612 3.87859C9.44973 3.76509 9.22683 3.70551 9 3.70588ZM10.1388 4.38447L8.38447 6.13882C8.62968 6.27169 8.91125 6.32179 9.18725 6.28166C9.46324 6.24152 9.71888 6.1133 9.91609 5.91609C10.1133 5.71888 10.2415 5.46324 10.2817 5.18725C10.3218 4.91125 10.2717 4.62968 10.1388 4.38447ZM7 5C7 4.73736 7.05173 4.47728 7.15224 4.23463C7.25275 3.99198 7.40007 3.7715 7.58579 3.58579C7.7715 3.40007 7.99198 3.25275 8.23463 3.15224C8.47728 3.05173 8.73736 3 9 3C9.26264 3 9.52272 3.05173 9.76537 3.15224C10.008 3.25275 10.2285 3.40007 10.4142 3.58579C10.5999 3.7715 10.7473 3.99198 10.8478 4.23463C10.9483 4.47728 11 4.73736 11 5C11 5.53043 10.7893 6.03914 10.4142 6.41421C10.0391 6.78929 9.53043 7 9 7C8.46957 7 7.96086 6.78929 7.58579 6.41421C7.21071 6.03914 7 5.53043 7 5Z" fill="white"/>
                        </svg>

                    </button>
                    </div>
                    </div>
                </div>
                </div>
                <div className="pt-[40px] xl:pt-[10px]">
                <div className="sh-l w-12/12 h-[220px] sm:h-[117px] rounded-[34px] bg-[#EFF8FF] flex items-center gap-[20px] sm:gap-[50px] flex-col sm:flex-row">
                    <div className="pt-[20px] sm:pt-[0px] sm:pl-[40px] ">
                    <div className=" text-[#0E559D] text-[24px] font-[400]">
                        Level
                    </div>
                    <div className="text-[#95A6B9] font-[300] text-[18px] flex flex-row">
                        1000/2000{" "}
                        <div className="text-[#7899BB] font-[400] text-[18px]">XP</div>{" "}
                    </div>
                    </div>
                    <div className="w-10/12 sm:w-7/12 b">
                    <div className="flex-grow  h-[16px] rounded-[8px] bg-[#C0D4E9] w-12/12">
                        <div className="h-full sh-level rounded-[8px] w-[50%]" />
                    </div>
                    </div>
                    <div className=" sm:pr-[40px]">
                    <div className="w-[55px] h-[55px] border-[6px] border-[#356B9A] rounded-full flex justify-center items-center">
                        <div className="text-[#356B9A] font-[600] text-[18px]">50</div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="flex flex-col xl:flex-row items-center xl:pb-[70px]">
                <div className="flex gap-[64px] sm:gap-[30px] pt-[30px] flex-col sm:flex-row">
                    <div className="flex gap-[64px] flex-col">
                    <div className="w-[180px] h-[100px] bg-[#BBE3FF] hover:bg-[#a2d8ff] rounded-[24px] flex items-center pl-[20px] gap-[17px] g-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="/pgroup-78.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#0367A6] text-[17px] font-[500]">
                            Games
                        </div>
                        <div className="text-[20px] font-[600] text-[#007BC8]">0</div>
                        </div>
                    </div>
                    <div className="w-[180px] h-[100px] bg-[#C1FFFB] hover:bg-[#9dfcf6] rounded-[24px] flex items-center pl-[20px] gap-[17px] s-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="/group-83.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#12A099] text-[17px] font-[500]">
                            Score
                        </div>
                        <div className="text-[20px] font-[600] text-[#098982]">0</div>
                        </div>
                    </div>
                    </div>
                    <div className="flex gap-[64px] flex-col">
                    <div className="w-[180px] h-[100px] bg-[#C2FFDE] hover:bg-[#9cffca]  rounded-[24px] flex items-center pl-[20px] gap-[17px] w-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="/group-82.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#27B270] text-[17px] font-[500]">
                            Wins
                        </div>
                        <div className="text-[20px] font-[600] text-[#10884F]">0</div>
                        </div>
                    </div>
                    <div className="w-[180px] h-[100px] bg-[#FFCCCC] hover:bg-[#feaeae] rounded-[24px] flex items-center pl-[20px] gap-[17px] l-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="/group-84.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#CA4E4E] text-[17px] font-[500]">
                            Loses
                        </div>
                        <div className="text-[20px] font-[600] text-[#B02323]">0</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-[#EFF8FF] mb-[70px] xl:mb-[0px] w-[180px] sm:w-[400px] sm:h-[264px] rounded-[34px] daily-sh mt-[30px] xl:ml-[63px] flex flex-col items-center sm:items-start">
                    <div className="sm:pl-[34px] pt-[25px] text-[#0E559D] text-[16px] font-[400]">
                    Daily Play Time
                    </div>
                    <div className="flex flex-col sm:flex-row pt-[24px] gap-[24px] sm:gap-[34px]  items-center mx-auto">
                    <div className="flex gap-[20px] sm:gap-[34px]">
                        <div className="flex flex-col items-center">
                        <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                            <div className="w-[16px] week-sh rounded-[8px] h-[19%]" />
                        </div>
                        <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                            M
                        </div>
                        </div>
                        <div className="flex flex-col  items-center">
                        <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                            <div className="w-[16px] week-sh rounded-[8px] h-[50%]" />
                        </div>
                        <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                            T
                        </div>
                        </div>
                        <div className="flex flex-col  items-center">
                        <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                            <div className="w-[16px] week-sh rounded-[8px] h-[80%]" />
                        </div>
                        <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                            W
                        </div>
                        </div>
                        <div className="flex flex-col  items-center">
                        <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                            <div className="w-[16px] week-sh rounded-[8px] h-[80%]" />
                        </div>
                        <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                            T
                        </div>
                        </div>
                    </div>
                    <div className="flex gap-[34px] pb-[25px] sm:pb-0">
                        <div className="flex flex-col  items-center">
                        <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                            <div className="w-[16px] week-sh rounded-[8px] h-[20%]" />
                        </div>
                        <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                            F
                        </div>
                        </div>
                        <div className="flex flex-col  items-center">
                        <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                            <div className="w-[16px] week-sh rounded-[8px] h-[30%]" />
                        </div>
                        <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                            S
                        </div>
                        </div>
                        <div className="flex flex-col  items-center">
                        <div className="h-[145px] rounded-[8px] bg-[#C0D4E9] w-[16px] flex flex-col-reverse">
                            <div className="w-[16px] week-sh rounded-[8px] h-[70%]" />
                        </div>
                        <div className="text-[#3F88D3] text-[14px] font-[600] pt-[8px]">
                            S
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="bg-white flex max-w-[922px] w-11/12  xl:h-[823px] rounded-[42px]  sh-d flex-col ">
            <div className="mx-auto w-12/12 flex items-center pt-[30px] flex-col">
                <div className="pb-10">
                <div className="flex ">
                    <img src="/group.svg" alt="" />
                    <span className="pl-[10px] text-[#064A85] text-[15px] sm:text-[20px] font-[400]">
                    Achievements - <span>0</span> / 7
                    </span>
                </div>
                </div>
                {/* <ImageGrid images={images} /> */}
            </div>
            </div>
        </div>
    )
}