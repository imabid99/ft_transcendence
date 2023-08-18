
import Avatars from "../Avatar/Avatar";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export default function UsersOnline() {

  
  return (
      <div className="chat__left__bottom flex flex-col gap-[24px] px-[25px] py-[25px] w-full">
        <div className="search flex items-center relative">
            <span className="p-[15px] bg-[#f5f7f9b3] rounded-l-[15px]">
            <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z"
                stroke="#898F94"
                />
                <path
                d="M19.7193 18.9984L15.1953 14.6484"
                stroke="#898F94"
                />
            </svg>
            </span>
            <input
            type="text"
            placeholder="Search..."
            className="rounded-r-[15px] pr-[15px] w-[calc(100%-49px)] bg-[#f5f7f9b3] h-[50px]  outline-none pl-[15px] text-[#898F94] font-[Poppins] font-[300] text-[16px] leading-[24px]"
            />
        </div>
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
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
                <SwiperSlide>
                    <Avatars url="/userProfile.jpg" status={true} />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}