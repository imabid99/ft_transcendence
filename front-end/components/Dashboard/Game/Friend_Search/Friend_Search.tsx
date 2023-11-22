import Link from "next/link";
import Friend from "../../Home/Friend/Friend";
import { useContext, useEffect, useState } from 'react';
import axiosInstance from "@/utils/axiosInstance";
import { contextdata } from '@/app/contextApi';
import FriendCard from "./Friend_Card";
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

const FriendSearch = () => {
  const {profiles, user, socket}:any = useContext(contextdata);
  const [Friends, setFriends] = useState<any>([]);
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
    return (
        <>

  <div className="w-[100%] max-w-[1370px] xl:h-[830px] rounded-[100px] backdrop-blur-[20px] backSh flex gap-[30px] flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
            Friends
          </p>
        </div>
        <div className="pt-[20px] w-10/12 flex flex-col gap-[20px] overflow-y-scroll scrollbar-hide">
         
          {Friends.map((friend: any) => (
             <FriendCard avatar={friend?.avatar} name={`${friend?.firstName} ${friend?.lastName}`} online={friend?.status}/>
          ))}
          <FriendCard avatar="avatar.png" name="Imad" online="ofline"/>
          <FriendCard avatar="avatar.png" name="Imad" online="online"/>
          <FriendCard avatar="avatar.png" name="Imad" online="online"/>
          <FriendCard avatar="avatar.png" name="Imad" online="online"/>
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



