'use client';
import { useContext, useState, useEffect } from 'react';
import { contextdata } from '@/app/contextApi';
import axiosInstance from '@/utils/axiosInstance';
import React from 'react';
import Header from '@/components/Dashboard/Profile/Header/Header';
import { useRouter } from 'next/navigation';
import { checkLoged } from '@/utils/localStorage';
import Loading from '../loading';
import ImageComponent from '../../components/Dashboard/Profile/Achievements/images';
import Image from 'next/image';

export default function Page() {
    
    const {profiles, user, socket}:any = useContext(contextdata);
    const myProfile = profiles?.find((profile:any) => profile?.userId === user?.id);
    const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
    const router = useRouter();
    const [isloading, setIsLoading] = useState(true);
    const [achievements, setAchievements] = useState<any>(null);
    console.log("achievements : ", myProfile?.achievements);
    // const achievements = myProfile?.achievements;

    useEffect(() => {
        setAchievements(achievements);
        }
        , [profiles])
    const getNotificatons = async () => {
        try{
            const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/notification/all`);
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    getNotificatons();
    useEffect(() => {
        const token = checkLoged();
        if (!token) {
            router.push("/login");
            return;
        }
        setIsLoading(false);
    }, []);
    
    if (isloading) {
        return <Loading />;
    }
    function handleFileInputChange(e: any, type: 'avatar' | 'cover') {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        const maxFileSize = 1024 * 1024 * 5;
        const uploadEndpoint = type === 'avatar'
        ? `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/upload/avatar`
        : `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/upload/cover`;
        axiosInstance
        .post(uploadEndpoint, formData)
        .then((res) => {
            socket.emit('refresh', { userId: user.id });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    // console.log("achievements imad : ", achievements);
    // console.log("myProfile : ", myProfile);
    
    const avatarUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.avatar}`;
    const coverUrl = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${myProfile?.cover}`;
    return (
        <div className='flex items-center  flex-col  gap-[80px] 3xl:gap-0 w-[100%] justify-start  3xl:px-[30px]  '>
            <Header/>
        <div className="flex items-center flex-col 3xl:flex-row gap-[40px] w-[100%] 3xl:justify-center h-full z-[10]">
            <div className=" flex max-w-[922px] w-11/12 xl:h-[823px] rounded-[42px] sh-d bg-white">
            <div className="mx-auto w-11/12 mt-[34px] 3xl:w-[915px] 3xl:px-[40px]">
                <div className="relative w-12/12 h-[185px] rounded-[25px] overflow-hidden">
                        <picture>
                        <img
                            src={coverUrl}
                            alt=""
                            className="object-cover object-top w-full h-full"
                        />
                        </picture>
                <label
                    htmlFor="imageUpload"
                    className="t-ba absolute top-[15px] right-[15px] text-white text-center leading-5 w-[92px] h-[21px] text-[7px] rounded-[5px] cursor-pointer transform hover:scale-110 transition-transform duration-300"
                >
                    Upload Cover
                </label>
                <input
                    name="avatar"
                    type="file"
                    id="imageUpload"
                    className="absolute hidden cursor-pointer"
                    onChange={(e) => handleFileInputChange(e, 'cover')}
                />
                </div>
                <div className=" w-12/12 h-[200px] sm:h-[120px]">
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
                    <label
                    htmlFor="upload"
                    className="absolute left-[150px] -top-[44px] cursor-pointer "
                    >
                    <img id="imageUpload" src="group-70.svg" className="transform hover:scale-125 transition-transform duration-300" />
                    </label>
                    <input
                    name="avatar"
                    type="file"
                    id="upload"
                    className="absolute hidden cursor-pointer"
                    onChange={(e) => handleFileInputChange(e, 'avatar')}
                />
                </div>
                <div className="pt-[100px] gap-[15px] sm:pt-0 flex flex-col sm:flex-row pl-[40px] sm:items-center sm:pl-[200px] sm:justify-between">
                    <div className="pt-[10px]">
                        {
                            myProfile ?
                            (
                                <>
                                    <p className="text-[25px] font-[600] text-[#020025]">{name}</p>
                                    <p className="text-[15px] text-[#6E869B] font-[600]">{myProfile?.username}</p>
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
                </div>
                </div>
                <div className="pt-[40px] xl:pt-[10px]">
                <div className="sh-l w-12/12 h-[220px] sm:h-[117px] rounded-[34px] bg-[#EFF8FF] flex items-center gap-[20px] sm:gap-[50px] flex-col sm:flex-row">
                    <div className="pt-[20px] sm:pt-[0px] sm:pl-[40px] ">
                    <div className=" text-[#0E559D] text-[24px] font-[400]">
                        My Level
                    </div>
                    <div className="text-[#95A6B9] font-[300] text-[18px] flex flex-row">
                        {myProfile?.xp}/{myProfile?.nextLevelXp}
                        <div className="text-[#7899BB] font-[400] text-[18px]">XP</div>{" "}
                    </div>
                    </div>
                    <div className="w-10/12 sm:w-7/12 b">
                    <div className="flex-grow  h-[16px] rounded-[8px] bg-[#C0D4E9] w-12/12">
                            <div className="h-full sh-level rounded-[8px]" style={{ width: `${myProfile?.percentage}%` }} />
                    </div>
                    </div>
                    <div className=" sm:pr-[40px]">
                    <div className="w-[55px] h-[55px] border-[6px] border-[#356B9A] rounded-full flex justify-center items-center">
                        <div className="text-[#356B9A] font-[600] text-[18px]">{myProfile?.level}</div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="flex flex-col xl:flex-row items-center xl:pb-[70px]">
                <div className="flex gap-[64px] sm:gap-[30px] pt-[30px] flex-col sm:flex-row">
                    <div className="flex gap-[64px] flex-col">
                    <div className="w-[180px] h-[100px] bg-[#BBE3FF] hover:bg-[#a2d8ff] rounded-[24px] flex items-center pl-[20px] gap-[17px] g-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="pgroup-78.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#0367A6] text-[17px] font-[500]">
                            Games 
                        </div>
                        <div className="text-[20px] font-[600] text-[#007BC8]">{myProfile?.totalmatches}</div>
                        </div>
                    </div>
                    <div className="w-[180px] h-[100px] bg-[#C1FFFB] hover:bg-[#9dfcf6] rounded-[24px] flex items-center pl-[20px] gap-[17px] s-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="group-83.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#12A099] text-[17px] font-[500]">
                            Reward
                        </div>
                        <div className="text-[20px] font-[600] text-[#098982]">{myProfile?.points}</div>
                        </div>
                    </div>
                    </div>
                    <div className="flex gap-[64px] flex-col">
                    <div className="w-[180px] h-[100px] bg-[#C2FFDE] hover:bg-[#9cffca]  rounded-[24px] flex items-center pl-[20px] gap-[17px] w-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="group-82.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#27B270] text-[17px] font-[500]">
                            Wins
                        </div>
                        <div className="text-[20px] font-[600] text-[#10884F]">{myProfile?.win}</div>
                        </div>
                    </div>
                    <div className="w-[180px] h-[100px] bg-[#FFCCCC] hover:bg-[#feaeae] rounded-[24px] flex items-center pl-[20px] gap-[17px] l-sh transform hover:scale-105 transition-transform duration-300">
                        <img src="group-84.svg" alt="" className="w-[36px] h-[36px]" />
                        <div>
                        <div className="text-[#CA4E4E] text-[17px] font-[500]">
                            Loses
                        </div>
                        <div className="text-[20px] font-[600] text-[#B02323]">{myProfile?.lose}</div>
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
                    <img src="group.svg" alt="" />
                    <span className="pl-[10px] text-[#064A85] text-[15px] sm:text-[20px] font-[400]">
                    Achievements - <span>0</span> / 7
                    </span>
                </div>
                </div>
                <div className="flex items-center flex-col w-12/12 gap-[30px] lg:gap-0 pb-[30px]">
                {/* {loading && <Loading />} */}
                
                
                
                {/* {images.map((imageRow, rowIndex) => (
                    <div key={rowIndex} className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
                        {imageRow.map((img, imgIndex) => (
                            <div key={imgIndex} className="transform hover:scale-110 transition-transform duration-300 relative">
                                <Image src={acharr[imgIndex] ? img.unlocked : img.locked}  alt={img.alt} className={img.className} width={197} height={220} loading="lazy"/>
                            </div>
                        ))}
                    </div>
                ))} */}

                <div className="flex items-center  flex-col w-12/12 gap-[30px] lg:gap-0 pb-[30px]">
                        {/* <div className="flex items-center justify-center  gap-[30px] flex-col sm:flex-row">
                                <div className="transform hover:scale-110 transition-transform duration-300">
                                <Image src={myProfile?.achievements?.ach1 ? "/ach1.svg" : "/ach1Lock.svg"}  alt="ach1"  width={197} height={220} loading="lazy"/>
                                </div>
                                <div className="transform hover:scale-110 transition-transform duration-300">
                                <Image src={myProfile?.achievements?.ach2 ? "/ach2.svg" : "/ach2Lock.svg"}  alt="ach2"  width={197} height={220} loading="lazy"/>
                                </div>
                        </div>
                        <div className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={myProfile?.achievements?.ach3 ? "/ach3.svg" : "/ach3Lock.svg"}  alt="ach3"  width={197} height={220} loading="lazy"/>
                            </div>
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={myProfile?.achievements?.ach4 ? "/ach4.svg" : "/ach4Lock.svg"}  alt="ach4"  width={197} height={220} loading="lazy"/>
                            </div>
                            <div className="lg:block hidden transform hover:scale-110 transition-transform duration-300">
                            <Image src={myProfile?.achievements?.ach5 ? "/ach5.svg" : "/ach5Lock.svg"}  alt="ach5"  width={197} height={220} loading="lazy"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={myProfile?.achievements?.ach6 ? "/ach6.svg" : "/ach6Lock.svg"}  alt="ach6"  width={197} height={220} loading="lazy"/>
                            </div>
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={myProfile?.achievements?.ach7 ? "/ach7.svg" : "/ach7Lock.svg"}  alt="ach7"  width={197} height={220} loading="lazy"/>
                            </div>
                        </div>
                        <div>
                            <div className="pb-[30px] block lg:hidden transform hover:scale-110 transition-transform duration-300">
                            <Image src={myProfile?.achievements?.ach5 ? "/ach5.svg" : "/ach5Lock.svg"}  alt="ach5"  width={197} height={220} loading="lazy"/>
                            </div>
                        </div> */}
                        <div className="flex items-center justify-center  gap-[30px] flex-col sm:flex-row">
                                <div className="transform hover:scale-110 transition-transform duration-300">
                                <Image src={true ? "/ach1.svg" : "/ach1Lock.svg"}  alt="ach1"  width={197} height={220} loading="lazy"/>
                                </div>
                                <div className="transform hover:scale-110 transition-transform duration-300">
                                <Image src={true ? "/ach2.svg" : "/ach2Lock.svg"}  alt="ach2"  width={197} height={220} loading="lazy"/>
                                </div>
                        </div>
                        <div className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={true ? "/ach3.svg" : "/ach3Lock.svg"}  alt="ach3"  width={197} height={220} loading="lazy"/>
                            </div>
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={true ? "/ach4.svg" : "/ach4Lock.svg"}  alt="ach4"  width={197} height={220} loading="lazy"/>
                            </div>
                            <div className="lg:block hidden transform hover:scale-110 transition-transform duration-300">
                            <Image src={true ? "/ach5.svg" : "/ach5Lock.svg"}  alt="ach5"  width={197} height={220} loading="lazy"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-[30px] flex-col sm:flex-row">
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={true ? "/ach6.svg" : "/ach6Lock.svg"}  alt="ach6"  width={197} height={220} loading="lazy"/>
                            </div>
                            <div className="transform hover:scale-110 transition-transform duration-300">
                            <Image src={true ? "/ach7.svg" : "/ach7Lock.svg"}  alt="ach7"  width={197} height={220} loading="lazy"/>
                            </div>
                        </div>
                        <div>
                            <div className="pb-[30px] block lg:hidden transform hover:scale-110 transition-transform duration-300">
                            <Image src={true ? "/ach5.svg" : "/ach5Lock.svg"}  alt="ach5"  width={197} height={220} loading="lazy"/>
                            </div>
                        </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}
