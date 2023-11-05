'use client'

import { useContext , useState } from "react";
import { contextdata } from "@/app/contextApi"
import {useRouter} from "next/navigation"
import Link from "next/link"
type Props = {
    setShowBody: (value: React.SetStateAction<string | null>) => void;
}

export default function Search({setShowBody}: Props) {
    const {user, profiles,channels,socket}:any = useContext(contextdata);
    const [isProtected, setIsProtected] = useState<string|null>(null);
    const [password, setPassword] = useState<string>("");
    const router = useRouter()
    const showUsers = profiles?.filter((ur:any) => {
        return ur.username === user?.username ? false : true
    })

    const handelClick = (id:string) => {
        router.push(`/Chat/me/${id}`)
        setShowBody(null)
    }
    const handelClickChannel = (id:string, type:string) => {
        socket?.emit("joinGroup",{groupId: id, userId: user?.id})
        setShowBody(null)
        router.push(`/Chat/g/${id}`)
    }
    const handelClickProtected = (id:string) => {
        
        socket?.emit("joinProtectedGroup",{groupId: id, userId: user?.id, password: password})
        setIsProtected(null)
        setShowBody(null)

    }
    return (
        <div className="flex flex-col  overflow-y-scroll  max-h-[calc(100%-270px)] min-h-[calc(100%-135px)] no-scrollbar relative ">
            <div className=" flex gap-2 items-center  py-[27px] px-[25px] cursor-pointer" onClick={() => setShowBody(null)}>
                <span>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0412 21.0012C15.5679 21.0017 15.1088 20.8393 14.7412 20.5412L9.64118 16.3312C9.44119 16.172 9.27967 15.9697 9.16866 15.7394C9.05765 15.5091 9 15.2568 9 15.0012C9 14.7455 9.05765 14.4932 9.16866 14.2629C9.27967 14.0327 9.44119 13.8304 9.64118 13.6712L14.7412 9.46117C15.0482 9.21516 15.4182 9.06035 15.8089 9.01438C16.1996 8.96842 16.5954 9.03314 16.9512 9.20117C17.2604 9.33745 17.5238 9.55984 17.71 9.84179C17.8961 10.1237 17.9972 10.4533 18.0012 10.7912V19.2112C17.9972 19.549 17.8961 19.8786 17.71 20.1606C17.5238 20.4425 17.2604 20.6649 16.9512 20.8012C16.6653 20.9312 16.3552 20.9993 16.0412 21.0012Z" fill="#00498A"/>
                    </svg>
                </span>
                <p className="text-[25px] font-[600] font-[Poppins] text-[#00498A] leading-6" >
                    Users & Groups
                </p>
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
                                            src={`http://${process.env.NEXT_PUBLIC_APP_URL}:3000/${ur.avatar}`}
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
                    <div className="flex flex-col gap-[20px] py-[25px]">
                        <p className="text-[20px] font-[500] font-[Poppins] text-[#DEDEDE]">
                            Groups
                        </p>

                        {
                            channels?.map((channel:any) => {
                                return (
                                    <div className="flex justify-between  items-center gap-[10px]" key={channel.id}
                                    >
                                        <div className="flex items-center gap-[10px] ">
                                            <img
                                                src="/groupAvatar.jpg"
                                                alt=""
                                                className="max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] rounded-full object-cover border-[3px] border-[#064A85] border-opacity-25"
                                            />
                                            <div>
                                                <p className="text-[20px] font-[300] font-[Poppins] text-[#034B8A] leading-6  max-w-[300px] truncate">
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
                                        <div className="flex items-center justify-center px-[30px] py-[10px] bg-[#366996] rounded-[10px] text-[#fff] text-[14px] font-[500] font-[Poppins] cursor-pointer self-end" onClick={() => channel.type=== "Protected" ? setIsProtected(channel.id): handelClickChannel(channel.id,channel.type)}>
                                            Join
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
            {isProtected && (
                <>
                    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center h-full  z-[100]">
                        <div className="absolute bottom-0 w-full flex justify-center items-center h-full bg-black bg-opacity-5 backdrop-blur-[1.5px] " onClick={() => setIsProtected(null)}/>
                        <form className="w-[400px]  bg-[#ffffff] flex p-[20px]  flex-col items-center rounded-[30px] z-[1000] gap-[45px] pb-[40px] pt-[30px] shadow-joinGroupModal">
                            <div className="flex justify-center items-center flex-col gap-[10px]  text-[#034B8A] text-[23px] font-[500] font-[Poppins] max-w-[200px] text-center">
                                Enter password to join this group
                            </div>
                            <input autoFocus type="password" placeholder="Password" className="w-[330px] pl-[30px] py-[20px] border-[0.5px] border-[#034B8A] rounded-[20px] text-[16px] font-[400] font-[Poppins] text-[#C6D4E1] focus:outline-none" onChange={(e) => setPassword(e.target.value)}/>
                            <span className="flex gap-[10px]">
                                <button className="w-[165px] py-[10px] rounded-[15px] text-[16px] font-[500] font-[Poppins] cursor-pointer border-[0.5px] border-[#034B8A] text-[#034B8A]"
                                onClick={() => setIsProtected(null)}>
                                    Cancel
                                </button>
                                <button className="w-[165px] py-[10px] bg-[#366996] rounded-[15px] text-[#fff] text-[16px] font-[500] font-[Poppins] cursor-pointer" onClick={() => handelClickProtected(isProtected)}>
                                    Join
                                </button>
                            </span>
                        </form>
                    </div>
                </>
            )
            }
        </div>
    )
}
