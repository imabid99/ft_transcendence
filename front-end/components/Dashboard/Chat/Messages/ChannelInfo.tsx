'use client';
import HandlRightClick from "./HandlRightClick"
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { contextdata } from "@/app/contextApi";
import Link from "next/link";

type ChannelInfoProps = {
    infoRef: any,
    handleshowInfo: any,
    group: any,
    userId: number,
}

export default function ChannelInfo({infoRef, handleshowInfo, group, userId}: ChannelInfoProps) {
    const [showAccessPassword, setShowAccessPassword] = useState<boolean>(false);
    const mytype = group?.Owners.find((owner: any) => owner.id === userId) ? 3 : group?.Admins.find((admin: any) => admin.id === userId) ? 2 : 1;
    const {socket}: any = useContext(contextdata);
    const router = useRouter();
    const handleExit = () => {
        socket.emit("leaveGroup", {groupId: group.id});
        handleshowInfo();
        router.push("/Chat");
    }

    return (
        <div className="h-[100vh] bg-[#FFF] min-w-[524px] fixed right-[-700px] top-0 z-[60] groupInfo p-[42px] !pb-0 ease-in duration-300 delay-100 "
            ref={infoRef}>
            <div className="w-full h-full  flex relative  flex-col gap-[30px] overflow-y-scroll no-scrollbar ">
                <div className="w-full flex items-center justify-between">
                    <div onClick={handleshowInfo} className="flex items-center gap-[14px] cursor-pointer">
                        <span>
                            <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.04118 12.0012C6.56787 12.0017 6.1088 11.8393 5.74118 11.5412L0.64118 7.33117C0.441185 7.17195 0.279673 6.96968 0.168662 6.73941C0.0576506 6.50914 0 6.2568 0 6.00117C0 5.74554 0.0576506 5.49319 0.168662 5.26292C0.279673 5.03265 0.441185 4.83038 0.64118 4.67117L5.74118 0.461168C6.04821 0.215162 6.41818 0.0603538 6.80891 0.0143849C7.19965 -0.031584 7.59544 0.0331352 7.95118 0.201168C8.26035 0.337447 8.52377 0.559841 8.70996 0.841787C8.89615 1.12373 8.99725 1.45331 9.00118 1.79117V10.2112C8.99725 10.549 8.89615 10.8786 8.70996 11.1606C8.52377 11.4425 8.26035 11.6649 7.95118 11.8012C7.66531 11.9312 7.35521 11.9993 7.04118 12.0012Z" fill="#00498A"/>
                            </svg>
                        </span>
                        <p className="text-[#00498A] text-[30px] font-[Poppins] font-[600]">
                            Group info
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-[5px] justify-center items-center relative">
                    <img src="/groupAvatar.jpg" alt="" className="rounded-full w-[250px] h-[250px] object-cover"/>
                    <p className="text-[#024077] text-[35px] font-[Poppins] font-[700]">
                        {group.name}
                    </p>
                    <p className="text-[#064A85] text-[20px] font-[Poppins] font-[400]">
                        {group.Members.length} members
                    </p>
                    {
                        showAccessPassword &&
                            <div className="min-h-full w-full absolute top-0 left-0 bg-white flex flex-col justify-center items-center">
                                <>
                                    <p className="text-[#064A85] text-[20px] font-[Poppins] font-[400] flex items-center gap-[10px]">
                                        Change access password
                                    </p>
                                    <input autoFocus type="password" className="mt-[20px] outline-none w-[100%] h-[50px] rounded-[5px] border-[1px] border-[#064A85] border-opacity-25 px-[15px] text-[#064A85] text-[20px] font-[Poppins] font-[400]"/>
                                    <span className="flex items-center justify-around gap-[10px] w-full mt-[20px]">
                                        <button className=" text-[20px] font-[Poppins] font-[400] p-[10px]" onClick={
                                            () => {
                                                setShowAccessPassword(false)
                                            }
                                        }>
                                            cancel
                                        </button>
                                        <button className="text-[#AF1C1C] text-[20px] font-[Poppins] font-[400] p-[10px]">
                                            remove
                                        </button>
                                        <button className="text-[#064A85] text-[20px] font-[Poppins] font-[400] p-[10px]">
                                            save
                                        </button>
                                    </span>
                                </>
                            </div>
                    }
                </div>
                <p className="text-[#064A85] text-[20px] font-[Poppins] font-[400] flex items-center gap-[10px]">
                    <span>
                        <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 20V16.5C0 15.7917 0.172545 15.1404 0.517636 14.5463C0.862727 13.9521 1.32048 13.4992 1.89091 13.1875C3.11212 12.5417 4.35303 12.0571 5.61364 11.7338C6.87424 11.4104 8.15455 11.2492 9.45455 11.25C10.7545 11.25 12.0348 11.4117 13.2955 11.735C14.5561 12.0583 15.797 12.5425 17.0182 13.1875C17.5894 13.5 18.0475 13.9533 18.3926 14.5475C18.7377 15.1417 18.9099 15.7925 18.9091 16.5V20H0ZM21.2727 20V16.25C21.2727 15.3333 21.0312 14.4529 20.5483 13.6088C20.0653 12.7646 19.381 12.0408 18.4955 11.4375C19.5 11.5625 20.4455 11.7763 21.3318 12.0788C22.2182 12.3813 23.0455 12.7508 23.8136 13.1875C24.5227 13.6042 25.0644 14.0675 25.4386 14.5775C25.8129 15.0875 26 15.645 26 16.25V20H21.2727ZM9.45455 10C8.15455 10 7.04167 9.51043 6.11591 8.53127C5.19015 7.5521 4.72727 6.37502 4.72727 5.00002C4.72727 3.62503 5.19015 2.44795 6.11591 1.46878C7.04167 0.489615 8.15455 3.20508e-05 9.45455 3.20508e-05C10.7545 3.20508e-05 11.8674 0.489615 12.7932 1.46878C13.7189 2.44795 14.1818 3.62503 14.1818 5.00002C14.1818 6.37502 13.7189 7.5521 12.7932 8.53127C11.8674 9.51043 10.7545 10 9.45455 10ZM21.2727 5.00002C21.2727 6.37502 20.8099 7.5521 19.8841 8.53127C18.9583 9.51043 17.8455 10 16.5455 10C16.3288 10 16.053 9.97377 15.7182 9.92127C15.3833 9.86877 15.1076 9.81168 14.8909 9.75002C15.4227 9.08335 15.8316 8.34377 16.1176 7.53127C16.4036 6.71877 16.5462 5.87502 16.5455 5.00002C16.5455 4.12503 16.4028 3.28128 16.1176 2.46878C15.8324 1.65628 15.4235 0.916697 14.8909 0.250031C15.1667 0.145865 15.4424 0.0779488 15.7182 0.0462822C15.9939 0.0146156 16.2697 -0.000801281 16.5455 3.20508e-05C17.8455 3.20508e-05 18.9583 0.489615 19.8841 1.46878C20.8099 2.44795 21.2727 3.62503 21.2727 5.00002Z" fill="#04427A"/>
                        </svg>
                    </span>
                    members
                </p>
                <div className="w-full flex flex-col gap-[25px] overflow-y-scroll no-scrollbar min-h-[calc(300px)] h-[calc(100%-600px)]  max-h-[calc(100%-600px)] relative">
                    {
                        group?.Owners.map((owner: any) => {
                            return (
                                
                                <HandlRightClick mytype={mytype} type={3} id={owner.id}  key={`${owner.id}`}>
                                    <Link href={`/profile/${owner.id}`}>
                                        <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                            <span className="flex items-center gap-[10px]">
                                                <img src="/groupAvatar.jpg" alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                <span>
                                                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                        {owner.username}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                    <>
                                        <span className="">
                                            owner
                                        </span>
                                        {
                                            userId !== owner.id && (
                                            <Link href="/Game">
                                                <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                    </path>
                                                </svg>
                                            </Link>)

                                        }
                                    </>
                                </HandlRightClick>
                            )
                        })
                    }
                    {
                        group?.Admins.map((admin: any) => {
                            return (
                                <HandlRightClick mytype={mytype} type={2} id={admin.id} groupId={group.id}  key={`${admin.id}`}>
                                    <Link href={`/profile/${admin.id}`}>
                                        <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                            <span className="flex items-center gap-[10px]">
                                                <img src="/groupAvatar.jpg" alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                <span>
                                                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                        {admin.username}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                    <>
                                        <span className="">
                                            Admin
                                        </span>
                                        {
                                            userId !== admin.id && (
                                                <Link href="/Game">
                                                    <svg stroke="currentColor" fill="#034B8A"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                        </path>
                                                    </svg>
                                                </Link>
                                            )
                                        }
                                    </>
                                </HandlRightClick>
                            )
                        })
                    }
                    {
                        group?.Members.map((member: any) => {
                            if (group.Owners.find((owner: any) => owner.id === member.id)) return;
                            return(
                                <HandlRightClick mytype={mytype} type={1} id={member.id} groupId={group.id}  key={`${member.id}`}>
                                    <Link href={`/profile/${member.id}`} >
                                        <div className="w-full flex items-center gap-[10px] justify-between cursor-pointer">
                                            <span className="flex items-center gap-[10px]">
                                                <img src="/groupAvatar.jpg" alt="" className="rounded-full w-[60px] h-[60px] object-cover"/>
                                                <span>
                                                    <p className="text-[#034B8A] text-[20px] font-[Poppins] font-[500] min-w-[200px]  max-w-[300px] truncate">
                                                        {member.username}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </Link> 
                                    <>
                                        <span className="">
                                            memmber
                                        </span>
                                        {
                                            userId !== member.id && (
                                                <Link href="/Game">
                                                    <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M483.13 245.38C461.92 149.49 430 98.31 382.65 84.33A107.13 107.13 0 00352 80c-13.71 0-25.65 3.34-38.28 6.88C298.5 91.15 281.21 96 256 96s-42.51-4.84-57.76-9.11C185.6 83.34 173.67 80 160 80a115.74 115.74 0 00-31.73 4.32c-47.1 13.92-79 65.08-100.52 161C4.61 348.54 16 413.71 59.69 428.83a56.62 56.62 0 0018.64 3.22c29.93 0 53.93-24.93 70.33-45.34 18.53-23.1 40.22-34.82 107.34-34.82 59.95 0 84.76 8.13 106.19 34.82 13.47 16.78 26.2 28.52 38.9 35.91 16.89 9.82 33.77 12 50.16 6.37 25.82-8.81 40.62-32.1 44-69.24 2.57-28.48-1.39-65.89-12.12-114.37zM208 240h-32v32a16 16 0 01-32 0v-32h-32a16 16 0 010-32h32v-32a16 16 0 0132 0v32h32a16 16 0 010 32zm84 4a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-19.95A20 20 0 01336 288zm0-88a20 20 0 1120-20 20 20 0 01-20 20zm44 44a20 20 0 1120-20 20 20 0 01-20 20z">
                                                        </path>
                                                    </svg>
                                                </Link>
                                            )
                                        }
                                    </>
                                </HandlRightClick>
                            )
                        })
                    }
                </div>
                <span className=" w-full flex items-center justify-around gap-[25px] cursor-pointer pb-[25px]">
                    {
                        mytype === 3 && 
                        <div className="flex gap-[15px] items-center " onClick={() => setShowAccessPassword(true)}>
                            <span>
                                <svg width="21" height="27" viewBox="0 0 16 20"  fill="#AF1C1C"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 7V5C13 2.2 10.8 0 8 0C5.2 0 3 2.2 3 5V7C1.3 7 0 8.3 0 10V17C0 18.7 1.3 20 3 20H13C14.7 20 16 18.7 16 17V10C16 8.3 14.7 7 13 7ZM5 5C5 3.3 6.3 2 8 2C9.7 2 11 3.3 11 5V7H5V5ZM9.1 13.5L9 13.6V15C9 15.6 8.6 16 8 16C7.4 16 7 15.6 7 15V13.6C6.4 13 6.3 12.1 6.9 11.5C7.5 10.9 8.4 10.8 9 11.4C9.6 11.9 9.7 12.9 9.1 13.5Z"/>
                                </svg> 
                            </span>
                            <p className="text-[#AF1C1C] text-[20px] font-[Poppins] font-[500]">
                                access pass
                            </p>
                        </div>
                    }
                    <div className="flex gap-[15px]" onClick={handleExit}>
                        <span>
                            <svg width="21" height="24" viewBox="0 0 21 24" fill="#AF1C1C" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.98349 0C10.3016 0.000376943 10.6075 0.130506 10.8388 0.363798C11.0701 0.59709 11.2093 0.915937 11.2279 1.25519C11.2465 1.59445 11.1432 1.92851 10.9391 2.18911C10.7349 2.44971 10.4453 2.6172 10.1295 2.65733L9.98349 2.66667H3.74381C3.43815 2.66671 3.14313 2.78661 2.91471 3.00362C2.6863 3.22063 2.54037 3.51967 2.50461 3.844L2.49587 4V20C2.49591 20.3266 2.60813 20.6418 2.81124 20.8858C3.01436 21.1299 3.29424 21.2858 3.5978 21.324L3.74381 21.3333H9.35952C9.67759 21.3337 9.98353 21.4638 10.2148 21.6971C10.4461 21.9304 10.5853 22.2493 10.6039 22.5885C10.6226 22.9278 10.5193 23.2618 10.3151 23.5224C10.111 23.783 9.82137 23.9505 9.50553 23.9907L9.35952 24H3.74381C2.78887 24.0001 1.87001 23.6102 1.17523 22.9103C0.480447 22.2103 0.0622626 21.2532 0.00623983 20.2347L5.81594e-09 20V4C-5.31892e-05 2.97972 0.364803 1.99798 1.01992 1.25565C1.67503 0.513324 2.57088 0.0665233 3.52417 0.00666682L3.74381 0H9.98349ZM17.1055 7.28533L20.6346 11.0573C20.8686 11.3074 21 11.6464 21 12C21 12.3536 20.8686 12.6926 20.6346 12.9427L17.1055 16.7147C16.8713 16.9647 16.5538 17.1051 16.2227 17.1049C15.8917 17.1048 15.5743 16.9642 15.3403 16.714C15.1063 16.4638 14.9749 16.1246 14.975 15.7709C14.9751 15.4172 15.1067 15.078 15.3409 14.828L16.7398 13.3333H9.98349C9.65251 13.3333 9.3351 13.1929 9.10106 12.9428C8.86703 12.6928 8.73555 12.3536 8.73555 12C8.73555 11.6464 8.86703 11.3072 9.10106 11.0572C9.3351 10.8071 9.65251 10.6667 9.98349 10.6667H16.7398L15.3409 9.172C15.1067 8.92199 14.9751 8.58283 14.975 8.22914C14.9749 7.87544 15.1063 7.53619 15.3403 7.286C15.5743 7.03581 15.8917 6.89519 16.2227 6.89506C16.5538 6.89494 16.8713 7.03532 17.1055 7.28533Z" />
                            </svg> 
                        </span>
                        <p className="text-[#AF1C1C] text-[20px] font-[Poppins] font-[500]">
                            Exit group
                        </p>
                    </div>
                </span>
            </div>
        </div>
    )
}