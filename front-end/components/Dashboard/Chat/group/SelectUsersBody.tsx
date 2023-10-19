'use client';
import SelectUsers from "./SelectUsers";
import { useContext } from "react";
import { contextdata } from '@/app/contextApi';

type selectUsersProps = {
    setShowBody : any,
    setGroupUsers: any,
    groupUsers: any,
}
export default function SelectUsersBody({setShowBody,setGroupUsers,groupUsers}:selectUsersProps)
{
    const {
        profiles,
        user,
    } :any = useContext(contextdata);
    return (
        <div>
            <div className=" flex gap-2 items-center  py-[27px] px-[25px]">
                <span onClick={() => {setShowBody(null);setGroupUsers([])}} className="cursor-pointer">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0412 21.0012C15.5679 21.0017 15.1088 20.8393 14.7412 20.5412L9.64118 16.3312C9.44119 16.172 9.27967 15.9697 9.16866 15.7394C9.05765 15.5091 9 15.2568 9 15.0012C9 14.7455 9.05765 14.4932 9.16866 14.2629C9.27967 14.0327 9.44119 13.8304 9.64118 13.6712L14.7412 9.46117C15.0482 9.21516 15.4182 9.06035 15.8089 9.01438C16.1996 8.96842 16.5954 9.03314 16.9512 9.20117C17.2604 9.33745 17.5238 9.55984 17.71 9.84179C17.8961 10.1237 17.9972 10.4533 18.0012 10.7912V19.2112C17.9972 19.549 17.8961 19.8786 17.71 20.1606C17.5238 20.4425 17.2604 20.6649 16.9512 20.8012C16.6653 20.9312 16.3552 20.9993 16.0412 21.0012Z" fill="#00498A"/>
                    </svg>
                </span>
                <p className="text-[25px] font-[600] font-[Poppins] text-[#00498A] leading-6 cursor-pointer" >
                    Add Group Members
                </p>
            </div>
            <div className='w-full px-[31px]'>
                <input type="text"  className="w-full h-[50px]  border-b-[1px] border-[#E5E5E5] border-opacity-50 px-[20px] text-[15px] font-[300] font-[Poppins] text-[#BDBFC3] outline-none" placeholder="Search for friends..." />
            </div>
            <form className="max-h-[calc(100%-270px)] min-h-[calc(100%-270px)] overflow-y-scroll no-scrollbar px-[25px] py-[25px]">
                {
                    user && profiles?.map((profile: any) => (
                        profile.userId !== user.id &&
                        <SelectUsers key={user.id} groupUsers={groupUsers} setGroupUsers={setGroupUsers} user={{name: `${profile.firstName} ${profile.lastName}`, username: `${profile.username}`, url: `http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${profile.avatar}`, userId : profile.userId}} />
                    ))
                }
            </form>
            <div className="  bg-[#025063] min-h-[70px] min-w-[70px] rounded-full absolute bottom-[54px] right-[50px] z-[100] flex justify-center items-center cursor-pointer" onClick={() => { setShowBody("groupInfo")}}>
                <div className="flex justify-center items-center relative">
                    <svg  fill="#FFF"  viewBox="0 0 24 24" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#FFF"  d="M6,12.4 L18,12.4 M12.6,7 L18,12.4 L12.6,17.8"></path>
                    </svg>
                </div>
            </div>
    </div>
    );
}