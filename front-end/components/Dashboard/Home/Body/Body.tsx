'use client';
import { useContext, useState } from 'react';
import { contextdata } from '@/app/contextApi';
import axiosInstance from '@/utils/axiosInstance';
import RightSide from "../RightSide/RightSide"
import Friend from "../Friend/Friend"
import MatchHistory from "../MatchHistory/MatchHistory"
import { type } from "os"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
    leaderRef: any,
    handelShaw : (ref:any) => void
}
export default function Body({ leaderRef, handelShaw }: Props) {
    const {profiles, user, socket}:any = useContext(contextdata);
    const myProfile = profiles?.find((profile:any) => profile?.userId === user.id);
    // const name = `${myProfile?.firstName} ${myProfile?.lastName}`;
    // const username = myProfile?.username;
    // const avatar = myProfile?.avatar;
    // const online = myProfile?.status;
    // const cover = myProfile?.cover;

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
                        <button className="bg-[#6F86D6] w-[197px] h-[50px] sm:w-[203px] sm:h-[56px] rounded-[8px] text-white font-[500] text-[20px] b-home">
                            PLAY NOW
                        </button>
                        </div>
                    </div>
                    <div className="pr-[98px] xl:block hidden">
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
                    {/* <div className="pl-[30px] pt-[34px] flex  w-[100%]  h-[100%] rounded-[66px] "> */}
                        {/* <div className="flex gap-[30px] "> */}
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={4}
                            className="w-full h-full cursor-grab !pl-[30px] !pt-[34px]"
                            >
                                <SwiperSlide>
                                {profiles?.map((profile:any) => {
                                        if(profile?.userId !== user.id){
                                            return (<Friend cover={profile?.cover} avatar={profile?.avatar} name={`${profile?.firstName} ${profile?.lastName}`} username={profile?.username} online={profile?.status} key={profile?.userId}  />)
                                        }
                                    })}
                                </SwiperSlide>
                        </Swiper>
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
                        <button className=" border-none outline-none text-[#00539D] font-[Poppins] text-[10px] font-[300]"
                        onClick={() => handelShaw(leaderRef)}
                        >See All</button>
                    </div>
                    <div className="flex justify-center items-end gap-[2px]  h-[calc(100%-56px)] overflow-hidden">
                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                <img src="/userProfile.jpg" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                    Asabbar
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
                                    <img src="/userProfile.jpg" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                    <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                        Asabbar
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
                                <img src="/userProfile.jpg" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                    Asabbar
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
                            <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="mittoushaha.png" winnerName="Ismail Mittous" winnerScore="20" loserAvatar="jlemhaha.png" loserName="Mustapha jlem" loserScore="20"
                                />
                    </div>
                        {/* <div className="flex gap-[5px] w-[100%] pl-[30px] pt-[40px]">
                        <div>
                            <img src="iconly-bold-game.svg" alt="" />
                        </div>
                        <div>
                            <p className="text-[#02539D] text-[14px] font-[700]">MATCH HISTORY</p>
                        </div>
                        </div>
                        <div className="flex items-center justify-center pt-[16px] flex-col gap-[16px] overflow-y-scroll h-[335px]">
                                <MatchHistory
                                    winnerAvatar="46e4e1beddaa3825f3d815f7f7ef8134.jpeg" winnerName="Ahmed Kamal" winnerScore="20" loserAvatar="jlemdrayaf.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="46e4e1beddaa3825f3d815f7f7ef8134.jpeg" winnerName="Ahmed Kamal" winnerScore="20" loserAvatar="jlemdrayaf.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="46e4e1beddaa3825f3d815f7f7ef8134.jpeg" winnerName="Ahmed Kamal" winnerScore="20" loserAvatar="jlemdrayaf.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="46e4e1beddaa3825f3d815f7f7ef8134.jpeg" winnerName="Ahmed Kamal" winnerScore="20" loserAvatar="jlemdrayaf.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="46e4e1beddaa3825f3d815f7f7ef8134.jpeg" winnerName="Ahmed Kamal" winnerScore="20" loserAvatar="jlemdrayaf.png" loserName="Mustapha jlem" loserScore="20"
                                />
                                <MatchHistory
                                    winnerAvatar="46e4e1beddaa3825f3d815f7f7ef8134.jpeg" winnerName="Ahmed Kamal" winnerScore="20" loserAvatar="jlemdrayaf.png" loserName="Mustapha jlem" loserScore="20"
                                />
                        </div> */}
                    {/* </div> */}
                </RightSide>
            </div>
        </div>

            {/* <div className='header__left flex flex-col gap-[52px] lg:max-2xl:w-[100%]'>
                <div className=" center__leaderboard__left home__center h-[396px] w-[1224px] flex flex-col justify-center pl-[98px] relative
                lg:max-3xl:w-[1000px]  lg:max-xl:w-[600px]
                2xl:max-3xl:w-[900px] 2xl:max-3xl:pl-[50px]
                lg:max-2xl:min-w-full
                ">
                    <div className=" flex flex-col justify-center relative gap-[20px]">
                        <p className="text-[50px] font-[700] text-[#FFFFFF] z-[6]
                        lg:max-2xl:text-[45px] lg:max-xl:text-[40px]
                        ">
                            Ping
                            <span className="home__center__text"> PONG</span><br />
                            Let The Fun Begin.
                        </p>
                        <button
                            className="z-[5] bg-gradient-to-r from-[#48C6EF] to-[#6F86D6]  rounded-[5px] font-[Poppins] font-[500] text-[20px] text-white w-[203px] h-[54px] mt-[20px] flex justify-center items-center">
                            PLAY NOW
                        </button>
                        <img src="/balls.png" alt="" className="absolute top-[0px] left-[0px] w-[685px] height-[213px] z-[0]" />
                        <img src="/star2.png" alt="" className="absolute top-[0px] right-[0px] w-[55px] height-[55px] z-[0]" />
                        <img src="/star2.png" alt="" className="absolute bottom-[20px] right-[500px] w-[55px] height-[55px] z-[0]" />
                        <img src="/star2.png" alt="" className="absolute bottom-[20px] right-[250px] w-[200px] height-[200px] z-[0] -rotate-[75deg] opacity-[0.9]" />
                        <img src="/star2.png" alt="" className="absolute bottom-[-50px] right-[150px] w-[100px] height-[100px] z-[0] -rotate-[75deg] opacity-[0.9]" />
                    </div>
                    <img src="/Rectangl.png" alt="" className="absolute bottom-[0px] right-[-150px] w-[708px] h-[574px] z-[20]
                    lg:max-3xl:w-[600px] lg:max-3xl:h-[500px] 
                    lg:max-3xl:right-[-100px]
                    lg:max-2xl:w-[600px] lg:max-2xl:h-[500px] 
                    "/>
                </div>
                <div  className="z-[50] bg-[#fff]  w-[1224px] flex flex-col  px-[30px] pt-[35px]  rounded-[42px] h-[396px]
                    lg:max-3xl:w-[1000px] lg:max-2xl:w-[800px] lg:max-xl:w-[600px]
                    2xl:max-3xl:w-[900px] 2xl:max-3xl:pl-[50px] lg:max-2xl:h-[425px]
                    lg:max-2xl:min-w-full 
                ">
                    <div className=" flex justify-between items-center w-full pb-[30px]">
                        <span className="flex items-center gap-[5.3px] w-[200px]">
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.09567 0C5.42594 0 5.68544 0.262042 5.68544 0.578035C5.68544 0.809249 5.88203 0.99422 6.11795 0.99422H6.89645C8.08387 1.00193 9.0511 1.9499 9.05896 3.10597V3.25241C9.80601 3.25241 10.5531 3.26782 11.308 3.27553C14.0367 3.27553 16.0262 5.21773 16.0262 7.89981V11.3449C16.0262 14.027 14.0367 15.9692 11.308 15.9692C10.2149 15.9923 9.12187 16 8.02096 16C6.92004 16 5.81126 15.9923 4.71821 15.9692C1.98951 15.9692 0 14.027 0 11.3449V7.89981C0 5.21773 1.98951 3.27553 4.72607 3.27553C5.75622 3.26012 6.80995 3.2447 7.87941 3.2447V3.11368C7.87941 2.58189 7.43118 2.15029 6.89645 2.15029H6.11795C5.22935 2.15029 4.50589 1.44123 4.50589 0.578035C4.50589 0.262042 4.77326 0 5.09567 0ZM5.67758 7.65318C5.3473 7.65318 5.0878 7.91522 5.0878 8.23121V9.04046H4.25425C3.93184 9.04046 3.66448 9.30251 3.66448 9.6185C3.66448 9.9422 3.93184 10.1965 4.25425 10.1965H5.0878V11.0135C5.0878 11.3295 5.3473 11.5915 5.67758 11.5915C5.99999 11.5915 6.26736 11.3295 6.26736 11.0135V10.1965H7.09304C7.41545 10.1965 7.68282 9.9422 7.68282 9.6185C7.68282 9.30251 7.41545 9.04046 7.09304 9.04046H6.26736V8.23121C6.26736 7.91522 5.99999 7.65318 5.67758 7.65318ZM11.8584 10.3892H11.7798C11.4487 10.3892 11.19 10.6513 11.19 10.9672C11.19 11.2909 11.4487 11.5453 11.7798 11.5453H11.8584C12.1808 11.5453 12.4482 11.2909 12.4482 10.9672C12.4482 10.6513 12.1808 10.3892 11.8584 10.3892ZM10.5137 7.73796H10.4351C10.1048 7.73796 9.84533 8 9.84533 8.31599C9.84533 8.63969 10.1048 8.89403 10.4351 8.89403H10.5137C10.8362 8.89403 11.1035 8.63969 11.1035 8.31599C11.1035 8 10.8362 7.73796 10.5137 7.73796Z" fill="#02539D"/>
                            </svg>
                            <p className="text-[14px] font-[700] text-[#02539D] font-[Poppins]">Match Histry</p>
                        </span>
                        <button className="border-none outline-none text-[#00539D]  font-[Poppins] text-[10px] font-[300]">See All</button>
                    </div>
                    <div className="flex flex-col gap-[15px] max-h-[calc(396px-56px)] overflow-y-scroll no-scrollbar  ">
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                    </div>
                </div >
            </div> */}
            {/* <div className='header__left flex flex-col gap-[52px]
            lg:max-2xl:flex-row lg:max-2xl:gap-[50px] lg:max-2xl:justify-start lg:max-2xl:items-start 
            '>
                <RightSide>
                    <div className=" flex  items-center justify-between pt-[35px] px-[30px]">
                        <span className="flex items-center gap-[10px]">
                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.700002 12C0.501669 12 0.335302 11.936 0.200902 11.808C0.0665024 11.68 -0.000464244 11.5218 2.42215e-06 11.3333V4.66667C2.42215e-06 4.47778 0.0672025 4.31933 0.201602 4.19133C0.336002 4.06333 0.502136 3.99956 0.700002 4H3.15C3.34833 4 3.5147 4.064 3.6491 4.192C3.7835 4.32 3.85047 4.47822 3.85 4.66667V11.3333C3.85 11.5222 3.7828 11.6807 3.6484 11.8087C3.514 11.9367 3.34787 12.0004 3.15 12H0.700002ZM5.775 12C5.57667 12 5.4103 11.936 5.2759 11.808C5.1415 11.68 5.07453 11.5218 5.075 11.3333V0.666669C5.075 0.47778 5.1422 0.319335 5.2766 0.191336C5.411 0.0633356 5.57713 -0.000442137 5.775 2.30681e-06H8.225C8.42333 2.30681e-06 8.5897 0.0640023 8.7241 0.192002C8.8585 0.320002 8.92547 0.478224 8.925 0.666669V11.3333C8.925 11.5222 8.8578 11.6807 8.7234 11.8087C8.589 11.9367 8.42287 12.0004 8.225 12H5.775ZM10.85 12C10.6517 12 10.4853 11.936 10.3509 11.808C10.2165 11.68 10.1495 11.5218 10.15 11.3333V6C10.15 5.81111 10.2172 5.65267 10.3516 5.52467C10.486 5.39667 10.6521 5.33289 10.85 5.33333H13.3C13.4983 5.33333 13.6647 5.39733 13.7991 5.52533C13.9335 5.65333 14.0005 5.81156 14 6V11.3333C14 11.5222 13.9328 11.6807 13.7984 11.8087C13.664 11.9367 13.4979 12.0004 13.3 12H10.85Z" fill="#02539D"/>
                            </svg> 
                            <p className="text-[14px] font-[700] text-[#02539D]">LEADERBOARD</p>
                        </span>
                        <button className=" border-none outline-none text-[#00539D] font-[Poppins] text-[10px] font-[300]"
                        onClick={() => handelShaw(leaderRef)}
                        >See All</button>
                    </div>
                    <div className="flex justify-center items-end gap-[2px]  h-[calc(100%-56px)] overflow-hidden">
                        <div className="flex flex-col items-center justify-center gap-[10px]">
                            <span className="flex flex-col items-center justify-center gap-[10px] relative">
                                <img src="/userProfile.jpg" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                    Asabbar
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
                                    <img src="/userProfile.jpg" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                    <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                        Asabbar
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
                                <img src="/userProfile.jpg" alt="" className=" w-[80px] h-[80px] rounded-full object-cover shadow-4xl" />
                                <p className="text-[10px] font-[700] font-[Poppins] text-[#6C8BD8]">
                                    Asabbar
                                </p>
                                <span className="absolute top-[0px] right-[0px] w-[18px] h-[18px] rounded-full bg-[#4CC0ED] text-[10px] font-[400] font-[Poppins] text-[#FFF] flex justify-center items-center
                                outline outline-[2px] outline-[#FFF]
                                "
                                >3</span>
                            </span>
                            <div className="min-w-[90px] h-[124px] rounded-t-[20px] bg-[#4cc0edb8] shadow-6xl" />
                        </div>
                    </div>
                </RightSide>
                <RightSide>
                    <div className=" flex  items-center justify-between pt-[35px] px-[30px]">
                        <span className="flex items-center gap-[10px] pb-[10px] w-full">
                            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.08272 9.22217C11.929 9.22217 14.3594 9.69814 14.3594 11.6028C14.3594 13.5067 11.9446 14 9.08272 14C6.23639 14 3.80603 13.524 3.80603 11.6201C3.80603 9.71548 6.2208 9.22217 9.08272 9.22217ZM13.6336 8.07527C14.7218 8.05399 15.8917 8.2116 16.324 8.3235C17.2398 8.51341 17.8422 8.90112 18.0918 9.46457C18.3027 9.92714 18.3027 10.4638 18.0918 10.9256C17.71 11.7995 16.4792 12.08 16.0009 12.1525C15.9021 12.1683 15.8226 12.0777 15.833 11.9729C16.0774 9.55125 14.1335 8.40309 13.6307 8.1391C13.6091 8.12728 13.6047 8.10915 13.6069 8.09812C13.6084 8.09024 13.6173 8.07763 13.6336 8.07527ZM4.61692 8.07558C4.63326 8.07795 4.64143 8.09056 4.64291 8.09765C4.64514 8.10947 4.64069 8.12681 4.61989 8.13941C4.11629 8.4034 2.17244 9.55156 2.41681 11.9724C2.42721 12.078 2.34848 12.1678 2.24969 12.1529C1.77134 12.0804 0.540556 11.7998 0.158769 10.9259C-0.0529229 10.4633 -0.0529229 9.92746 0.158769 9.46488C0.408342 8.90144 1.00999 8.51373 1.92584 8.32303C2.35887 8.21191 3.52801 8.05431 4.61692 8.07558ZM9.08272 0C11.0206 0 12.5745 1.64698 12.5745 3.70375C12.5745 5.75972 11.0206 7.40828 9.08272 7.40828C7.14481 7.40828 5.59092 5.75972 5.59092 3.70375C5.59092 1.64698 7.14481 0 9.08272 0ZM13.823 0.617659C15.6948 0.617659 17.1648 2.48608 16.6642 4.56727C16.3262 5.96839 15.1029 6.89905 13.7399 6.86123C13.6032 6.85729 13.4687 6.84389 13.3388 6.82025C13.2444 6.80291 13.1969 6.69022 13.2504 6.60669C13.7703 5.79502 14.0667 4.81865 14.0667 3.77057C14.0667 2.67678 13.7428 1.65707 13.1805 0.820971C13.1627 0.794966 13.1493 0.754776 13.1672 0.724831C13.182 0.700402 13.2095 0.687793 13.2355 0.681489C13.4249 0.640512 13.6195 0.617659 13.823 0.617659ZM4.4264 0.61758C4.62992 0.61758 4.82452 0.640433 5.01468 0.68141C5.03993 0.687715 5.06815 0.701111 5.08301 0.724752C5.10009 0.754697 5.08747 0.794887 5.06964 0.820892C4.50736 1.65699 4.18351 2.6767 4.18351 3.77049C4.18351 4.81857 4.47988 5.79494 4.99982 6.60661C5.0533 6.69015 5.00576 6.80283 4.91143 6.82017C4.7807 6.8446 4.647 6.85721 4.51033 6.86115C3.14733 6.89897 1.92398 5.96831 1.58602 4.56719C1.08464 2.486 2.5546 0.61758 4.4264 0.61758Z" fill="#04549D"/>
                            </svg> 
                            <p className="text-[14px] font-[700] text-[#02539D]">Friends</p>
                        </span>
                    </div>
                    <div className="flex flex-col  gap-[10px]   overflow-y-scroll max-h-[calc(100%-67px)] items-center py-[5px] no-scrollbar overflow-hidden">
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                        <Friend  name="Achraf sabbar" username="asabbar" avatar="/userProfile.jpg" />
                    </div>
                </RightSide>
            </div> */}
        </div>
    )
}