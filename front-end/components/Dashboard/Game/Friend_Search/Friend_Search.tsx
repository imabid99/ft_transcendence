import Link from "next/link";

import {useState} from 'react';
import Friend from "../../Home/Friend/Friend";
// type props  = {
//     name: string,
//     username: string,
//     avatar: string,
//     cover: string,
//     online: string
//     userId: string
// }
type props  = {
    setShow: any,
    onMapChange: any
}

const FriendSearch = ({setShow, onMapChange}:props) => {


    return (
        <>

  <div className="w-[1370px] xl:h-[830px] rounded-[100px] backdrop-blur-[20px] backSh flex gap-[30px] flex-col items-center">
    <div className="flex flex-col gap-[16px] w-10/12 ">
      <div className="w-full  pt-[49px]">
        <input
          type="search"
          className="w-full h-[110px] md:h-[100px] rounded-[25px] backdrop-blur-[20px] inpShad placeholder:text-white text-white placeholder:font-['Fredoka'] font-['Fredoka'] placeholder:text-[25px] placeholder:font-[500] font-[500] text-[25px] indent-[62px] "
          placeholder="Search To Play"
        />
      </div>
      <div className="w-full h-[491px] rounded-[34px] backdrop-blur-[20px] inpShad flex items-center flex-col  ">
        <div className=" pt-[20px] w-10/12">
          <p className="text-[#fff] text-[20px] font-[400] font-['Fredoka']">
            Online Friend
          </p>
        </div>
        <div className="pt-[20px] w-10/12 flex flex-col gap-[20px] overflow-y-scroll scrollbar-hide">
          <div className="w-full md:h-[121px] rounded-[22px] backdrop-blur-[20px] flex items-center justify-center ">
            <div className="flex items-center justify-between  w-11/12  flex-col md:flex-row gap-[20px]  md:p-0">
              <div className="flex items-center gap-[24px] flex-col md:flex-row py-[15px]">
                <div className="w-[92px] h-[92px] rounded-full ">
                  <img
                    src="snow.svg"
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[20px] md:text-[30px] text-[#3271A8] font-['Fredoka'] font-[400]">
                    Achraf Sabbar
                  </p>
                  <p className="text-[10px] md:text-[20px] text-[#064A85] font-['Fredoka'] font-[600]">
                    LVL 5
                  </p>
                </div>
              </div>
              <div className="pb-[15px] md:pb-0">
                <button className="w-[144px] h-[46px] rounded-[8px] bg-[#3271A8] flex items-center justify-center gap-[5px] playButt">
                  <img src="pong-icon.svg" alt="" className="w-[15px]" />
                  <p className="text-[#fff] text-[13px] font-[400] font-['Fredoka']">
                    Invite To Play
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:h-[121px] rounded-[22px] backdrop-blur-[20px] flex items-center justify-center ">
            <div className="flex items-center justify-between  w-11/12  flex-col md:flex-row gap-[20px]  md:p-0">
              <div className="flex items-center gap-[24px] flex-col md:flex-row py-[15px]">
                <div className="w-[92px] h-[92px] rounded-full ">
                  <img
                    src="snow.svg"
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[20px] md:text-[30px] text-[#3271A8] font-['Fredoka'] font-[400]">
                    Achraf Sabbar
                  </p>
                  <p className="text-[10px] md:text-[20px] text-[#064A85] font-['Fredoka'] font-[600]">
                    LVL 5
                  </p>
                </div>
              </div>
              <div className="pb-[15px] md:pb-0">
                <button className="w-[144px] h-[46px] rounded-[8px] bg-[#3271A8] flex items-center justify-center gap-[5px] playButt">
                  <img src="pong-icon.svg" alt="" className="w-[15px]" />
                  <p className="text-[#fff] text-[13px] font-[400] font-['Fredoka']">
                    Invite To Play
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:h-[121px] rounded-[22px] backdrop-blur-[20px] flex items-center justify-center ">
            <div className="flex items-center justify-between  w-11/12  flex-col md:flex-row gap-[20px]  md:p-0">
              <div className="flex items-center gap-[24px] flex-col md:flex-row py-[15px]">
                <div className="w-[92px] h-[92px] rounded-full ">
                  <img
                    src="snow.svg"
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[20px] md:text-[30px] text-[#3271A8] font-['Fredoka'] font-[400]">
                    Achraf Sabbar
                  </p>
                  <p className="text-[10px] md:text-[20px] text-[#064A85] font-['Fredoka'] font-[600]">
                    LVL 5
                  </p>
                </div>
              </div>
              <div className="pb-[15px] md:pb-0">
                <button className="w-[144px] h-[46px] rounded-[8px] bg-[#3271A8] flex items-center justify-center gap-[5px] playButt">
                  <img src="pong-icon.svg" alt="" className="w-[15px]" />
                  <p className="text-[#fff] text-[13px] font-[400] font-['Fredoka']">
                    Invite To Play
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:h-[121px] rounded-[22px] backdrop-blur-[20px] flex items-center justify-center ">
            <div className="flex items-center justify-between  w-11/12  flex-col md:flex-row gap-[20px]  md:p-0">
              <div className="flex items-center gap-[24px] flex-col md:flex-row py-[15px]">
                <div className="w-[92px] h-[92px] rounded-full ">
                  <img
                    src="snow.svg"
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="text-[20px] md:text-[30px] text-[#3271A8] font-['Fredoka'] font-[400]">
                    Achraf Sabbar
                  </p>
                  <p className="text-[10px] md:text-[20px] text-[#064A85] font-['Fredoka'] font-[600]">
                    LVL 5
                  </p>
                </div>
              </div>
              <div className="pb-[15px] md:pb-0">
                <button className="w-[144px] h-[46px] rounded-[8px] bg-[#3271A8] flex items-center justify-center gap-[5px] playButt">
                  <img src="pong-icon.svg" alt="" className="w-[15px]" />
                  <p className="text-[#fff] text-[13px] font-[400] font-['Fredoka']">
                    Invite To Play
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full  flex justify-center gap-[10px] pb-[40px] flex-col items-center md:flex-row">
      <button className="w-[240px] h-[77px] retB rounded-[14px] text-white text-[30px] font-[400] hover:bg-gray-400 font-['Fredoka']">
        Back
      </button>
      <button className="w-[240px] h-[77px] backB rounded-[14px] text-white text-[30px] font-[400] hover:bg-gray-400 font-['Fredoka']">
        Next
      </button>
    </div>
  </div>
</>



);
};

export default FriendSearch;



