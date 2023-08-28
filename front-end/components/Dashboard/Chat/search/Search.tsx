'use client'

import { useContext } from "react"
import { contextdata } from "@/app/contextApi"
import {useRouter} from "next/navigation"
import Link from "next/link"
type Props = {
    setShowBody: (value: React.SetStateAction<string | null>) => void;
}

export default function Search({setShowBody}: Props) {
    const {user, profiles,channels,socket}:any = useContext(contextdata);
    const router = useRouter()
    const showUsers = profiles?.filter((ur:any) => {
        return ur.username === user?.username ? false : true
    })
    console.log("showUsers : ",showUsers)

    const handelClick = (id:number) => {
        router.push(`/Chat/me/${id}`)
        setShowBody(null)
    }
    const handelClickChannel = (id:number) => {
        // router.push(`/Chat/channel/${id}`)
        socket?.emit("joinGroup",{groupId: id, userId: user?.id})
        setShowBody(null)
    }

    return (
        <div className="flex flex-col  overflow-y-scroll  max-h-[calc(100%-270px)] min-h-[calc(100%-135px)] no-scrollbar">
            <div className=" flex gap-2 items-center  py-[27px] px-[25px]">
                <span onClick={() => setShowBody(null)} className="cursor-pointer">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0412 21.0012C15.5679 21.0017 15.1088 20.8393 14.7412 20.5412L9.64118 16.3312C9.44119 16.172 9.27967 15.9697 9.16866 15.7394C9.05765 15.5091 9 15.2568 9 15.0012C9 14.7455 9.05765 14.4932 9.16866 14.2629C9.27967 14.0327 9.44119 13.8304 9.64118 13.6712L14.7412 9.46117C15.0482 9.21516 15.4182 9.06035 15.8089 9.01438C16.1996 8.96842 16.5954 9.03314 16.9512 9.20117C17.2604 9.33745 17.5238 9.55984 17.71 9.84179C17.8961 10.1237 17.9972 10.4533 18.0012 10.7912V19.2112C17.9972 19.549 17.8961 19.8786 17.71 20.1606C17.5238 20.4425 17.2604 20.6649 16.9512 20.8012C16.6653 20.9312 16.3552 20.9993 16.0412 21.0012Z" fill="#00498A"/>
                    </svg>
                </span>
                <p className="text-[25px] font-[600] font-[Poppins] text-[#00498A] leading-6 cursor-pointer" >
                    Search
                </p>
            </div>
            <div className="w-full px-[25px] py-[25px] flex  items-center  border-[#E5E5E5] gap-[10px]">
                <span>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M9.32 17C13.915 17 17.64 13.4183 17.64 9C17.64 4.58172 13.915 1 9.32 1C4.72499 1 1 4.58172 1 9C1 13.4183 4.72499 17 9.32 17Z"
                        stroke="#898F94"
                        strokeWidth="2"
                        />
                        <path
                        d="M19.7193 18.9984L15.1953 14.6484"
                        stroke="#898F94"
                        strokeWidth="2"
                        />
                    </svg>
                </span>
                <input type="text" placeholder="Search" className="w-[calc(100%-50px)] text-[16px] font-[400] font-[Poppins] text-[#898F94] focus:outline-none border-b-2" />
            </div>
            <div className="w-full px-[25px] py-[25px] flex flex-col gap-[10px] max-h-[calc(100%-270px)] min-h-[calc(100%-135px)]">
                    <div className="flex flex-col gap-[20px]">
                        <p className="text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]">
                            Users
                        </p>

                        {
                            showUsers?.map((ur:any) => {
                                return (
                                    <div className="flex items-center gap-[10px] cursor-pointer" onClick={() => handelClick(ur.userId)} key={ur.userId}
                                    >
                                        <img
                                            src="/userProfile.jpg"
                                            alt=""
                                            className="max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
                                        />
                                        <div>
                                            <p className="text-[20px] font-[300] font-[Poppins] text-[#034B8A] leading-6  max-w-[400px] truncate">
                                                {
                                                    `${ur.firstName} ${ur.lastName}`
                                                }
                                            </p>
                                            <p>
                                                {
                                                    ur.status === "online" ? (
                                                        <span className="text-[#6BB279]">
                                                            Online
                                                        </span>
                                                    ) : (
                                                        <span className="text-[#898F94]">
                                                            Offline
                                                        </span>
                                                    )
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <p className="text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]">
                            Groups
                        </p>

                        {
                            channels?.map((channel:any) => {
                                return (
                                    <div className="flex items-center gap-[10px] cursor-pointer" onClick={() => handelClickChannel(channel.id)} key={channel.id}
                                    >
                                        <img
                                            src="/groupAvatar.jpg"
                                            alt=""
                                            className="max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
                                        />
                                        <div>
                                            <p className="text-[20px] font-[300] font-[Poppins] text-[#034B8A] leading-6  max-w-[400px] truncate">
                                            {
                                                channel.name
                                            }
                                            </p>
                                            <span className="text-[#898F94]">
                                            {
                                                channel.type
                                            }
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    )
}