'use client';
import { use, useContext, useEffect, useState } from 'react';
import { contextdata } from '@/app/contextApi';
import axiosInstance from '@/utils/axiosInstance';
import {useParams} from 'next/navigation';
import ImageGrid from '../../../components/Dashboard/Profile/images';

const images = [
    [
        { src: '/airwa.svg', alt: '/Airwa Image', overlaySrc: '/airairair.svg' },
        { src: '/horrorwh.svg', alt: '/Horrorwh Image', overlaySrc: '/jan.svg' },
    ],
    [
        { src: '/kingwk.svg', alt: '/Kingwk Image', overlaySrc: '/sarokh.svg' },
        { src: '/gwg.svg', alt: '/GWG Image', overlaySrc: '/targethh.svg' },
        { src: '/bwb.svg', alt: '/BWB Image', className: 'lg:block hidden', overlaySrc: '/hand.svg' },
    ],
    [
        { src: '/unbwb.svg', alt: '/UNBWB Image', overlaySrc: '/cap.svg' },
        { src: '/ironwr.svg', alt: '/Ironwr Image', overlaySrc: '/sando9.svg' },
    ],
    [
        { src: '/bwb.svg', alt: '/Luck Image', className: 'pb-[30px] block lg:hidden',  overlaySrc: '/hand.svg'},
    ],
];

export default function Page() {
  
    const {UserId} = useParams();
    const [profile, setProfile] = useState<any>(null);
    const name = `${profile?.firstName} ${profile?.lastName}`;

    useEffect(() => {

        const getProfile = async () => {
            try{
                const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/user/profile/${UserId}`);
                setProfile(res.data);
            }
            catch(err){
                console.log("user Not Found");
            }
        }
        getProfile();
        return () => {
            setProfile(null);
        }
        }, [])
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
                    <button className="w-[91px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]">
                        <img src="/Vector.svg" alt="" />
                        <p className="text-[#fff] text-[8px] font-[500]">Message</p>
                    </button>
                    <button className="w-[30px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]">
                        <img src="/Vector(1).svg" alt="" />
                    </button>
                    <button
                        id="settingsButton"
                        className="w-[30px] h-[29px] rounded-[9px] bg-[#5085AB] flex items-center justify-center gap-[5px]"
                    >
                        <img src="/Vector(2).svg" alt="" />
                    </button>
                    <div
                        id="settingsMenu"
                        className="hidden absolute mt-[80px] bg-white border border-gray-300 shadow-lg rounded-lg  w-40"
                    >
                        <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Option 1
                        </li>
                        </ul>
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
                <ImageGrid images={images} />
            </div>
            </div>
        </div>
    )
}
