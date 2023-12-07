'use client';
import Avatars from "../Avatar/Avatar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from "react";
import { contextdata } from '@/app/contextApi';
import Link from 'next/link';
import 'swiper/css';

export default function UsersOnline() {

    const {myFriends, user} :any= useContext(contextdata);
    myFriends?.sort((a: any, b: any) => (a.userId > b.userId) ? -1 : 1)
    return (
      <div className="chat__left__bottom flex flex-col gap-[24px] px-[25px] py-[25px] w-full mt-[10px]">
        <div className="chat__left__bottom__online__users flex flex-col gap-[20px] w-full lg:max-xl:w-[300px]" >
            <p className="text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]">
            Online Now
            </p>
            <Swiper
            spaceBetween={1}
            slidesPerView={4}
            className="w-full cursor-grab"
            >
                {user && myFriends?.map((profile: any) => (
                    profile.status !== "offline" && profile.userId !== user.id &&
                    <SwiperSlide key={profile.userId}>
                        <Link href={`/Chat/me/${profile.userId}`}>
                            <Avatars url={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${profile.avatar}`} status={true} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
  )
}