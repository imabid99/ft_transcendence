'use client';
import { useContext, useEffect, useState } from 'react';
import { contextdata } from '@/app/contextApi';
import axiosInstance from '@/utils/axiosInstance';
import RightSide from "../RightSide/RightSide"
import Friend from "../Friend/Friend"
import MatchHistory from "../MatchHistory/MatchHistory"
import { type } from "os"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Lottie from "lottie-react"
import animationData2 from   "../../../../public/ghost2.json"
import { Toaster, toast } from 'sonner'
import Link from 'next/link';
import { set } from 'react-hook-form';

type Props = {
    leaderRef: any,
    handelShaw : (ref:any) => void
}
export default function Body({ leaderRef, handelShaw }: Props) {
    const {profiles, user, socket}:any = useContext(contextdata);
    const [Friends, setFriends] = useState<any>([]);
    const [matchHistoryy, setmatchHistoryy] = useState<any>([]);
    const [leaderboard, setleaderBoard] = useState<any>([]);

    useEffect(() => {
        try{
            const getFriends = async () => {
                try{
                    const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/friendship/show`);
                    console.log(res.data);
                    setFriends(res.data);
                }
                catch(err){
                    console.log(err);
                }
            }
            getFriends();
        }
        catch(error)
        {
            console.log(error)
        }
    }, [profiles])

    useEffect(() => {
        try{
            const getMatchHistorty = async () => {
                try{
                    const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/game/match/history`);
                    // console.log("this is match history",res.data[0].creator.profile.avatar);
                    setmatchHistoryy(res.data);
                }
                catch(err){
                    console.log(err);
                }
            }
            getMatchHistorty();
        }
        catch(error)
        {
            console.log(error)
        }
    }, [profiles])

    useEffect(() => {
        try{
            const getLeaderBoard = async () => {
                try{
                    const res = await axiosInstance.get(`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/api/game/leaderboard`);
                    console.log("this is the leaderboard",res.data);
                    setleaderBoard(res.data);
                }
                catch(err){
                    console.log(err);
                }
            }
            getLeaderBoard();
        }
        catch(error)
        {
            console.log(error)
        }
    }, [profiles])
    console.log("this is the hahahahahahahah ",matchHistoryy)
    const firstavatar = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${leaderboard?.first?.avatar}`;
    const secondavatar = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${leaderboard?.second?.avatar}`;
    const thirdavatar = `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${leaderboard?.third?.avatar}`;
    console.log("this is the avatar",thirdavatar);
    return (
        <div className="flex flex-col 3xl:flex-row items-center w-[100%]  h-screen">
            <div className="flex items-center flex-col 3xl:flex-row gap-[40px] 3xl:gap-[150px] w-[100%]  justify-center ">
                <div className="flex flex-col  min-w-[371px]  w-[100%] 2xl:w-[1224px] rounded-[66px] bg-">

                    <div className="heroD w-[100%] max-w-[1224px] h-[400px] rounded-[66px] flex justify-between ">
                        <div className="flex flex-col xl:pl-[98px]   justify-evenly w-full items-center xl:items-start">
                        <div className="">
                            <div className="font-[700] text-[30px] sm:text-[50px] text-white text-center xl:text-left">
                            Ping <span className="w-28 heroT">PONG</span>
                        </div>
                        <div className="font-[700] text-white text-[30px] sm:text-[50px] text-center xl:text-left">
                            Let The Fun Begin.
                        </div>
                        </div>
                        <div>
                        <Toaster position="top-right" richColors />
                        <Link href={'/Game'}>
                            <button className="bg-[#6F86D6] w-[197px] h-[50px] sm:w-[203px] sm:h-[56px] rounded-[8px] text-white font-[500] text-[20px] b-home" >
                                PLAY NOW
                            </button>
                        </Link>
                        </div>
                    </div>
                    <div className="pr-[98px] xl:block hidden z-50">
                        <img
                            src="Frame 127.svg"
                            alt=""
                            className="mt-[-123px] ml-[60px] max-w-[400px]"
                        />
                        </div>
                    </div>
                    <div className="friedsS w-[100%] max-w-[1224px] h-[400px] rounded-[66px]  bg-white flex flex-col mt-[40px] z-10">
                        <div className="flex gap-[7px] w-[100%] pl-[30px] pt-[40px] items-center">
                        <div>
                            <img src="iconly-bold-game.svg" alt="" />
                        </div>
                        <div>
                            <p className="text-[#02539D] text-[14px] font-[700]">FRIENDS</p>
                        </div>
                    </div>
                        {/* <Swiper
                            spaceBetween={0}
                            slidesPerView={2}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1100: {
                                    slidesPerView: 3,
                                },
                                1350: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="w-full h-full cursor-grab !pl-[30px] !pt-[34px]"
                            > */}
                                {/* {profiles?.map((profile:any) => {
                                        if(profile?.userId !== user?.id){
                                            return (
                                            <SwiperSlide>
                                            <Friend cover={profile?.cover} avatar={profile?.avatar} name={`${profile?.firstName} ${profile?.lastName}`} username={profile?.username} online={profile?.status} userId={profile?.userId} key={profile?.userId}  />
                                            </SwiperSlide>)
                                        }
                                })} */}
                                {/* {Friends?.map((friend:any) => {
                                        return (
                                        <SwiperSlide>
                                        <Friend cover={friend?.cover} avatar={friend?.avatar} name={`${friend?.firstName} ${friend?.lastName}`} username={friend?.username} online={friend?.status} userId={friend?.userId} key={friend?.userId}  />
                                        </SwiperSlide>)
                                })}  */}
                                {/* {
                                  Friends && Friends.length > 0 ? (
                                    Friends.map((friend: any) => (
                                      <SwiperSlide>
                                        <Friend
                                          cover={friend?.cover}
                                          avatar={friend?.avatar}
                                          name={`${friend?.firstName} ${friend?.lastName}`}
                                          username={friend?.username}
                                          online={friend?.status}
                                          userId={friend?.userId}
                                          key={friend?.userId}
                                        />
                                      </SwiperSlide>
                                    ))
                                  ) : (
                                    <p>No friends found.</p>
                                  )
                                }
                        </Swiper> */}
                    {
                        Friends && Friends.length > 0 ? (
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={2}
                                breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1100: {
                                    slidesPerView: 3,
                                },
                                1350: {
                                    slidesPerView: 4,
                                },
                                }}
                                className="w-full h-full cursor-grab !pl-[30px] !pt-[34px]"
                            >
                                {Friends.map((friend: any) => (
                                <SwiperSlide>
                                    <Friend
                                    cover={friend?.cover}
                                    avatar={friend?.avatar}
                                    name={`${friend?.firstName} ${friend?.lastName}`}
                                    username={friend?.username}
                                    online={friend?.status}
                                    userId={friend?.userId}
                                    key={friend?.userId}
                                    />
                                </SwiperSlide>
                                ))}
                            </Swiper>
                            ) : (
                            <div className='w-full  h-full flex  justify-center'>
                            <div className=" w-[300px]  ">
                                <Lottie animationData={animationData2}/>
                             </div>
                            </div>
                        )
                    }
                    </div>  
                </div>
                <div className='header__left flex flex-col gap-[52px]
            lg:max-2xl:gap-[50px] lg:max-2xl:justify-start lg:max-2xl:items-start  min-w-[371px] w-full 3xl:w-fit max-w-[1224px]
            '>
                {/* <RightSide> */}
                <div className="leaderboard w-full 3xl:w-[371px] h-[396px] bg-white">

                    <div className=" flex  items-center justify-between pt-[35px] px-[30px]">
                        <span className="flex items-center gap-[10px]">
                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.700002 12C0.501669 12 0.335302 11.936 0.200902 11.808C0.0665024 11.68 -0.000464244 11.5218 2.42215e-06 11.3333V4.66667C2.42215e-06 4.47778 0.0672025 4.31933 0.201602 4.19133C0.336002 4.06333 0.502136 3.99956 0.700002 4H3.15C3.34833 4 3.5147 4.064 3.6491 4.192C3.7835 4.32 3.85047 4.47822 3.85 4.66667V11.3333C3.85 11.5222 3.7828 11.6807 3.6484 11.8087C3.514 11.9367 3.34787 12.0004 3.15 12H0.700002ZM5.775 12C5.57667 12 5.4103 11.936 5.2759 11.808C5.1415 11.68 5.07453 11.5218 5.075 11.3333V0.666669C5.075 0.47778 5.1422 0.319335 5.2766 0.191336C5.411 0.0633356 5.57713 -0.000442137 5.775 2.30681e-06H8.225C8.42333 2.30681e-06 8.5897 0.0640023 8.7241 0.192002C8.8585 0.320002 8.92547 0.478224 8.925 0.666669V11.3333C8.925 11.5222 8.8578 11.6807 8.7234 11.8087C8.589 11.9367 8.42287 12.0004 8.225 12H5.775ZM10.85 12C10.6517 12 10.4853 11.936 10.3509 11.808C10.2165 11.68 10.1495 11.5218 10.15 11.3333V6C10.15 5.81111 10.2172 5.65267 10.3516 5.52467C10.486 5.39667 10.6521 5.33289 10.85 5.33333H13.3C13.4983 5.33333 13.6647 5.39733 13.7991 5.52533C13.9335 5.65333 14.0005 5.81156 14 6V11.3333C14 11.5222 13.9328 11.6807 13.7984 11.8087C13.664 11.9367 13.4979 12.0004 13.3 12H10.85Z" fill="#02539D"/>
                            </svg> 
                            <p className="text-[14px] font-[700] text-[#02539D]">LEADERBOARD</p>
                        </span>
                        {/* <button className=" border-none outline-none text-[#00539D] font-[Poppins] text-[10px] font-[300]"
                        onClick={() => handelShaw(leaderRef)}
                        >See All</button> */}
                    </div>
                    <div className="flex justify-center items-end gap-[2px]  h-[calc(100%-56px)] overflow-hidden">
                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                <img src={secondavatar} alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                   {leaderboard?.second?.username}
                                </p>
                                <span className="absolute top-[0px] right-[0px] w-[18px] h-[18px] rounded-full bg-[#6C8BD8] text-[10px] font-[400] font-[Poppins] text-[#FFF] flex justify-center items-center
                                outline outline-[2px] outline-[#FFF]
                                "
                                >2</span>
                            </span>
                            <div className="min-w-[90px] h-[151px] rounded-t-[20px] bg-[#338AC8]" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src="/crown.svg" alt="" className="w-[25px]" />
                            <div className="flex flex-col items-center justify-center gap-[10px]">
                                <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                    <img src={firstavatar} alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                    <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                        {leaderboard?.first?.username}
                                    </p>
                                <span className="absolute top-[0px] right-[0px] w-[18px] h-[18px] rounded-full bg-[#03539D] text-[10px] font-[400] font-[Poppins] text-[#FFF] flex justify-center items-center
                                outline outline-[2px] outline-[#FFF]
                                "
                                >1</span>
                                </span>
                                <div className="min-w-[90px] h-[198px] rounded-t-[20px] bg-[#004A8B] opacity-[0.8] shadow-5xl" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                <img src={thirdavatar} alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                    {leaderboard?.third?.username}
                                </p>
                                <span className="absolute top-[0px] right-[0px] w-[18px] h-[18px] rounded-full bg-[#4CC0ED] text-[10px] font-[400] font-[Poppins] text-[#FFF] flex justify-center items-center
                                outline outline-[2px] outline-[#FFF]
                                "
                                >3</span>
                            </span>
                            <div className="min-w-[90px] h-[124px] rounded-t-[20px] bg-[#4cc0edb8] shadow-6xl" />
                        </div>
                    </div>
                </div>
                {/* </RightSide> */}
                <RightSide>
                {/* <div className=" min-w-[371px] h-[390px] bg-white rounded-[42px] overflow-hidden"> */}
                <div className=" flex  items-center justify-between pt-[35px] px-[30px] bf">
                        <span className="flex items-center gap-[10px] pb-[10px] w-full">
                            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.08272 9.22217C11.929 9.22217 14.3594 9.69814 14.3594 11.6028C14.3594 13.5067 11.9446 14 9.08272 14C6.23639 14 3.80603 13.524 3.80603 11.6201C3.80603 9.71548 6.2208 9.22217 9.08272 9.22217ZM13.6336 8.07527C14.7218 8.05399 15.8917 8.2116 16.324 8.3235C17.2398 8.51341 17.8422 8.90112 18.0918 9.46457C18.3027 9.92714 18.3027 10.4638 18.0918 10.9256C17.71 11.7995 16.4792 12.08 16.0009 12.1525C15.9021 12.1683 15.8226 12.0777 15.833 11.9729C16.0774 9.55125 14.1335 8.40309 13.6307 8.1391C13.6091 8.12728 13.6047 8.10915 13.6069 8.09812C13.6084 8.09024 13.6173 8.07763 13.6336 8.07527ZM4.61692 8.07558C4.63326 8.07795 4.64143 8.09056 4.64291 8.09765C4.64514 8.10947 4.64069 8.12681 4.61989 8.13941C4.11629 8.4034 2.17244 9.55156 2.41681 11.9724C2.42721 12.078 2.34848 12.1678 2.24969 12.1529C1.77134 12.0804 0.540556 11.7998 0.158769 10.9259C-0.0529229 10.4633 -0.0529229 9.92746 0.158769 9.46488C0.408342 8.90144 1.00999 8.51373 1.92584 8.32303C2.35887 8.21191 3.52801 8.05431 4.61692 8.07558ZM9.08272 0C11.0206 0 12.5745 1.64698 12.5745 3.70375C12.5745 5.75972 11.0206 7.40828 9.08272 7.40828C7.14481 7.40828 5.59092 5.75972 5.59092 3.70375C5.59092 1.64698 7.14481 0 9.08272 0ZM13.823 0.617659C15.6948 0.617659 17.1648 2.48608 16.6642 4.56727C16.3262 5.96839 15.1029 6.89905 13.7399 6.86123C13.6032 6.85729 13.4687 6.84389 13.3388 6.82025C13.2444 6.80291 13.1969 6.69022 13.2504 6.60669C13.7703 5.79502 14.0667 4.81865 14.0667 3.77057C14.0667 2.67678 13.7428 1.65707 13.1805 0.820971C13.1627 0.794966 13.1493 0.754776 13.1672 0.724831C13.182 0.700402 13.2095 0.687793 13.2355 0.681489C13.4249 0.640512 13.6195 0.617659 13.823 0.617659ZM4.4264 0.61758C4.62992 0.61758 4.82452 0.640433 5.01468 0.68141C5.03993 0.687715 5.06815 0.701111 5.08301 0.724752C5.10009 0.754697 5.08747 0.794887 5.06964 0.820892C4.50736 1.65699 4.18351 2.6767 4.18351 3.77049C4.18351 4.81857 4.47988 5.79494 4.99982 6.60661C5.0533 6.69015 5.00576 6.80283 4.91143 6.82017C4.7807 6.8446 4.647 6.85721 4.51033 6.86115C3.14733 6.89897 1.92398 5.96831 1.58602 4.56719C1.08464 2.486 2.5546 0.61758 4.4264 0.61758Z" fill="#04549D"/>
                            </svg> 
                            <p className="text-[14px] font-[700] text-[#02539D]">MATCH HISTORY</p>
                        </span>
                    </div>
                    <div className="flex flex-col  gap-[10px]   overflow-y-scroll max-h-[calc(100%-67px)] items-center py-[5px] no-scrollbar overflow-hidden rounded-b-[40px] ">
                                {
                                    matchHistoryy && matchHistoryy.length > 0 ? (
                                        matchHistoryy.map((match: any) => (
                                        <MatchHistory
                                            winnerAvatar={match?.creator?.profile?.avatar}
                                            winnerName={`${match?.creator?.profile?.firstName} ${match?.creator?.profile?.lastName}`}
                                            winnerScore={match?.creatorScore}
                                            loserAvatar={match?.opponent?.profile?.avatar}
                                            loserName={`${match?.opponent?.profile?.firstName} ${match?.opponent?.profile?.lastName}`}
                                            loserScore={match?.opponentScore}
                                        />
                                        ))
                                    ) : (
                                        <div className='w-full  h-full flex  justify-center'>
                                        <div className=" w-[300px]  ">
                                            <Lottie animationData={animationData2}/>
                                        </div>
                                        </div>
                                    )
                                }
                                                    
                    </div>
                </RightSide>
            </div>
        </div>
        </div>
    )
}