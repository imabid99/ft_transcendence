'use client';
import Avatars from "../Avatar/Avatar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from "react";
import { contextdata } from '@/app/contextApi';
import Link from 'next/link';
import 'swiper/css';

export default function UsersOnline() {

    const {profiles, user} :any= useContext(contextdata);

    return (
      <div className="chat__left__bottom flex flex-col gap-[24px] px-[25px] py-[25px] w-full">
        <div className="chat__left__bottom__online__users flex flex-col gap-[20px] w-full lg:max-xl:w-[300px]" >
            <p className="text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]">
            Online Now
            </p>
            <Swiper
            spaceBetween={1}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            className="w-full cursor-grab"
            >
                {user && profiles?.map((profile: any) => (
                    profile.status === "online" && profile.userId !== user.id &&
                    <SwiperSlide key={profile.userId}>
                        <Link href={`/Chat/me/${profile.userId}`}>
                            <Avatars url="/userProfile.jpg" status={true} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
  )
}